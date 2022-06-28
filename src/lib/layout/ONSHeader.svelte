<script>
	export let path = "/";
	export let lang = "en";
	export let baseurl = "//www.ons.gov.uk";

	let menuExpanded = false;
	let searchExpanded = false;
	
	let menu = [
		{
			label_en: "Business, industry and trade",
			label_cy: "Busnes, diwydiant a masnach",
			url: "/businessindustryandtrade",
			expanded: false,
			children: [
				{label_en: "Business", label_cy: "Busnes", url: "/businessindustryandtrade/business"},
				{label_en: "Changes to business", label_cy: "Newidiadau i fusnesau", url: "/businessindustryandtrade/changestobusiness"},
				{label_en: "Construction industry", label_cy: "Diwydiant adeiladu", url: "/businessindustryandtrade/constructionindustry"},
				{label_en: "IT and internet industry", label_cy: "Y diwydiant TG a'r rhyngrwyd", url: "/businessindustryandtrade"},
				{label_en: "International trade", label_cy: "Masnach ryngwladol", url: "/businessindustryandtrade/itandinternetindustry"},
				{label_en: "Manufacturing and production industry", label_cy: "Y diwydiant gweithgynhyrchu a chynhyrchu", url: "/businessindustryandtrade/manufacturingandproductionindustry"},
				{label_en: "Retail industry", label_cy: "Y diwydiant manwerthu", url: "/businessindustryandtrade/retailindustry"},
				{label_en: "Tourism industry", label_cy: "Y diwydiant twristiaeth", url: "/businessindustryandtrade/tourismindustry"}
			]
		},
		{
			label_en: "Economy",
			label_cy: "Yr economi",
			url: "/economy",
			expanded: false,
			children: [
				{label_en: "Economic output and productivity", label_cy: "Allgynnyrch economaidd a chynhyrchiant", url: "/economy/economicoutputandproductivity"},
				{label_en: "Environmental accounts", label_cy: "Cyfrifon amgylcheddol", url: "/economy/environmentalaccounts"},
				{label_en: "Government, public sector and taxes", label_cy: "Llywodraeth, y sector cyhoeddus a threthi", url: "/economy/governmentpublicsectorandtaxes"},
				{label_en: "Gross Domestic Product (GDP)", label_cy: "Cynnyrch Domestig Gros (CDG)", url: "/economy/grossdomesticproductgdp"},
				{label_en: "Gross Value Added (GVA)", label_cy: "Gwerth Ychwanegol Gros", url: "/economy/grossvalueaddedgva"},
				{label_en: "Inflation and price indices", label_cy: "Mynegeion chwyddiant a phrisiau", url: "/economy/inflationandpriceindices"},
				{label_en: "Investments, pensions and trusts", label_cy: "Buddsoddiadau, pensiynau ac ymddiriedolaethau", url: "/economy/investmentspensionsandtrusts"},
				{label_en: "National accounts", label_cy: "Cyfrifon gwladol", url: "/economy/nationalaccounts"},
				{label_en: "Regional accounts", label_cy: "Cyfrifon rhanbarthol", url: "/economy/regionalaccounts"}
			]
		},
		{
			label_en: "Employment and labour market",
			label_cy: "Cyflogaeth a'r farchnad lafur",
			url: "/employmentandlabourmarket",
			expanded: false,
			children: [
				{label_en: "People in work", label_cy: "Pobl mewn gwaith", url: "/employmentandlabourmarket/peopleinwork"},
				{label_en: "People not in work", label_cy: "Pobl nad ydynt mewn gwaith", url: "/employmentandlabourmarket/peoplenotinwork"}
			]
		},
		{
			label_en: "People, population and community",
			label_cy: "Pobl, y boblogaeth a chymunedau",
			url: "/peoplepopulationandcommunity",
			expanded: false,
			children: [
				{label_en: "Births, deaths and marriages", label_cy: "Genedigaethau, marwolaethau a phriodasau", url: "/peoplepopulationandcommunity/birthsdeathsandmarriages"},
				{label_en: "Crime and justice", label_cy: "Troseddu a chyfiawnder", url: "/peoplepopulationandcommunity/crimeandjustice"},
				{label_en: "Cultural identity", label_cy: "Hunaniaeth ddiwylliannol", url: "/peoplepopulationandcommunity/culturalidentity"},
				{label_en: "Education and childcare", label_cy: "Addysg a gofal plant", url: "/peoplepopulationandcommunity/educationandchildcare"},
				{label_en: "Elections", label_cy: "Etholiadau", url: "/peoplepopulationandcommunity/elections"},
				{label_en: "Health and social care", label_cy: "Iechyd a gofal cymdeithasol", url: "/peoplepopulationandcommunity/healthandsocialcare"},
				{label_en: "Household characteristics", label_cy: "Nodweddion aelwydydd", url: "/peoplepopulationandcommunity/householdcharacteristics"},
				{label_en: "Housing", label_cy: "Tai", url: "/peoplepopulationandcommunity/housing"},
				{label_en: "Leisure and tourism", label_cy: "Hamdden a thwristiaeth", url: "/peoplepopulationandcommunity/leisureandtourism"},
				{label_en: "Personal and household finances", label_cy: "Cyllid personol a chyllid aelwydydd", url: "/peoplepopulationandcommunity/personalandhouseholdfinances"},
				{label_en: "Population and migration", label_cy: "Poblogaeth ac ymfudo", url: "/peoplepopulationandcommunity/populationandmigration"},
				{label_en: "Well-being", label_cy: "Lles", url: "/peoplepopulationandcommunity/wellbeing"}
			]
		},
		{label_en: "Taking part in a survey?", label_cy: "Cymryd rhan mewn arolwg?", url: "/surveys"},
		{label_en: "Release calendar", label_cy: "Calendar datganiadau", url: "/releasecalendar", secondary: true},
		{label_en: "Methodology", label_cy: "Methodoleg", url: "/methodology", secondary: true},
		{label_en: "Media", label_cy: "Media", url: "/news", secondary: true},
		{label_en: "About", label_cy: "Amdanom ni", url: "/aboutus", secondary: true},
		{label_en: "Blog", label_cy: "Blog", url: "https://blog.ons.gov.uk/", secondary: true}
	];

	const texts = {
		"Home": "Hafan",
		"Search": "Chwilio",
		"Menu": "Dewislen",
		"Hide search": "Cuddio",
		"Office for National Statistics logo - Homepage": "Logo Swyddfa Ystadegau Gwladol - Hafan",
		"Search for a keyword(s) or time series ID": "Chwilio am allweddair neu ID cyfres amser"
	};

	function i18n(text, lang) {
		return lang == "cy" && texts[text] ? texts[text] : text;
	}

	function toggle_sm(e, i) {
		if (window.matchMedia("(max-width:767px)").matches) {
			e.preventDefault();
			menu[i].expanded = !menu[i].expanded;
		}
	}
</script>

<header>
	<a class="skiplink" href="#main" tabindex="0">
		{i18n('Skip to main content', lang)}
	</a>
	<div id="pagePath" class="hide">{path}</div>
	<div class="wrapper">
		<div class="header col-wrap">
			<div class="col col--lg-one-third col--md-one-third">
				<a href="{baseurl}/">
				<img class="logo" src="https://cdn.ons.gov.uk/assets/images/ons-logo/v2/ons-logo.svg" alt="{i18n('Office for National Statistics logo - Homepage', lang)}">
				</a>
			</div>
			<div class="col col--lg-two-thirds col--md-two-thirds hide--sm print--hide language--js__container">
				<div class="language">
					{#if lang =="en"}
					<span>English (EN) | </span>
					<a href="//cy.ons.gov.uk{path}" class="language__link" lang="cy">Cymraeg (CY)</a>
					{:else}
					<a href="//www.ons.gov.uk{path}" class="language__link" lang="en">English (EN)</a>
					<span> | Cymraeg (EN)</span>
					{/if}
				</div>
			</div>
			<div class="secondary-nav col col--lg-two-thirds col--md-two-thirds print--hide">
				<ul class="secondary-nav__list js-nav-clone__list">
					{#each menu.filter(d => d.secondary) as item}
					<li class="secondary-nav__item">
						<a class="secondary-nav__link js-nav-clone__link" href="{baseurl}{item.url}">{item["label_" + lang]}</a>
					</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="primary-nav print--hide">
		<nav aria-label="Header links">
			<ul class="nav--controls">
				<li class="nav--controls__item" class:menu-is-expanded={menuExpanded}>
					<a href="#nav-primary" id="menu-toggle" aria-controls="nav-primary" aria-expanded="{menuExpanded}" class="nav--controls__menu" on:click|preventDefault={() => {menuExpanded = !menuExpanded; searchExpanded = false;}}>
					<span class="nav--controls__text">{i18n('Menu', lang)}</span>
					</a>
				</li>
				<li class="nav--controls__item" class:search-is-expanded={searchExpanded}>
					<a href="#nav-search" id="search-toggle" aria-controls="nav-search" aria-expanded="{searchExpanded}" class="nav--controls__search" on:click|preventDefault={() => {searchExpanded = !searchExpanded; menuExpanded = false;}}>
					<span class="nav--controls__text">{searchExpanded ? i18n('Hide search', lang) : i18n('Search', lang)}</span>
					</a>
				</li>
			</ul>
			<ul class="wrapper primary-nav__list" class:nav-main--hidden={!menuExpanded} id="nav-primary" aria-expanded="{menuExpanded}">
				<li class="primary-nav__item  js-nav"><a class="primary-nav__link col col--md-7 col--lg-9" href="{baseurl}/" style="color: #e5e6e7">{i18n("Home", lang)}</a></li>
				{#each [...menu.filter(d => d.children).sort((a, b) => a["label_" + lang].localeCompare(b["label_" + lang])), ...menu.filter(d => !d.children)] as item, i}
				{#if item.children}
				<li class="primary-nav__item js-nav js-expandable" class:js-expandable-active={item.expanded}>
					<a class="primary-nav__link col col--md-8 col--lg-10" href="{baseurl}{item.url}" aria-expanded="false" aria-label="{item["label_" + lang]} sub menu" on:click={e => toggle_sm(e, i)}>
					<span aria-hidden="true" class="expansion-indicator"></span>
					<span class="submenu-title">
					{item["label_" + lang]}
					</span>
					</a>
					<ul class="primary-nav__child-list col col--md-16 col--lg-20 js-expandable__content jsEnhance" class:js-nav-hidden={!item.expanded} aria-expanded="{item.expanded}" aria-label="submenu">
						<li class="primary-nav__child-item js-expandable__child hide--md">
							<a class="primary-nav__child-link" tabindex="-1" href="{baseurl}{item.url}">{item["label_" + lang]}</a>
						</li>
						{#each [...item.children].sort((a, b) => a["label_" + lang].localeCompare(b["label_" + lang])) as child}
						<li class="primary-nav__child-item js-expandable__child">
							<a class="primary-nav__child-link" tabindex="-1" href="{baseurl}{child.url}">{child["label_" + lang]}</a>
						</li>
						{/each}
					</ul>
				</li>
				{:else}
				<li class="primary-nav__item  js-nav" class:hide--md={item.secondary}>
					<a class="primary-nav__link  col col--md-8 col--lg-10" href="{baseurl}{item.url}">
					{item["label_" + lang]}
					</a>
				</li>
				{/if}
				{/each}
				<li class="hide--md primary-nav__language">
					{#if lang =="en"}
					<span>English (EN) | </span>
					<a href="//cy.ons.gov.uk{path}" class="language__link" lang="cy">Cymraeg (CY)</a>
					{:else}
					<a href="//www.ons.gov.uk{path}" class="language__link" lang="en">English (EN)</a>
					<span> | Cymraeg (EN)</span>
					{/if}
				</li>
			</ul>
		</nav>
	</div>
	<div class="search print--hide" class:nav-search--hidden={!searchExpanded} id="searchBar" aria-expanded="{searchExpanded}">
		<div class="wrapper" role="search">
			<form class="col-wrap search__form" action="{baseurl}/search">
				<label class="search__label col col--md-23 col--lg-24" for="nav-search">{i18n('Search for a keyword(s) or time series ID', lang)}</label>
				<input type="search" autocomplete="off" class="search__input col col--md-21 col--lg-32" id="nav-search" name="q" value="">
				<button type="submit" class="search__button col--md-3 col--lg-3" id="nav-search-submit">
				<span class="visuallyhidden">{i18n('Search', lang)}</span>
				<span class="icon icon-search--light"></span>
				</button>
			</form>
		</div>
	</div>
</header>