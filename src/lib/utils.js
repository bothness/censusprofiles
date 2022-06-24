import { csvParse, autoType } from "d3-dsv";

export async function getData(url, fetch = window.fetch) {
  let res = await fetch(url);
  let str = await res.text();
  return csvParse(str, autoType);
}

export async function makeData(places, types, years, base, fetch = window.fetch) {
  let data = {};
  
  let pop_raw = await getData(`${base}/data/csv/population.csv`, fetch);
  let density_raw = await getData(`${base}/data/csv/density.csv`, fetch);
  let age_raw = await getData(`${base}/data/csv/age.csv`, fetch);

  types.forEach(type => {
    let population = pop_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)) && d.category == "total");
    let density = density_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)) && d.category == "density");

    years.forEach(y => {
      population.forEach(d => d[y + "_change"] = d[y - 10] ? 100 * ((d[y] - d[y - 10]) / d[y - 10]) : null);
      let pops = [...population].sort((a, b) => b[y] - a[y]);
      let chgs = y != years[0] ? [...population].sort((a, b) => b[y + "_change"] - a[y + "_change"]) : null;

      population.forEach(d => {
        let pop_i = pops.indexOf(d);
        d[y + "_rank"] = pop_i + 1;
        d[y + "_next"] = pop_i > 0 ? pops[pop_i - 1].areacd : null;
        d[y + "_prev"] = pop_i < pops.length - 1 ? pops[pop_i + 1].areacd : null;
        if (chgs) {
          let chg_i = chgs.indexOf(d);
          d[y + "_change_rank"] = chg_i + 1;
          d[y + "_change_next"] = chg_i > 0 ? chgs[chg_i - 1].areacd : null;
          d[y + "_change_prev"] = chg_i < chgs.length - 1 ? chgs[chg_i + 1].areacd : null;
        }
        d[y + "_index"] = d[y] / d[years[0]];
      });
      
      let dens = [...density].sort((a, b) => b[y] - a[y]);
      density.forEach(d => {
        let den_i = dens.indexOf(d);
        d[y + "_rank"] = den_i + 1;
        d[y + "_next"] = den_i > 0 ? dens[den_i - 1].areacd : null;
        d[y + "_prev"] = den_i < dens.length - 1 ? dens[den_i + 1].areacd : null;
      });
    });

    let pop_lookup = {};
    population.forEach(d => pop_lookup[d.areacd] = d);

    let sex = pop_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)) && ["male", "female"].includes(d.category));
    sex.forEach(d => years.forEach(y => {
      d[y + "_perc"] = (d[y] / pop_lookup[d.areacd][y]) * 100;
    }));

    let age = age_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)));
    age.forEach(d => years.forEach(y => {
      d[y + "_perc"] = (d[y] / pop_lookup[d.areacd][y]) * 100;
    }));

    data[type.key] = {population, sex, density, age};
  });

  return data;
}

export function getColor(value, breaks, colors) {
  for (let i = 1; i < breaks.length; i ++) {
    if (value <= breaks[i]) {
      return colors[i - 1];
    }
  }
}

export function plusminus(val, strings = ["+", "-", ""]) {
  if (val > 0) {
    return strings[0];
  } else if (val < 0) {
    return strings[1];
  } else {
    return strings[2];
  }
}

export function suffixer(int) {
  let mod = Math.round(int) % 10;
  let suffix = int > 10 && int < 20 ? 'th' : mod == 1 ? 'st' : mod == 2 ? 'nd' : mod == 3 ? 'rd' : 'th';
  return int + suffix;
}

export function changeClass(val) {
  return val > 0 ? 'increase' : val < 0 ? 'decrease' : 'nochange';
}

export function changeStr(val, suffix = '', decimals = 0) {
  return val != 0 ? Math.abs(val).toFixed(decimals) + suffix : suffix == 'pp' ? 'n/c' : 'no change';
}

export async function getTopo(url, layer, fetch = window.fetch) {
  let response = await fetch(url);
  let json = await response.json();
  let geojson = await feature(json, layer);
  return geojson;
}

export function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeSum(values) {
  return values ? values.reduce((a, b) => a + b) : 0;
}

export function isNA(arr) {
  let sum = arr ? arr.slice(0,-1).reduce((a, b) => a + b) : 0;
  return sum == 0;
}