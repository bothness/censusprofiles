const prerender = true;

import { base } from "$app/paths";
import { getData } from "$lib/utils";
  
export async function load({ fetch }) {
	let places = await getData(`${base}/data/csv/places.csv`, fetch);
	places.sort((a, b) => a.areanm.localeCompare(b.areanm));
	let lookup = {};
	places.forEach(d => lookup[d.areacd] = d);

	let res = await fetch(`${base}/data/json/K04000001.json`);
	let ew = await res.json();

	return { places, lookup, ew };
}
