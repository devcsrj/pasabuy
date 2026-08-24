export type ShipmentEvent = {
	id: string;
	date: string;
	time: string;
	from: string;
	to: string;
	location: string;
	caption: string;
	status: 'completed' | 'scheduled';
	proofImage?: string;
	proofLink?: string;
};

export type EventPerson = {
	name: string;
	avatar?: string;
	avatarEmoji?: string;
	alt: string;
};

// EDITABLE TRACKING DATA — update this object to change the valid code,
// shipment summary, and every event shown by the lookup and tracking pages.
export const shipment = {
	brand: 'Pasabuy Priority',
	division: 'Hand-Carried Parcel Division',
	trackingNumber: 'BAYMAX-513',
	package: '2 units',
	description: 'Classified hydration equipment',
	service: 'Hand-carry mode',
	origin: 'Kelapa Gading, Jakarta Utara',
	destination: 'The Grove, Pasig City',
	parcelImage: '/images/tumbler.jpg',
	handoff: {
		eventId: 'lobby-rj-room',
		handler: 'RJ',
		item: 'Parcel · 2 tumblers',
		location: 'Fatmawati lobby',
		avatar: '/images/crew/rj.jpg',
		proofStatus: 'Static receipt record · no upload attached'
	},
	eventPeople: {
		address: {
			name: 'Clara',
			avatar: '/images/crew/clara.jpg',
			alt: 'Clara, who completed the address verification'
		},
		custody: {
			name: 'Andreas',
			avatar: '/images/crew/andreas.jpg',
			alt: 'Andreas, the current shipment custodian'
		},
		fatmawati: {
			name: 'Bapak Paket',
			avatarEmoji: '🕶️',
			alt: 'Bapak Paket, an unidentified handler wearing sunglasses'
		},
		'reception-rj': {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, who received the shipment from the receptionist'
		},
		'lobby-rj-room': {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: "RJ, carrying the shipment to his room"
		},
		luggage: {
			name: 'RJ',
			avatar: '/images/crew/clara.jpg',
			alt: "RJ, packing the shipment into his luggage"
		},
		airport: {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, departing for the airport'
		},
		singapore: {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, in transit to Singapore'
		},
		crk: {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, in transit to Clark'
		},
		pandan: {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, arriving in Pandan'
		},
		marquee: {
			name: 'RJ',
			avatar: '/images/crew/rj.jpg',
			alt: 'RJ, dropping off the shipment at LBC Marquee'
		},
		grove: {
			name: 'Javi',
			avatar: '/images/crew/javi.jpg',
			alt: 'Javi, the destination recipient in Grove, Pasig'
		}
	} as Record<string, EventPerson>,
	current: {
		status: 'Held by RJ',
		location: 'Apartemen Fatmawati, Jakarta Selatan',
		date: 'Aug 24, 2026',
		time: '12:13 WIB',
		message: 'The shipment is secure and awaiting its next scheduled hand-off.'
	},
	events: [
		{
			id: 'address',
			date: 'Aug 23',
			time: '19:10 WIB',
			from: 'Clara',
			to: 'Andreas',
			location: 'Kelapa Gading, Jakarta Utara',
			caption: "Clara double-checks the coordinates like she's planning a heist, not a hand-carry.",
			status: 'completed'
		},
		{
			id: 'custody',
			date: 'Aug 24',
			time: '10:00 WIB',
			from: 'Andreas',
			to: 'Bapak paket',
			location: 'Kelapa Gading, Jakarta Utara',
			caption:
				"Andreas offloads the tumblers to a man known only as 'Bapak Paket.' No further questions asked, no receipt given.",
			status: 'completed',
			proofImage: '/images/proof-custody.jpg',
			proofLink: 'https://express.grab.com/Gu_9lDwk1oLi-UEa0F9_UgRwOCiKTF8GpFa6qc0wPPA='
		},
		{
			id: 'fatmawati',
			date: 'Aug 24',
			time: '11:20 WIB',
			from: 'Bapak paket',
			to: 'Receptionist, Apartemen Fatmawati',
			location: 'Apartemen Fatmawati, Jakarta Selatan',
			caption:
				'Bapak Paket marches the tumblers toward the front desk like a prisoner exchange. Identity: classified.',
      status: 'completed',
      proofImage: '/images/proof-fatmawati.jpg',
		},
		{
			id: 'reception-rj',
			date: 'Aug 24',
			time: '12:10 WIB',
			from: 'Receptionist, Apartemen Fatmawati',
			to: 'RJ',
			location: 'Apartemen Fatmawati, Jakarta Selatan',
			caption: 'Receptionist hands off. RJ receives two tumblers and zero context.',
      status: 'completed',
      proofImage: '/images/proof-fatma_lobby.jpg',
		},
		{
			id: 'lobby-rj-room',
			date: 'Aug 24',
			time: '12:13 WIB',
			from: 'Lobby, Apartemen Fatmawati',
			to: "RJ's room",
			location: 'Apartemen Fatmawati, Jakarta Selatan',
			caption: 'RJ sneaks the package upstairs past a security detail of exactly nobody.',
			status: 'completed',
			proofImage: '/images/proof-fatma_room.jpg',
		},
		{
			id: 'luggage',
			date: 'Aug 24',
			time: '21:45 WIB',
			from: "RJ's room",
			to: "RJ's Luggage",
			location: 'Apartemen Fatmawati, Jakarta Selatan',
			caption: 'Tumblers wedged between three days of dirty socks. TSA will have questions.',
			status: 'scheduled'
		},
		{
			id: 'airport',
			date: 'Aug 25',
			time: '04:30 WIB',
			from: 'Apartemen Fatmawati',
			to: 'CGK',
			location: 'Soekarno–Hatta Intl (CGK), Jakarta',
			caption: 'Pre-dawn departure. RJ reconsiders every decision that led to this bag.',
			status: 'scheduled'
		},
		{
			id: 'singapore',
			date: 'Aug 25',
			time: 'Pending',
			from: 'CGK',
			to: 'SIN',
			location: 'Changi Airport (SIN), Singapore',
			caption: 'Somewhere over the Java Sea, two tumblers achieve main-character altitude.',
			status: 'scheduled'
		},
		{
			id: 'crk',
			date: 'Aug 25',
			time: 'Pending',
			from: 'SIN',
			to: 'CRK',
			location: 'Clark Intl (CRK), Pampanga',
			caption: "3h40m of turbulence, snacks, and a silent prayer the lids don't pop.",
			status: 'scheduled'
		},
		{
			id: 'pandan',
			date: 'Aug 26',
			time: '10:00 PHT',
			from: 'CRK',
			to: 'Apartment, Pandan',
			location: 'Pandan, Angeles City',
			caption: 'Back on Philippine soil. Customs has no idea what crimes these tumblers committed.',
			status: 'scheduled'
		},
		{
			id: 'marquee',
			date: 'Aug 27',
			time: '11:30 PHT',
			from: 'Apartment, Pandan',
			to: 'LBC Marquee',
			location: 'LBC Marquee, Angeles City',
			caption:
				'One counter between RJ and being done carrying someone else\'s hydration equipment.',
			status: 'scheduled'
		},
		{
			id: 'grove',
			date: 'Aug 27',
			time: 'Pending',
			from: 'LBC Angeles',
			to: 'Grove, Pasig',
			location: 'The Grove, Pasig City',
			caption: 'Javi receives the goods. Mission accomplished. Rate 5 stars pls.',
			status: 'scheduled'
		}
	] satisfies ShipmentEvent[]
} as const;

export function getShipment(code: string) {
	return code === shipment.trackingNumber ? shipment : undefined;
}
