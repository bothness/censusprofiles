import fs from "fs";
import d3 from "d3-dsv";
import { years, types } from "./src/lib/config.js";

export function getData(path) {
  let str = fs.readFileSync(path).toString();
  return d3.csvParse(str, d3.autoType);
}

export function makeData(types, years) {
  let data = {};
  
  let pop_raw = getData(`source-data/csv/population.csv`);
  let density_raw = getData(`source-data/csv/density.csv`);
  let age_raw = getData(`source-data/csv/age.csv`);

  types.forEach(type => {
    console.log(`Processing ${type.plural}...`);
    let population = pop_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)) && d.category == "total");
    let density = density_raw.filter(d => type.codes.includes(d.areacd.slice(0, 3)) && d.category == "density");
    let count;

    years.forEach(y => {
      population.forEach(d => d[y + "_change"] = d[y - 10] ? 100 * ((d[y] - d[y - 10]) / d[y - 10]) : null);
      count = population.length;
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

    let codes = population.map(d => d.areacd);

    codes.forEach(code => {
      let str = fs.readFileSync(`source-data/json/${code}.json`).toString();
      let geojson = JSON.parse(str);
      let place = geojson.properties;
      place.data = {};
      ["population", "density"].forEach(dataset => {
        place.data[dataset] = data[type.key][dataset].find(d => d.areacd == code);
      });
      ["sex", "age"].forEach(dataset => {
        place.data[dataset] = data[type.key][dataset].filter(d => d.areacd == code);
      });
      place.type = {code: type.key, label: type.label, count};
      fs.writeFileSync(`static/data/json/${code}.json`, JSON.stringify(place));
      console.log(`Saving ${code}.json for ${place.areanm}`);
    });
  });

  return true;
}

makeData(types, years);