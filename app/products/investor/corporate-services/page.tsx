"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

interface Jurisdiction {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Using Google Maps coordinates (WGS84 - EPSG:4326)
const jurisdictions: Jurisdiction[] = [
  { id: "bahamas", name: "Bahamas", lat: 25.0343, lng: -77.3963 },
  { id: "bahrain", name: "Bahrain", lat: 26.0667, lng: 50.5577 },
  { id: "belize", name: "Belize", lat: 17.1899, lng: -88.4976 },
  { id: "bermuda", name: "Bermuda", lat: 32.3078, lng: -64.7505 },
  { id: "bvi", name: "BVI – British Virgin Islands", lat: 18.4207, lng: -64.6399 },
  { id: "cayman", name: "Cayman Islands", lat: 19.3133, lng: -81.2546 },
  { id: "cook", name: "Cook Islands", lat: -21.2367, lng: -159.7777 },
  { id: "cyprus", name: "Cyprus", lat: 35.1264, lng: 33.4299 },
  { id: "delaware", name: "Delaware (USA)", lat: 39.1619, lng: -75.5267 },
  { id: "dubai", name: "Dubai – UAE Mainland", lat: 25.2048, lng: 55.2708 },
  { id: "difc", name: "DIFC – Dubai International Financial Centre", lat: 25.2144, lng: 55.2794 },
  { id: "adgm", name: "ADGM – Abu Dhabi Global Market", lat: 24.4539, lng: 54.3773 },
  { id: "hongkong", name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { id: "india", name: "India", lat: 20.5937, lng: 78.9629 },
  { id: "ireland", name: "Ireland", lat: 53.4129, lng: -8.2439 },
  { id: "kazakhstan", name: "Kazakhstan (AIFC)", lat: 43.2220, lng: 76.8512 },
  { id: "labuan", name: "Labuan (Malaysia)", lat: 5.2767, lng: 115.2417 },
  { id: "luxembourg", name: "Luxembourg", lat: 49.6116, lng: 6.1319 },
  { id: "malta", name: "Malta", lat: 35.9375, lng: 14.3754 },
  { id: "marshall", name: "Marshall Islands", lat: 7.1315, lng: 171.1845 },
  { id: "mauritius", name: "Mauritius", lat: -20.3484, lng: 57.5522 },
  { id: "montenegro", name: "Montenegro", lat: 42.4304, lng: 19.2594 },
  { id: "nevis", name: "Nevis", lat: 17.1554, lng: -62.5796 },
  { id: "netherlands", name: "Netherlands", lat: 52.1326, lng: 5.2913 },
  { id: "panama", name: "Panama", lat: 8.9824, lng: -79.5199 },
  { id: "rak", name: "Ras Al Khaimah – RAK ICC", lat: 25.7889, lng: 55.9590 },
  { id: "saintkitts", name: "Saint Kitts", lat: 17.3578, lng: -62.7830 },
  { id: "samoa", name: "Samoa", lat: -13.7590, lng: -172.1046 },
  { id: "seychelles", name: "Seychelles", lat: -4.6796, lng: 55.4920 },
  { id: "singapore", name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { id: "switzerland", name: "Switzerland", lat: 46.8182, lng: 8.2275 },
  { id: "uk", name: "UK – United Kingdom", lat: 51.5074, lng: -0.1278 },
  { id: "wyoming", name: "Wyoming (USA)", lat: 41.1403, lng: -104.8197 },
];

function WorldMap() {
  const [worldData, setWorldData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightedJurisdiction, setHighlightedJurisdiction] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 640;
      const headerHeight = isMobile ? 56 : 64; // Smaller header on mobile
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - headerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Load Natural Earth 110m data from CDN
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/world/110m.json')
      .then((response) => response.json())
      .then((topojsonData) => {
        // Convert TopoJSON to GeoJSON
        const geojson = feature(topojsonData, topojsonData.objects.countries);
        setWorldData(geojson);
      })
      .catch((error) => {
        console.error('Error loading world map data:', error);
        // Fallback: try alternative CDN
        fetch('https://unpkg.com/world-atlas@1/world/110m.json')
          .then((response) => response.json())
          .then((topojsonData) => {
            const geojson = feature(topojsonData, topojsonData.objects.countries);
            setWorldData(geojson);
          })
          .catch((err) => console.error('Fallback also failed:', err));
      });
  }, []);

  // Web Mercator projection (same as Google Maps) - responsive scale for mobile
  const isMobile = dimensions.width < 640;
  const scaleFactor = isMobile ? 2.5 : 1.6;
  const heightFactor = isMobile ? 1.3 : 0.8;
  const verticalOffset = isMobile ? 40 : 80;
  
  const projection = geoMercator()
    .scale(Math.min(dimensions.width / scaleFactor, dimensions.height / heightFactor) / (2 * Math.PI))
    .translate([dimensions.width / 2, dimensions.height / 2 + verticalOffset])
    .center([0, 20]); // Center slightly north

  const path = geoPath().projection(projection);

  // Convert lat/lng to pixel coordinates using the same projection
  const latLngToPixel = (lat: number, lng: number) => {
    const coords = projection([lng, lat]);
    return coords ? { x: coords[0], y: coords[1] } : { x: 0, y: 0 };
  };

  // Search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResult(null);
      setHighlightedJurisdiction(null);
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    
    // Search in jurisdictions list
    const found = jurisdictions.find((jurisdiction) => {
      const name = jurisdiction.name.toLowerCase();
      // Check if query matches the jurisdiction name or parts of it
      return name.includes(query) || query.includes(name.split(' ')[0].toLowerCase());
    });

    if (found) {
      setSearchResult(`Found: ${found.name}`);
      setHighlightedJurisdiction(found.id);
      // Scroll to the jurisdiction (optional - could add smooth scroll)
    } else {
      setSearchResult("No results found");
      setHighlightedJurisdiction(null);
    }
  };

  // Handle input change - clear results when search is cleared
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If search is cleared, reset everything
    if (!value.trim()) {
      setSearchResult(null);
      setHighlightedJurisdiction(null);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full h-full bg-transparent">
      {/* Button with arrow - Top Left - Responsive */}
      <motion.button
        className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white hover:bg-white/10 transition-all flex items-center gap-1 sm:gap-2"
        style={{ fontFamily: 'var(--font-benzin)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Jurisdictions covered by us globally</span>
        <span className="text-xs sm:text-sm font-medium sm:hidden">Jurisdictions</span>
        <motion.span
          className="text-sm sm:text-lg"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Search Bar - Top Right - Responsive */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 flex flex-col items-end gap-1.5 sm:gap-2 max-w-[calc(100%-120px)] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="px-2 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all text-xs sm:text-sm w-full sm:w-auto min-w-[120px] sm:min-w-[200px]"
            style={{ fontFamily: 'var(--font-benzin)' }}
          />
        </div>
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm ${
              searchResult.includes("No results") 
                ? "bg-red-500/20 text-red-300 border border-red-500/30" 
                : "bg-green-500/20 text-green-300 border border-green-500/30"
            }`}
            style={{ fontFamily: 'var(--font-benzin)' }}
          >
            {searchResult}
          </motion.div>
        )}
      </div>

      {/* World Map SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* World map with white boundaries only - transparent, no fill, remove Antarctica - Responsive stroke */}
        {worldData && (
          <g stroke="rgba(255,255,255,0.7)" strokeWidth={isMobile ? "1" : "1.5"} fill="none">
            {worldData.features
              .filter((d: any) => {
                // Filter out Antarctica - check name and coordinates
                const name = d.properties?.NAME || d.properties?.name || d.properties?.NAME_LONG || '';
                const isAntarctica = name.toLowerCase().includes('antarctica') || 
                                     name.toLowerCase().includes('antartica') ||
                                     name.toLowerCase().includes('south pole');
                
                // Filter by bounding box - Antarctica is below -60 degrees latitude
                if (d.geometry) {
                  const coords = d.geometry.coordinates;
                  if (coords) {
                    // Check if any coordinate is in Antarctica region (below -60°)
                    const checkCoords = (coordArray: any[]): boolean => {
                      for (const coord of coordArray) {
                        if (Array.isArray(coord)) {
                          if (coord.length >= 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number') {
                            const lat = coord[1];
                            if (lat < -60) return false; // In Antarctica region
                          } else {
                            // Nested array
                            if (!checkCoords(coord)) return false;
                          }
                        }
                      }
                      return true;
                    };
                    
                    if (!checkCoords(coords)) return false;
                  }
                }
                
                return !isAntarctica;
              })
              .map((d: any, i: number) => (
                <path
                  key={`country-${i}`}
                  d={path(d) as string}
                  className="country-path"
                  style={{ filter: 'none' }}
                />
              ))}
          </g>
        )}
      </svg>

      {/* Jurisdiction Markers */}
      {jurisdictions.map((jurisdiction, index) => {
        const { x, y } = latLngToPixel(jurisdiction.lat, jurisdiction.lng);
        const leftPercent = (x / dimensions.width) * 100;
        const topPercent = (y / dimensions.height) * 100;

        return (
          <motion.div
            key={jurisdiction.id}
            className="absolute group z-20"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {/* Blinking Red Dot - subtle blink, no shadow */}
            <motion.div
              className="relative"
              style={{ filter: 'none' }}
            >
              {/* Main dot with blinking glow effect - no shadow, green if highlighted - Responsive size */}
              <motion.div
                className={`relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                  highlightedJurisdiction === jurisdiction.id ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ 
                  boxShadow: 'none',
                  filter: 'none'
                }}
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            {/* Tooltip - Responsive */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/90 backdrop-blur-sm text-white text-[10px] sm:text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 border border-white/20 max-w-[150px] sm:max-w-none">
              {jurisdiction.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function CorporateServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const tabs = [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
    { id: "tab4", label: "Tab 4" },
    { id: "tab5", label: "Tab 5" },
    { id: "tab6", label: "Tab 6" },
    { id: "tab7", label: "Tab 7" },
    { id: "tab8", label: "Tab 8" },
  ];

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />
        
        {/* Header - Mobile Responsive */}
        <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/80 backdrop-blur-md z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4 sm:py-4 lg:px-8">
            <Link href="/products/investor" className="text-xs sm:text-sm md:text-base text-white hover:text-gray-300 transition flex items-center gap-1 sm:gap-2">
              ← <span className="hidden sm:inline">Back</span>
            </Link>
            <h1
              className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Corporate Services
            </h1>
            <div className="w-8 sm:w-16" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Map Section - First section only, full viewport height, transparent - Mobile Responsive */}
          <section className="relative h-screen pt-14 sm:pt-16 bg-transparent">
            <div className="w-full h-full relative z-10">
              <WorldMap />
            </div>
          </section>

          {/* Tabs Section - Scrollable, appears after map section - Mobile Responsive */}
          <section className="relative z-20 bg-black/90 backdrop-blur-md border-t border-white/10 min-h-screen">
            <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">

              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white text-center"
                style={{ fontFamily: 'var(--font-benzin)' }}
              >
                Service Details
              </h2>
              
              {/* Tab Navigation - Mobile Responsive */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                    className={`px-3 py-1.5 sm:px-6 sm:py-3 rounded-full border transition-all text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? "bg-white/10 border-white/40 text-white"
                        : "bg-white/5 border-white/20 text-white/70 hover:border-white/30"
                    }`}
                    style={{ fontFamily: 'var(--font-benzin)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content - Mobile Responsive */}
              <div className="min-h-[80px] sm:min-h-[100px] max-h-[250px] sm:max-h-[300px] overflow-y-auto">
                {activeTab ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-gray-300 text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-benzin)' }}
                  >
                    Content for {tabs.find(t => t.id === activeTab)?.label}
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-400 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-benzin)' }}>
                    Select a tab to view details
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
