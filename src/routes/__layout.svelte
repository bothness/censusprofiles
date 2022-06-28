<script context="module">
	const prerender = true;

  import { base } from "$app/paths";
  import { getData } from "$lib/utils";
  import { years } from "$lib/config";
  
	export async function load({ fetch }) {
		let places = await getData(`${base}/data/csv/places.csv`, fetch);
    places.sort((a, b) => a.areanm.localeCompare(b.areanm));
    let lookup = {};
		places.forEach(d => lookup[d.areacd] = d);

    let res = await fetch(`${base}/data/json/K04000001.json`);
		let ew = await res.json();

		return {
			stuff: { places, lookup, ew }
		};
	}
</script>
<script>
  import "../app.css";
  import { page } from '$app/stores';
	import { setContext } from "svelte";
	import { themes } from "$lib/config";
  import PhaseBanner from "$lib/layout/PhaseBanner.svelte";
	import ONSFooterLite from "$lib/layout/ONSFooterLite.svelte";
  import AnalyticsBanner from "$lib/layout/AnalyticsBanner.svelte";
	
  // For localisation of menu etc
  let path = $page.url.pathname;
  let lang = $page.url.hostname.split(".")[0] == "cy" ? "cy" : "en";
  let baseurl = lang == "cy" ? "//cy.ons.gov.uk" : "//www.ons.gov.uk";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark', defined in config.js)
  let theme = "light";
  setContext("theme", themes[theme]);

  // GOOGLE ANALYTICS
  // Settings for page analytics. Values must be shared with <AnalyticsBanner> component
  const analyticsId = "GTM-MBCBVQS";
  const analyticsProps = {
    "contentTitle": "Census area profiles - prototype",
    "releaseDate": "20220624",
    "contentType": "exploratory"
  };

  const survey_url = "https://www.surveymonkey.co.uk/r/N3FKCL9";
</script>

<AnalyticsBanner {analyticsId} {analyticsProps}/>
<PhaseBanner url={survey_url}/>

<header style:background-color="#206095" style:color="white">
  <div class="wrapper">
    <h1 class="title">Census area profiles, {years[0]} to {years[years.length - 1]}</h1>
  </div>
</header>

<main id="main" tabindex="-1">
  <slot/>
</main>

<ONSFooterLite>
  <p class="footer-text">
    This prototype is made using a historical census timeseries dataset covering areas in England and Wales from 1981 up to the most recent 2021 Census (<a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/adhocs/14812ct210002sextimeseriescensus1981to2021" rel="external">1</a>, <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/adhocs/14813ct210003agetimeseriescensus1981to2021" rel="external">2</a>, <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/adhocs/14814ct210004sexbyagetimeseriescensus1981to2021" rel="external">3</a>, <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/adhocs/14815ct210005populationdensitytimeseriescensus1981to2021" rel="external">4</a>), and geographic data from the <a href="https://geoportal.statistics.gov.uk/" rel="external">ONS Open Geography Portal</a>. Population counts should match published ONS datasets, which are rounded to the nearest 100 people for the latest 2021 census. However, percentage figures are not official.
  </p>
  <p class="footer-text">
    This project is a work in progress by the ONS digital content team, and may not lead to a final product. If you have any comments or suggestions please <a href="{survey_url}" rel="external">share them here</a>, or send a tweet/DM to project lead <a href="https://twitter.com/bothness" rel="external">Ahmad Barclay</a>. This page was coded using Svelte Kit and Maplibre GL, and the source code can be <a href="https://github.com/bothness/censusprofiles" rel="external">found here</a>.
  </p>
</ONSFooterLite>

<style>
  h1 {
    font-size: 32px;
    line-height: 42px;
    font-weight: bold;
    margin: 26px 0;
    padding: 0;
  }
  /* .subhead {
    font-size: 18px;
    line-height: 28px;
    margin: 0 0 28px 0;
    padding: 0;
  } */
  p.footer-text {
    font-size: 1.1em;
    margin: 0;
    padding: 40px 0 5px 0;
  }
  p.footer-text + p.footer-text {
    padding-top: 10px;
  }
</style>