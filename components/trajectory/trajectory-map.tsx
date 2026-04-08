"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
// Local topojson – same dataset family as corporate services map
// eslint-disable-next-line @typescript-eslint/no-var-requires
const world110m = require("../../data/world-110m.json");

type Region = "APAC" | "EU" | "NorthAmerica" | "ROW";

interface WorldData {
  type: "FeatureCollection";
  features: any[];
}

function getRegionForCountry(rawName: string): Region {
  const name = rawName.toLowerCase();

  const euCountries = new Set(
    [
      "austria",
      "belgium",
      "bulgaria",
      "croatia",
      "cyprus",
      "czech republic",
      "czechia",
      "denmark",
      "estonia",
      "finland",
      "france",
      "germany",
      "greece",
      "hungary",
      "ireland",
      "italy",
      "latvia",
      "lithuania",
      "luxembourg",
      "malta",
      "netherlands",
      "poland",
      "portugal",
      "romania",
      "slovakia",
      "slovenia",
      "spain",
      "sweden",
    ].map((n) => n.toLowerCase()),
  );

  const northAmerica = new Set(
    ["united states", "united states of america", "usa", "canada", "mexico"].map(
      (n) => n.toLowerCase(),
    ),
  );

  const apacCountries = new Set(
    [
      // Oceania
      "australia",
      "new zealand",
      "papua new guinea",
      "fiji",
      "solomon islands",
      "vanuatu",
      "samoa",
      "tonga",
      "kiribati",
      "micronesia",
      "marshall islands",
      "palau",
      "tuvalu",
      "nauru",
      // East Asia
      "china",
      "people's republic of china",
      "mongolia",
      "japan",
      "south korea",
      "republic of korea",
      "north korea",
      "democratic people's republic of korea",
      "taiwan",
      // Southeast Asia
      "indonesia",
      "malaysia",
      "thailand",
      "vietnam",
      "laos",
      "cambodia",
      "myanmar",
      "burma",
      "philippines",
      "brunei",
      "singapore",
      "timor-leste",
      "east timor",
      // South Asia
      "india",
      "pakistan",
      "bangladesh",
      "sri lanka",
      "nepal",
      "bhutan",
      "maldives",
      // Central / West Asia (APAC-aligned for this model)
      "kazakhstan",
      "kyrgyzstan",
      "tajikistan",
      "turkmenistan",
      "uzbekistan",
      "azerbaijan",
      "armenia",
      "georgia",
    ].map((n) => n.toLowerCase()),
  );

  if (euCountries.has(name)) return "EU";
  if (northAmerica.has(name)) return "NorthAmerica";
  if (apacCountries.has(name)) return "APAC";
  return "ROW";
}

// APAC countries for "Play" highlight – whole country in green (match world-atlas names)
const APAC_PLAY_COUNTRIES = new Set(
  [
    "china",
    "japan",
    "south korea",
    "korea, republic of",
    "republic of korea",
    "hong kong",
    "taiwan",
    "mongolia",
    "singapore",
    "malaysia",
    "indonesia",
    "thailand",
    "vietnam",
    "philippines",
    "myanmar",
    "burma",
    "cambodia",
    "laos",
    "lao pdr",
    "brunei",
    "brunei darussalam",
    "india",
    "pakistan",
    "bangladesh",
    "sri lanka",
    "nepal",
    "bhutan",
    "maldives",
    "australia",
    "new zealand",
    "papua new guinea",
    "kazakhstan",
    "uzbekistan",
    "kyrgyzstan",
    "tajikistan",
    "turkmenistan",
  ].map((n) => n.toLowerCase()),
);

// world-110m TopoJSON has no name properties; features use ISO 3166-1 numeric id (3-digit strings) – APAC set for fallback
const APAC_PLAY_IDS = new Set([
  "036", "050", "064", "096", "104", "116", "144", "156", "158", "344", "356", "360", "392", "398",
  "410", "417", "418", "458", "462", "496", "524", "554", "586", "598", "608", "702", "704", "762",
  "764", "795", "860",
]);

// MENA countries for "Play" highlight – same trigger as APAC, light brown fill
const MENA_PLAY_COUNTRIES = new Set(
  [
    "saudi arabia",
    "united arab emirates",
    "uae",
    "qatar",
    "kuwait",
    "bahrain",
    "oman",
    "yemen",
    "egypt",
    "morocco",
    "algeria",
    "tunisia",
    "libya",
    "jordan",
    "israel",
    "lebanon",
    "iraq",
    "iran",
  ].map((n) => n.toLowerCase()),
);

const MENA_PLAY_IDS = new Set([
  "012", "048", "364", "368", "376", "400", "414", "422", "434", "504", "512", "634", "682", "784", "788", "818", "887",
]);

// Europe (EU blue) – same Play trigger as APAC/MENA
const EUROPE_PLAY_COUNTRIES = new Set(
  [
    "austria", "belgium", "bulgaria", "croatia", "cyprus", "czech republic", "czechia", "denmark",
    "estonia", "finland", "france", "germany", "greece", "hungary", "ireland", "italy", "latvia",
    "lithuania", "luxembourg", "malta", "netherlands", "poland", "portugal", "romania", "slovakia",
    "slovenia", "spain", "sweden", "united kingdom", "uk", "switzerland", "norway", "iceland",
    "russia", "ukraine", "belarus", "moldova", "serbia", "bosnia and herzegovina", "montenegro",
    "north macedonia", "macedonia", "albania", "kosovo", "liechtenstein", "monaco", "san marino",
    "andorra", "vatican city", "holy see", "turkey", "georgia", "armenia", "azerbaijan",
  ].map((n) => n.toLowerCase()),
);

const EUROPE_PLAY_IDS = new Set([
  "008", "020", "031", "040", "051", "056", "070", "100", "112", "191", "196", "203", "208", "233", "246", "250",
  "268", "276", "300", "336", "348", "352", "372", "380", "383", "428", "438", "440", "442", "470", "492",
  "498", "499", "528", "578", "616", "620", "642", "643", "674", "688", "703", "705", "724", "752",
  "756", "792", "804", "807", "826",
]);

// North America (American red / Old Glory Red) – same Play trigger
const NORTH_AMERICA_PLAY_COUNTRIES = new Set(
  ["united states of america", "united states", "usa", "canada"].map((n) => n.toLowerCase()),
);

const NORTH_AMERICA_PLAY_IDS = new Set(["124", "840"]); // Canada, USA

function isAPACPlayCountry(rawName: string): boolean {
  const name = (typeof rawName === "string" ? rawName : "").trim().toLowerCase();
  if (!name) return false;
  if (APAC_PLAY_COUNTRIES.has(name)) return true;
  if (name.includes("china") && !name.includes("taiwan") && !name.includes("hong kong")) return true;
  if ((name.includes("korea") || name.includes("republic of korea")) && !name.includes("north") && !name.includes("democratic")) return true;
  if (name.includes("hong kong")) return true;
  return false;
}

function isAPACPlayFeature(nameStr: string, featureId: string | number | undefined): boolean {
  if (nameStr && isAPACPlayCountry(nameStr)) return true;
  if (featureId === undefined || featureId === null) return false;
  const idStr = String(featureId).replace(/^0+/, "") || "0";
  const normalized = idStr.length <= 3 ? idStr.padStart(3, "0") : idStr;
  return APAC_PLAY_IDS.has(normalized);
}

function isMenaPlayCountry(rawName: string): boolean {
  const name = (typeof rawName === "string" ? rawName : "").trim().toLowerCase();
  if (!name) return false;
  return MENA_PLAY_COUNTRIES.has(name) || name.includes("saudi") || name.includes("emirates") || name.includes("iran") || name.includes("iraq");
}

function isMenaPlayFeature(nameStr: string, featureId: string | number | undefined): boolean {
  if (nameStr && isMenaPlayCountry(nameStr)) return true;
  if (featureId === undefined || featureId === null) return false;
  const idStr = String(featureId).replace(/^0+/, "") || "0";
  const normalized = idStr.length <= 3 ? idStr.padStart(3, "0") : idStr;
  return MENA_PLAY_IDS.has(normalized);
}

function isEuropePlayCountry(rawName: string): boolean {
  const name = (typeof rawName === "string" ? rawName : "").trim().toLowerCase();
  if (!name) return false;
  return EUROPE_PLAY_COUNTRIES.has(name) || name.includes("united kingdom") || name.includes("bosnia") || name.includes("macedonia") || name.includes("vatican");
}

function isEuropePlayFeature(nameStr: string, featureId: string | number | undefined): boolean {
  if (nameStr && isEuropePlayCountry(nameStr)) return true;
  if (featureId === undefined || featureId === null) return false;
  const idStr = String(featureId).replace(/^0+/, "") || "0";
  const normalized = idStr.length <= 3 ? idStr.padStart(3, "0") : idStr;
  return EUROPE_PLAY_IDS.has(normalized);
}

function isNorthAmericaPlayCountry(rawName: string): boolean {
  const name = (typeof rawName === "string" ? rawName : "").trim().toLowerCase();
  if (!name) return false;
  return NORTH_AMERICA_PLAY_COUNTRIES.has(name) || name.includes("united states") || name.includes("canada");
}

function isNorthAmericaPlayFeature(nameStr: string, featureId: string | number | undefined): boolean {
  if (nameStr && isNorthAmericaPlayCountry(nameStr)) return true;
  if (featureId === undefined || featureId === null) return false;
  const idStr = String(featureId).replace(/^0+/, "") || "0";
  const normalized = idStr.length <= 3 ? idStr.padStart(3, "0") : idStr;
  return NORTH_AMERICA_PLAY_IDS.has(normalized);
}

interface TrajectoryMapProps {
  highlightAPAC?: boolean;
  /** When true and highlightAPAC, entire map uses light orange (first Play phase) */
  wholeMapOrange?: boolean;
  highlightRegion?: "APAC" | "Europe" | "NorthAmerica" | "MENA" | "RestOfWorld" | "Muted" | undefined;
}

export interface TrajectoryMapHandle {
  setHighlightAPAC: (value: boolean) => void;
}

export const TrajectoryMap = forwardRef<TrajectoryMapHandle, TrajectoryMapProps>(function TrajectoryMap(
  { highlightAPAC: highlightAPACProp, wholeMapOrange = false, highlightRegion },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] = useState<WorldData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
  const [highlightAPACInternal, setHighlightAPACInternal] = useState(false);
  // Prop from parent wins so modal can drive highlight reliably; ref updates internal state
  const highlightAPAC = highlightAPACProp ?? highlightAPACInternal;

  useImperativeHandle(ref, () => ({
    setHighlightAPAC: (value: boolean) => setHighlightAPACInternal(value),
  }), []);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateDimensions = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) setDimensions({ width: w, height: h });
    };
    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(el);
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  useEffect(() => {
    // Convert bundled TopoJSON to GeoJSON once on mount – no network dependency
    try {
      const geojson = feature(
        world110m,
        // @ts-expect-error topojson structure
        (world110m as any).objects.countries,
      ) as WorldData;
      setWorldData(geojson);
    } catch {
      setWorldData({ type: "FeatureCollection", features: [] });
    }
  }, []);

  const isMobile =
    dimensions.width < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== "undefined" ? navigator.userAgent : "",
    );

  // Map shifted down, expanded horizontally (smaller width divisor = wider)
  const widthFactor = isMobile ? 0.88 : 0.76;
  const heightFactor = isMobile ? 0.92 : 0.78;
  const verticalOffset = isMobile ? 44 : 72;

  const projection = geoMercator()
    .scale(
      Math.min(
        dimensions.width / widthFactor,
        dimensions.height / heightFactor,
      ) /
        (2 * Math.PI),
    )
    .translate([dimensions.width / 2, dimensions.height / 2 + verticalOffset])
    .center([0, 15]);

  const path = geoPath().projection(projection);

  return (
    <div ref={containerRef} className="relative h-full w-full min-h-0 bg-[#FDFBEE]">
      <AnimatePresence>
        {worldData ? (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {worldData && (
              <g strokeWidth={isMobile ? 1 : 1.5}>
                {worldData.features
                  .filter((d: any) => {
                    const name =
                      d.properties?.NAME ||
                      d.properties?.name ||
                      d.properties?.NAME_LONG ||
                      "";
                    const nameStr = typeof name === "string" ? name.toLowerCase() : "";
                    if (
                      nameStr.includes("antarctica") ||
                      nameStr.includes("antartica") ||
                      nameStr.includes("south pole") ||
                      nameStr === "antarctica"
                    )
                      return false;
                    // Exclude by geometry: drop any feature with coords south of -60° (Antarctica/southern ocean)
                    const coords = d.geometry?.coordinates;
                    if (!coords) return true;
                    const southOf60 = (c: any): boolean => {
                      if (Array.isArray(c) && c.length >= 2 && typeof c[0] === "number" && typeof c[1] === "number")
                        return c[1] < -60;
                      if (Array.isArray(c)) return c.some(southOf60);
                      return false;
                    };
                    return !coords.some(southOf60);
                  })
                  .map((d: any, i: number) => {
                    const name =
                      d.properties?.NAME ||
                      d.properties?.name ||
                      d.properties?.NAME_LONG ||
                      "";
                    const nameStr = typeof name === "string" ? name : "";
                    const isAPAC = isAPACPlayFeature(nameStr, d.id);
                    const isMENA = isMenaPlayFeature(nameStr, d.id);
                    const isEurope = isEuropePlayFeature(nameStr, d.id);
                    const isNorthAmerica = isNorthAmericaPlayFeature(nameStr, d.id);
                    let fill = "rgba(0,0,0,0.04)";
                    let stroke = "rgba(0,0,0,0.4)";

                    if (highlightRegion === "APAC") {
                      if (isAPAC) {
                        fill = "rgba(22,163,74,0.65)";
                        stroke = "rgba(22,163,74,0.9)";
                      } else {
                        fill = "rgba(0,0,0,0.04)";
                        stroke = "rgba(0,0,0,0.15)";
                      }
                    } else if (highlightRegion === "Europe") {
                      if (isEurope) {
                        fill = "rgba(0,51,153,0.60)";
                        stroke = "rgba(0,51,153,0.85)";
                      } else {
                        fill = "rgba(0,0,0,0.04)";
                        stroke = "rgba(0,0,0,0.15)";
                      }
                    } else if (highlightRegion === "NorthAmerica") {
                      if (isNorthAmerica) {
                        fill = "rgba(179,25,66,0.55)";
                        stroke = "rgba(179,25,66,0.80)";
                      } else {
                        fill = "rgba(0,0,0,0.04)";
                        stroke = "rgba(0,0,0,0.15)";
                      }
                    } else if (highlightRegion === "MENA") {
                      if (isMENA) {
                        fill = "rgba(180,140,100,0.65)";
                        stroke = "rgba(160,120,80,0.9)";
                      } else {
                        fill = "rgba(0,0,0,0.04)";
                        stroke = "rgba(0,0,0,0.15)";
                      }
                    } else if (highlightRegion === "RestOfWorld") {
                      if (isMENA) {
                        fill = "rgba(180,140,100,0.60)";
                        stroke = "rgba(160,120,80,0.85)";
                      } else if (!isAPAC && !isEurope && !isNorthAmerica) {
                        fill = "rgba(20,184,166,0.40)";
                        stroke = "rgba(20,184,166,0.65)";
                      } else {
                        fill = "rgba(0,0,0,0.04)";
                        stroke = "rgba(0,0,0,0.15)";
                      }
                    } else if (highlightRegion === "Muted") {
                      fill = "rgba(0,0,0,0.02)";
                      stroke = "rgba(0,0,0,0.08)";
                    } else if (highlightAPAC && wholeMapOrange) {
                      fill = "rgba(0,0,0,0.04)";
                      stroke = "rgba(0,0,0,0.4)";
                    } else if (highlightAPAC && isAPAC) {
                      fill = "rgba(22,163,74,0.65)";
                      stroke = "rgba(22,163,74,0.9)";
                    } else if (highlightAPAC && isMENA) {
                      fill = "rgba(180,140,100,0.65)";
                      stroke = "rgba(160,120,80,0.9)";
                    } else if (highlightAPAC && isEurope) {
                      fill = "rgba(0,51,153,0.65)";
                      stroke = "rgba(0,51,153,0.95)";
                    } else if (highlightAPAC && isNorthAmerica) {
                      fill = "rgba(179,25,66,0.65)";
                      stroke = "rgba(179,25,66,0.95)";
                    }

                    return (
                      <path
                        key={`country-${i}`}
                        d={path(d) as string}
                        fill={fill}
                        stroke={stroke}
                        style={{ filter: "none", transition: "fill 0.3s ease, stroke 0.3s ease" }}
                      />
                    );
                  })}
              </g>
            )}
          </svg>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FDFBEE]">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-slate-800" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

