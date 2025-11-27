"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import {
  BahamasFlag,
  BermudaFlag,
  CaymanIslandsFlag,
  CookIslandsFlag,
  CyprusFlag,
  DelawareFlag,
  CostaRicaFlag,
  GeorgiaFlag,
  GibraltarFlag,
  GuernseyFlag,
} from "@/components/flags";
import { FlagImage } from "@/components/flags/flag-image";

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
  { id: "costarica", name: "Costa Rica", lat: 9.7489, lng: -83.7534 },
  { id: "cyprus", name: "Cyprus", lat: 35.1264, lng: 33.4299 },
  { id: "delaware", name: "Delaware (USA)", lat: 39.1619, lng: -75.5267 },
  { id: "georgia", name: "Georgia", lat: 42.3154, lng: 43.3569 },
  { id: "gibraltar", name: "Gibraltar", lat: 36.1408, lng: -5.3536 },
  { id: "guernsey", name: "Guernsey", lat: 49.4657, lng: -2.5853 },
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

interface WorldMapProps {
  onSearchRef?: (ref: { search: (query: string) => void }) => void;
}

function WorldMap({ onSearchRef }: WorldMapProps) {
  const [worldData, setWorldData] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightedJurisdiction, setHighlightedJurisdiction] = useState<string | null>(null);
  const [showJurisdictionsList, setShowJurisdictionsList] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Expose search function to parent component
  useEffect(() => {
    if (onSearchRef) {
      onSearchRef({
        search: (query: string) => {
          setSearchQuery(query);
          const found = jurisdictions.find((jurisdiction) => {
            const name = jurisdiction.name.toLowerCase();
            const q = query.toLowerCase();
            return name.includes(q) || q.includes(name.split(' ')[0].toLowerCase());
          });
          if (found) {
            setSearchResult(`Found: ${found.name}`);
            setHighlightedJurisdiction(found.id);
          } else {
            setSearchResult("No results found");
            setHighlightedJurisdiction(null);
          }
        }
      });
    }
  }, [onSearchRef]);

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
        onClick={() => setShowJurisdictionsList(!showJurisdictionsList)}
        className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white hover:bg-white/10 transition-all flex items-center gap-1 sm:gap-2"
        style={{ fontFamily: 'var(--font-benzin)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Jurisdictions covered by us</span>
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

      {/* Jurisdictions List Popup */}
      <AnimatePresence>
        {showJurisdictionsList && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJurisdictionsList(false)}
            />

            {/* Popup Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="bg-black/95 border-2 border-white/30 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-benzin)' }}
                  >
                    Jurisdictions Covered
                  </h3>
                  <motion.button
                    onClick={() => setShowJurisdictionsList(false)}
                    className="text-white/60 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {jurisdictions.map((jurisdiction, index) => (
                    <motion.div
                      key={jurisdiction.id}
                      className="px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSearchQuery(jurisdiction.name);
                        handleSearch();
                        setShowJurisdictionsList(false);
                      }}
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      <span className="text-white text-sm">{jurisdiction.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CorporateServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const [mapSearchQuery, setMapSearchQuery] = useState<string>("");
  const mapSearchRef = useRef<{ search: (query: string) => void } | null>(null);

  const tabs = [
    { id: "company-formation", label: "Company Formation" },
    { id: "internal-audit", label: "Internal Audit" },
    { id: "accounting", label: "Accounting" },
    { id: "aml", label: "AML" },
    { id: "fatca-crs", label: "FATCA / CRS" },
    { id: "economic-substance", label: "Economic Substance" },
    { id: "global-restructuring", label: "Global Re-Structuring" },
    { id: "office-registration", label: "Office Registration" },
    { id: "dao-solutions", label: "DAO Solutions" },
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
              <WorldMap onSearchRef={(ref) => { mapSearchRef.current = ref; }} />
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
              
              {/* Tab Navigation - Table/Grid Format - Large and Fills Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 w-full">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                    className={`w-full px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 rounded-xl border-2 transition-all text-base sm:text-lg md:text-xl lg:text-2xl font-medium min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center ${
                      activeTab === tab.id
                        ? "bg-white/15 border-white/50 text-white shadow-lg shadow-white/20"
                        : "bg-white/5 border-white/25 text-white/80 hover:bg-white/10 hover:border-white/40"
                    }`}
                    style={{ fontFamily: 'var(--font-benzin)' }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="text-center">{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tab Content - Mobile Responsive */}
              <div className="min-h-[200px] sm:min-h-[300px] max-h-[600px] sm:max-h-[700px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "company-formation" ? (
                    <motion.div
                      key="company-formation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full py-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                        Select Jurisdiction
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {jurisdictions.map((jurisdiction, index) => (
                          <motion.button
                            key={jurisdiction.id}
                            className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium transition-all"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedJurisdiction(jurisdiction.id);
                            }}
                          >
                            {jurisdiction.name}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : activeTab ? (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-gray-300 text-sm sm:text-base py-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      Content for {tabs.find(t => t.id === activeTab)?.label}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-400 text-xs sm:text-sm py-4"
                      style={{ fontFamily: 'var(--font-benzin)' }}
                    >
                      Select a tab to view details
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </main>

        {/* Jurisdiction Detail Modal */}
        <AnimatePresence>
          {selectedJurisdiction && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJurisdiction(null)}
              />

              {/* Modal Content */}
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="bg-black/95 border-2 border-white/30 rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedJurisdiction === "bahamas" && (
                    <>
                      {/* Header with Flag */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2
                              className="text-3xl sm:text-4xl font-bold text-white"
                              style={{ fontFamily: 'var(--font-benzin)' }}
                            >
                              BAHAMAS
                            </h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="bahamas" FlagComponent={BahamasFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>
                            Company formation price: USD 6,064.25
                          </p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>
                            PAGE 1/2
                          </p>
                        </div>
                        <motion.button
                          onClick={() => setSelectedJurisdiction(null)}
                          className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0"
                          whileHover={{ rotate: 90, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ×
                        </motion.button>
                      </div>

                      {/* Content */}
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3>
                          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            The Bahamas is an independent nation consisting of over 700 islands, cays, and islets in the Atlantic Ocean. It lies just southeast of Florida (USA) and north of Cuba, placing it firmly in the Caribbean region of the North American continent. The capital is Nassau, on New Providence Island.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3>
                          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                            <li>Originally inhabited by the Lucayan people before colonization by Spain in the 15th century.</li>
                            <li>Claimed by the British in the 17th century and became a Crown Colony in 1718.</li>
                            <li>The Bahamas became independent in 1973 while remaining part of the Commonwealth.</li>
                            <li>Tourism and financial services have been the pillars of its economy since independence.</li>
                            <li>Offshore financial legislation in the 1960s–70s established it as a pioneer in the global offshore industry.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3>
                          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            The Bahamas was one of the first jurisdictions to recognize the potential of offshore finance. Banking secrecy laws in the mid-20th century attracted European and North American wealth. The country became known for private banking, trusts, and insurance well before many other Caribbean jurisdictions.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3>
                          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                            <li><strong>Private Banking</strong> – Historically a hub for North and South American HNWIs.</li>
                            <li><strong>Trusts</strong> – Bahamian trusts, particularly purpose trusts and foundations, are widely respected.</li>
                            <li><strong>Funds and Investment Structures</strong> – Used for investment funds and wealth management vehicles.</li>
                            <li><strong>Insurance and Captives</strong> – Attractive regulatory framework for insurers.</li>
                            <li><strong>Maritime Registry</strong> – One of the largest ship registries in the world.</li>
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                          <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>
                            PAGE 2/2
                          </p>
                          
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                              The Bahamas operates under English common law with appeals ultimately going to the Privy Council in London. The Central Bank of The Bahamas and the Securities Commission oversee financial services. The jurisdiction has modernized its AML/CFT and tax information exchange frameworks in line with FATF and OECD requirements. Political stability is strong, with the Bahamas maintaining a long-standing democratic system and a stable currency pegged to the US dollar.
                            </p>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                              The Bahamas remains an important offshore jurisdiction, particularly for private banking, trusts, and investment funds. While competition from other Caribbean and European hubs has grown, it continues to attract clients due to its strategic location close to the United States, long history of financial services, and stable legal framework. In September 2025, the Bahamas is best positioned as a jurisdiction for private wealth management, family offices, and maritime services.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "bermuda" && (
                    <>
                      {/* Header with Flag */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                              BERMUDA
                            </h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="bermuda" FlagComponent={BermudaFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>
                            Company formation price: Yet to be decided
                          </p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Bermuda is a British Overseas Territory located in the North Atlantic Ocean, east of the United States. It consists of around 180 islands, with Hamilton as its capital.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>First settled by the English in 1609 after the wreck of the Sea Venture.</li><li>Became a British colony in 1684 and remains a British Overseas Territory.</li><li>Historically dependent on agriculture and maritime trade.</li><li>Transitioned to tourism and international business in the 20th century.</li><li>Established itself as a leading global insurance and reinsurance hub.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Bermuda emerged as a financial center in the mid-20th century, focusing on insurance, reinsurance, and offshore corporate structures. Its strong regulatory framework and tax neutrality made it attractive to multinationals and institutional investors.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Insurance & Reinsurance</strong> – One of the world's largest markets.</li><li><strong>Investment Funds</strong> – Popular domicile for hedge funds and mutual funds.</li><li><strong>Trusts & Private Client Services</strong> – Strong legal protections for wealth management.</li><li><strong>Company Formations</strong> – Tax-neutral and internationally recognized.</li><li><strong>Shipping & Aviation Registries</strong> – Used for high-value assets.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Bermuda operates under English common law. The Bermuda Monetary Authority (BMA) regulates the financial sector with a strong emphasis on compliance and transparency. As a British territory, Bermuda benefits from political stability and a respected legal system.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Bermuda is regarded as a top-tier offshore jurisdiction, particularly for insurance, reinsurance, and funds. In 2025, it continues to serve institutional investors, family offices, and multinationals seeking credibility, sophistication, and tax neutrality.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "cayman" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>CAYMAN ISLANDS</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="cayman" FlagComponent={CaymanIslandsFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: USD 4,360</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">The Cayman Islands are a British Overseas Territory located in the western Caribbean Sea, south of Cuba and northwest of Jamaica. They are part of the North American continent in geopolitical terms but often grouped with the Caribbean for offshore structuring.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>First sighted by Christopher Columbus in 1503, the islands were later colonized by Britain in the 17th century.</li><li>Declared a British dependency in 1670 under the Treaty of Madrid.</li><li>Historically sustained by seafaring, turtling, and small-scale agriculture.</li><li>In the 1960s, the decline of traditional industries and the rise of banking secrecy laws shifted the economy.</li><li>By the 1980s, Cayman emerged as a premier offshore financial hub, rivaling Switzerland and Bermuda.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">The Cayman Islands became known as an offshore haven in the 1960s when the absence of direct taxation (no income, capital gains, or corporate tax) coincided with modern banking legislation. The Companies Law of 1961 and subsequent regulatory developments positioned Cayman as a jurisdiction of choice for funds, trusts, and captive insurance.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Investment Funds</strong> – Cayman remains the global leader in hedge fund domiciliation, with the majority of the world's hedge funds incorporated here.</li><li><strong>Captive Insurance</strong> – Second-largest captive insurance market globally.</li><li><strong>Trusts & Foundations</strong> – Strong asset protection frameworks (though Cook Islands leads in pure trust protection).</li><li><strong>Structured Finance & Securitization</strong> – Cayman SPVs are widely used for cross-border financing structures.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>Cayman is under British sovereignty, with legal oversight ultimately resting with the UK Privy Council.</li><li>The jurisdiction complies with FATF standards, CRS, and BEPS, and has removed itself from the EU's blacklist through active reforms.</li><li>While banking secrecy has diminished, Cayman retains strong confidentiality provisions balanced with international compliance.</li><li>Political stability is high, underpinned by British rule of law and a mature financial services regulator (CIMA – Cayman Islands Monetary Authority).</li><li>Its regulatory environment remains attractive due to predictable legislation, common law legal system, and flexible structuring tools.</li></ul></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Despite global pressure, Cayman has preserved its role as a funds, trusts, and insurance hub, adapting through transparency measures while maintaining a tax-neutral environment. It continues to be considered a cornerstone of offshore structuring for institutional investors, UHNWIs, and multinational corporations.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "cook" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>COOK ISLANDS</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="cook" FlagComponent={CookIslandsFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: USD 4,110</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">The Cook Islands are a self-governing nation in free association with New Zealand, situated in the South Pacific Ocean. Geopolitically, they are part of Oceania, northeast of New Zealand and south of Hawaii. The capital is Avarua, on the island of Rarotonga.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>Named after Captain James Cook, who visited in 1773.</li><li>Became a British protectorate in 1888, later administered by New Zealand.</li><li>Achieved self-governing status in 1965, while maintaining close ties to New Zealand.</li><li>Economy was historically based on agriculture and tourism.</li><li>Transitioned into an offshore financial services hub in the 1980s with groundbreaking trust legislation.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">The Cook Islands International Trusts Act of 1984 established the jurisdiction as the world leader in asset protection trusts. This legislation created near-impenetrable defenses against foreign judgments and creditor claims, giving rise to the Cook Islands' reputation as the gold standard for asset protection planning.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Cook Islands International Trusts</strong> – Regarded as the strongest asset protection tool globally, offering unparalleled protection against foreign court orders.</li><li><strong>Foundations</strong> – An alternative to trusts for civil law clients.</li><li><strong>Captive Insurance & Companies</strong> – Niche but growing use for insurance and corporate planning.</li><li><strong>High-End Estate Planning</strong> – Used by UHNWIs and family offices seeking generational protection.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>The Cook Islands operates under common law, heavily influenced by English and New Zealand legal systems.</li><li>Courts consistently uphold strong protective provisions for trusts, rejecting recognition of foreign judgments in most cases.</li><li>Political stability is ensured through its free association with New Zealand, with defense and foreign affairs ultimately supported by New Zealand.</li><li>Compliance standards have been modernized in line with FATF, CRS, and OECD requirements, while maintaining trust confidentiality.</li><li>The jurisdiction has proven stable for nearly four decades as a specialized offshore haven.</li></ul></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">The Cook Islands remain the world benchmark for asset protection trusts, with unmatched legislative and judicial support. While its corporate and insurance sectors are smaller compared to Cayman or BVI, its unique strength lies in trust structuring. In 2025, Cook Islands continues to attract UHNWIs, entrepreneurs, and family offices seeking absolute protection of wealth from litigation, creditors, and hostile jurisdictions.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "cyprus" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>CYPRUS</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="cyprus" FlagComponent={CyprusFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: USD 3,360</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Cyprus is an island nation in the eastern Mediterranean Sea, geographically located at the crossroads of Europe, Asia, and Africa. Politically, it is part of the European Union, making it a unique offshore and mid-shore jurisdiction. The capital is Nicosia.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>With a history dating back to ancient civilizations, Cyprus was under Greek, Roman, Byzantine, and Ottoman rule.</li><li>Became a British colony in 1878 and gained independence in 1960.</li><li>Following inter-communal tensions, the island has been divided since 1974 into the Republic of Cyprus (EU member) and the Turkish-controlled north.</li><li>Adopted a modern financial services sector in the late 20th century, becoming a tax planning hub.</li><li>Joined the European Union in 2004 and the Eurozone in 2008, boosting its global financial role.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Cyprus built its reputation as an offshore jurisdiction in the 1980s and 1990s through low corporate tax rates, double tax commitments, and favorable company legislation. Its EU membership further enhanced credibility, giving investors access to a tax-efficient gateway to the European single market.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Holding Companies</strong> – Widely used in international tax planning due to double taxation treaties.</li><li><strong>IP Companies</strong> – Popular for intellectual property structuring with tax benefits.</li><li><strong>Trusts</strong> – The Cyprus International Trust regime offers strong asset protection and estate planning tools.</li><li><strong>Funds</strong> – An emerging hub for alternative investment funds within the EU.</li><li><strong>Cross-Border Investment</strong> – Strategic location for investments into Europe, Russia, and the Middle East.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Cyprus operates under a common law system, influenced by English law. Its financial sector is regulated by the Cyprus Securities and Exchange Commission (CySEC) and the Central Bank of Cyprus. As an EU member, Cyprus complies with FATF, OECD, and EU directives on AML/CFT and tax transparency. Political stability is maintained in the Republic, though the north remains a frozen conflict zone. The jurisdiction offers currency stability via the Euro and investor confidence due to EU legal safeguards.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Cyprus continues to be a premier mid-shore jurisdiction that blends offshore flexibility with EU credibility. It is best suited for holding companies, funds, and cross-border tax planning. While international scrutiny has tightened, Cyprus has adapted by enhancing compliance while retaining competitive tax advantages. In September 2025, it remains a strategic jurisdiction for businesses and family offices seeking EU access with efficient structuring benefits.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "delaware" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>DELAWARE</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="delaware" FlagComponent={DelawareFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: USD 740</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Delaware is a small U.S. state located on the Atlantic coast, bordered by Maryland, New Jersey, and Pennsylvania. It is part of the Mid-Atlantic region of the United States. The capital is Dover, while Wilmington serves as its main financial hub.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>One of the original 13 American colonies, with early settlement dating back to the 1600s.</li><li>Became the first state to ratify the U.S. Constitution in 1787.</li><li>Developed a strong manufacturing and chemical industry base in the 19th and 20th centuries.</li><li>Corporate-friendly laws in the 20th century fueled its rise as a business hub.</li><li>Today, Delaware is synonymous with U.S. company incorporation.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Delaware is not an offshore jurisdiction in the traditional sense but is considered the U.S. equivalent due to its business-friendly corporate laws, flexible company structures, and favorable legal environment. The Court of Chancery, a specialized corporate court, provides fast and predictable rulings for businesses, making Delaware the most popular incorporation state in the U.S.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>LLCs</strong> – Flexible and widely used for holding and operating companies.</li><li><strong>Corporations</strong> – Favored by startups, multinationals, and publicly traded firms.</li><li><strong>Court of Chancery</strong> – A unique judicial body specializing in corporate law.</li><li><strong>Privacy</strong> – No requirement to disclose beneficial ownership publicly.</li><li><strong>Tax Efficiency</strong> – No state income tax for companies not operating in Delaware.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Delaware operates under U.S. federal and state law, offering one of the most advanced corporate legal systems worldwide. Its Division of Corporations oversees registrations, while courts provide strong investor protection. Political and economic stability are anchored in the U.S. legal and regulatory system, giving Delaware unmatched credibility.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Delaware is the most popular U.S. state for incorporations, with over one million business entities registered. In 2025, it remains the jurisdiction of choice for startups, multinationals, private equity, and asset holding structures. While not offshore in geography, Delaware offers offshore-like advantages of privacy, efficiency, and tax neutrality within a fully legitimate U.S. framework.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "costarica" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>COSTA RICA</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="costarica" FlagComponent={CostaRicaFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: Yet to be decided</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Costa Rica is a Central American country bordered by Nicaragua to the north, Panama to the southeast, the Pacific Ocean to the west, and the Caribbean Sea to the east. The capital is San José.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>Colonized by Spain in the 16th century, later part of the Captaincy General of Guatemala.</li><li>Gained independence in 1821 along with other Central American states.</li><li>Abolished its military in 1949, focusing on democracy and stability.</li><li>Built an economy around agriculture, especially coffee and bananas.</li><li>Transitioned into services, technology, and finance in the late 20th century.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Costa Rica developed into a regional hub for offshore business due to its political stability, territorial tax system, and ease of company formation. While not a classical secrecy jurisdiction, its corporate structures and reputation for safety made it attractive for Latin American and foreign investors.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Sociedad Anónima (S.A.)</strong> – Flexible corporate structure similar to IBCs.</li><li><strong>Territorial Taxation</strong> – Only local income is taxed; foreign income exempt.</li><li><strong>Banking</strong> – A growing international banking sector.</li><li><strong>Real Estate Investment</strong> – Popular with foreign investors and retirees.</li><li><strong>Stability</strong> – Political neutrality and strong democratic governance.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Costa Rica follows a civil law system influenced by Spanish traditions. It has modernized its AML/CFT framework to meet FATF and OECD requirements. Political stability, a dollar-linked economy, and a reputation for transparency make it more credible than traditional offshore havens, though less private.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Costa Rica is best viewed as a stable, low-risk jurisdiction for regional and international investors rather than a secrecy-driven tax haven. In 2025, it continues to attract those seeking residency, real estate, and simple tax-efficient company structures under a territorial system.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "georgia" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>GEORGIA</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="georgia" FlagComponent={GeorgiaFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: Yet to be decided</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Georgia is a country located at the crossroads of Eastern Europe and Western Asia, bordered by Russia, Turkey, Armenia, Azerbaijan, and the Black Sea. It lies in the Caucasus region, with Tbilisi as its capital.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>An ancient kingdom with roots in classical and medieval civilizations.</li><li>Fell under Persian, Ottoman, and later Russian influence over centuries.</li><li>Incorporated into the Soviet Union in 1921.</li><li>Regained independence in 1991 after the USSR collapsed.</li><li>Transitioned into a modern economy focused on openness and foreign investment.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Georgia has not traditionally been an offshore jurisdiction but positioned itself as a liberal business environment with low taxes, simple company formation, and investor-friendly laws. Free Industrial Zones (FIZs) offered incentives similar to offshore hubs, attracting foreign entrepreneurs and traders.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Free Industrial Zones</strong> – Tax exemptions for companies operating in designated areas.</li><li><strong>Low Corporate Tax Regime</strong> – Only taxed on distributed profits.</li><li><strong>Banking</strong> – Regional banking hub with increasing international links.</li><li><strong>Real Estate and Investment</strong> – Attractive for regional investors and developers.</li><li><strong>Gateway Location</strong> – Positioned as a bridge between Europe and Asia.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Georgia follows a civil law system. Its financial and business environment is overseen by the National Bank of Georgia and state regulatory authorities. The country ranks highly in ease-of-doing-business indexes and has adopted modern AML/CFT frameworks. Political stability has improved since the 2000s, though regional tensions remain a factor.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Georgia is considered more of a pro-business jurisdiction than a classical offshore center. Its free zones, tax efficiency, and low compliance barriers make it appealing for entrepreneurs, small businesses, and regional investors. In 2025, Georgia remains a niche alternative hub, particularly for those seeking diversification outside traditional offshore centers.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "gibraltar" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>GIBRALTAR</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="gibraltar" FlagComponent={GibraltarFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: USD 3,124</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Gibraltar is a British Overseas Territory located at the southern tip of the Iberian Peninsula, bordering Spain. It controls the strategic Strait of Gibraltar, linking the Atlantic Ocean to the Mediterranean Sea. The capital city is Gibraltar.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>Captured by Anglo-Dutch forces in 1704 during the War of the Spanish Succession.</li><li>Ceded to Britain under the Treaty of Utrecht in 1713.</li><li>Developed into a major naval base and gateway to the Mediterranean.</li><li>In the 20th century, its strategic location ensured continued military significance.</li><li>Transitioned into a financial and services-based economy in the late 20th century.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Gibraltar leveraged its status as a British territory with EU ties (before Brexit) to build a strong offshore financial services sector. Low corporate taxes, flexible company structures, and proximity to Europe made it a convenient jurisdiction for cross-border business, gaming companies, and shipping.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Online Gaming & Betting Licenses</strong> – One of the world's most respected hubs for gaming operators.</li><li><strong>Company Formations</strong> – Tax-efficient vehicles for international trade.</li><li><strong>Insurance</strong> – A center for insurance and reinsurance companies.</li><li><strong>Maritime Services</strong> – Ship registration and management.</li><li><strong>Trusts & Wealth Planning</strong> – Used for estate and asset protection within a common law framework.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Gibraltar operates under English common law, with local statutes adapted to modern financial needs. The Gibraltar Financial Services Commission (GFSC) regulates the sector, ensuring compliance with FATF and OECD standards. Though Brexit altered its EU position, Gibraltar remains closely tied to the UK, providing political stability and continued access to key markets.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Gibraltar continues to be a recognized offshore hub for online gaming, insurance, and corporate structuring. Its alignment with UK law, strategic location, and established financial ecosystem keep it relevant despite increased regulatory scrutiny. In 2025, Gibraltar is best positioned for digital industries, maritime business, and mid-shore wealth planning.</p></div></div>
                      </div>
                    </>
                  )}
                  {selectedJurisdiction === "guernsey" && (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-benzin)' }}>GUERNSEY</h2>
                            <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                              <FlagImage jurisdictionId="guernsey" FlagComponent={GuernseyFlag} />
                            </div>
                          </div>
                          <p className="text-lg sm:text-xl text-green-400 font-semibold" style={{ fontFamily: 'var(--font-benzin)' }}>Company formation price: Yet to be decided</p>
                          <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 1/2</p>
                        </div>
                        <motion.button onClick={() => setSelectedJurisdiction(null)} className="text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
                      </div>
                      <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-benzin)' }}>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Geography & Location</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Guernsey is one of the Channel Islands, located in the English Channel near the coast of France. Like Jersey, it is a self-governing Crown Dependency of the United Kingdom, with internal autonomy but British oversight of defense and international affairs. The capital is St. Peter Port.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Historical Context</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li>Historically part of the Duchy of Normandy until 1204, after which it remained under the English Crown.</li><li>Retained its Norman law traditions while developing independently from England.</li><li>The economy was once based on agriculture, fishing, and trade.</li><li>Offshore financial services began to emerge in the mid-20th century.</li><li>Today, Guernsey is a leading international center for private wealth and investment funds.</li></ul></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">Emergence as an Offshore Centre</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Guernsey developed its reputation as an offshore hub in the 1960s through trusts, fiduciary services, and investment funds. Its reputation for strong regulation and investor protection has made it a popular jurisdiction for fund managers, family offices, and multinational clients.</p></div>
                        <div><h3 className="text-xl sm:text-2xl font-bold mb-3">What It Is Best Known For</h3><ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed"><li><strong>Trusts</strong> – A long-established jurisdiction for private wealth planning.</li><li><strong>Funds</strong> – Particularly strong in private equity, venture capital, and hedge funds.</li><li><strong>Foundations</strong> – Flexible vehicles for estate planning.</li><li><strong>Insurance & Captives</strong> – A leading domicile for reinsurance and captive structures.</li><li><strong>Private Wealth Management</strong> – Used extensively by HNWIs and family offices.</li></ul></div>
                        <div className="pt-4 border-t border-white/20"><p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'var(--font-benzin)' }}>PAGE 2/2</p><div><h3 className="text-xl sm:text-2xl font-bold mb-3">Regulations & Stability</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Guernsey operates under a mixed legal system rooted in Norman customary law and English common law. The Guernsey Financial Services Commission (GFSC) supervises the financial sector, maintaining strong compliance with FATF and OECD standards. Politically stable and self-governing, Guernsey offers credibility while retaining its tax neutrality.</p></div><div className="mt-6"><h3 className="text-xl sm:text-2xl font-bold mb-3">Current Offshore Standing</h3><p className="text-sm sm:text-base text-gray-300 leading-relaxed">Guernsey is regarded as one of the top-tier offshore jurisdictions for private wealth, funds, and insurance structures. It is highly respected for governance and investor protection, making it attractive to institutional and private clients. In 2025, Guernsey remains a premier choice for sophisticated offshore planning.</p></div></div>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
