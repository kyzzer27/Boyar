/** @format */

"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import {
	BahamasFlag,
	BermudaFlag,
	CaymanIslandsFlag,
	CookIslandsFlag,
	CostaRicaFlag,
	CyprusFlag,
	DelawareFlag,
	GeorgiaFlag,
	GibraltarFlag,
	GuernseyFlag,
} from "@/components/flags";
import { FlagImage } from "@/components/flags/flag-image";
import { geoMercator, geoPath } from "d3-geo";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
	{ id: "isleofman", name: "Isle of Man", lat: 54.2361, lng: -4.5481 },
	{ id: "bahrain", name: "Bahrain", lat: 26.0667, lng: 50.5577 },
	{ id: "belize", name: "Belize", lat: 17.1899, lng: -88.4976 },
	{ id: "bermuda", name: "Bermuda", lat: 32.3078, lng: -64.7505 },
	{
		id: "bvi",
		name: "BVI – British Virgin Islands",
		lat: 18.4207,
		lng: -64.6399,
	},
	{ id: "cayman", name: "Cayman Islands", lat: 19.3133, lng: -81.2546 },
	{ id: "cook", name: "Cook Islands", lat: -21.2367, lng: -159.7777 },
	{ id: "costarica", name: "Costa Rica", lat: 9.7489, lng: -83.7534 },
	{ id: "cyprus", name: "Cyprus", lat: 35.1264, lng: 33.4299 },
	{ id: "delaware", name: "Delaware (USA)", lat: 39.1619, lng: -75.5267 },
	{ id: "georgia", name: "Georgia", lat: 42.3154, lng: 43.3569 },
	{ id: "gibraltar", name: "Gibraltar", lat: 36.1408, lng: -5.3536 },
	{ id: "guernsey", name: "Guernsey", lat: 49.4657, lng: -2.5853 },
	{ id: "dubai", name: "Dubai – UAE Mainland", lat: 25.2048, lng: 55.2708 },
	{
		id: "difc",
		name: "DIFC – Dubai International Financial Centre",
		lat: 25.2144,
		lng: 55.2794,
	},
	{
		id: "adgm",
		name: "ADGM – Abu Dhabi Global Market",
		lat: 24.4539,
		lng: 54.3773,
	},
	{ id: "hongkong", name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
	{ id: "india", name: "India", lat: 20.5937, lng: 78.9629 },
	{ id: "ireland", name: "Ireland", lat: 53.4129, lng: -8.2439 },
	{ id: "kazakhstan", name: "Kazakhstan (AIFC)", lat: 43.222, lng: 76.8512 },
	{ id: "labuan", name: "Labuan (Malaysia)", lat: 5.2767, lng: 115.2417 },
	{ id: "luxembourg", name: "Luxembourg", lat: 49.6116, lng: 6.1319 },
	{ id: "malta", name: "Malta", lat: 35.9375, lng: 14.3754 },
	{ id: "marshall", name: "Marshall Islands", lat: 7.1315, lng: 171.1845 },
	{ id: "mauritius", name: "Mauritius", lat: -20.3484, lng: 57.5522 },
	{ id: "montenegro", name: "Montenegro", lat: 42.4304, lng: 19.2594 },
	{ id: "nevis", name: "Nevis", lat: 17.1554, lng: -62.5796 },
	{ id: "netherlands", name: "Netherlands", lat: 52.1326, lng: 5.2913 },
	{ id: "panama", name: "Panama", lat: 8.9824, lng: -79.5199 },
	{ id: "rak", name: "Ras Al Khaimah – RAK ICC", lat: 25.7889, lng: 55.959 },
	{ id: "saintkitts", name: "Saint Kitts", lat: 17.3578, lng: -62.783 },
	{ id: "saintvincent", name: "Saint Vincent", lat: 12.9843, lng: -61.2872 },
	{ id: "samoa", name: "Samoa", lat: -13.759, lng: -172.1046 },
	{ id: "seychelles", name: "Seychelles", lat: -4.6796, lng: 55.492 },
	{ id: "singapore", name: "Singapore", lat: 1.3521, lng: 103.8198 },
	{ id: "switzerland", name: "Switzerland", lat: 46.8182, lng: 8.2275 },
	{ id: "uk", name: "UK – United Kingdom", lat: 51.5074, lng: -0.1278 },
	{ id: "wyoming", name: "Wyoming (USA)", lat: 41.1403, lng: -104.8197 },
];

interface WorldMapProps {
	onSearchRef?: (ref: { search: (query: string) => void }) => void;
	isFullscreen?: boolean;
	onFullscreenToggle?: () => void;
	onJurisdictionSelect?: (jurisdictionId: string) => void;
	jurisdictionsWithData?: string[];
	forceShowJurisdictions?: boolean;
	onJurisdictionsListClosed?: () => void;
}

function WorldMap({
	onSearchRef,
	isFullscreen = false,
	onFullscreenToggle,
	onJurisdictionSelect,
	jurisdictionsWithData = [],
	forceShowJurisdictions = false,
	onJurisdictionsListClosed,
}: WorldMapProps) {
	const [worldData, setWorldData] = useState<any>(null);
	const [dimensions, setDimensions] = useState({ width: 1000, height: 500 });
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResult, setSearchResult] = useState<string | null>(null);
	const [highlightedJurisdiction, setHighlightedJurisdiction] = useState<
		string | null
	>(null);
	const [showJurisdictionsList, setShowJurisdictionsList] = useState(false);

	useEffect(() => {
		if (forceShowJurisdictions) {
			setShowJurisdictionsList(true);
			onJurisdictionsListClosed?.();
		}
	}, [forceShowJurisdictions, onJurisdictionsListClosed]);
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
						return (
							name.includes(q) || q.includes(name.split(" ")[0].toLowerCase())
						);
					});
					if (found) {
						setSearchResult(`Found: ${found.name}`);
						setHighlightedJurisdiction(found.id);
					} else {
						setSearchResult("No results found");
						setHighlightedJurisdiction(null);
					}
				},
			});
		}
	}, [onSearchRef]);

	useEffect(() => {
		const updateDimensions = () => {
			if (isFullscreen) {
				// Fullscreen: use entire viewport (no header)
				setDimensions({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			} else {
				// Normal mode: account for header
				const isMobile =
					window.innerWidth < 768 ||
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
						navigator.userAgent,
					);
				const headerHeight = isMobile ? 56 : 64; // Smaller header on mobile
				setDimensions({
					width: window.innerWidth,
					height: window.innerHeight - headerHeight,
				});
			}
		};
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		window.addEventListener("orientationchange", updateDimensions);
		// Also listen for fullscreen changes
		const handleFullscreenChange = () => {
			// Multiple updates to ensure dimensions are correct
			setTimeout(updateDimensions, 50);
			setTimeout(updateDimensions, 200);
			setTimeout(updateDimensions, 500);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
		document.addEventListener("mozfullscreenchange", handleFullscreenChange);
		document.addEventListener("MSFullscreenChange", handleFullscreenChange);
		return () => {
			window.removeEventListener("resize", updateDimensions);
			window.removeEventListener("orientationchange", updateDimensions);
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange,
			);
			document.removeEventListener(
				"mozfullscreenchange",
				handleFullscreenChange,
			);
			document.removeEventListener(
				"MSFullscreenChange",
				handleFullscreenChange,
			);
		};
	}, [isFullscreen]);

	useEffect(() => {
		// Load Natural Earth 110m data from CDN with timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

		fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/world/110m.json", {
			signal: controller.signal,
		})
			.then((response) => {
				clearTimeout(timeoutId);
				if (!response.ok) throw new Error("Network response was not ok");
				return response.json();
			})
			.then((topojsonData) => {
				// Convert TopoJSON to GeoJSON
				const geojson = feature(topojsonData, topojsonData.objects.countries);
				setWorldData(geojson);
			})
			.catch((error) => {
				clearTimeout(timeoutId);
				console.error("Error loading world map data:", error);
				// Fallback: try alternative CDN with timeout
				const fallbackController = new AbortController();
				const fallbackTimeoutId = setTimeout(
					() => fallbackController.abort(),
					5000,
				);

				fetch("https://unpkg.com/world-atlas@1/world/110m.json", {
					signal: fallbackController.signal,
				})
					.then((response) => {
						clearTimeout(fallbackTimeoutId);
						if (!response.ok) throw new Error("Fallback response not ok");
						return response.json();
					})
					.then((topojsonData) => {
						const geojson = feature(
							topojsonData,
							topojsonData.objects.countries,
						);
						setWorldData(geojson);
					})
					.catch((err) => {
						clearTimeout(fallbackTimeoutId);
						console.error("Fallback also failed:", err);
						// Set a minimal fallback to show the page
						setWorldData({ type: "FeatureCollection", features: [] });
					});
			});

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	// Web Mercator projection (same as Google Maps) - responsive scale for mobile
	const isMobile =
		dimensions.width < 768 ||
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	// Better scaling for mobile - make map fill more of the screen
	const scaleFactor = isMobile ? 1.8 : 1.6;
	const heightFactor = isMobile ? 1.0 : 0.8; // Use more height on mobile
	const verticalOffset = isMobile ? 20 : 80; // Less offset on mobile to fill screen better

	const projection = geoMercator()
		.scale(
			Math.min(
				dimensions.width / scaleFactor,
				dimensions.height / heightFactor,
			) /
				(2 * Math.PI),
		)
		.translate([dimensions.width / 2, dimensions.height / 2 + verticalOffset])
		.center([0, 20]); // Center slightly north

	const path = geoPath().projection(projection);

	const filteredFeatures = useMemo(() => {
		if (!worldData?.features) return [];
		return worldData.features.filter((d: any) => {
			const name = d.properties?.NAME || d.properties?.name || d.properties?.NAME_LONG || "";
			if (name.toLowerCase().includes("antarctica") || name.toLowerCase().includes("antartica")) return false;
			if (d.geometry?.coordinates) {
				const checkCoords = (coordArray: any[]): boolean => {
					for (const coord of coordArray) {
						if (Array.isArray(coord)) {
							if (coord.length >= 2 && typeof coord[0] === "number" && typeof coord[1] === "number") {
								if (coord[1] < -60) return false;
							} else {
								if (!checkCoords(coord)) return false;
							}
						}
					}
					return true;
				};
				if (!checkCoords(d.geometry.coordinates)) return false;
			}
			return true;
		});
	}, [worldData]);

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
			return (
				name.includes(query) || query.includes(name.split(" ")[0].toLowerCase())
			);
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
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div
			className={`relative w-full h-full bg-transparent ${
				isFullscreen ? "fixed inset-0 z-[100]" : ""
			}`}
			style={
				isFullscreen
					? {
							width: "100vw",
							height: "100dvh",
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}
					: {}
			}
		>
			{/* Button with arrow - Top Left - Responsive */}
			<motion.button
				onClick={() => setShowJurisdictionsList(!showJurisdictionsList)}
				className='absolute top-2 left-2 sm:top-4 sm:left-4 z-30 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white hover:bg-white/10 transition-all flex items-center gap-1 sm:gap-2'
				style={{ fontFamily: "var(--font-benzin)" }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<span className='text-xs sm:text-sm font-medium hidden sm:inline'>
					Jurisdictions covered by us
				</span>
				<span className='text-xs sm:text-sm font-medium sm:hidden'>
					Jurisdictions
				</span>
				<span
					className='text-sm sm:text-lg inline-block'
					style={{ animation: "cta-nudge 1.5s ease-in-out infinite" }}
				>
					→
				</span>
			</motion.button>

			{/* Search Bar - Top Right - Responsive */}
			<div className='absolute top-2 right-2 sm:top-4 sm:right-4 z-30 flex flex-col items-end gap-1.5 sm:gap-2 max-w-[calc(100%-120px)] sm:max-w-none'>
				<div className='flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto'>
					<input
						type='text'
						value={searchQuery}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						placeholder='Search...'
						className='px-2 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all text-xs sm:text-sm w-full sm:w-auto min-w-[120px] sm:min-w-[200px]'
						style={{ fontFamily: "var(--font-benzin)" }}
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
						style={{ fontFamily: "var(--font-benzin)" }}
					>
						{searchResult}
					</motion.div>
				)}
			</div>

			{/* Fullscreen/Exit Fullscreen Button - Bottom Right - Small Size */}
			{onFullscreenToggle && (
				<motion.button
					onClick={onFullscreenToggle}
					className='absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-30 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm text-white hover:bg-white/10 transition-all flex items-center gap-1 sm:gap-2'
					style={{ fontFamily: "var(--font-benzin)" }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					{isFullscreen ? (
						<>
							<span className='text-xs sm:text-sm font-medium'>
								Exit Fullscreen
							</span>
							<svg
								className='w-3 h-3 sm:w-4 sm:h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</>
					) : (
						<>
							<span className='text-xs sm:text-sm font-medium'>Fullscreen</span>
							<svg
								className='w-3 h-3 sm:w-4 sm:h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
								/>
							</svg>
						</>
					)}
				</motion.button>
			)}

			{/* World Map SVG */}
			{worldData ? (
				<svg
					ref={svgRef}
					className='absolute inset-0 w-full h-full'
					viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
					preserveAspectRatio='xMidYMid meet'
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					{filteredFeatures.length > 0 && (
						<g
							stroke='rgba(255,255,255,0.7)'
							strokeWidth={isMobile ? "1" : "1.5"}
							fill='none'
						>
							{filteredFeatures.map((d: any, i: number) => (
								<path
									key={`country-${i}`}
									d={path(d) as string}
								/>
							))}
						</g>
					)}
				</svg>
			) : (
				<div className='absolute inset-0 flex items-center justify-center bg-black'>
					<div className='text-center'>
						<div
							className='text-white text-lg mb-4'
							style={{ fontFamily: "var(--font-benzin)" }}
						>
							Loading Map...
						</div>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto'></div>
					</div>
				</div>
			)}

			{/* Jurisdiction Markers — pure CSS animations for performance */}
			{jurisdictions.map((jurisdiction) => {
				const { x, y } = latLngToPixel(jurisdiction.lat, jurisdiction.lng);
				const leftPercent = (x / dimensions.width) * 100;
				const topPercent = (y / dimensions.height) * 100;
				const isHighlighted = highlightedJurisdiction === jurisdiction.id;

				return (
					<div
						key={jurisdiction.id}
						className='absolute group z-20'
						style={{
							left: `${leftPercent}%`,
							top: `${topPercent}%`,
						}}
					>
						<div
							className={`${
								isMobile ? "w-4 h-4" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
							} rounded-full ${isHighlighted ? "bg-green-500" : "bg-red-500"}`}
							style={{
								animation: "dot-blink 2.5s ease-in-out infinite",
								willChange: "transform, opacity",
								backfaceVisibility: "hidden",
								touchAction: "manipulation",
								transform: "translate(-50%, -50%) translateZ(0)",
							}}
						/>

						<div
							className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/90 backdrop-blur-sm text-white text-[10px] sm:text-xs whitespace-nowrap transition-opacity pointer-events-none z-30 border border-white/20 max-w-[150px] sm:max-w-none opacity-0 group-hover:opacity-100'
						>
							{jurisdiction.name}
							<div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90'></div>
						</div>
					</div>
				);
			})}

			{/* Jurisdictions List Popup */}
			<AnimatePresence>
				{showJurisdictionsList && (
					<>
						{/* Backdrop */}
						<motion.div
							className='fixed inset-0 bg-black/85 z-40'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setShowJurisdictionsList(false)}
						/>

						{/* Popup Modal */}
						<motion.div
							className='fixed inset-0 flex items-center justify-center z-50 p-4'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							onClick={(e) => e.stopPropagation()}
						>
							<motion.div
								className='bg-black border-2 border-white/30 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto'
									style={{ willChange: "transform", transform: "translateZ(0)", contain: "content", WebkitOverflowScrolling: "touch" } as any}
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.1 }}
							>
								<div className='flex items-center justify-between mb-6'>
									<h3
										className='text-2xl font-bold text-white'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										Jurisdictions Covered
									</h3>
									<motion.button
										onClick={() => setShowJurisdictionsList(false)}
										className='text-white/60 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition'
										whileHover={{ rotate: 90, scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										×
									</motion.button>
								</div>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
									{jurisdictions.map((jurisdiction, index) => {
										const hasData = jurisdictionsWithData.includes(
											jurisdiction.id,
										);
										return (
											<div
												key={jurisdiction.id}
												className={`px-4 py-3 rounded-lg border transition-colors duration-150 ${
													hasData
														? "border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer"
														: "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
												}`}
												onClick={() => {
													if (hasData) {
														onJurisdictionSelect?.(jurisdiction.id);
														setShowJurisdictionsList(false);
													}
												}}
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div className='flex items-center justify-between'>
													<span className='text-white text-sm'>
														{jurisdiction.name}
													</span>
													{!hasData && (
														<span className='text-xs text-gray-500 ml-2'>
															(Coming soon)
														</span>
													)}
												</div>
											</div>
										);
									})}
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
	const [selectedJurisdiction, setSelectedJurisdiction] = useState<
		string | null
	>(null);
	const [mapSearchQuery, setMapSearchQuery] = useState<string>("");
	const [isMapFullscreen, setIsMapFullscreen] = useState(false);
	const mapSearchRef = useRef<{ search: (query: string) => void } | null>(null);
	const [reopenJurisdictions, setReopenJurisdictions] = useState(false);

	const closeJurisdictionDetail = useCallback(() => {
		setSelectedJurisdiction(null);
		setReopenJurisdictions(true);
	}, []);

	const [showScrollHint, setShowScrollHint] = useState(true);

	// Jurisdictions with detailed profile data
	const jurisdictionsWithData = [
		"bahamas", "bermuda", "cayman", "cook", "cyprus", "delaware",
		"costarica", "georgia", "gibraltar", "guernsey",
		"isleofman", "bahrain", "belize", "bvi", "dubai", "difc", "adgm",
		"hongkong", "india", "ireland", "kazakhstan", "labuan", "luxembourg",
		"malta", "marshall", "mauritius", "montenegro", "nevis", "netherlands",
		"panama", "rak", "saintkitts", "saintvincent", "samoa", "seychelles",
		"singapore", "switzerland", "uk", "wyoming",
	];

	// Hide scroll hint after 4 seconds
	useEffect(() => {
		const timer = setTimeout(() => setShowScrollHint(false), 4000);
		return () => clearTimeout(timer);
	}, []);

	// Handle browser fullscreen API
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsMapFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
		document.addEventListener("mozfullscreenchange", handleFullscreenChange);
		document.addEventListener("MSFullscreenChange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange,
			);
			document.removeEventListener(
				"mozfullscreenchange",
				handleFullscreenChange,
			);
			document.removeEventListener(
				"MSFullscreenChange",
				handleFullscreenChange,
			);
		};
	}, []);

	const enterFullscreen = async () => {
		const element = document.documentElement;
		try {
			if (element.requestFullscreen) {
				await element.requestFullscreen();
			} else if ((element as any).webkitRequestFullscreen) {
				await (element as any).webkitRequestFullscreen();
			} else if ((element as any).mozRequestFullScreen) {
				await (element as any).mozRequestFullScreen();
			} else if ((element as any).msRequestFullscreen) {
				await (element as any).msRequestFullscreen();
			}
			// Force dimension update after entering fullscreen
			setTimeout(() => {
				setIsMapFullscreen(true);
			}, 100);
		} catch (error) {
			console.error("Error entering fullscreen:", error);
		}
	};

	const exitFullscreen = async () => {
		try {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
			} else if ((document as any).webkitExitFullscreen) {
				await (document as any).webkitExitFullscreen();
			} else if ((document as any).mozCancelFullScreen) {
				await (document as any).mozCancelFullScreen();
			} else if ((document as any).msExitFullscreen) {
				await (document as any).msExitFullscreen();
			}
		} catch (error) {
			console.error("Error exiting fullscreen:", error);
		}
	};

	return (
		<ProtectedRoute>
			<div className='relative min-h-screen bg-black text-white'>

				{/* Header - Mobile Responsive - Hidden in fullscreen */}
				{!isMapFullscreen && (
					<header className='fixed top-0 left-0 right-0 border-b border-white/10 bg-black/80 backdrop-blur-md z-30'>
						<div className='mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4 sm:py-4 lg:px-8'>
							<Link
								href='/tools/services-direct'
								className='text-xs sm:text-sm md:text-base text-white hover:text-gray-300 transition flex items-center gap-1 sm:gap-2'
							>
								← <span className='hidden sm:inline'>Back</span>
							</Link>
							<h1
								className='text-sm sm:text-lg md:text-xl lg:text-2xl font-medium text-white'
								style={{ fontFamily: "var(--font-benzin)" }}
							>
								Corporate Services
							</h1>
							<div className='w-8 sm:w-16' /> {/* Spacer */}
						</div>
					</header>
				)}

				{/* Main Content */}
				<main className='relative z-10'>
					{/* Map Section - First section only, full viewport height, transparent - Mobile Responsive */}
					<section
						className={`relative bg-transparent ${
							isMapFullscreen
								? "fixed inset-0 z-[100] pt-0"
								: "h-screen pt-14 sm:pt-16"
						}`}
						style={
							isMapFullscreen
								? {
										width: "100vw",
										height: "100dvh",
										position: "fixed",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
									}
								: {
										height: "100dvh",
										minHeight: "-webkit-fill-available",
									}
						}
					>
						<div
							className='w-full h-full relative z-10'
							style={isMapFullscreen ? { width: "100%", height: "100%" } : {}}
						>
							<WorldMap
								onSearchRef={(ref) => {
									mapSearchRef.current = ref;
								}}
								isFullscreen={isMapFullscreen}
								onFullscreenToggle={
									isMapFullscreen ? exitFullscreen : enterFullscreen
								}
								onJurisdictionSelect={(jurisdictionId) =>
									setSelectedJurisdiction(jurisdictionId)
								}
								jurisdictionsWithData={jurisdictionsWithData}
								forceShowJurisdictions={reopenJurisdictions}
								onJurisdictionsListClosed={() => setReopenJurisdictions(false)}
							/>
						</div>

						{/* Scroll Down Hint - Right Center */}
						<AnimatePresence>
							{showScrollHint && !isMapFullscreen && (
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex items-center gap-3 pointer-events-none"
								>
									<div
										className="text-white text-right leading-relaxed"
										style={{
											fontFamily: "'Avenir', 'Avenir Next', 'Nunito Sans', sans-serif",
											fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
											fontWeight: 500,
											textShadow: "2px 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)",
											letterSpacing: "0.02em",
										}}
									>
										Scroll down<br />
										To<br />
										View Service pages
									</div>
								<div
									style={{ animation: "float-y 1.2s ease-in-out infinite" }}
								>
									<svg
										width="20"
										height="28"
										viewBox="0 0 20 28"
										fill="none"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}
									>
										<path d="M10 2 L10 22" />
										<path d="M3 16 L10 24 L17 16" />
										</svg>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</section>
				</main>

				{/* Services Section */}
				{!isMapFullscreen && (
					<section className='relative z-20 bg-black border-t border-white/5 py-20 sm:py-28 lg:py-32 overflow-hidden'>
						{/* Subtle background elements */}
						<div className='absolute inset-0 opacity-40'>
							<div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl'></div>
							<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl'></div>
						</div>

						<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
								{[
									{
										id: 1,
										label: "Company Formation",
										desc: "Professional entity setup",
										number: "01",
									},
									{
										id: 2,
										label: "Internal Audit",
										desc: "Comprehensive audits",
										number: "02",
									},
									{
										id: 3,
										label: "Accounting",
										desc: "Financial management",
										number: "03",
									},
									{
										id: 4,
										label: "Economic Substance",
										desc: "Compliance assurance",
										number: "04",
									},
									{
										id: 5,
										label: "Office Registration",
										desc: "Official registration",
										number: "05",
									},
									{
										id: 6,
										label: "Redomiciliation Services",
										desc: "Jurisdiction migration",
										number: "06",
									},
									{
										id: 7,
										label: "Shelf Companies",
										desc: "Ready-made entities",
										number: "07",
									},
								].map((service, index) => (
									<motion.button
										key={service.id}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: index * 0.08,
											ease: "easeOut",
										}}
										whileHover={{
											y: -8,
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.97 }}
										onClick={() => {
											if (service.id === 1) {
												router.push("/products/investor/company-formation");
											} else if (service.id === 2) {
												router.push("/products/investor/internal-audit");
											} else if (service.id === 3) {
												router.push("/products/investor/accounting");
											} else if (service.id === 4) {
												router.push("/products/investor/economic-substance");
											} else if (service.id === 5) {
												router.push("/products/investor/office-registration");
											} else if (service.id === 6) {
												router.push("/products/investor/redomiciliation");
											} else if (service.id === 7) {
												router.push("/products/investor/shelf-companies");
											}
										}}
										className='group relative h-full'
										style={{ fontFamily: "var(--font-benzin)" }}
									>
										<div className='relative h-full rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-7 sm:p-8 text-left overflow-hidden transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8'>
											{/* Top accent line */}
											<div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

											{/* Number badge */}
											<div className='mb-4 flex items-center justify-between'>
												<div className='text-xs font-semibold text-blue-400/80 tracking-widest uppercase'>
													Service
												</div>
												<div className='text-2xl sm:text-3xl font-bold text-white/15 group-hover:text-white/25 transition-colors duration-300'>
													{service.number}
												</div>
											</div>

											{/* Content */}
											<div className='space-y-3'>
												<h3 className='text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-blue-200 transition-colors duration-300'>
													{service.label}
												</h3>
												<div className='w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300'></div>
												<p className='text-xs sm:text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300'>
													{service.desc}
												</p>
											</div>

											{/* Bottom right accent */}
											<div className='absolute bottom-4 right-4 w-8 h-8 border border-white/10 rounded-full group-hover:border-blue-500/50 transition-colors duration-300 flex items-center justify-center'>
												<div className='w-2 h-2 bg-blue-500/0 group-hover:bg-blue-500/60 rounded-full transition-all duration-300'></div>
											</div>

											{/* Hover glow effect */}
											<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
												<div className='absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2'></div>
											</div>
										</div>
									</motion.button>
								))}
							</div>
						</div>
					</section>
				)}

				{/* Jurisdiction Detail Modal */}
				<AnimatePresence>
					{selectedJurisdiction && (
						<>
							{/* Backdrop */}
							<motion.div
								className='fixed inset-0 bg-black/80 backdrop-blur-md z-50'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => closeJurisdictionDetail()}
							/>

							{/* Modal Content */}
							<motion.div
								className='fixed inset-0 flex items-center justify-center z-50 p-4'
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
								onClick={(e) => e.stopPropagation()}
							>
								<motion.div
									className='bg-black/95 border-2 border-white/30 rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto'
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
								>
									{selectedJurisdiction === "bahamas" && (
										<>
											{/* Header with Flag */}
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															BAHAMAS
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='bahamas'
																FlagComponent={BahamasFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 6,064.25
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>

											{/* Content */}
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Bahamas is an independent nation consisting of
														over 700 islands, cays, and islets in the Atlantic
														Ocean. It lies just southeast of Florida (USA) and
														north of Cuba, placing it firmly in the Caribbean
														region of the North American continent. The capital
														is Nassau, on New Providence Island.
													</p>
												</div>

												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															Originally inhabited by the Lucayan people before
															colonization by Spain in the 15th century.
														</li>
														<li>
															Claimed by the British in the 17th century and
															became a Crown Colony in 1718.
														</li>
														<li>
															The Bahamas became independent in 1973 while
															remaining part of the Commonwealth.
														</li>
														<li>
															Tourism and financial services have been the
															pillars of its economy since independence.
														</li>
														<li>
															Offshore financial legislation in the 1960s–70s
															established it as a pioneer in the global offshore
															industry.
														</li>
													</ul>
												</div>

												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Bahamas was one of the first jurisdictions to
														recognize the potential of offshore finance. Banking
														secrecy laws in the mid-20th century attracted
														European and North American wealth. The country
														became known for private banking, trusts, and
														insurance well before many other Caribbean
														jurisdictions.
													</p>
												</div>

												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Private Banking</strong> – Historically a
															hub for North and South American HNWIs.
														</li>
														<li>
															<strong>Trusts</strong> – Bahamian trusts,
															particularly purpose trusts and foundations, are
															widely respected.
														</li>
														<li>
															<strong>Funds and Investment Structures</strong> –
															Used for investment funds and wealth management
															vehicles.
														</li>
														<li>
															<strong>Insurance and Captives</strong> –
															Attractive regulatory framework for insurers.
														</li>
														<li>
															<strong>Maritime Registry</strong> – One of the
															largest ship registries in the world.
														</li>
													</ul>
												</div>

												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>

													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															The Bahamas operates under English common law with
															appeals ultimately going to the Privy Council in
															London. The Central Bank of The Bahamas and the
															Securities Commission oversee financial services.
															The jurisdiction has modernized its AML/CFT and
															tax information exchange frameworks in line with
															FATF and OECD requirements. Political stability is
															strong, with the Bahamas maintaining a
															long-standing democratic system and a stable
															currency pegged to the US dollar.
														</p>
													</div>

													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															The Bahamas remains an important offshore
															jurisdiction, particularly for private banking,
															trusts, and investment funds. While competition
															from other Caribbean and European hubs has grown,
															it continues to attract clients due to its
															strategic location close to the United States,
															long history of financial services, and stable
															legal framework. In September 2025, the Bahamas is
															best positioned as a jurisdiction for private
															wealth management, family offices, and maritime
															services.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "bermuda" && (
										<>
											{/* Header with Flag */}
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															BERMUDA
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='bermuda'
																FlagComponent={BermudaFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: Yet to be decided
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Bermuda is a British Overseas Territory located in
														the North Atlantic Ocean, east of the United States.
														It consists of around 180 islands, with Hamilton as
														its capital.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															First settled by the English in 1609 after the
															wreck of the Sea Venture.
														</li>
														<li>
															Became a British colony in 1684 and remains a
															British Overseas Territory.
														</li>
														<li>
															Historically dependent on agriculture and maritime
															trade.
														</li>
														<li>
															Transitioned to tourism and international business
															in the 20th century.
														</li>
														<li>
															Established itself as a leading global insurance
															and reinsurance hub.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Bermuda emerged as a financial center in the
														mid-20th century, focusing on insurance,
														reinsurance, and offshore corporate structures. Its
														strong regulatory framework and tax neutrality made
														it attractive to multinationals and institutional
														investors.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Insurance & Reinsurance</strong> – One of
															the world's largest markets.
														</li>
														<li>
															<strong>Investment Funds</strong> – Popular
															domicile for hedge funds and mutual funds.
														</li>
														<li>
															<strong>Trusts & Private Client Services</strong>{" "}
															– Strong legal protections for wealth management.
														</li>
														<li>
															<strong>Company Formations</strong> – Tax-neutral
															and internationally recognized.
														</li>
														<li>
															<strong>Shipping & Aviation Registries</strong> –
															Used for high-value assets.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Bermuda operates under English common law. The
															Bermuda Monetary Authority (BMA) regulates the
															financial sector with a strong emphasis on
															compliance and transparency. As a British
															territory, Bermuda benefits from political
															stability and a respected legal system.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Bermuda is regarded as a top-tier offshore
															jurisdiction, particularly for insurance,
															reinsurance, and funds. In 2025, it continues to
															serve institutional investors, family offices, and
															multinationals seeking credibility,
															sophistication, and tax neutrality.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "cayman" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															CAYMAN ISLANDS
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='cayman'
																FlagComponent={CaymanIslandsFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 4,360
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Cayman Islands are a British Overseas Territory
														located in the western Caribbean Sea, south of Cuba
														and northwest of Jamaica. They are part of the North
														American continent in geopolitical terms but often
														grouped with the Caribbean for offshore structuring.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															First sighted by Christopher Columbus in 1503, the
															islands were later colonized by Britain in the
															17th century.
														</li>
														<li>
															Declared a British dependency in 1670 under the
															Treaty of Madrid.
														</li>
														<li>
															Historically sustained by seafaring, turtling, and
															small-scale agriculture.
														</li>
														<li>
															In the 1960s, the decline of traditional
															industries and the rise of banking secrecy laws
															shifted the economy.
														</li>
														<li>
															By the 1980s, Cayman emerged as a premier offshore
															financial hub, rivaling Switzerland and Bermuda.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Cayman Islands became known as an offshore haven
														in the 1960s when the absence of direct taxation (no
														income, capital gains, or corporate tax) coincided
														with modern banking legislation. The Companies Law
														of 1961 and subsequent regulatory developments
														positioned Cayman as a jurisdiction of choice for
														funds, trusts, and captive insurance.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Investment Funds</strong> – Cayman remains
															the global leader in hedge fund domiciliation,
															with the majority of the world's hedge funds
															incorporated here.
														</li>
														<li>
															<strong>Captive Insurance</strong> –
															Second-largest captive insurance market globally.
														</li>
														<li>
															<strong>Trusts & Foundations</strong> – Strong
															asset protection frameworks (though Cook Islands
															leads in pure trust protection).
														</li>
														<li>
															<strong>
																Structured Finance & Securitization
															</strong>{" "}
															– Cayman SPVs are widely used for cross-border
															financing structures.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
															<li>
																Cayman is under British sovereignty, with legal
																oversight ultimately resting with the UK Privy
																Council.
															</li>
															<li>
																The jurisdiction complies with FATF standards,
																CRS, and BEPS, and has removed itself from the
																EU's blacklist through active reforms.
															</li>
															<li>
																While banking secrecy has diminished, Cayman
																retains strong confidentiality provisions
																balanced with international compliance.
															</li>
															<li>
																Political stability is high, underpinned by
																British rule of law and a mature financial
																services regulator (CIMA – Cayman Islands
																Monetary Authority).
															</li>
															<li>
																Its regulatory environment remains attractive
																due to predictable legislation, common law legal
																system, and flexible structuring tools.
															</li>
														</ul>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Despite global pressure, Cayman has preserved its
															role as a funds, trusts, and insurance hub,
															adapting through transparency measures while
															maintaining a tax-neutral environment. It
															continues to be considered a cornerstone of
															offshore structuring for institutional investors,
															UHNWIs, and multinational corporations.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "cook" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															COOK ISLANDS
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='cook'
																FlagComponent={CookIslandsFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 4,110
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Cook Islands are a self-governing nation in free
														association with New Zealand, situated in the South
														Pacific Ocean. Geopolitically, they are part of
														Oceania, northeast of New Zealand and south of
														Hawaii. The capital is Avarua, on the island of
														Rarotonga.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															Named after Captain James Cook, who visited in
															1773.
														</li>
														<li>
															Became a British protectorate in 1888, later
															administered by New Zealand.
														</li>
														<li>
															Achieved self-governing status in 1965, while
															maintaining close ties to New Zealand.
														</li>
														<li>
															Economy was historically based on agriculture and
															tourism.
														</li>
														<li>
															Transitioned into an offshore financial services
															hub in the 1980s with groundbreaking trust
															legislation.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														The Cook Islands International Trusts Act of 1984
														established the jurisdiction as the world leader in
														asset protection trusts. This legislation created
														near-impenetrable defenses against foreign judgments
														and creditor claims, giving rise to the Cook
														Islands' reputation as the gold standard for asset
														protection planning.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Cook Islands International Trusts</strong>{" "}
															– Regarded as the strongest asset protection tool
															globally, offering unparalleled protection against
															foreign court orders.
														</li>
														<li>
															<strong>Foundations</strong> – An alternative to
															trusts for civil law clients.
														</li>
														<li>
															<strong>Captive Insurance & Companies</strong> –
															Niche but growing use for insurance and corporate
															planning.
														</li>
														<li>
															<strong>High-End Estate Planning</strong> – Used
															by UHNWIs and family offices seeking generational
															protection.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
															<li>
																The Cook Islands operates under common law,
																heavily influenced by English and New Zealand
																legal systems.
															</li>
															<li>
																Courts consistently uphold strong protective
																provisions for trusts, rejecting recognition of
																foreign judgments in most cases.
															</li>
															<li>
																Political stability is ensured through its free
																association with New Zealand, with defense and
																foreign affairs ultimately supported by New
																Zealand.
															</li>
															<li>
																Compliance standards have been modernized in
																line with FATF, CRS, and OECD requirements,
																while maintaining trust confidentiality.
															</li>
															<li>
																The jurisdiction has proven stable for nearly
																four decades as a specialized offshore haven.
															</li>
														</ul>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															The Cook Islands remain the world benchmark for
															asset protection trusts, with unmatched
															legislative and judicial support. While its
															corporate and insurance sectors are smaller
															compared to Cayman or BVI, its unique strength
															lies in trust structuring. In 2025, Cook Islands
															continues to attract UHNWIs, entrepreneurs, and
															family offices seeking absolute protection of
															wealth from litigation, creditors, and hostile
															jurisdictions.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "cyprus" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															CYPRUS
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='cyprus'
																FlagComponent={CyprusFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 3,360
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Cyprus is an island nation in the eastern
														Mediterranean Sea, geographically located at the
														crossroads of Europe, Asia, and Africa. Politically,
														it is part of the European Union, making it a unique
														offshore and mid-shore jurisdiction. The capital is
														Nicosia.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															With a history dating back to ancient
															civilizations, Cyprus was under Greek, Roman,
															Byzantine, and Ottoman rule.
														</li>
														<li>
															Became a British colony in 1878 and gained
															independence in 1960.
														</li>
														<li>
															Following inter-communal tensions, the island has
															been divided since 1974 into the Republic of
															Cyprus (EU member) and the Turkish-controlled
															north.
														</li>
														<li>
															Adopted a modern financial services sector in the
															late 20th century, becoming a tax planning hub.
														</li>
														<li>
															Joined the European Union in 2004 and the Eurozone
															in 2008, boosting its global financial role.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Cyprus built its reputation as an offshore
														jurisdiction in the 1980s and 1990s through low
														corporate tax rates, double tax commitments, and
														favorable company legislation. Its EU membership
														further enhanced credibility, giving investors
														access to a tax-efficient gateway to the European
														single market.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Holding Companies</strong> – Widely used
															in international tax planning due to double
															taxation treaties.
														</li>
														<li>
															<strong>IP Companies</strong> – Popular for
															intellectual property structuring with tax
															benefits.
														</li>
														<li>
															<strong>Trusts</strong> – The Cyprus International
															Trust regime offers strong asset protection and
															estate planning tools.
														</li>
														<li>
															<strong>Funds</strong> – An emerging hub for
															alternative investment funds within the EU.
														</li>
														<li>
															<strong>Cross-Border Investment</strong> –
															Strategic location for investments into Europe,
															Russia, and the Middle East.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Cyprus operates under a common law system,
															influenced by English law. Its financial sector is
															regulated by the Cyprus Securities and Exchange
															Commission (CySEC) and the Central Bank of Cyprus.
															As an EU member, Cyprus complies with FATF, OECD,
															and EU directives on AML/CFT and tax transparency.
															Political stability is maintained in the Republic,
															though the north remains a frozen conflict zone.
															The jurisdiction offers currency stability via the
															Euro and investor confidence due to EU legal
															safeguards.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Cyprus continues to be a premier mid-shore
															jurisdiction that blends offshore flexibility with
															EU credibility. It is best suited for holding
															companies, funds, and cross-border tax planning.
															While international scrutiny has tightened, Cyprus
															has adapted by enhancing compliance while
															retaining competitive tax advantages. In September
															2025, it remains a strategic jurisdiction for
															businesses and family offices seeking EU access
															with efficient structuring benefits.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "delaware" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															DELAWARE
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='delaware'
																FlagComponent={DelawareFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 740
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Delaware is a small U.S. state located on the
														Atlantic coast, bordered by Maryland, New Jersey,
														and Pennsylvania. It is part of the Mid-Atlantic
														region of the United States. The capital is Dover,
														while Wilmington serves as its main financial hub.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															One of the original 13 American colonies, with
															early settlement dating back to the 1600s.
														</li>
														<li>
															Became the first state to ratify the U.S.
															Constitution in 1787.
														</li>
														<li>
															Developed a strong manufacturing and chemical
															industry base in the 19th and 20th centuries.
														</li>
														<li>
															Corporate-friendly laws in the 20th century fueled
															its rise as a business hub.
														</li>
														<li>
															Today, Delaware is synonymous with U.S. company
															incorporation.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Delaware is not an offshore jurisdiction in the
														traditional sense but is considered the U.S.
														equivalent due to its business-friendly corporate
														laws, flexible company structures, and favorable
														legal environment. The Court of Chancery, a
														specialized corporate court, provides fast and
														predictable rulings for businesses, making Delaware
														the most popular incorporation state in the U.S.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>LLCs</strong> – Flexible and widely used
															for holding and operating companies.
														</li>
														<li>
															<strong>Corporations</strong> – Favored by
															startups, multinationals, and publicly traded
															firms.
														</li>
														<li>
															<strong>Court of Chancery</strong> – A unique
															judicial body specializing in corporate law.
														</li>
														<li>
															<strong>Privacy</strong> – No requirement to
															disclose beneficial ownership publicly.
														</li>
														<li>
															<strong>Tax Efficiency</strong> – No state income
															tax for companies not operating in Delaware.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Delaware operates under U.S. federal and state
															law, offering one of the most advanced corporate
															legal systems worldwide. Its Division of
															Corporations oversees registrations, while courts
															provide strong investor protection. Political and
															economic stability are anchored in the U.S. legal
															and regulatory system, giving Delaware unmatched
															credibility.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Delaware is the most popular U.S. state for
															incorporations, with over one million business
															entities registered. In 2025, it remains the
															jurisdiction of choice for startups,
															multinationals, private equity, and asset holding
															structures. While not offshore in geography,
															Delaware offers offshore-like advantages of
															privacy, efficiency, and tax neutrality within a
															fully legitimate U.S. framework.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "costarica" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															COSTA RICA
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='costarica'
																FlagComponent={CostaRicaFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: Yet to be decided
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Costa Rica is a Central American country bordered by
														Nicaragua to the north, Panama to the southeast, the
														Pacific Ocean to the west, and the Caribbean Sea to
														the east. The capital is San José.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															Colonized by Spain in the 16th century, later part
															of the Captaincy General of Guatemala.
														</li>
														<li>
															Gained independence in 1821 along with other
															Central American states.
														</li>
														<li>
															Abolished its military in 1949, focusing on
															democracy and stability.
														</li>
														<li>
															Built an economy around agriculture, especially
															coffee and bananas.
														</li>
														<li>
															Transitioned into services, technology, and
															finance in the late 20th century.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Costa Rica developed into a regional hub for
														offshore business due to its political stability,
														territorial tax system, and ease of company
														formation. While not a classical secrecy
														jurisdiction, its corporate structures and
														reputation for safety made it attractive for Latin
														American and foreign investors.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Sociedad Anónima (S.A.)</strong> –
															Flexible corporate structure similar to IBCs.
														</li>
														<li>
															<strong>Territorial Taxation</strong> – Only local
															income is taxed; foreign income exempt.
														</li>
														<li>
															<strong>Banking</strong> – A growing international
															banking sector.
														</li>
														<li>
															<strong>Real Estate Investment</strong> – Popular
															with foreign investors and retirees.
														</li>
														<li>
															<strong>Stability</strong> – Political neutrality
															and strong democratic governance.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Costa Rica follows a civil law system influenced
															by Spanish traditions. It has modernized its
															AML/CFT framework to meet FATF and OECD
															requirements. Political stability, a dollar-linked
															economy, and a reputation for transparency make it
															more credible than traditional offshore havens,
															though less private.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Costa Rica is best viewed as a stable, low-risk
															jurisdiction for regional and international
															investors rather than a secrecy-driven tax haven.
															In 2025, it continues to attract those seeking
															residency, real estate, and simple tax-efficient
															company structures under a territorial system.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "georgia" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															GEORGIA
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='georgia'
																FlagComponent={GeorgiaFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: Yet to be decided
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Georgia is a country located at the crossroads of
														Eastern Europe and Western Asia, bordered by Russia,
														Turkey, Armenia, Azerbaijan, and the Black Sea. It
														lies in the Caucasus region, with Tbilisi as its
														capital.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															An ancient kingdom with roots in classical and
															medieval civilizations.
														</li>
														<li>
															Fell under Persian, Ottoman, and later Russian
															influence over centuries.
														</li>
														<li>Incorporated into the Soviet Union in 1921.</li>
														<li>
															Regained independence in 1991 after the USSR
															collapsed.
														</li>
														<li>
															Transitioned into a modern economy focused on
															openness and foreign investment.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Georgia has not traditionally been an offshore
														jurisdiction but positioned itself as a liberal
														business environment with low taxes, simple company
														formation, and investor-friendly laws. Free
														Industrial Zones (FIZs) offered incentives similar
														to offshore hubs, attracting foreign entrepreneurs
														and traders.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Free Industrial Zones</strong> – Tax
															exemptions for companies operating in designated
															areas.
														</li>
														<li>
															<strong>Low Corporate Tax Regime</strong> – Only
															taxed on distributed profits.
														</li>
														<li>
															<strong>Banking</strong> – Regional banking hub
															with increasing international links.
														</li>
														<li>
															<strong>Real Estate and Investment</strong> –
															Attractive for regional investors and developers.
														</li>
														<li>
															<strong>Gateway Location</strong> – Positioned as
															a bridge between Europe and Asia.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Georgia follows a civil law system. Its financial
															and business environment is overseen by the
															National Bank of Georgia and state regulatory
															authorities. The country ranks highly in
															ease-of-doing-business indexes and has adopted
															modern AML/CFT frameworks. Political stability has
															improved since the 2000s, though regional tensions
															remain a factor.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Georgia is considered more of a pro-business
															jurisdiction than a classical offshore center. Its
															free zones, tax efficiency, and low compliance
															barriers make it appealing for entrepreneurs,
															small businesses, and regional investors. In 2025,
															Georgia remains a niche alternative hub,
															particularly for those seeking diversification
															outside traditional offshore centers.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "gibraltar" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															GIBRALTAR
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='gibraltar'
																FlagComponent={GibraltarFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: USD 3,124
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Gibraltar is a British Overseas Territory located at
														the southern tip of the Iberian Peninsula, bordering
														Spain. It controls the strategic Strait of
														Gibraltar, linking the Atlantic Ocean to the
														Mediterranean Sea. The capital city is Gibraltar.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															Captured by Anglo-Dutch forces in 1704 during the
															War of the Spanish Succession.
														</li>
														<li>
															Ceded to Britain under the Treaty of Utrecht in
															1713.
														</li>
														<li>
															Developed into a major naval base and gateway to
															the Mediterranean.
														</li>
														<li>
															In the 20th century, its strategic location
															ensured continued military significance.
														</li>
														<li>
															Transitioned into a financial and services-based
															economy in the late 20th century.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Gibraltar leveraged its status as a British
														territory with EU ties (before Brexit) to build a
														strong offshore financial services sector. Low
														corporate taxes, flexible company structures, and
														proximity to Europe made it a convenient
														jurisdiction for cross-border business, gaming
														companies, and shipping.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Online Gaming & Betting Licenses</strong>{" "}
															– One of the world's most respected hubs for
															gaming operators.
														</li>
														<li>
															<strong>Company Formations</strong> –
															Tax-efficient vehicles for international trade.
														</li>
														<li>
															<strong>Insurance</strong> – A center for
															insurance and reinsurance companies.
														</li>
														<li>
															<strong>Maritime Services</strong> – Ship
															registration and management.
														</li>
														<li>
															<strong>Trusts & Wealth Planning</strong> – Used
															for estate and asset protection within a common
															law framework.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Gibraltar operates under English common law, with
															local statutes adapted to modern financial needs.
															The Gibraltar Financial Services Commission (GFSC)
															regulates the sector, ensuring compliance with
															FATF and OECD standards. Though Brexit altered its
															EU position, Gibraltar remains closely tied to the
															UK, providing political stability and continued
															access to key markets.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Gibraltar continues to be a recognized offshore
															hub for online gaming, insurance, and corporate
															structuring. Its alignment with UK law, strategic
															location, and established financial ecosystem keep
															it relevant despite increased regulatory scrutiny.
															In 2025, Gibraltar is best positioned for digital
															industries, maritime business, and mid-shore
															wealth planning.
														</p>
													</div>
												</div>
											</div>
										</>
									)}
									{selectedJurisdiction === "guernsey" && (
										<>
											<div className='flex items-start justify-between mb-6'>
												<div className='flex-1'>
													<div className='flex items-center gap-4 mb-2'>
														<h2
															className='text-3xl sm:text-4xl font-bold text-white'
															style={{ fontFamily: "var(--font-benzin)" }}
														>
															GUERNSEY
														</h2>
														<div className='w-16 h-10 sm:w-20 sm:h-12 bg-white rounded border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 p-1'>
															<FlagImage
																jurisdictionId='guernsey'
																FlagComponent={GuernseyFlag}
															/>
														</div>
													</div>
													<p
														className='text-lg sm:text-xl text-green-400 font-semibold'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														Company formation price: Yet to be decided
													</p>
													<p
														className='text-sm text-gray-400 mt-2'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 1/2
													</p>
												</div>
												<motion.button
													onClick={() => closeJurisdictionDetail()}
													className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0'
													whileHover={{ rotate: 90, scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													×
												</motion.button>
											</div>
											<div
												className='space-y-6 text-white'
												style={{ fontFamily: "var(--font-benzin)" }}
											>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Geography & Location
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Guernsey is one of the Channel Islands, located in
														the English Channel near the coast of France. Like
														Jersey, it is a self-governing Crown Dependency of
														the United Kingdom, with internal autonomy but
														British oversight of defense and international
														affairs. The capital is St. Peter Port.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Historical Context
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															Historically part of the Duchy of Normandy until
															1204, after which it remained under the English
															Crown.
														</li>
														<li>
															Retained its Norman law traditions while
															developing independently from England.
														</li>
														<li>
															The economy was once based on agriculture,
															fishing, and trade.
														</li>
														<li>
															Offshore financial services began to emerge in the
															mid-20th century.
														</li>
														<li>
															Today, Guernsey is a leading international center
															for private wealth and investment funds.
														</li>
													</ul>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														Emergence as an Offshore Centre
													</h3>
													<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
														Guernsey developed its reputation as an offshore hub
														in the 1960s through trusts, fiduciary services, and
														investment funds. Its reputation for strong
														regulation and investor protection has made it a
														popular jurisdiction for fund managers, family
														offices, and multinational clients.
													</p>
												</div>
												<div>
													<h3 className='text-xl sm:text-2xl font-bold mb-3'>
														What It Is Best Known For
													</h3>
													<ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'>
														<li>
															<strong>Trusts</strong> – A long-established
															jurisdiction for private wealth planning.
														</li>
														<li>
															<strong>Funds</strong> – Particularly strong in
															private equity, venture capital, and hedge funds.
														</li>
														<li>
															<strong>Foundations</strong> – Flexible vehicles
															for estate planning.
														</li>
														<li>
															<strong>Insurance & Captives</strong> – A leading
															domicile for reinsurance and captive structures.
														</li>
														<li>
															<strong>Private Wealth Management</strong> – Used
															extensively by HNWIs and family offices.
														</li>
													</ul>
												</div>
												<div className='pt-4 border-t border-white/20'>
													<p
														className='text-sm text-gray-400 mb-4'
														style={{ fontFamily: "var(--font-benzin)" }}
													>
														PAGE 2/2
													</p>
													<div>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Regulations & Stability
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Guernsey operates under a mixed legal system
															rooted in Norman customary law and English common
															law. The Guernsey Financial Services Commission
															(GFSC) supervises the financial sector,
															maintaining strong compliance with FATF and OECD
															standards. Politically stable and self-governing,
															Guernsey offers credibility while retaining its
															tax neutrality.
														</p>
													</div>
													<div className='mt-6'>
														<h3 className='text-xl sm:text-2xl font-bold mb-3'>
															Current Offshore Standing
														</h3>
														<p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
															Guernsey is regarded as one of the top-tier
															offshore jurisdictions for private wealth, funds,
															and insurance structures. It is highly respected
															for governance and investor protection, making it
															attractive to institutional and private clients.
															In 2025, Guernsey remains a premier choice for
															sophisticated offshore planning.
														</p>
													</div>
												</div>
											</div>
										</>
								)}

								{selectedJurisdiction === "isleofman" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'>
													<h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>ISLE OF MAN</h2>
												</div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,850</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Isle of Man is a self-governing British Crown Dependency located in the Irish Sea, midway between Great Britain and Ireland. It is not part of the United Kingdom or the European Union but maintains close ties to both. The capital is Douglas.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Historical Context</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li>Originally settled by Celtic peoples and later Vikings, who established the Tynwald — one of the world's oldest continuous parliaments (circa 979 AD).</li><li>Came under English control in the 15th century, eventually becoming a Crown Dependency in 1765.</li><li>Historically dependent on agriculture, fishing, and trade.</li><li>Developed offshore financial services from the 1960s onward, leveraging its self-governing tax status.</li></ul></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Emergence as an Offshore Centre</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Isle of Man built its financial centre by offering low taxes, strong trust law, and a business-friendly regulatory framework. Its exemption from UK VAT and income tax neutrality made it attractive for insurance, aircraft leasing, and private wealth management.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Insurance & Life Assurance</strong> – A leading domicile for international life insurance policies.</li><li><strong>Aircraft Registration</strong> – A respected registry for high-value aircraft assets.</li><li><strong>Trusts & Foundations</strong> – Strong asset protection and succession planning framework.</li><li><strong>Funds</strong> – Flexible regulatory regime for alternative investment funds.</li><li><strong>E-Gaming Licensing</strong> – A recognised hub for online gaming operators.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Isle of Man operates under a common law system influenced by English law. The Isle of Man Financial Services Authority (IOMFSA) regulates the sector with strong compliance standards aligned to FATF and OECD requirements. Political stability is high, underpinned by the Crown relationship with the UK.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Isle of Man remains a first-tier offshore jurisdiction, particularly for insurance, aircraft leasing, and private wealth. In 2025, it continues to attract HNWIs and family offices seeking a credible, compliant, and tax-efficient base within close proximity to the UK and European markets.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "bahrain" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>BAHRAIN</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 3,200</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Bahrain is an island nation in the Persian Gulf, connected to Saudi Arabia by the King Fahd Causeway. It is geopolitically situated at the heart of the Gulf Cooperation Council (GCC) region. The capital is Manama.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Historical Context</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li>One of the oldest civilisations in the Gulf, home to the ancient Dilmun culture.</li><li>Under Portuguese, Persian, and then British influence before gaining independence in 1971.</li><li>Historically dependent on pearl diving and trade; transitioned to oil-based economy in the 1930s.</li><li>Developed financial services as a diversification strategy from the 1970s onward.</li></ul></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Emergence as an Offshore Centre</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Bahrain established itself as the Gulf's first and most mature financial hub, particularly for Islamic finance. Its open economy, liberal foreign ownership rules, and early offshore banking legislation made it the preferred GCC base for international banks and financial institutions.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Islamic Finance</strong> – The global hub for Sharia-compliant banking, sukuk, and takaful.</li><li><strong>Offshore Banking Units (OBUs)</strong> – A long-established framework for international banking.</li><li><strong>Funds</strong> – A growing domicile for alternative and Sharia-compliant investment funds.</li><li><strong>Fintech</strong> – A pioneering regulatory sandbox for financial technology innovation in the region.</li><li><strong>Holding Companies</strong> – Tax-free holding structures for GCC and international investors.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Bahrain is regulated by the Central Bank of Bahrain (CBB), which oversees banking, insurance, capital markets, and fintech under a unified regulatory framework. It complies with FATF and OECD standards and has a comprehensive network of double tax treaties. Political stability is strong, supported by its GCC alignment and constitutional monarchy.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Bahrain remains the preferred GCC jurisdiction for Islamic finance, offshore banking, and fintech. In 2025, its zero personal income tax, liberal foreign ownership rules, and proximity to Saudi Arabia continue to attract financial institutions, family offices, and entrepreneurs seeking a regulated GCC base without the premium costs of Dubai.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "belize" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>BELIZE</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,250</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Belize is a small Central American and Caribbean nation bordered by Mexico to the north and Guatemala to the west and south, with the Caribbean Sea to the east. It is the only English-speaking country in Central America. The capital is Belmopan.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Historical Context</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li>Home to ancient Maya civilizations before European colonisation.</li><li>Became British Honduras in 1862 and gained full independence in 1981.</li><li>Retains strong British legal and institutional traditions, including common law.</li><li>Developed offshore financial services in the 1990s as an economic diversification strategy.</li></ul></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>IBCs (International Business Companies)</strong> – One of the lowest-cost IBC jurisdictions globally, popular for trading and holding structures.</li><li><strong>Forex & Brokerage Licensing</strong> – A cost-effective licensing jurisdiction for retail forex operators.</li><li><strong>Foundations</strong> – Available under the Belize Foundations Act for estate planning.</li><li><strong>Asset Protection Trusts</strong> – Strong legislative protection against foreign judgments.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Belize operates under English common law. Financial services are regulated by the International Financial Services Commission (IFSC). The jurisdiction has made efforts to align with FATF standards, though it has historically been considered a lower-tier offshore centre. Its USD-pegged currency provides monetary stability.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Belize is best suited for cost-sensitive clients seeking a basic IBC or forex licence without the regulatory overhead of tier-1 jurisdictions. In 2025, it remains popular for startup trading companies, forex brokerages, and small holding structures where cost efficiency is the primary driver.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "bvi" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>BRITISH VIRGIN ISLANDS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,850</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The British Virgin Islands (BVI) are a British Overseas Territory in the northeastern Caribbean, east of Puerto Rico and the US Virgin Islands. The territory consists of about 60 islands, the largest being Tortola. The capital and financial centre is Road Town.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Historical Context</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li>Settled by the Dutch in 1648 and subsequently acquired by England in 1672.</li><li>Economy historically centred on agriculture, particularly sugar production.</li><li>The introduction of the IBC Act in 1984 transformed the BVI into the world's most prolific offshore incorporation jurisdiction.</li><li>Over one million companies have been incorporated in the BVI since 1984.</li></ul></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>IBCs</strong> – The single largest IBC jurisdiction in the world by volume.</li><li><strong>Holding Structures</strong> – The default jurisdiction for cross-border holding companies globally.</li><li><strong>Investment Funds</strong> – A leading domicile for hedge funds and private equity funds.</li><li><strong>Trusts</strong> – Flexible trust law with strong asset protection provisions.</li><li><strong>Joint Ventures & SPVs</strong> – Widely used for structured transactions and project finance.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The BVI operates under English common law with appeals to the Privy Council. The BVI Financial Services Commission (FSC) regulates financial services. The jurisdiction complies with FATF, CRS, and BEPS and has introduced a beneficial ownership register. Economic substance requirements apply to relevant entities. Political stability is high under British sovereignty.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The BVI remains the world's dominant IBC jurisdiction by company count, offering unmatched flexibility, global recognition, and a proven legal framework. In 2025, it continues to serve as the default holding company jurisdiction for cross-border transactions, private equity structures, and HNWI asset holding — adapting to substance requirements while retaining its core advantages.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "dubai" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>DUBAI — UAE MAINLAND</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 5,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Dubai is the largest emirate in the United Arab Emirates (UAE), located on the southeastern coast of the Arabian Peninsula along the Persian Gulf. It is part of the UAE, a federation of seven emirates, and serves as the country's primary commercial and financial hub.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Historical Context</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li>Originally a small fishing and pearl diving village, Dubai came under British protection in 1892 as part of the Trucial States.</li><li>The UAE gained independence in 1971 under Sheikh Zayed bin Sultan Al Nahyan.</li><li>The discovery of oil in the 1960s funded rapid infrastructure and economic development.</li><li>Dubai diversified away from oil into trade, tourism, real estate, and financial services from the 1990s onward.</li></ul></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Mainland LLCs & Branch Offices</strong> – Full access to the UAE domestic market with 100% foreign ownership now permitted in most sectors.</li><li><strong>Trading & Logistics</strong> – World-class port infrastructure via Jebel Ali and Al Maktoum International Airport.</li><li><strong>Real Estate Investment</strong> – One of the most active property markets globally.</li><li><strong>Wealth Migration Hub</strong> – Attracting HNWIs and family offices from Europe, India, and East Asia.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The UAE Mainland is regulated by the Ministry of Economy and local Department of Economic Development (DED) authorities. The UAE introduced a federal corporate tax of 9% in 2023 on profits above AED 375,000, while maintaining zero personal income tax. It complies with FATF standards and has signed numerous double tax treaties. Political stability is exceptionally high under the UAE federal structure.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Dubai Mainland is the preferred structure for businesses seeking full access to the UAE domestic economy. In 2025, following 100% foreign ownership reforms, it rivals free zones for many business types — particularly trading, hospitality, retail, and professional services. It is a preferred wealth and business relocation destination for HNWIs globally.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "difc" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>DIFC — DUBAI IFC</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 8,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Dubai International Financial Centre (DIFC) is a purpose-built financial free zone within Dubai, UAE. It operates as a distinct legal and regulatory jurisdiction — entirely separate from UAE mainland law — governed by its own common law framework and courts.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Emergence as a Financial Centre</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Established in 2004, DIFC was designed to serve as a financial bridge between the East and West. It attracted global banks, asset managers, and financial institutions by offering common law protections, zero tax on income and profits, 100% foreign ownership, and unrestricted repatriation of capital.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Financial Services Licensing</strong> – Asset management, banking, brokerage, and insurance regulated by the DFSA.</li><li><strong>Holding Companies (DIFC SPCs)</strong> – Zero-tax holding vehicles for Middle East and global structures.</li><li><strong>Family Offices</strong> – A highly favoured jurisdiction for HNWI family offices given its legal certainty and wealth management ecosystem.</li><li><strong>Funds</strong> – A recognised domicile for alternative investment funds targeting the MENA region.</li><li><strong>Wills & Succession</strong> – The DIFC Wills Service provides non-Muslim succession planning under common law.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The DIFC is regulated by the Dubai Financial Services Authority (DFSA), a world-class regulator recognised by the UK FCA and other tier-1 regulators. The DIFC Courts operate under English common law and are presided over by judges recruited from common law jurisdictions. DIFC entities are exempt from UAE federal corporate tax on qualifying financial activities.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>DIFC is consistently ranked among the top global financial centres and the leading financial hub in the MENA region. In 2025, it remains the premier destination for financial institutions, family offices, and wealth management firms seeking a regulated, tax-neutral, common law environment in the Gulf.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "adgm" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>ADGM — ABU DHABI</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 7,800</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Abu Dhabi Global Market (ADGM) is an international financial centre located on Al Maryah Island in Abu Dhabi, the capital of the United Arab Emirates and the UAE's wealthiest emirate. ADGM operates as an independent jurisdiction with its own common law framework separate from UAE federal law.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Family Offices</strong> – ADGM's dedicated Family Office framework is regarded as the most sophisticated in the GCC, offering bespoke structuring for UHNWI families.</li><li><strong>Asset Management & Funds</strong> – A growing domicile for alternative investment funds, particularly venture capital and private equity.</li><li><strong>Digital Assets & Fintech</strong> – ADGM's FSRA has developed a progressive and comprehensive virtual asset regulatory framework.</li><li><strong>Holding & SPV Structures</strong> – Tax-neutral holding vehicles with zero corporate tax on qualifying activities.</li><li><strong>Arbitration</strong> – Home to the Abu Dhabi International Arbitration Centre (arbitrateAD).</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>ADGM is regulated by the Financial Services Regulatory Authority (FSRA), a recognised regulator operating under English common law principles. ADGM Courts are presided over by eminent common law jurists. ADGM complies with FATF, OECD, and international regulatory standards. Abu Dhabi's sovereign wealth and political stability underpin ADGM's long-term credibility.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>ADGM is establishing itself as the premier jurisdiction for family offices and institutional investors in the GCC, rivalling DIFC for certain client types. In 2025, its family office programme, digital assets framework, and Abu Dhabi government's sovereign backing continue to attract ultra-high-net-worth families and institutional financial groups to the jurisdiction.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "hongkong" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>HONG KONG</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,100</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Hong Kong is a Special Administrative Region (SAR) of China, located on the southeastern coast of China at the mouth of the Pearl River Delta. It comprises Hong Kong Island, the Kowloon Peninsula, the New Territories, and over 200 smaller islands. It operates under the "One Country, Two Systems" principle.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Emergence as a Financial Centre</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Hong Kong developed as the gateway between mainland China and international capital markets, leveraging its common law system, free port status, and strategic location. It became one of the world's top three financial centres alongside New York and London, serving as the primary platform for Asia-Pacific capital markets activity and wealth management.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Holding Companies</strong> – The default Asia-Pacific holding jurisdiction for multinational structures into China.</li><li><strong>Capital Markets</strong> – One of the world's leading IPO and equity markets, particularly for Chinese companies.</li><li><strong>Asset Management & Family Offices</strong> – A growing family office hub with government incentives introduced in 2023.</li><li><strong>Private Banking</strong> – A premier private banking centre for Asian HNWIs.</li><li><strong>Territorial Taxation</strong> – Only Hong Kong-sourced income is taxable; offshore profits are exempt.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Hong Kong operates under English common law and is regulated by the Hong Kong Monetary Authority (HKMA) for banking, and the Securities and Futures Commission (SFC) for capital markets and funds. It complies with FATF and OECD standards. While political dynamics have evolved since 2019, Hong Kong's institutional and legal frameworks remain intact under the SAR framework.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Hong Kong remains the premier Asia-Pacific financial centre and the key gateway to mainland China. In 2025, despite geopolitical shifts, it continues to attract regional headquarters, family offices, and capital markets mandates. Its combination of territorial taxation, common law, and China connectivity makes it irreplaceable for Asia-Pacific structuring.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "singapore" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SINGAPORE</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,400</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Singapore is a city-state island nation located at the southern tip of the Malay Peninsula in Southeast Asia, at the crossroads of major global shipping lanes. It serves as the undisputed financial, trade, and logistics hub of Southeast Asia.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Emergence as a Financial Centre</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Following independence in 1965, Singapore transformed from a colonial trading post into one of the world's wealthiest nations and most sophisticated financial centres. Its combination of political stability, rule of law, strategic location, competitive tax regime, and world-class infrastructure made it the preferred Asian base for global institutions and private wealth.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Family Offices</strong> – The fastest-growing family office jurisdiction in Asia, with over 1,400 single-family offices as of 2024.</li><li><strong>Holding Companies (Singapore Pte Ltd)</strong> – The default Southeast Asia holding vehicle for multinational groups.</li><li><strong>Funds</strong> – A major domicile for hedge funds, PE funds, and venture capital under the Variable Capital Company (VCC) framework.</li><li><strong>Wealth Management & Private Banking</strong> – A premier private banking hub for Asian and European HNWIs.</li><li><strong>Trusts</strong> – Sophisticated trust law framework under the Singapore Trust Companies Act.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Singapore is regulated by the Monetary Authority of Singapore (MAS), one of the world's most respected financial regulators. It complies with all FATF, OECD, and international AML/CFT standards. Singapore's AAA-rated sovereign credit, rule of law, and zero-corruption ranking provide unmatched political and institutional stability. The corporate tax rate is 17%, with extensive exemptions for new companies and holding structures.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Singapore is Asia's premier wealth management and financial centre, consistently competing with Zurich and London for global private wealth. In 2025, it remains the preferred jurisdiction for Asian family offices, regional holding structures, and fund domiciliation — offering a combination of political stability, regulatory quality, and competitive taxation that few jurisdictions can match globally.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "mauritius" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>MAURITIUS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 3,100</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Mauritius is an island nation in the Indian Ocean, approximately 2,000 km southeast of the African continent and east of Madagascar. It is geopolitically positioned as the premier financial gateway between Africa, Asia, and the Indian subcontinent. The capital is Port Louis.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>India Investment Gateway</strong> – Historically the dominant conduit for foreign direct investment into India via the India-Mauritius Double Taxation Avoidance Agreement (amended in 2016).</li><li><strong>Africa Investment Structures</strong> – The preferred holding jurisdiction for investments into Sub-Saharan Africa.</li><li><strong>Global Business Companies (GBC)</strong> – The principal corporate vehicle for international holding and investment activity.</li><li><strong>Funds</strong> – A recognised fund domicile for Africa-focused private equity and venture capital funds.</li><li><strong>Trusts & Foundations</strong> – Available under mature trust and foundation legislation.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Mauritius is regulated by the Financial Services Commission (FSC) and operates under a hybrid legal system combining English common law and French civil law traditions. It complies with FATF, OECD, and CRS standards. Mauritius was removed from the EU and FATF grey lists following compliance reforms. Political stability is strong, with a well-established democratic system.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Mauritius remains Africa and India's primary offshore financial hub. In 2025, its extensive tax treaty network, cost-efficient regulatory environment, and strategic positioning between the Indian Ocean economies make it the default structuring jurisdiction for investors targeting India, Sub-Saharan Africa, and the broader Indian Ocean rim.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "luxembourg" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>LUXEMBOURG</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 5,800</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Luxembourg is a small landlocked country in Western Europe, bordered by Belgium, France, and Germany. Despite its size, it is the second-largest investment fund centre in the world after the United States and the premier fund domicile in Europe. The capital is Luxembourg City.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>UCITS Funds</strong> – Luxembourg is the global leader in UCITS fund domiciliation, used for cross-border distribution to retail investors across 70+ countries.</li><li><strong>Alternative Investment Funds</strong> – The dominant European jurisdiction for AIFs, including private equity, hedge funds, real estate, and infrastructure funds.</li><li><strong>Holding Companies (SOPARFI)</strong> – Tax-efficient EU-compliant holding vehicle benefiting from EU Parent-Subsidiary and Interest & Royalties Directives.</li><li><strong>Private Wealth Structures</strong> – SPFs (Société de Gestion de Patrimoine Familial) for family wealth holding.</li><li><strong>Insurance</strong> – A leading EU domicile for life insurance and wealth insurance products (insurance wrapper solutions).</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Luxembourg is regulated by the Commission de Surveillance du Secteur Financier (CSSF) and operates under EU law. As a founding EU member and Eurozone country, it provides unmatched EU market access. Luxembourg is AAA-rated, politically stable, and consistently compliant with FATF, OECD, and EU AML/CTF directives. Standard corporate tax is 17%, with fund vehicles typically tax-transparent or exempt.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Luxembourg is Europe's preeminent fund and financial centre. In 2025, it remains the default domicile for European fund distribution, institutional holding structures, and insurance wrappers — combining EU legal credibility, a mature regulatory framework, and extensive treaty networks that make it indispensable for cross-border European wealth and investment structuring.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "malta" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>MALTA</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 3,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Malta is a small EU member state and archipelago in the central Mediterranean Sea, south of Sicily and north of Tunisia. Despite its size, it is an internationally recognised financial services and gaming jurisdiction with a fully operational EU regulatory framework. The capital is Valletta.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Online Gaming Licensing (MGA)</strong> – The Malta Gaming Authority licence is one of the most respected globally for online casino and sports betting operators.</li><li><strong>Financial Services Licensing</strong> – MiFID-passportable licences for investment firms, asset managers, and payment institutions.</li><li><strong>Funds</strong> – A cost-effective EU fund domicile for alternative and UCITS-type structures.</li><li><strong>Holding Companies</strong> – Access to EU Directives with a 5% effective tax rate through the refund system.</li><li><strong>Crypto & Digital Assets</strong> – Malta was an early mover in virtual financial assets regulation (VFA Act).</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Malta is regulated by the Malta Financial Services Authority (MFSA) and the Malta Gaming Authority (MGA). As an EU and Eurozone member, Malta applies all EU financial services directives. Malta has worked to address historical FATF concerns and has strengthened AML/CFT compliance significantly since 2021. Political stability is maintained under the EU constitutional framework.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Malta is a cost-effective EU licensing jurisdiction for gaming, financial services, and digital assets. In 2025, its EU passport access, competitive costs versus Luxembourg or Ireland, and established gaming regulatory framework continue to attract mid-market financial institutions, gaming operators, and fintech companies seeking EU market access.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "seychelles" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SEYCHELLES</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,100</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Seychelles is an archipelago of 115 islands in the Indian Ocean, northeast of Madagascar. It is an independent republic and a developing offshore jurisdiction particularly popular for cost-effective IBC formation. The capital is Victoria on Mahé island.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>IBCs (International Business Companies)</strong> – One of the most affordable offshore IBC jurisdictions, popular for trading companies, holding vehicles, and forex structures.</li><li><strong>Foundations</strong> – Available under the Seychelles Foundations Act for estate and succession planning.</li><li><strong>Trusts</strong> – Strong trust legislation with asset protection provisions.</li><li><strong>Securities Dealer Licensing</strong> – A cost-effective jurisdiction for securities and forex brokerage licensing.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Seychelles is regulated by the Financial Services Authority (FSA) and operates under a hybrid legal system combining English common law and French civil law. It has worked to align with FATF standards and has introduced beneficial ownership registers and economic substance requirements. Political stability is moderate as a small island democracy.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Seychelles is best positioned as a budget-tier offshore jurisdiction for straightforward IBC structures, holding companies, and cost-sensitive licensing mandates. In 2025, it remains popular for entrepreneurs and smaller businesses seeking offshore incorporation at minimum cost, though serious institutional or banking-related structures typically require a higher-tier jurisdiction.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "panama" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>PANAMA</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,800</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Panama is a Central American country connecting North and South America, bordered by Costa Rica and Colombia. The Panama Canal — one of the world's most strategically important waterways — makes it a global logistics and trade hub. The capital is Panama City, which also serves as the financial centre.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Sociedad Anónima (S.A.)</strong> – Panama's cornerstone offshore structure, historically used for privacy and tax planning.</li><li><strong>Foundations (Fundación de Interés Privado)</strong> – A civil law vehicle for estate planning and asset protection, providing an alternative to common law trusts for civil law clients.</li><li><strong>Territorial Taxation</strong> – Only Panama-sourced income is taxed; all foreign income is fully exempt.</li><li><strong>Ship Registry</strong> – Panama operates the world's largest ship registry by tonnage.</li><li><strong>Banking</strong> – A regional banking hub for Latin American wealth.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Panama operates under a civil law system. Financial services are regulated by the Superintendency of Banks and the Superintendency of the Securities Market. Panama has faced scrutiny following the 2016 Panama Papers leak and has taken steps to modernise its AML/CFT framework and beneficial ownership disclosure regime to meet FATF and OECD requirements. Political stability is broadly maintained under a democratic system.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Panama remains a significant offshore jurisdiction, particularly for Latin American clients, ship registration, and foundations as trust alternatives. In 2025, while enhanced scrutiny has reduced its appeal for opaque structures, its territorial tax system, Fundación vehicles, and Panama Canal-linked trade infrastructure continue to attract legitimate cross-border business and wealth management mandates.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "rak" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>RAS AL KHAIMAH — RAK ICC</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,950</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Ras Al Khaimah (RAK) is the northernmost emirate of the United Arab Emirates, located approximately 100 km north of Dubai. RAK ICC (International Corporate Centre) is RAK's dedicated offshore incorporation authority, offering one of the most cost-effective offshore company formation solutions in the UAE.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Offshore Companies (RAK ICC IBCs)</strong> – The most affordable UAE offshore vehicle, used for holding, trading, and asset protection. Cannot conduct business inside the UAE.</li><li><strong>Holding Structures</strong> – Widely used for holding international investments, intellectual property, and real estate outside the UAE.</li><li><strong>Privacy</strong> – No public registry of shareholders or directors, subject to UAE beneficial ownership compliance requirements.</li><li><strong>UAE Nexus</strong> – Provides UAE presence and brand recognition without mainland or free zone operating costs.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>RAK ICC operates under UAE federal law with the regulatory oversight of the RAK government. UAE introduced a 9% corporate tax in 2023; offshore companies with no UAE-sourced income remain generally outside the scope of corporate tax. RAK ICC complies with UAE AML/CFT standards and FATF requirements as part of the UAE federal framework. Political stability is high under UAE federal governance.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>RAK ICC is the UAE's most cost-efficient offshore incorporation vehicle and has grown significantly as an alternative to BVI and Seychelles for clients who want UAE branding at a lower cost. In 2025, it is particularly popular for holding international assets, e-commerce structures, and investment platforms operated by entrepreneurs based in or relocating to the UAE.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "nevis" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>NEVIS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,200</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Nevis is the smaller island of the Federation of Saint Kitts and Nevis in the eastern Caribbean Sea. While geographically small, Nevis has developed an outsized reputation as an asset protection and offshore incorporation jurisdiction, particularly known for its LLC and trust legislation.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Nevis LLCs</strong> – Considered among the strongest asset protection LLC vehicles globally, providing charging order protection as the exclusive creditor remedy.</li><li><strong>Nevis Trusts</strong> – Strong asset protection trusts with a two-year statute of limitations on fraudulent transfer claims.</li><li><strong>IBCs</strong> – Cost-effective offshore companies for holding and trading.</li><li><strong>PTCs (Private Trust Companies)</strong> – Available for family office structures.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Nevis operates under English common law. The Nevis Island Administration oversees financial services under the Financial Services Regulatory Commission. It complies with FATF and OECD standards and is part of the St. Kitts and Nevis federation, which benefits from Commonwealth membership and Privy Council appeals. Political stability is maintained under the federal democratic system.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Nevis remains a specialist jurisdiction for asset protection, particularly for US-based clients seeking charging order protection through Nevis LLCs. In 2025, it continues to serve wealth structuring, estate planning, and litigation protection mandates — particularly valued by attorneys and their clients for its robust domestic legal defences against foreign creditor claims.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "netherlands" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>NETHERLANDS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 4,200</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Netherlands is a Western European nation bordering Germany and Belgium, with access to the North Sea. Amsterdam is the financial and cultural capital, while Rotterdam hosts one of the world's largest ports. The Netherlands is an EU and Eurozone member and a founding member of the OECD.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Holding Companies (BV/NV)</strong> – The Netherlands is one of Europe's premier holding company jurisdictions, leveraging the Participation Exemption (deelnemingsvrijstelling) to exempt dividends and capital gains from qualifying participations.</li><li><strong>Treaty Network</strong> – One of the world's most extensive double taxation treaty networks, covering over 90 countries.</li><li><strong>Foundations (Stichting)</strong> – Used for philanthropic structuring, IP holding, and asset protection.</li><li><strong>Cooperatives (Coöperatie)</strong> – Flexible structures used for international tax planning and private equity fund structures.</li><li><strong>Funds</strong> – A growing domicile for alternative investment funds targeting European markets.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Netherlands operates under a civil law system and is regulated by the Dutch Authority for the Financial Markets (AFM) and De Nederlandsche Bank (DNB). As a founding EU member, it applies all EU financial services directives. Corporate tax is 19-25.8%, with significant reductions available through the innovation box regime for IP-generating businesses. The Netherlands is politically stable, with AAA-rated sovereign credit.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Netherlands is Europe's leading holding company jurisdiction for multinational groups and a key platform for European expansion. In 2025, while OECD BEPS measures have reduced some structuring advantages, the Participation Exemption, treaty network, and EU market access continue to make it the default European holding location for global groups. It remains an essential jurisdiction in any mid-to-large cross-border structure.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "switzerland" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SWITZERLAND</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 6,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Switzerland is a landlocked country in Central Europe, bordered by Germany, France, Italy, Austria, and Liechtenstein. It is not an EU member but maintains bilateral agreements with the EU. Zurich and Geneva are the country's primary financial centres, consistently ranked among the world's top private banking destinations.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Private Banking & Wealth Management</strong> – Switzerland manages approximately USD 2.5 trillion in offshore private wealth — the largest share globally.</li><li><strong>Family Offices</strong> – Zurich and Geneva are home to hundreds of single and multi-family offices serving European and global UHNWIs.</li><li><strong>Foundations (Stiftungen)</strong> – Used for philanthropic giving, family governance, and asset protection.</li><li><strong>Trading Companies</strong> – Geneva remains a global commodities trading hub.</li><li><strong>Holding Companies (AG/SA)</strong> – Cantonal tax competition produces effective rates as low as 12-14% in cantons such as Zug and Nidwalden.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Switzerland is regulated by FINMA (Swiss Financial Market Supervisory Authority) and operates under a civil law system. It is a founding member of the OECD and complies with CRS, FATCA, and FATF standards — having significantly reformed its banking secrecy framework since 2009. Switzerland's direct democracy, federal stability, neutral foreign policy, and strong franc provide unmatched institutional stability. The minimum federal corporate tax is 8.5% on net income, with cantonal rates producing combined rates of 12-22%.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Switzerland remains the world's premier private wealth management jurisdiction. In 2025, it continues to attract the highest concentration of UHNWI assets globally, serving as the benchmark for discretion, quality, and institutional integrity in private banking. While classic banking secrecy has been substantially dismantled, Switzerland's legal framework, financial expertise, and asset management depth ensure its leadership position remains unchallenged for the foreseeable future.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "uk" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>UNITED KINGDOM</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,200</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The United Kingdom comprises England, Scotland, Wales, and Northern Ireland, located off the northwestern coast of continental Europe. London is one of the world's two pre-eminent financial centres alongside New York, and the UK operates the world's most internationally active financial services sector by many measures.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>English Common Law</strong> – The source of common law that underpins most global offshore jurisdictions; English courts and English law govern the majority of international commercial contracts globally.</li><li><strong>LLPs (Limited Liability Partnerships)</strong> – Used by professional firms, fund managers, and international trading structures; transparent for tax, no UK tax if no UK income.</li><li><strong>Private Limited Companies (Ltd)</strong> – Simple, credible, low-cost incorporation with high global recognition.</li><li><strong>Trusts</strong> – English law trusts are the template for trust frameworks used across all Commonwealth offshore jurisdictions.</li><li><strong>Family Offices</strong> – London remains a premier location for family offices and private wealth management operations.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The UK is regulated by the FCA (Financial Conduct Authority) and PRA (Prudential Regulation Authority), both world-class regulators. Corporate tax is 25% (2023 onward) for profits above £250,000. The UK complies with all FATF and OECD standards and maintains extensive double tax treaty networks. Post-Brexit, the UK has sought to position itself as a competitive financial services jurisdiction with a tailored regulatory regime.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The UK remains a tier-1 global financial jurisdiction and the source of the common law framework that underpins most of the world's offshore structures. In 2025, London continues to attract international financial institutions, family offices, and professional services firms. UK LLPs and LLCs are widely used in cross-border structuring for their transparency, simplicity, and high global credibility — particularly for structures where UK-origin legal standing is commercially valuable.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "wyoming" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>WYOMING (USA)</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 650</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Wyoming is a state in the Mountain West region of the United States, known for its sparse population, national parks, and significant mineral resources. It has emerged as the most progressive US state for LLC and corporate legislation, rivalling Delaware for certain use cases — particularly for asset protection and digital asset entities.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Wyoming LLCs</strong> – Offer superior charging order protection compared to most other US states, with the charging order as the exclusive creditor remedy — similar to Nevis.</li><li><strong>Series LLCs</strong> – Allow a single LLC to contain multiple protected series, each with separate assets and liabilities — used for real estate portfolios and investment funds.</li><li><strong>DAO LLCs</strong> – Wyoming was the first US state to legally recognise decentralised autonomous organisations (DAOs) as LLCs (2021).</li><li><strong>Privacy</strong> – No requirement to publicly disclose members or managers; nominee services permitted.</li><li><strong>No State Income Tax</strong> – Wyoming has no state corporate or personal income tax.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Wyoming operates under US federal and state law, providing the legal certainty and stability of the American judicial system. The Secretary of State oversees company registrations. Wyoming's business-friendly legislature has consistently updated its LLC, DAO, and digital asset laws to remain at the frontier of US corporate innovation. Political and economic stability are anchored by US federal frameworks.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Wyoming is the preferred US alternative to Delaware for privacy-focused LLCs, asset protection structures, Series LLCs, and digital asset entities. In 2025, it is particularly popular with crypto and Web3 founders, real estate investors seeking multi-series structures, and international entrepreneurs requiring a credible US corporate presence at a lower cost and with stronger privacy than Delaware provides.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "ireland" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>IRELAND</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 3,800</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Ireland is an island nation in Northwestern Europe, the only English-speaking EU member state following Brexit. Dublin is its capital and financial services hub. Ireland's combination of a 12.5% corporate tax rate, English language, EU membership, and common law framework has made it the European headquarters of choice for US multinationals.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Multinational Headquarters</strong> – European HQ for Apple, Google, Meta, Microsoft, Pfizer, and hundreds of other global corporations.</li><li><strong>Funds</strong> – A top-five global fund domicile; particularly strong in ETFs and money market funds (UCITS).</li><li><strong>IP Holding</strong> – The Knowledge Development Box provides a 6.25% effective tax rate on qualifying IP income.</li><li><strong>Aircraft Leasing</strong> – Dublin is the global centre of aircraft leasing, home to AerCap, SMBC Aviation Capital, and others.</li><li><strong>SPACs & Capital Markets</strong> – Euronext Dublin provides regulated EU capital markets access.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Ireland is regulated by the Central Bank of Ireland, a respected regulator with a pragmatic approach to financial services. It operates under English common law and applies all EU financial services directives. Ireland joined the OECD global minimum tax (Pillar Two) framework, adopting a 15% minimum rate for large multinationals from 2024. Political stability is strong within the EU framework.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Ireland is Europe's premier location for US multinationals, fund domiciliation, and aircraft leasing. In 2025, it remains the default English-language EU jurisdiction for corporate structures, financial services licensing, and fund management — particularly valued for its regulatory quality, US cultural alignment, and EU single market access.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "india" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>INDIA</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>India is the world's most populous country and fifth-largest economy, located in South Asia. Mumbai is the financial capital; Bangalore is the technology hub. India is a key destination for cross-border investment, particularly for structures involving Mauritius, Singapore, Netherlands, and Cyprus as intermediary holding jurisdictions.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>GIFT City (Gujarat International Finance Tec-City)</strong> – India's dedicated international financial centre with IFSC regulations modelled on Singapore/DIFC, offering tax concessions for international financial services.</li><li><strong>Private Limited Companies</strong> – The dominant corporate form for inbound investment and domestic operations.</li><li><strong>LLPs</strong> – Used for professional services and joint ventures with reduced compliance burden.</li><li><strong>FEMA & FDI Compliance</strong> – Complex inbound investment regulatory framework managed through RBI and DPIIT approvals.</li><li><strong>Startup Ecosystem</strong> – India has the world's third-largest startup ecosystem, driving significant inbound PE and VC investment activity.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>India operates under English common law and is regulated by the Reserve Bank of India (RBI), SEBI (Securities and Exchange Board of India), and the Ministry of Corporate Affairs. India complies with FATF standards and maintains an extensive double tax treaty network. Corporate tax for domestic companies is 22% (reduced from 30%). Political stability is high under a federal parliamentary democracy.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>India is primarily a destination jurisdiction rather than an offshore structuring hub. In 2025, GIFT City is emerging as a credible international financial centre for fund management, insurance, and capital markets activities targeting India. For cross-border investment into India, Mauritius, Singapore, and Netherlands remain the primary holding jurisdictions, with India itself serving as the operating and growth market.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "kazakhstan" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>KAZAKHSTAN — AIFC</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 4,500</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Kazakhstan is the world's largest landlocked country, located in Central Asia and Eastern Europe. Astana (formerly Nur-Sultan) is its capital and home to the Astana International Financial Centre (AIFC), Kazakhstan's dedicated international financial centre modelled on DIFC and ADGM — operating under English common law and its own independent regulatory framework.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>CIS & Central Asia Gateway</strong> – The AIFC serves as the primary financial hub for investment into Central Asia, the Caucasus, and CIS countries.</li><li><strong>Holding & Investment Structures</strong> – Tax-efficient holding vehicles for regional investment mandates with zero tax on dividends, interest, and capital gains within the AIFC.</li><li><strong>Islamic Finance</strong> – A growing Islamic finance centre targeting Central Asian and Middle Eastern Islamic finance mandates.</li><li><strong>Digital Assets & Fintech</strong> – AIFC has developed a progressive digital assets regulatory framework.</li><li><strong>Funds</strong> – The AIFC Investment Fund framework supports alternative investment fund registration.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The AIFC operates under English common law, with the AIFC Court and International Arbitration Centre providing independent dispute resolution. The AIFC Financial Services Regulatory Authority (FSRA) is modelled on DFSA/ADGM frameworks. Kazakhstan is politically stable under its presidential system, though regional geopolitical risks from neighbouring Russia require consideration. The AIFC regime provides tax exemptions for qualifying activities until 2066.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The AIFC is an emerging international financial centre with significant potential as the gateway jurisdiction for Central Asian investment. In 2025, it attracts investors and businesses seeking access to Kazakhstan's resource economy, regional connectivity, and the growing Central Asian consumer market — with the legal certainty of English common law and the tax efficiency of a purpose-built financial free zone.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "labuan" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>LABUAN — MALAYSIA</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 3,600</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Labuan is a Federal Territory of Malaysia, comprising an island and two smaller islets off the northwest coast of Borneo in the South China Sea. It serves as Malaysia's international offshore financial centre, operating under the Labuan Financial Services Authority (LFSA) with its own dedicated legal and tax framework distinct from Peninsular Malaysia law.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Labuan Companies</strong> – Offshore entities with a 3% flat tax on net audited profits (for trading activities) or zero tax for holding activities.</li><li><strong>Islamic Finance</strong> – A leading offshore Islamic finance hub with Labuan Islamic structures recognised under Sharia law.</li><li><strong>Funds</strong> – A cost-effective offshore fund domicile for Asia-Pacific fund managers.</li><li><strong>Leasing & Special Purpose Vehicles</strong> – Widely used for aircraft and ship leasing structures.</li><li><strong>Insurance & Captives</strong> – A recognised domicile for captive insurance and reinsurance.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Labuan is regulated by the Labuan Financial Services Authority (LFSA) and operates under the Labuan Financial Services and Securities Act. Malaysia as a sovereign provides political stability and institutional oversight. Labuan complies with FATF and OECD standards and has a beneficial ownership register. Malaysia's extensive double tax treaty network is partially accessible to Labuan entities engaged in substantive activities.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Labuan is the premier offshore financial centre for Southeast Asia's Muslim investor community and an established base for Asian Islamic finance structures. In 2025, it offers a cost-effective, credible offshore framework particularly suited to Malaysian-linked businesses, Islamic finance mandates, and Asia-Pacific fund and insurance structures seeking a regulated but affordable offshore environment.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "marshall" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>MARSHALL ISLANDS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,400</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Marshall Islands is an island country in the central Pacific Ocean, part of Micronesia, in free association with the United States. Despite its remote Pacific location, the Marshall Islands has developed a significant offshore corporate and ship registry sector, largely administered through a registrar office in Reston, Virginia, USA.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Ship Registry</strong> – The world's second-largest ship registry by deadweight tonnage, alongside Panama and Liberia. Widely used for international shipping companies.</li><li><strong>IBCs (Non-Resident Domestic Companies)</strong> – Simple, cost-effective offshore companies used for holding and trading structures.</li><li><strong>LLCs</strong> – Flexible structures with asset protection features used for holding investments and real estate.</li><li><strong>DAO LLCs</strong> – The Marshall Islands introduced legal recognition for DAOs as LLCs in 2022, positioning it alongside Wyoming for crypto-native structures.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Marshall Islands operates under US-influenced law with its own corporate statutes administered through the Registrar of Corporations. Political stability is maintained through its Compact of Free Association with the United States. The jurisdiction has faced FATF and OECD scrutiny due to limited physical regulatory infrastructure and has been on various grey lists. Company formation and registry services are efficiently managed by the Trust Company of the Marshall Islands (TCMI) from US offices.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>The Marshall Islands is best known for its ship registry and cost-effective offshore company formation. In 2025, its DAO LLC framework has attracted crypto and Web3 projects. While not a tier-1 financial jurisdiction, its US-backed stability, efficient company formation process, and dominant position in maritime shipping registries make it relevant for specific maritime, trading, and digital asset use cases.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "montenegro" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>MONTENEGRO</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,400</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Montenegro is a small Balkan country in southeastern Europe, bordered by Croatia, Bosnia and Herzegovina, Serbia, Kosovo, and Albania, with access to the Adriatic Sea. An EU candidate country since 2010, Montenegro uses the Euro as its currency and has been actively positioning itself as a business-friendly and investment destination. The capital is Podgorica.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Low Corporate Tax</strong> – A flat 9% corporate income tax rate, one of the lowest in Europe.</li><li><strong>Real Estate Investment</strong> – A growing destination for foreign real estate investment, particularly for luxury coastal and mountain properties.</li><li><strong>Residency by Investment</strong> – Montenegro's (now concluded) Citizenship by Investment Programme attracted international HNWIs seeking European mobility.</li><li><strong>Tourism & Hospitality Sector</strong> – Significant investment activity in hotel development, marina projects, and luxury resorts.</li><li><strong>EU Accession Path</strong> – Proximity to EU membership increases the jurisdiction's long-term investment attractiveness.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Montenegro operates under a civil law system influenced by former Yugoslav and European legal traditions. The Capital Market Authority and Central Bank of Montenegro oversee financial services. As a NATO member and EU candidate, Montenegro benefits from alignment with European regulatory standards. Political stability has been tested by post-independence challenges but remains broadly stable under democratic governance.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Montenegro is best suited for investors seeking a low-tax European base, real estate investment, or hospitality sector participation ahead of EU accession. In 2025, it is not a classical offshore jurisdiction but attracts cross-border investors through its 9% flat corporate tax, tourism development opportunities, and improving EU-aligned regulatory environment — making it a compelling emerging jurisdiction for regional business expansion.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "saintkitts" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SAINT KITTS</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 2,600</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Kitts is the larger island of the Federation of Saint Kitts and Nevis in the eastern Caribbean Sea, situated between the Atlantic Ocean and Caribbean Sea. Together with Nevis, it forms a small two-island federation and an independent Commonwealth nation. The capital is Basseterre.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>Citizenship by Investment (CBI)</strong> – Saint Kitts operates the world's oldest Citizenship by Investment Programme (established 1984), offering one of the most highly valued Caribbean passports with visa-free access to 150+ countries.</li><li><strong>IBCs</strong> – Offshore companies for holding and trading structures under the Companies Act.</li><li><strong>Trusts</strong> – Available for estate and asset protection planning under the Trusts Act.</li><li><strong>No Direct Taxes</strong> – No income, capital gains, inheritance, or wealth taxes at the federal level.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Kitts and Nevis operates under English common law with appeals to the Eastern Caribbean Supreme Court and ultimately the Privy Council. The Financial Services Regulatory Commission oversees financial services. The jurisdiction complies with FATF and OECD standards. Political stability is strong within the federal democratic framework and Commonwealth membership.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Kitts is primarily known for its Citizenship by Investment Programme — the world's most established CBI offering and a benchmark for other programmes. In 2025, it continues to attract HNWIs seeking second citizenship for global mobility, estate planning, and political risk diversification. As a corporate jurisdiction, it complements Nevis for asset protection mandates within the same federal legal framework.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "saintvincent" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SAINT VINCENT</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,350</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Vincent and the Grenadines is a Caribbean nation comprising the main island of Saint Vincent and a chain of smaller islands called the Grenadines. It is an independent Commonwealth nation and has developed a modest offshore financial sector, particularly known for low-cost IBC formation and forex/securities licensing.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>IBCs</strong> – Low-cost offshore company formation popular for trading, forex, and holding structures.</li><li><strong>Forex & Securities Licensing</strong> – A budget-tier licensing jurisdiction for retail forex brokers and securities dealers seeking offshore licensing at minimum cost.</li><li><strong>LLCs</strong> – Available for more flexible holding and asset management structures.</li><li><strong>No Direct Taxes</strong> – IBCs are exempt from local income and capital gains taxes on foreign income.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Vincent operates under English common law with appeals to the Eastern Caribbean Supreme Court. The Financial Services Authority (FSA) regulates financial services. Saint Vincent has faced regulatory concerns regarding its forex licensing regime and has been monitored for AML/CFT compliance. As a lower-tier jurisdiction, it should be assessed carefully for compliance-sensitive mandates.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Saint Vincent is best suited for cost-driven offshore incorporation and budget forex or securities licensing mandates. In 2025, it remains relevant for small operators and entrepreneurs seeking an offshore structure at minimum cost — though clients with banking requirements, institutional counterparties, or regulatory sensitivity should typically opt for a higher-tier jurisdiction.</p></div>
											</div>
										</div>
									</>
								)}

								{selectedJurisdiction === "samoa" && (
									<>
										<div className='flex items-start justify-between mb-6'>
											<div className='flex-1'>
												<div className='flex items-center gap-4 mb-2'><h2 className='text-3xl sm:text-4xl font-bold text-white' style={{ fontFamily: "var(--font-benzin)" }}>SAMOA</h2></div>
												<p className='text-lg sm:text-xl text-green-400 font-semibold' style={{ fontFamily: "var(--font-benzin)" }}>Company formation price: USD 1,100</p>
												<p className='text-sm text-gray-400 mt-2' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 1/2</p>
											</div>
											<motion.button onClick={() => closeJurisdictionDetail()} className='text-white/60 hover:text-white text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition flex-shrink-0' whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}>×</motion.button>
										</div>
										<div className='space-y-6 text-white' style={{ fontFamily: "var(--font-benzin)" }}>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Geography & Location</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Samoa (independent Samoa, not American Samoa) is a Polynesian island country in the South Pacific Ocean. It is an independent nation and Commonwealth member, having developed a small but recognised offshore financial centre focused primarily on cost-effective company formation and trust services. The capital is Apia.</p></div>
											<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>What It Is Best Known For</h3><ul className='list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed'><li><strong>IBCs (International Companies)</strong> – One of the most affordable Pacific offshore company jurisdictions, used for basic holding and trading structures.</li><li><strong>Trusts</strong> – Available under Samoa's International Trusts Act for asset protection planning.</li><li><strong>Foundations</strong> – Available for estate planning and asset structuring.</li><li><strong>Ship Registry</strong> – A developing ship registry for smaller vessels and yacht registration.</li></ul></div>
											<div className='pt-4 border-t border-white/20'>
												<p className='text-sm text-gray-400 mb-4' style={{ fontFamily: "var(--font-benzin)" }}>PAGE 2/2</p>
												<div><h3 className='text-xl sm:text-2xl font-bold mb-3'>Regulations & Stability</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Samoa operates under a mixed legal system combining English common law and Samoan customary law. The Central Bank of Samoa regulates financial services. The jurisdiction has faced FATF scrutiny and has worked to modernise its AML/CFT framework. Political stability is maintained under a democratic parliamentary system with strong traditional governance institutions.</p></div>
												<div className='mt-6'><h3 className='text-xl sm:text-2xl font-bold mb-3'>Current Offshore Standing</h3><p className='text-sm sm:text-base text-gray-300 leading-relaxed'>Samoa is a budget-tier Pacific offshore jurisdiction, broadly comparable to the Seychelles in positioning. In 2025, it is suitable for straightforward IBC formation at minimum cost — particularly for Asia-Pacific based businesses seeking a Pacific offshore presence. For mandates requiring banking relationships, regulatory credibility, or institutional counterparties, a higher-tier jurisdiction is recommended.</p></div>
											</div>
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
