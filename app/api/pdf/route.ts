import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const groupId = searchParams.get("groupId");
    const modelId = searchParams.get("modelId");
    const type = searchParams.get("type");

    if (!groupId || !modelId || !type) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   request.nextUrl.origin || 
                   "http://localhost:3010";

    // Construct the page URL
    const pageUrl = `${baseUrl}/client-acquisition/models/${groupId}/${modelId}/${type}`;

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      
      // Set viewport
      await page.setViewport({ width: 1200, height: 1600 });

      // Set authentication before navigating
      await page.evaluateOnNewDocument(() => {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userRole", "Team");
      });

      // Navigate to the page
      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait a bit for any dynamic content to render
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
      });

      await browser.close();

      // Return PDF with proper headers so browser opens it in PDF viewer
      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${modelId}-${type}.pdf"`,
        },
      });
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

