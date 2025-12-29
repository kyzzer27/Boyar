import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDFFromPage(
  url: string,
  fileName: string,
  onProgress?: (status: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    onProgress?.("Opening page...");
    
    // Open page in new window
    const newWindow = window.open(url, '_blank', 'width=1200,height=1600');
    
    if (!newWindow) {
      reject(new Error('Please allow popups to generate PDF'));
      return;
    }

    // Wait for window to load
    const checkLoaded = setInterval(() => {
      try {
        if (newWindow.document.readyState === 'complete') {
          clearInterval(checkLoaded);
          
          onProgress?.("Capturing page...");
          
          // Wait a bit more for content to render
          setTimeout(async () => {
            try {
              const mainContent = newWindow.document.querySelector('main') || newWindow.document.body;
              
              if (!mainContent) {
                newWindow.close();
                reject(new Error('Could not find content'));
                return;
              }

              onProgress?.("Generating PDF...");
              
              // Capture the content
              const canvas = await html2canvas(mainContent as HTMLElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: mainContent.scrollWidth,
                height: mainContent.scrollHeight,
              });

              // Convert to PDF
              const imgData = canvas.toDataURL('image/png', 1.0);
              const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
              });

              const imgWidth = 210; // A4 width in mm
              const pageHeight = 297; // A4 height in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              let heightLeft = imgHeight;
              let position = 0;

              pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;

              while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
              }

              // Download
              pdf.save(fileName);
              
              // Close window
              newWindow.close();
              
              onProgress?.("Complete");
              resolve();
            } catch (error) {
              newWindow.close();
              reject(error);
            }
          }, 2000);
        }
      } catch (error) {
        // Cross-origin error - try alternative approach
        clearInterval(checkLoaded);
        newWindow.close();
        reject(new Error('Cannot access page content. Please ensure you are logged in.'));
      }
    }, 100);
  });
}










