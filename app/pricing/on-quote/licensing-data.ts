/**
 * On Quote Group 2: International Licensing, jurisdiction and license type by table.
 */

export interface LicensingRow {
	readonly jurisdiction: string;
	readonly license: string;
}

function row(jurisdiction: string, license: string): LicensingRow {
	return { jurisdiction, license };
}

/** Europe: CASP / Crypto / Financial Licenses */
export const europeCaspRows: LicensingRow[] = [
	row("Austria", "CASP License"),
	row("Bulgaria", "CASP License"),
	row("Croatia", "CASP License"),
	row("Cyprus", "CASP License"),
	row("Czech Republic", "CASP License"),
	row("Estonia", "CASP License"),
	row("Finland", "CASP License"),
	row("France", "CASP License"),
	row("Germany", "CASP License"),
	row("Hungary", "CASP License"),
	row("Ireland", "CASP License"),
	row("Italy", "CASP License"),
	row("Latvia", "CASP License"),
	row("Lithuania", "CASP License"),
	row("Luxembourg", "CASP License"),
	row("Malta", "CASP License"),
	row("Netherlands", "CASP License"),
	row("Poland", "CASP License"),
	row("Slovakia", "CASP License"),
	row("Slovenia", "CASP License"),
	row("Spain", "CASP License"),
	row("Sweden", "CASP License"),
	row("Bosnia and Herzegovina", "Crypto License"),
	row("Gibraltar", "Crypto License"),
	row("Norway", "Crypto License"),
	row("Switzerland", "Crypto License"),
	row("United Kingdom", "Crypto License"),
	row("Luxembourg", "Alternative Investment License"),
];

/** Asia & Middle East */
export const asiaMiddleEastRows: LicensingRow[] = [
	row("Abu Dhabi (ADGM)", "Crypto License"),
	row("Dubai (UAE)", "Crypto License"),
	row("Georgia", "Crypto License"),
	row("United Arab Emirates", "Crypto License"),
];

/** Africa */
export const africaRows: LicensingRow[] = [
	row("Anjouan", "Gambling License"),
	row("Seychelles", "Crypto License"),
	row("South Africa", "FSP License"),
];

/** Americas */
export const americasRows: LicensingRow[] = [
	row("Bermuda", "Crypto License"),
	row("British Virgin Islands", "Approved Manager Registration"),
	row("British Virgin Islands", "Crypto License"),
	row("British Virgin Islands", "Fund License"),
	row("British Virgin Islands", "Forex License"),
	row("Canada", "Crypto License"),
	row("Canada", "MSB License"),
	row("Cayman Islands", "Crypto License"),
	row("Curaçao", "Crypto License"),
	row("Curaçao", "Gaming License"),
	row("El Salvador", "Crypto License"),
	row("Saint Lucia", "Crypto License"),
	row("Belize", "International Banking License"),
	row("Dominica", "Banking License"),
	row("Puerto Rico", "Bank License"),
];

/** Oceania */
export const oceaniaRows: LicensingRow[] = [
	row("Australia", "Cryptocurrency Regulatory Approval"),
];

/** United States & Canada – Registrations */
export interface RegistrationRow {
	readonly jurisdiction: string;
	readonly registration: string;
}

export const usCanadaRegistrations: RegistrationRow[] = [
	{ jurisdiction: "United States", registration: "MSB Registration" },
	{ jurisdiction: "United States", registration: "Money Transmitter License (MTL)" },
	{ jurisdiction: "Canada", registration: "MSB Registration" },
];

/** Forex Licenses */
export const forexRows: LicensingRow[] = [
	row("Vanuatu", "Forex License"),
	row("Seychelles", "Forex License"),
	row("Mauritius", "Forex License"),
];
