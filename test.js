import _ from 'lodash'
import { createSelector } from 'reselect'
import fp from 'lodash/fp'

const productSearch = {"bookingType":"","currency":"CZK","globalAttributes":{"sortingOrder":"price","showingResultsFrom":0,"resultsPerPage":10,"showSegments":true},"groupIdList":[],"hotel":{"category":{"stars":"2"},"globalTypeList":{"list":[]},"hotelAttributesList":{"list":[]},"rooms":{"boardCodeList":[],"codeList":[]},"qualifiers":{"data":{"list":[{"name":"1","operator":"le","value":"200"},{"name":"9","operator":"le","value":"2000"}]}}},"flight":{"airlineCodes":[],"departureAirports":[],"ignoreOpenJaw":true,"stopOver":10000},"maxPrice":{"amount":50000,"perPersonAmount":0,"perPerson":true},"minPrice":{"amount":1,"perPersonAmount":1,"perPerson":true},"staticGroupIdList":[],"travellers":{"adults":[{"age":25},{"age":25}],"children":[]},"travelPeriod":{"departureDate":"2019-04-18","departureMaxTime":null,"departureMinTime":null,"duration":"7","exactDepartureDate":false,"exactReturnDate":false,"returnDate":"2019-06-17","returnMaxTime":null,"returnMinTime":null}}
const options = {
  "travelPeriodDuration": [
    {
      "label": "",
      "value": null,
      "children": [
        {
          "label": "nerozhoduje",
          "value": "-1",
          "__typename": "DurationOption"
        },
        {
          "label": "1 týden",
          "value": "7",
          "__typename": "DurationOption"
        },
        {
          "label": "2 týdny",
          "value": "14",
          "__typename": "DurationOption"
        },
        {
          "label": "3 týdny",
          "value": "21",
          "__typename": "DurationOption"
        }
      ],
      "__typename": "DurationOption"
    },
    {
      "label": "vlastní",
      "value": null,
      "children": [
        {
          "label": "0-3 noci",
          "value": "0-3",
          "__typename": "DurationOption"
        },
        {
          "label": "3-5 nocí",
          "value": "3-5",
          "__typename": "DurationOption"
        },
        {
          "label": "5-7 nocí",
          "value": "5-7",
          "__typename": "DurationOption"
        },
        {
          "label": "7-12 nocí",
          "value": "7-12",
          "__typename": "DurationOption"
        },
        {
          "label": "10-14 nocí",
          "value": "10-14",
          "__typename": "DurationOption"
        }
      ],
      "__typename": "DurationOption"
    },
    {
      "label": "přesný",
      "value": null,
      "children": [
        {
          "label": "0 nocí",
          "value": "0",
          "__typename": "DurationOption"
        },
        {
          "label": "1 noc",
          "value": "1",
          "__typename": "DurationOption"
        },
        {
          "label": "2 noci",
          "value": "2",
          "__typename": "DurationOption"
        },
        {
          "label": "3 noci",
          "value": "3",
          "__typename": "DurationOption"
        },
        {
          "label": "4 noci",
          "value": "4",
          "__typename": "DurationOption"
        },
        {
          "label": "5 nocí",
          "value": "5",
          "__typename": "DurationOption"
        },
        {
          "label": "6 nocí",
          "value": "6",
          "__typename": "DurationOption"
        },
        {
          "label": "7 nocí",
          "value": "7",
          "__typename": "DurationOption"
        },
        {
          "label": "8 nocí",
          "value": "8",
          "__typename": "DurationOption"
        },
        {
          "label": "9 nocí",
          "value": "9",
          "__typename": "DurationOption"
        },
        {
          "label": "10 nocí",
          "value": "10",
          "__typename": "DurationOption"
        },
        {
          "label": "11 nocí",
          "value": "11",
          "__typename": "DurationOption"
        },
        {
          "label": "12 nocí",
          "value": "12",
          "__typename": "DurationOption"
        },
        {
          "label": "13 nocí",
          "value": "13",
          "__typename": "DurationOption"
        },
        {
          "label": "14 nocí",
          "value": "14",
          "__typename": "DurationOption"
        },
        {
          "label": "15 nocí",
          "value": "15",
          "__typename": "DurationOption"
        }
      ],
      "__typename": "DurationOption"
    }
  ],
  "mainGlobalTypes": [
    {
      "label": "Přímo na pláži",
      "value": "GT03-DIBE#ST03-DIRE",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Bazén",
      "value": "GT03-POOL",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Rodina",
      "value": "GT03-FAFR",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Top-hotel",
      "value": "GT03-CHPL",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Fitness",
      "value": "GT03-FITN",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Tenis",
      "value": "GT03-TENN",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Bar",
      "value": "GT03-BARR",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Klimatizace",
      "value": "GT03-AICO",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Wi-Fi",
      "value": "GT03-INTE#ST03-WLAN",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Městský hotel",
      "value": "GT03-CITR",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Lázně / spa",
      "value": "GT03-SPAA",
      "children": [],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Dětský klub",
      "value": "GT03-KICL",
      "children": [],
      "__typename": "GlobalTypeOption"
    }
  ],
  "subGlobalTypes": [
    {
      "label": "Rodina",
      "value": "GT03-FAMI",
      "children": [
        {
          "label": "Dětský klub",
          "value": "GT03-KICL",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Dětský bazén",
          "value": "GT03-CHPO",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Dětské hřiště",
          "value": "GT03-CHPL",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Vhodné pro rodiny",
          "value": "GT03-FAFR",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Skluzavky a tobogány",
          "value": "GT03-WASL",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Sport & Zábava",
      "value": "GT03-ACTO",
      "children": [
        {
          "label": "Fitness",
          "value": "GT03-FITN",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Golf",
          "value": "GT03-GOLF",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Beach-volejbal",
          "value": "GT03-BEVO",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Tenis",
          "value": "GT03-TENN",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Vodní sporty",
      "value": "GT03-WASP",
      "children": [
        {
          "label": "Windsurfing",
          "value": "GT03-WIND",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Jachting",
          "value": "GT03-SAIL",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Katamarán",
          "value": "GT03-CATA",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Šnorchlování",
          "value": "GT03-SNOR",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Kánoe/Kajak",
          "value": "GT03-CANO#GT03-KAYA",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Wellness",
      "value": "GT03-SPTO",
      "children": [
        {
          "label": "Lázně",
          "value": "GT03-SPAA",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Masáže",
          "value": "GT03-MASS",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Sauna",
          "value": "GT03-SAUN",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Solárium",
          "value": "GT03-SOLA",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Bazén",
      "value": "GT03-POOL",
      "children": [
        {
          "label": "Bazén",
          "value": "GT03-POOL",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Vnitřní bazén",
          "value": "GT03-POOL#ST03-INSW",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Vyhřívaný bazén",
          "value": "GT03-POOL#AT03-HEAT",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Typ zájezdu",
      "value": "GT03-ET00",
      "children": [
        {
          "label": "Pro rodiny s dětmi",
          "value": "GT03-ET11",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Zábavní parky",
          "value": "GT03-ET03",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Plavby lodí",
          "value": "GT03-ET01",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Poznávací zájezdy",
          "value": "GT03-ET02",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Eurovíkendy",
          "value": "GT03-ET04",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Lázně a wellness",
          "value": "GT03-ET06",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Golfové",
          "value": "GT03-ET09",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Pro seniory",
          "value": "GT03-ET08",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Lyžařské",
          "value": "GT03-ET05",
          "__typename": "GlobalTypeOption"
        },
        {
          "label": "Hory",
          "value": "GT03-ET10",
          "__typename": "GlobalTypeOption"
        }
      ],
      "__typename": "GlobalTypeOption"
    }
  ],
  "beachGlobalTypes": [
    {
      "label": "Nerozhoduje",
      "value": "",
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Písečná pláž",
      "value": "GT03-BEAC#ST03-SAND",
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Oblázková pláž",
      "value": "GT03-BEAC#ST03-GRAV",
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Molo",
      "value": "GT03-BEAC#ST03-PIER",
      "__typename": "GlobalTypeOption"
    },
    {
      "label": "Skalnatá",
      "value": "GT03-BEAC#ST03-ROCK",
      "__typename": "GlobalTypeOption"
    }
  ],
  "beachDistanceQualifiers": [
    {
      "label": "Vzdálenost od pláže: Nerozhoduje",
      "value": "",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Přímo u pláže",
      "value": "1_le_50",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Do 100 m",
      "value": "1_le_100",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Do 200 m",
      "value": "1_le_200",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Do 300 m",
      "value": "1_le_300",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Do 400 m",
      "value": "1_le_400",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od pláže: Do 500 m",
      "value": "1_le_500",
      "__typename": "StringOption"
    }
  ],
  "cityCenterDistanceQualifiers": [
    {
      "label": "Vzdálenost od centra města: Nerozhoduje",
      "value": "",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od centra města: Přímo v centru města",
      "value": "9_eq_0",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od centra města: < 2 km",
      "value": "9_le_2000",
      "__typename": "StringOption"
    },
    {
      "label": "Vzdálenost od centra města: < 10 km",
      "value": "9_le_10000",
      "__typename": "StringOption"
    }
  ],
  "times": [
    {
      "label": "00:00",
      "value": "00:00",
      "__typename": "StringOption"
    },
    {
      "label": "00:30",
      "value": "00:30",
      "__typename": "StringOption"
    },
    {
      "label": "01:00",
      "value": "01:00",
      "__typename": "StringOption"
    },
    {
      "label": "01:30",
      "value": "01:30",
      "__typename": "StringOption"
    },
    {
      "label": "02:00",
      "value": "02:00",
      "__typename": "StringOption"
    },
    {
      "label": "02:30",
      "value": "02:30",
      "__typename": "StringOption"
    },
    {
      "label": "03:00",
      "value": "03:00",
      "__typename": "StringOption"
    },
    {
      "label": "03:30",
      "value": "03:30",
      "__typename": "StringOption"
    },
    {
      "label": "04:00",
      "value": "04:00",
      "__typename": "StringOption"
    },
    {
      "label": "04:30",
      "value": "04:30",
      "__typename": "StringOption"
    },
    {
      "label": "05:00",
      "value": "05:00",
      "__typename": "StringOption"
    },
    {
      "label": "05:30",
      "value": "05:30",
      "__typename": "StringOption"
    },
    {
      "label": "06:00",
      "value": "06:00",
      "__typename": "StringOption"
    },
    {
      "label": "06:30",
      "value": "06:30",
      "__typename": "StringOption"
    },
    {
      "label": "07:00",
      "value": "07:00",
      "__typename": "StringOption"
    },
    {
      "label": "07:30",
      "value": "07:30",
      "__typename": "StringOption"
    },
    {
      "label": "08:00",
      "value": "08:00",
      "__typename": "StringOption"
    },
    {
      "label": "08:30",
      "value": "08:30",
      "__typename": "StringOption"
    },
    {
      "label": "09:00",
      "value": "09:00",
      "__typename": "StringOption"
    },
    {
      "label": "09:30",
      "value": "09:30",
      "__typename": "StringOption"
    },
    {
      "label": "10:00",
      "value": "10:00",
      "__typename": "StringOption"
    },
    {
      "label": "10:30",
      "value": "10:30",
      "__typename": "StringOption"
    },
    {
      "label": "11:00",
      "value": "11:00",
      "__typename": "StringOption"
    },
    {
      "label": "11:30",
      "value": "11:30",
      "__typename": "StringOption"
    },
    {
      "label": "12:00",
      "value": "12:00",
      "__typename": "StringOption"
    },
    {
      "label": "12:30",
      "value": "12:30",
      "__typename": "StringOption"
    },
    {
      "label": "13:00",
      "value": "13:00",
      "__typename": "StringOption"
    },
    {
      "label": "13:30",
      "value": "13:30",
      "__typename": "StringOption"
    },
    {
      "label": "14:00",
      "value": "14:00",
      "__typename": "StringOption"
    },
    {
      "label": "14:30",
      "value": "14:30",
      "__typename": "StringOption"
    },
    {
      "label": "15:00",
      "value": "15:00",
      "__typename": "StringOption"
    },
    {
      "label": "15:30",
      "value": "15:30",
      "__typename": "StringOption"
    },
    {
      "label": "16:00",
      "value": "16:00",
      "__typename": "StringOption"
    },
    {
      "label": "16:30",
      "value": "16:30",
      "__typename": "StringOption"
    },
    {
      "label": "17:00",
      "value": "17:00",
      "__typename": "StringOption"
    },
    {
      "label": "17:30",
      "value": "17:30",
      "__typename": "StringOption"
    },
    {
      "label": "18:00",
      "value": "18:00",
      "__typename": "StringOption"
    },
    {
      "label": "18:30",
      "value": "18:30",
      "__typename": "StringOption"
    },
    {
      "label": "19:00",
      "value": "19:00",
      "__typename": "StringOption"
    },
    {
      "label": "19:30",
      "value": "19:30",
      "__typename": "StringOption"
    },
    {
      "label": "20:00",
      "value": "20:00",
      "__typename": "StringOption"
    },
    {
      "label": "20:30",
      "value": "20:30",
      "__typename": "StringOption"
    },
    {
      "label": "21:00",
      "value": "21:00",
      "__typename": "StringOption"
    },
    {
      "label": "21:30",
      "value": "21:30",
      "__typename": "StringOption"
    },
    {
      "label": "22:00",
      "value": "22:00",
      "__typename": "StringOption"
    },
    {
      "label": "22:30",
      "value": "22:30",
      "__typename": "StringOption"
    },
    {
      "label": "23:00",
      "value": "23:00",
      "__typename": "StringOption"
    },
    {
      "label": "23:30",
      "value": "23:30",
      "__typename": "StringOption"
    },
    {
      "label": "23:59",
      "value": "23:59",
      "__typename": "StringOption"
    }
  ],
  "airlines": [
    {
      "label": "Nerozhoduje",
      "value": "",
      "__typename": "StringOption"
    },
    {
      "label": "Aegean Airways",
      "value": "A3",
      "__typename": "StringOption"
    },
    {
      "label": "Aeroflot",
      "value": "SU",
      "__typename": "StringOption"
    },
    {
      "label": "Air Berlin",
      "value": "AB",
      "__typename": "StringOption"
    },
    {
      "label": "Air Cairo",
      "value": "SM",
      "__typename": "StringOption"
    },
    {
      "label": "Air Canada",
      "value": "AC",
      "__typename": "StringOption"
    },
    {
      "label": "Air Europa",
      "value": "UX",
      "__typename": "StringOption"
    },
    {
      "label": "Air France",
      "value": "AF",
      "__typename": "StringOption"
    },
    {
      "label": "Air Malta",
      "value": "KM",
      "__typename": "StringOption"
    },
    {
      "label": "Air Mauritius",
      "value": "MK",
      "__typename": "StringOption"
    },
    {
      "label": "Air Portugal (TAP)",
      "value": "TP",
      "__typename": "StringOption"
    },
    {
      "label": "Alitalia",
      "value": "AZ",
      "__typename": "StringOption"
    },
    {
      "label": "Austrian Airlines",
      "value": "OS",
      "__typename": "StringOption"
    },
    {
      "label": "British Airways",
      "value": "BA",
      "__typename": "StringOption"
    },
    {
      "label": "Brussels Airlines",
      "value": "SN",
      "__typename": "StringOption"
    },
    {
      "label": "Condor",
      "value": "DE",
      "__typename": "StringOption"
    },
    {
      "label": "CSA Czech Airlines",
      "value": "OK",
      "__typename": "StringOption"
    },
    {
      "label": "Easy Jet",
      "value": "U2",
      "__typename": "StringOption"
    },
    {
      "label": "Egypt Air",
      "value": "MS",
      "__typename": "StringOption"
    },
    {
      "label": "Emirates",
      "value": "EK",
      "__typename": "StringOption"
    },
    {
      "label": "Finnair",
      "value": "AY",
      "__typename": "StringOption"
    },
    {
      "label": "FlyDubai",
      "value": "FZ",
      "__typename": "StringOption"
    },
    {
      "label": "Germanwings",
      "value": "4U",
      "__typename": "StringOption"
    },
    {
      "label": "Iberia",
      "value": "IB",
      "__typename": "StringOption"
    },
    {
      "label": "KLM Royal Dutch Airlines",
      "value": "KL",
      "__typename": "StringOption"
    },
    {
      "label": "LOT Polish Airways",
      "value": "LO",
      "__typename": "StringOption"
    },
    {
      "label": "Lufthansa",
      "value": "LH",
      "__typename": "StringOption"
    },
    {
      "label": "NIKI",
      "value": "HG",
      "__typename": "StringOption"
    },
    {
      "label": "SAS Scandinavian Airlines",
      "value": "SK",
      "__typename": "StringOption"
    },
    {
      "label": "Smartwings",
      "value": "QS",
      "__typename": "StringOption"
    },
    {
      "label": "Smartwings",
      "value": "6D",
      "__typename": "StringOption"
    },
    {
      "label": "SunExpress",
      "value": "XQ",
      "__typename": "StringOption"
    },
    {
      "label": "Swiss",
      "value": "LX",
      "__typename": "StringOption"
    },
    {
      "label": "Tailwind Airlines",
      "value": "TWI",
      "__typename": "StringOption"
    },
    {
      "label": "Tunis Air",
      "value": "TU",
      "__typename": "StringOption"
    },
    {
      "label": "Turkish Airlines",
      "value": "TK",
      "__typename": "StringOption"
    },
    {
      "label": "Vueling Airlines",
      "value": "VY",
      "__typename": "StringOption"
    }
  ],
  "departureAirports": [
    {
      "label": "Nerozhoduje",
      "value": "",
      "children": [],
      "__typename": "AirportOption"
    },
    {
      "label": "Česká republika",
      "value": "PRG BRQ OSR PED KLV",
      "children": [
        {
          "label": "Praha",
          "value": "PRG",
          "__typename": "AirportOption"
        },
        {
          "label": "Brno",
          "value": "BRQ",
          "__typename": "AirportOption"
        },
        {
          "label": "Ostrava",
          "value": "OSR",
          "__typename": "AirportOption"
        },
        {
          "label": "Pardubice",
          "value": "PED",
          "__typename": "AirportOption"
        },
        {
          "label": "Karlovy Vary",
          "value": "KLV",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    },
    {
      "label": "Slovensko",
      "value": "BTS KSC",
      "children": [
        {
          "label": "Bratislava",
          "value": "BTS",
          "__typename": "AirportOption"
        },
        {
          "label": "Košice",
          "value": "KSC",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    },
    {
      "label": "Německo",
      "value": "FRA MUC BER LEJ DRS NUE ERF",
      "children": [
        {
          "label": "Frankfurt",
          "value": "FRA",
          "__typename": "AirportOption"
        },
        {
          "label": "Mnichov",
          "value": "MUC",
          "__typename": "AirportOption"
        },
        {
          "label": "Berlín",
          "value": "BER",
          "__typename": "AirportOption"
        },
        {
          "label": "Lipsko",
          "value": "LEJ",
          "__typename": "AirportOption"
        },
        {
          "label": "Drážďany",
          "value": "DRS",
          "__typename": "AirportOption"
        },
        {
          "label": "Norimberk",
          "value": "NUE",
          "__typename": "AirportOption"
        },
        {
          "label": "Erfurt",
          "value": "ERF",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    },
    {
      "label": "Rakousko",
      "value": "VIE SZG LNZ",
      "children": [
        {
          "label": "Vídeň",
          "value": "VIE",
          "__typename": "AirportOption"
        },
        {
          "label": "Linz",
          "value": "LNZ",
          "__typename": "AirportOption"
        },
        {
          "label": "Salzburg",
          "value": "SZG",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    },
    {
      "label": "Maďarsko",
      "value": "BUD",
      "children": [
        {
          "label": "Budapešť",
          "value": "BUD",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    },
    {
      "label": "Polsko",
      "value": "KTW KRK WAW",
      "children": [
        {
          "label": "Katowice",
          "value": "KTW",
          "__typename": "AirportOption"
        },
        {
          "label": "Krakow",
          "value": "KRK",
          "__typename": "AirportOption"
        },
        {
          "label": "Varšava",
          "value": "WAW",
          "__typename": "AirportOption"
        }
      ],
      "__typename": "AirportOption"
    }
  ],
  "transportTypes": [
    {
      "label": "Nerozhoduje",
      "value": "",
      "__typename": "StringOption"
    },
    {
      "label": "Letecky",
      "value": "ST14-AE",
      "__typename": "StringOption"
    },
    {
      "label": "Autobusem",
      "value": "ST14-BU",
      "__typename": "StringOption"
    },
    {
      "label": "Vlastní",
      "value": "GT14-WT",
      "__typename": "StringOption"
    }
  ],
  "specialOffers": [
    {
      "label": "1. moment",
      "value": "GT07-EB",
      "__typename": "StringOption"
    },
    {
      "label": "Dítě zdarma",
      "value": "GT07-KF",
      "__typename": "StringOption"
    },
    {
      "label": "Last minute",
      "value": "GT07-LM",
      "__typename": "StringOption"
    },
    {
      "label": "eTravel EXTRA",
      "value": "GT07-00",
      "__typename": "StringOption"
    },
    {
      "label": "SKIPAS v ceně",
      "value": "GT07-01",
      "__typename": "StringOption"
    }
  ],
  "__typename": "Options"
}

//import { getSelectedBeachDistanceQualifierOptions } from './qualifiers'


const EMPTY_ARRAY = []
const DEFAULT_EMPTY_ARRAY = []
const getValue = fp.propOr('', 'value')
const getName = fp.propOr('', 'name')

export const filterOptionsByValue = (options, values) =>
  options.filter(o => values && values.includes(o.value))

export const createOptionsSelector = (optionsPath) => state =>
  _.get(state, `options.${optionsPath}`, DEFAULT_EMPTY_ARRAY)

export const getQualifiers = fp.getOr(EMPTY_ARRAY, 'productSearch.hotel.qualifiers.data.list')

export const createQualifierValueSelector = (name, optionsPath) => createSelector(
  [ getQualifiers, createOptionsSelector(optionsPath) ],
  (qualifiers, options) => {

    const value = fp.flow(
      fp.find({ name: name.toString() }),
      getValue
    )(qualifiers)
    const foundOption = fp.find(option => {
      return fp.last(option.value.split('_')) === String(value)
    })(options)

    const optionValue = getValue(foundOption)

    return optionValue ? [ optionValue ] : [ '' ]
  }
)

export const getSelectedBeachDistanceQualifierOptions = createSelector(
  createOptionsSelector('beachDistanceQualifiers'),
  createQualifierValueSelector(1, 'beachDistanceQualifiers'),
  filterOptionsByValue
)

export const getSelectedCityCenterQualifierOptions = createSelector(
  createOptionsSelector('cityCenterDistanceQualifiers'),
  createQualifierValueSelector(9, 'cityCenterDistanceQualifiers'),
  filterOptionsByValue
)


console.log(getSelectedBeachDistanceQualifierOptions({ productSearch, options }))


console.log(x)
class x {

}

var n = new x()
