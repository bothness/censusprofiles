export const prerender = true;

import { base } from "$app/paths";
import { types } from "$lib/config";

export async function load({ fetch, params, parent }) {
	const stuff = await parent();
	let places = stuff.places;
	let lookup = stuff.lookup;

	let place = null;
	let type = null;
	let child_type = null;
	let count = null;
	let ew = stuff.ew;

	let code = params.code.replaceAll("/", "");
	if (lookup[code]) {
		type = types.find(t => t.codes.includes(code.slice(0,3)));
		let res = await fetch(`${base}/data/json/${code}.json`);
		place = await res.json();
		count = place.type.count;

		let type_i = types.indexOf(type);
		child_type = type_i == types.length - 1 ? null : place.areacd == "W92000004" ? types[type_i + 2] : types[type_i + 1];
	}
	
    return { places, lookup, place, ew, type, child_type, count }
}