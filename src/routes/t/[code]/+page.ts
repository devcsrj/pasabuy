import type { EntryGenerator } from './$types';
import { shipment } from '$lib/shipment';

export const prerender = true;

export const entries: EntryGenerator = () => [{ code: shipment.trackingNumber }];
