// CORE CONFIG
export const themes = {
  'light': {
		'name': 'light',
    'text': '#222',
    'muted': '#777',
    'pale': '#f0f0f0',
    'background': '#fff'
  },
  'dark': {
		'name': 'dark',
    'text': '#fff',
    'muted': '#bbb',
    'pale': '#333',
    'background': '#222'
  }
};

export const years = [1981, 1991, 2001, 2011, 2021];

export const types = [
	{key: "ew", codes: ["K04"], count: 1},
	{key: "ctry", label: "country", plural: "countries", codes: ["E92", "W92"], parent: "K04000001", count: 2},
	{key: "rgn", label: "region", plural: "regions", codes: ["E12"], parent: "E92000001", count: 9},
	{key: "cty", label: "county", plural: "counties", codes: ["E10"], parent: "E92000001", count: 24},
	{key: "lad", label: "district", label_lng: "local authority district", plural: "districts", codes: ["E06", "E07", "E08", "E09", "W06"], parent: "K04000001", count: 331}
];

export const mapsources = [
  {
    key: "authority",
    url: "https://cdn.jsdelivr.net/gh/bothness/map-tiles/authorities/{z}/{x}/{y}.pbf",
    promoteId: "areacd",
    layers: [
      {
        key: "lad",
        filter: ["all", ["==", "lower", "true"], ["in", "country", "E", "W"]]
      },
      {
        key: "cty",
        filter: ["all", ["==", "upper", "true"], ["in", "country", "E", "W"]]
      }
    ]
  },
  {
    key: "region",
    url: "https://cdn.jsdelivr.net/gh/bothness/map-tiles/authorities/{z}/{x}/{y}.pbf",
    promoteId: "areacd",
    layers: [
      {
        key: "rgn",
        filter: ["all", ["==", "region", "true"], ["in", "country", "E", "W"]]
      },
      {
        key: "ctry",
        filter: ["all", ["==", "nation", "true"], ["in", "country", "E", "W"]]
      }
    ]
  }
];