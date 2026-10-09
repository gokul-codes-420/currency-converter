/**
 * Comprehensive Currency Metadata with Country Names and Search Aliases
 * Full 166 Currency Coverage from ExchangeRate-API
 * Supports searching by Country Name (e.g. India, Dubai, USA, UK, Singapore, Saudi, etc.)
 */

export const POPULAR_COUNTRIES = [
  {
    "code": "INR",
    "country": "India",
    "flag": "🇮🇳"
  },
  {
    "code": "AED",
    "country": "Dubai / UAE",
    "flag": "🇦🇪"
  },
  {
    "code": "USD",
    "country": "USA",
    "flag": "🇺🇸"
  },
  {
    "code": "SAR",
    "country": "Saudi Arabia",
    "flag": "🇸🇦"
  },
  {
    "code": "GBP",
    "country": "UK / Britain",
    "flag": "🇬🇧"
  },
  {
    "code": "SGD",
    "country": "Singapore",
    "flag": "🇸🇬"
  },
  {
    "code": "MYR",
    "country": "Malaysia",
    "flag": "🇲🇾"
  },
  {
    "code": "CAD",
    "country": "Canada",
    "flag": "🇨🇦"
  },
  {
    "code": "KWD",
    "country": "Kuwait",
    "flag": "🇰🇼"
  },
  {
    "code": "QAR",
    "country": "Qatar",
    "flag": "🇶🇦"
  },
  {
    "code": "EUR",
    "country": "Europe",
    "flag": "🇪🇺"
  },
  {
    "code": "AUD",
    "country": "Australia",
    "flag": "🇦🇺"
  },
  {
    "code": "LKR",
    "country": "Sri Lanka",
    "flag": "🇱🇰"
  },
  {
    "code": "JPY",
    "country": "Japan",
    "flag": "🇯🇵"
  },
  {
    "code": "OMR",
    "country": "Oman",
    "flag": "🇴🇲"
  },
  {
    "code": "BHD",
    "country": "Bahrain",
    "flag": "🇧🇭"
  }
];

export const CURRENCY_COUNTRY_MAP = {
  "AED": {
    "code": "AED",
    "name": "UAE Dirham",
    "country": "United Arab Emirates",
    "aliases": "UAE, Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Emirates, Arab Emirates",
    "symbol": "د.إ",
    "flag": "🇦🇪",
    "popular": true
  },
  "AFN": {
    "code": "AFN",
    "name": "Afghan Afghani",
    "country": "Afghanistan",
    "aliases": "Afghanistan, Kabul, Afghan",
    "symbol": "؋",
    "flag": "🇦🇫",
    "popular": false
  },
  "ALL": {
    "code": "ALL",
    "name": "Albanian Lek",
    "country": "Albania",
    "aliases": "Albania, Tirana, Shqiperi",
    "symbol": "L",
    "flag": "🇦🇱",
    "popular": false
  },
  "AMD": {
    "code": "AMD",
    "name": "Armenian Dram",
    "country": "Armenia",
    "aliases": "Armenia, Yerevan",
    "symbol": "֏",
    "flag": "🇦🇲",
    "popular": false
  },
  "ANG": {
    "code": "ANG",
    "name": "Netherlands Antillean Guilder",
    "country": "Curaçao & Sint Maarten",
    "aliases": "Curacao, Sint Maarten, Netherlands Antilles, Caribbean",
    "symbol": "ƒ",
    "flag": "🇨🇼",
    "popular": false
  },
  "AOA": {
    "code": "AOA",
    "name": "Angolan Kwanza",
    "country": "Angola",
    "aliases": "Angola, Luanda",
    "symbol": "Kz",
    "flag": "🇦🇴",
    "popular": false
  },
  "ARS": {
    "code": "ARS",
    "name": "Argentine Peso",
    "country": "Argentina",
    "aliases": "Argentina, Buenos Aires",
    "symbol": "$",
    "flag": "🇦🇷",
    "popular": false
  },
  "AUD": {
    "code": "AUD",
    "name": "Australian Dollar",
    "country": "Australia",
    "aliases": "Australia, Sydney, Melbourne, Brisbane, Perth, Aussie, Aus",
    "symbol": "A$",
    "flag": "🇦🇺",
    "popular": true
  },
  "AWG": {
    "code": "AWG",
    "name": "Aruban Florin",
    "country": "Aruba",
    "aliases": "Aruba, Oranjestad, Caribbean",
    "symbol": "ƒ",
    "flag": "🇦🇼",
    "popular": false
  },
  "AZN": {
    "code": "AZN",
    "name": "Azerbaijani Manat",
    "country": "Azerbaijan",
    "aliases": "Azerbaijan, Baku",
    "symbol": "₼",
    "flag": "🇦🇿",
    "popular": false
  },
  "BAM": {
    "code": "BAM",
    "name": "Bosnia-Herzegovina Convertible Mark",
    "country": "Bosnia and Herzegovina",
    "aliases": "Bosnia, Herzegovina, Sarajevo",
    "symbol": "KM",
    "flag": "🇧🇦",
    "popular": false
  },
  "BBD": {
    "code": "BBD",
    "name": "Barbadian Dollar",
    "country": "Barbados",
    "aliases": "Barbados, Bridgetown, Caribbean",
    "symbol": "Bds$",
    "flag": "🇧🇧",
    "popular": false
  },
  "BDT": {
    "code": "BDT",
    "name": "Bangladeshi Taka",
    "country": "Bangladesh",
    "aliases": "Bangladesh, Dhaka, Chittagong, BD, Bangla",
    "symbol": "৳",
    "flag": "🇧🇩",
    "popular": true
  },
  "BGN": {
    "code": "BGN",
    "name": "Bulgarian Lev",
    "country": "Bulgaria",
    "aliases": "Bulgaria, Sofia",
    "symbol": "лв",
    "flag": "🇧🇬",
    "popular": false
  },
  "BHD": {
    "code": "BHD",
    "name": "Bahraini Dinar",
    "country": "Bahrain",
    "aliases": "Bahrain, Manama",
    "symbol": "BD",
    "flag": "🇧🇭",
    "popular": true
  },
  "BIF": {
    "code": "BIF",
    "name": "Burundian Franc",
    "country": "Burundi",
    "aliases": "Burundi, Gitega, Bujumbura",
    "symbol": "FBu",
    "flag": "🇧🇮",
    "popular": false
  },
  "BMD": {
    "code": "BMD",
    "name": "Bermudian Dollar",
    "country": "Bermuda",
    "aliases": "Bermuda, Hamilton",
    "symbol": "$",
    "flag": "🇧🇲",
    "popular": false
  },
  "BND": {
    "code": "BND",
    "name": "Brunei Dollar",
    "country": "Brunei",
    "aliases": "Brunei, Bandar Seri Begawan, Brunei Darussalam",
    "symbol": "B$",
    "flag": "🇧🇳",
    "popular": false
  },
  "BOB": {
    "code": "BOB",
    "name": "Bolivian Boliviano",
    "country": "Bolivia",
    "aliases": "Bolivia, La Paz, Sucre",
    "symbol": "Bs",
    "flag": "🇧🇴",
    "popular": false
  },
  "BRL": {
    "code": "BRL",
    "name": "Brazilian Real",
    "country": "Brazil",
    "aliases": "Brazil, Brasil, Sao Paulo, Rio de Janeiro, Brasilia",
    "symbol": "R$",
    "flag": "🇧🇷",
    "popular": true
  },
  "BSD": {
    "code": "BSD",
    "name": "Bahamian Dollar",
    "country": "Bahamas",
    "aliases": "Bahamas, Nassau, Caribbean",
    "symbol": "B$",
    "flag": "🇧🇸",
    "popular": false
  },
  "BTN": {
    "code": "BTN",
    "name": "Bhutanese Ngultrum",
    "country": "Bhutan",
    "aliases": "Bhutan, Thimphu",
    "symbol": "Nu.",
    "flag": "🇧🇹",
    "popular": false
  },
  "BWP": {
    "code": "BWP",
    "name": "Botswana Pula",
    "country": "Botswana",
    "aliases": "Botswana, Gaborone",
    "symbol": "P",
    "flag": "🇧🇼",
    "popular": false
  },
  "BYN": {
    "code": "BYN",
    "name": "Belarusian Ruble",
    "country": "Belarus",
    "aliases": "Belarus, Minsk",
    "symbol": "Br",
    "flag": "🇧🇾",
    "popular": false
  },
  "BZD": {
    "code": "BZD",
    "name": "Belize Dollar",
    "country": "Belize",
    "aliases": "Belize, Belmopan",
    "symbol": "BZ$",
    "flag": "🇧🇿",
    "popular": false
  },
  "CAD": {
    "code": "CAD",
    "name": "Canadian Dollar",
    "country": "Canada",
    "aliases": "Canada, Toronto, Vancouver, Montreal, Ottawa, Can",
    "symbol": "C$",
    "flag": "🇨🇦",
    "popular": true
  },
  "CDF": {
    "code": "CDF",
    "name": "Congolese Franc",
    "country": "DR Congo",
    "aliases": "Congo, Democratic Republic of Congo, DRC, Kinshasa",
    "symbol": "FC",
    "flag": "🇨🇩",
    "popular": false
  },
  "CHF": {
    "code": "CHF",
    "name": "Swiss Franc",
    "country": "Switzerland",
    "aliases": "Switzerland, Swiss, Zurich, Geneva, Bern, Basel",
    "symbol": "CHF",
    "flag": "🇨🇭",
    "popular": true
  },
  "CLF": {
    "code": "CLF",
    "name": "Chilean Unit of Account (UF)",
    "country": "Chile",
    "aliases": "Chile, UF, Unidad de Fomento",
    "symbol": "UF",
    "flag": "🇨🇱",
    "popular": false
  },
  "CLP": {
    "code": "CLP",
    "name": "Chilean Peso",
    "country": "Chile",
    "aliases": "Chile, Santiago",
    "symbol": "$",
    "flag": "🇨🇱",
    "popular": false
  },
  "CNH": {
    "code": "CNH",
    "name": "Chinese Yuan (Offshore)",
    "country": "China (Offshore)",
    "aliases": "China, Hong Kong Offshore Yuan, RMB",
    "symbol": "¥",
    "flag": "🇨🇳",
    "popular": false
  },
  "CNY": {
    "code": "CNY",
    "name": "Chinese Yuan",
    "country": "China",
    "aliases": "China, Beijing, Shanghai, Guangzhou, Shenzhen, PRC, Yuan, Renminbi, RMB",
    "symbol": "¥",
    "flag": "🇨🇳",
    "popular": true
  },
  "COP": {
    "code": "COP",
    "name": "Colombian Peso",
    "country": "Colombia",
    "aliases": "Colombia, Bogota, Medellin",
    "symbol": "$",
    "flag": "🇨🇴",
    "popular": false
  },
  "CRC": {
    "code": "CRC",
    "name": "Costa Rican Colon",
    "country": "Costa Rica",
    "aliases": "Costa Rica, San Jose",
    "symbol": "₡",
    "flag": "🇨🇷",
    "popular": false
  },
  "CUP": {
    "code": "CUP",
    "name": "Cuban Peso",
    "country": "Cuba",
    "aliases": "Cuba, Havana",
    "symbol": "$",
    "flag": "🇨🇺",
    "popular": false
  },
  "CVE": {
    "code": "CVE",
    "name": "Cape Verdean Escudo",
    "country": "Cape Verde",
    "aliases": "Cape Verde, Cabo Verde, Praia",
    "symbol": "$",
    "flag": "🇨🇻",
    "popular": false
  },
  "CZK": {
    "code": "CZK",
    "name": "Czech Koruna",
    "country": "Czech Republic",
    "aliases": "Czech Republic, Czechia, Prague, Praha",
    "symbol": "Kč",
    "flag": "🇨🇿",
    "popular": false
  },
  "DJF": {
    "code": "DJF",
    "name": "Djiboutian Franc",
    "country": "Djibouti",
    "aliases": "Djibouti, Djibouti City",
    "symbol": "Fdj",
    "flag": "🇩🇯",
    "popular": false
  },
  "DKK": {
    "code": "DKK",
    "name": "Danish Krone",
    "country": "Denmark",
    "aliases": "Denmark, Copenhagen, Danish",
    "symbol": "kr",
    "flag": "🇩🇰",
    "popular": false
  },
  "DOP": {
    "code": "DOP",
    "name": "Dominican Peso",
    "country": "Dominican Republic",
    "aliases": "Dominican Republic, Santo Domingo",
    "symbol": "RD$",
    "flag": "🇩🇴",
    "popular": false
  },
  "DZD": {
    "code": "DZD",
    "name": "Algerian Dinar",
    "country": "Algeria",
    "aliases": "Algeria, Algiers",
    "symbol": "DA",
    "flag": "🇩🇿",
    "popular": false
  },
  "EGP": {
    "code": "EGP",
    "name": "Egyptian Pound",
    "country": "Egypt",
    "aliases": "Egypt, Cairo, Alexandria, Giza",
    "symbol": "E£",
    "flag": "🇪🇬",
    "popular": false
  },
  "ERN": {
    "code": "ERN",
    "name": "Eritrean Nakfa",
    "country": "Eritrea",
    "aliases": "Eritrea, Asmara",
    "symbol": "Nfk",
    "flag": "🇪🇷",
    "popular": false
  },
  "ETB": {
    "code": "ETB",
    "name": "Ethiopian Birr",
    "country": "Ethiopia",
    "aliases": "Ethiopia, Addis Ababa",
    "symbol": "Br",
    "flag": "🇪🇹",
    "popular": false
  },
  "EUR": {
    "code": "EUR",
    "name": "Euro",
    "country": "European Union",
    "aliases": "Europe, Germany, France, Italy, Spain, Netherlands, Portugal, Greece, Ireland, Belgium, Austria, Finland, Eurozone, Berlin, Paris, Rome, Madrid, Amsterdam",
    "symbol": "€",
    "flag": "🇪🇺",
    "popular": true
  },
  "FJD": {
    "code": "FJD",
    "name": "Fijian Dollar",
    "country": "Fiji",
    "aliases": "Fiji, Suva, Pacific",
    "symbol": "FJ$",
    "flag": "🇫🇯",
    "popular": false
  },
  "FKP": {
    "code": "FKP",
    "name": "Falkland Islands Pound",
    "country": "Falkland Islands",
    "aliases": "Falkland Islands, Stanley",
    "symbol": "£",
    "flag": "🇫🇰",
    "popular": false
  },
  "FOK": {
    "code": "FOK",
    "name": "Faroese Krona",
    "country": "Faroe Islands",
    "aliases": "Faroe Islands, Torshavn",
    "symbol": "kr",
    "flag": "🇫🇴",
    "popular": false
  },
  "GBP": {
    "code": "GBP",
    "name": "British Pound Sterling",
    "country": "United Kingdom",
    "aliases": "UK, Britain, Great Britain, England, London, Scotland, Wales, Northern Ireland, British, Pound",
    "symbol": "£",
    "flag": "🇬🇧",
    "popular": true
  },
  "GEL": {
    "code": "GEL",
    "name": "Georgian Lari",
    "country": "Georgia",
    "aliases": "Georgia, Tbilisi",
    "symbol": "₾",
    "flag": "🇬🇪",
    "popular": false
  },
  "GGP": {
    "code": "GGP",
    "name": "Guernsey Pound",
    "country": "Guernsey",
    "aliases": "Guernsey, Channel Islands, St Peter Port",
    "symbol": "£",
    "flag": "🇬🇬",
    "popular": false
  },
  "GHS": {
    "code": "GHS",
    "name": "Ghanaian Cedi",
    "country": "Ghana",
    "aliases": "Ghana, Accra",
    "symbol": "GH₵",
    "flag": "🇬🇭",
    "popular": false
  },
  "GIP": {
    "code": "GIP",
    "name": "Gibraltar Pound",
    "country": "Gibraltar",
    "aliases": "Gibraltar",
    "symbol": "£",
    "flag": "🇬🇮",
    "popular": false
  },
  "GMD": {
    "code": "GMD",
    "name": "Gambian Dalasi",
    "country": "Gambia",
    "aliases": "Gambia, Banjul",
    "symbol": "D",
    "flag": "🇬🇲",
    "popular": false
  },
  "GNF": {
    "code": "GNF",
    "name": "Guinean Franc",
    "country": "Guinea",
    "aliases": "Guinea, Conakry",
    "symbol": "FG",
    "flag": "🇬🇳",
    "popular": false
  },
  "GTQ": {
    "code": "GTQ",
    "name": "Guatemalan Quetzal",
    "country": "Guatemala",
    "aliases": "Guatemala, Guatemala City",
    "symbol": "Q",
    "flag": "🇬🇹",
    "popular": false
  },
  "GYD": {
    "code": "GYD",
    "name": "Guyanese Dollar",
    "country": "Guyana",
    "aliases": "Guyana, Georgetown",
    "symbol": "G$",
    "flag": "🇬🇾",
    "popular": false
  },
  "HKD": {
    "code": "HKD",
    "name": "Hong Kong Dollar",
    "country": "Hong Kong",
    "aliases": "Hong Kong, HK",
    "symbol": "HK$",
    "flag": "🇭🇰",
    "popular": true
  },
  "HNL": {
    "code": "HNL",
    "name": "Honduran Lempira",
    "country": "Honduras",
    "aliases": "Honduras, Tegucigalpa",
    "symbol": "L",
    "flag": "🇭🇳",
    "popular": false
  },
  "HRK": {
    "code": "HRK",
    "name": "Croatian Kuna",
    "country": "Croatia",
    "aliases": "Croatia, Zagreb",
    "symbol": "kn",
    "flag": "🇭🇷",
    "popular": false
  },
  "HTG": {
    "code": "HTG",
    "name": "Haitian Gourde",
    "country": "Haiti",
    "aliases": "Haiti, Port-au-Prince",
    "symbol": "G",
    "flag": "🇭🇹",
    "popular": false
  },
  "HUF": {
    "code": "HUF",
    "name": "Hungarian Forint",
    "country": "Hungary",
    "aliases": "Hungary, Budapest",
    "symbol": "Ft",
    "flag": "🇭🇺",
    "popular": false
  },
  "IDR": {
    "code": "IDR",
    "name": "Indonesian Rupiah",
    "country": "Indonesia",
    "aliases": "Indonesia, Jakarta, Bali, Surabaya",
    "symbol": "Rp",
    "flag": "🇮🇩",
    "popular": true
  },
  "ILS": {
    "code": "ILS",
    "name": "Israeli New Shekel",
    "country": "Israel",
    "aliases": "Israel, Jerusalem, Tel Aviv",
    "symbol": "₪",
    "flag": "🇮🇱",
    "popular": false
  },
  "IMP": {
    "code": "IMP",
    "name": "Manx Pound",
    "country": "Isle of Man",
    "aliases": "Isle of Man, Douglas",
    "symbol": "£",
    "flag": "🇮🇲",
    "popular": false
  },
  "INR": {
    "code": "INR",
    "name": "Indian Rupee",
    "country": "India",
    "aliases": "India, Bharat, Hindustan, Delhi, Mumbai, Chennai, Tamil Nadu, Bangalore, Hyderabad, Kolkata, Indian, INR, Rupee",
    "symbol": "₹",
    "flag": "🇮🇳",
    "popular": true
  },
  "IQD": {
    "code": "IQD",
    "name": "Iraqi Dinar",
    "country": "Iraq",
    "aliases": "Iraq, Baghdad, Erbil, Basra",
    "symbol": "IQD",
    "flag": "🇮🇶",
    "popular": false
  },
  "IRR": {
    "code": "IRR",
    "name": "Iranian Rial",
    "country": "Iran",
    "aliases": "Iran, Tehran, Persia",
    "symbol": "﷼",
    "flag": "🇮🇷",
    "popular": false
  },
  "ISK": {
    "code": "ISK",
    "name": "Icelandic Krona",
    "country": "Iceland",
    "aliases": "Iceland, Reykjavik",
    "symbol": "kr",
    "flag": "🇮🇸",
    "popular": false
  },
  "JEP": {
    "code": "JEP",
    "name": "Jersey Pound",
    "country": "Jersey",
    "aliases": "Jersey, Channel Islands, St Helier",
    "symbol": "£",
    "flag": "🇯🇪",
    "popular": false
  },
  "JMD": {
    "code": "JMD",
    "name": "Jamaican Dollar",
    "country": "Jamaica",
    "aliases": "Jamaica, Kingston, Caribbean",
    "symbol": "J$",
    "flag": "🇯🇲",
    "popular": false
  },
  "JOD": {
    "code": "JOD",
    "name": "Jordanian Dinar",
    "country": "Jordan",
    "aliases": "Jordan, Amman",
    "symbol": "JD",
    "flag": "🇯🇴",
    "popular": false
  },
  "JPY": {
    "code": "JPY",
    "name": "Japanese Yen",
    "country": "Japan",
    "aliases": "Japan, Tokyo, Osaka, Kyoto, Nippon",
    "symbol": "¥",
    "flag": "🇯🇵",
    "popular": true
  },
  "KES": {
    "code": "KES",
    "name": "Kenyan Shilling",
    "country": "Kenya",
    "aliases": "Kenya, Nairobi, Mombasa",
    "symbol": "KSh",
    "flag": "🇰🇪",
    "popular": false
  },
  "KGS": {
    "code": "KGS",
    "name": "Kyrgyzstani Som",
    "country": "Kyrgyzstan",
    "aliases": "Kyrgyzstan, Bishkek",
    "symbol": "с",
    "flag": "🇰🇬",
    "popular": false
  },
  "KHR": {
    "code": "KHR",
    "name": "Cambodian Riel",
    "country": "Cambodia",
    "aliases": "Cambodia, Phnom Penh, Angkor",
    "symbol": "៛",
    "flag": "🇰🇭",
    "popular": false
  },
  "KID": {
    "code": "KID",
    "name": "Kiribati Dollar",
    "country": "Kiribati",
    "aliases": "Kiribati, Tarawa",
    "symbol": "$",
    "flag": "🇰🇮",
    "popular": false
  },
  "KMF": {
    "code": "KMF",
    "name": "Comorian Franc",
    "country": "Comoros",
    "aliases": "Comoros, Moroni",
    "symbol": "CF",
    "flag": "🇰🇲",
    "popular": false
  },
  "KRW": {
    "code": "KRW",
    "name": "South Korean Won",
    "country": "South Korea",
    "aliases": "South Korea, Korea, Seoul, Busan",
    "symbol": "₩",
    "flag": "🇰🇷",
    "popular": true
  },
  "KWD": {
    "code": "KWD",
    "name": "Kuwaiti Dinar",
    "country": "Kuwait",
    "aliases": "Kuwait, Kuwait City",
    "symbol": "KD",
    "flag": "🇰🇼",
    "popular": true
  },
  "KYD": {
    "code": "KYD",
    "name": "Cayman Islands Dollar",
    "country": "Cayman Islands",
    "aliases": "Cayman Islands, George Town, Caribbean",
    "symbol": "CI$",
    "flag": "🇰🇾",
    "popular": false
  },
  "KZT": {
    "code": "KZT",
    "name": "Kazakhstani Tenge",
    "country": "Kazakhstan",
    "aliases": "Kazakhstan, Astana, Almaty",
    "symbol": "₸",
    "flag": "🇰🇿",
    "popular": false
  },
  "LAK": {
    "code": "LAK",
    "name": "Lao Kip",
    "country": "Laos",
    "aliases": "Laos, Vientiane",
    "symbol": "₭",
    "flag": "🇱🇦",
    "popular": false
  },
  "LBP": {
    "code": "LBP",
    "name": "Lebanese Pound",
    "country": "Lebanon",
    "aliases": "Lebanon, Beirut",
    "symbol": "L£",
    "flag": "🇱🇧",
    "popular": false
  },
  "LKR": {
    "code": "LKR",
    "name": "Sri Lankan Rupee",
    "country": "Sri Lanka",
    "aliases": "Sri Lanka, Colombo, Ceylon, Kandy, Jaffna",
    "symbol": "Rs",
    "flag": "🇱🇰",
    "popular": true
  },
  "LRD": {
    "code": "LRD",
    "name": "Liberian Dollar",
    "country": "Liberia",
    "aliases": "Liberia, Monrovia",
    "symbol": "L$",
    "flag": "🇱🇷",
    "popular": false
  },
  "LSL": {
    "code": "LSL",
    "name": "Lesotho Loti",
    "country": "Lesotho",
    "aliases": "Lesotho, Maseru",
    "symbol": "L",
    "flag": "🇱🇸",
    "popular": false
  },
  "LYD": {
    "code": "LYD",
    "name": "Libyan Dinar",
    "country": "Libya",
    "aliases": "Libya, Tripoli, Benghazi",
    "symbol": "LD",
    "flag": "🇱🇾",
    "popular": false
  },
  "MAD": {
    "code": "MAD",
    "name": "Moroccan Dirham",
    "country": "Morocco",
    "aliases": "Morocco, Rabat, Casablanca, Marrakech",
    "symbol": "MAD",
    "flag": "🇲🇦",
    "popular": false
  },
  "MDL": {
    "code": "MDL",
    "name": "Moldovan Leu",
    "country": "Moldova",
    "aliases": "Moldova, Chisinau",
    "symbol": "L",
    "flag": "🇲🇩",
    "popular": false
  },
  "MGA": {
    "code": "MGA",
    "name": "Malagasy Ariary",
    "country": "Madagascar",
    "aliases": "Madagascar, Antananarivo",
    "symbol": "Ar",
    "flag": "🇲🇬",
    "popular": false
  },
  "MKD": {
    "code": "MKD",
    "name": "Macedonian Denar",
    "country": "North Macedonia",
    "aliases": "Macedonia, North Macedonia, Skopje",
    "symbol": "ден",
    "flag": "🇲🇰",
    "popular": false
  },
  "MMK": {
    "code": "MMK",
    "name": "Myanmar Kyat",
    "country": "Myanmar (Burma)",
    "aliases": "Myanmar, Burma, Yangon, Naypyidaw",
    "symbol": "K",
    "flag": "🇲🇲",
    "popular": false
  },
  "MNT": {
    "code": "MNT",
    "name": "Mongolian Tugrik",
    "country": "Mongolia",
    "aliases": "Mongolia, Ulaanbaatar",
    "symbol": "₮",
    "flag": "🇲🇳",
    "popular": false
  },
  "MOP": {
    "code": "MOP",
    "name": "Macanese Pataca",
    "country": "Macau",
    "aliases": "Macau, Macao",
    "symbol": "MOP$",
    "flag": "🇲🇴",
    "popular": false
  },
  "MRU": {
    "code": "MRU",
    "name": "Mauritanian Ouguiya",
    "country": "Mauritania",
    "aliases": "Mauritania, Nouakchott",
    "symbol": "UM",
    "flag": "🇲🇷",
    "popular": false
  },
  "MUR": {
    "code": "MUR",
    "name": "Mauritian Rupee",
    "country": "Mauritius",
    "aliases": "Mauritius, Port Louis",
    "symbol": "₨",
    "flag": "🇲🇺",
    "popular": false
  },
  "MVR": {
    "code": "MVR",
    "name": "Maldivian Rufiyaa",
    "country": "Maldives",
    "aliases": "Maldives, Male, Dhivehi",
    "symbol": "Rf",
    "flag": "🇲🇻",
    "popular": false
  },
  "MWK": {
    "code": "MWK",
    "name": "Malawian Kwacha",
    "country": "Malawi",
    "aliases": "Malawi, Lilongwe",
    "symbol": "MK",
    "flag": "🇲🇼",
    "popular": false
  },
  "MXN": {
    "code": "MXN",
    "name": "Mexican Peso",
    "country": "Mexico",
    "aliases": "Mexico, Mexico City, Guadalajara, Monterrey",
    "symbol": "$",
    "flag": "🇲🇽",
    "popular": true
  },
  "MYR": {
    "code": "MYR",
    "name": "Malaysian Ringgit",
    "country": "Malaysia",
    "aliases": "Malaysia, Kuala Lumpur, Penang, Johor Bahru, KL",
    "symbol": "RM",
    "flag": "🇲🇾",
    "popular": true
  },
  "MZN": {
    "code": "MZN",
    "name": "Mozambican Metical",
    "country": "Mozambique",
    "aliases": "Mozambique, Maputo",
    "symbol": "MT",
    "flag": "🇲🇿",
    "popular": false
  },
  "NAD": {
    "code": "NAD",
    "name": "Namibian Dollar",
    "country": "Namibia",
    "aliases": "Namibia, Windhoek",
    "symbol": "N$",
    "flag": "🇳🇦",
    "popular": false
  },
  "NGN": {
    "code": "NGN",
    "name": "Nigerian Naira",
    "country": "Nigeria",
    "aliases": "Nigeria, Lagos, Abuja",
    "symbol": "₦",
    "flag": "🇳🇬",
    "popular": false
  },
  "NIO": {
    "code": "NIO",
    "name": "Nicaraguan Cordoba",
    "country": "Nicaragua",
    "aliases": "Nicaragua, Managua",
    "symbol": "C$",
    "flag": "🇳🇮",
    "popular": false
  },
  "NOK": {
    "code": "NOK",
    "name": "Norwegian Krone",
    "country": "Norway",
    "aliases": "Norway, Oslo",
    "symbol": "kr",
    "flag": "🇳🇴",
    "popular": false
  },
  "NPR": {
    "code": "NPR",
    "name": "Nepalese Rupee",
    "country": "Nepal",
    "aliases": "Nepal, Kathmandu, Pokhara",
    "symbol": "रू",
    "flag": "🇳🇵",
    "popular": true
  },
  "NZD": {
    "code": "NZD",
    "name": "New Zealand Dollar",
    "country": "New Zealand",
    "aliases": "New Zealand, Auckland, Wellington, Kiwi, NZ",
    "symbol": "NZ$",
    "flag": "🇳🇿",
    "popular": true
  },
  "OMR": {
    "code": "OMR",
    "name": "Omani Rial",
    "country": "Oman",
    "aliases": "Oman, Muscat, Salalah",
    "symbol": "OMR",
    "flag": "🇴🇲",
    "popular": true
  },
  "PAB": {
    "code": "PAB",
    "name": "Panamanian Balboa",
    "country": "Panama",
    "aliases": "Panama, Panama City",
    "symbol": "B/.",
    "flag": "🇵🇦",
    "popular": false
  },
  "PEN": {
    "code": "PEN",
    "name": "Peruvian Sol",
    "country": "Peru",
    "aliases": "Peru, Lima",
    "symbol": "S/.",
    "flag": "🇵🇪",
    "popular": false
  },
  "PGK": {
    "code": "PGK",
    "name": "Papua New Guinean Kina",
    "country": "Papua New Guinea",
    "aliases": "Papua New Guinea, Port Moresby",
    "symbol": "K",
    "flag": "🇵🇬",
    "popular": false
  },
  "PHP": {
    "code": "PHP",
    "name": "Philippine Peso",
    "country": "Philippines",
    "aliases": "Philippines, Manila, Cebu, Pinoy",
    "symbol": "₱",
    "flag": "🇵🇭",
    "popular": true
  },
  "PKR": {
    "code": "PKR",
    "name": "Pakistani Rupee",
    "country": "Pakistan",
    "aliases": "Pakistan, Islamabad, Karachi, Lahore",
    "symbol": "₨",
    "flag": "🇵🇰",
    "popular": true
  },
  "PLN": {
    "code": "PLN",
    "name": "Polish Zloty",
    "country": "Poland",
    "aliases": "Poland, Warsaw, Krakow",
    "symbol": "zł",
    "flag": "🇵🇱",
    "popular": false
  },
  "PYG": {
    "code": "PYG",
    "name": "Paraguayan Guarani",
    "country": "Paraguay",
    "aliases": "Paraguay, Asuncion",
    "symbol": "₲",
    "flag": "🇵🇾",
    "popular": false
  },
  "QAR": {
    "code": "QAR",
    "name": "Qatari Riyal",
    "country": "Qatar",
    "aliases": "Qatar, Doha",
    "symbol": "QR",
    "flag": "🇶🇦",
    "popular": true
  },
  "RON": {
    "code": "RON",
    "name": "Romanian Leu",
    "country": "Romania",
    "aliases": "Romania, Bucharest",
    "symbol": "lei",
    "flag": "🇷🇴",
    "popular": false
  },
  "RSD": {
    "code": "RSD",
    "name": "Serbian Dinar",
    "country": "Serbia",
    "aliases": "Serbia, Belgrade",
    "symbol": "din",
    "flag": "🇷🇸",
    "popular": false
  },
  "RUB": {
    "code": "RUB",
    "name": "Russian Ruble",
    "country": "Russia",
    "aliases": "Russia, Moscow, Saint Petersburg, Russian",
    "symbol": "₽",
    "flag": "🇷🇺",
    "popular": false
  },
  "RWF": {
    "code": "RWF",
    "name": "Rwandan Franc",
    "country": "Rwanda",
    "aliases": "Rwanda, Kigali",
    "symbol": "RF",
    "flag": "🇷🇼",
    "popular": false
  },
  "SAR": {
    "code": "SAR",
    "name": "Saudi Riyal",
    "country": "Saudi Arabia",
    "aliases": "Saudi, Saudi Arabia, KSA, Riyadh, Jeddah, Mecca, Medina",
    "symbol": "﷼",
    "flag": "🇸🇦",
    "popular": true
  },
  "SBD": {
    "code": "SBD",
    "name": "Solomon Islands Dollar",
    "country": "Solomon Islands",
    "aliases": "Solomon Islands, Honiara",
    "symbol": "SI$",
    "flag": "🇸🇧",
    "popular": false
  },
  "SCR": {
    "code": "SCR",
    "name": "Seychellois Rupee",
    "country": "Seychelles",
    "aliases": "Seychelles, Victoria",
    "symbol": "SR",
    "flag": "🇸🇨",
    "popular": false
  },
  "SDG": {
    "code": "SDG",
    "name": "Sudanese Pound",
    "country": "Sudan",
    "aliases": "Sudan, Khartoum",
    "symbol": "SDG",
    "flag": "🇸🇩",
    "popular": false
  },
  "SEK": {
    "code": "SEK",
    "name": "Swedish Krona",
    "country": "Sweden",
    "aliases": "Sweden, Stockholm",
    "symbol": "kr",
    "flag": "🇸🇪",
    "popular": false
  },
  "SGD": {
    "code": "SGD",
    "name": "Singapore Dollar",
    "country": "Singapore",
    "aliases": "Singapore, SG",
    "symbol": "S$",
    "flag": "🇸🇬",
    "popular": true
  },
  "SHP": {
    "code": "SHP",
    "name": "Saint Helena Pound",
    "country": "Saint Helena",
    "aliases": "Saint Helena, Jamestown",
    "symbol": "£",
    "flag": "🇸🇭",
    "popular": false
  },
  "SLE": {
    "code": "SLE",
    "name": "Sierra Leonean Leone",
    "country": "Sierra Leone",
    "aliases": "Sierra Leone, Freetown",
    "symbol": "Le",
    "flag": "🇸🇱",
    "popular": false
  },
  "SLL": {
    "code": "SLL",
    "name": "Sierra Leonean Leone (Old)",
    "country": "Sierra Leone",
    "aliases": "Sierra Leone, Freetown",
    "symbol": "Le",
    "flag": "🇸🇱",
    "popular": false
  },
  "SOS": {
    "code": "SOS",
    "name": "Somali Shilling",
    "country": "Somalia",
    "aliases": "Somalia, Mogadishu",
    "symbol": "Sh.So.",
    "flag": "🇸🇴",
    "popular": false
  },
  "SRD": {
    "code": "SRD",
    "name": "Surinamese Dollar",
    "country": "Suriname",
    "aliases": "Suriname, Paramaribo",
    "symbol": "Sr$",
    "flag": "🇸🇷",
    "popular": false
  },
  "SSP": {
    "code": "SSP",
    "name": "South Sudanese Pound",
    "country": "South Sudan",
    "aliases": "South Sudan, Juba",
    "symbol": "SS£",
    "flag": "🇸🇸",
    "popular": false
  },
  "STN": {
    "code": "STN",
    "name": "São Tomé and Príncipe Dobra",
    "country": "São Tomé and Príncipe",
    "aliases": "Sao Tome, Principe",
    "symbol": "Db",
    "flag": "🇸🇹",
    "popular": false
  },
  "SYP": {
    "code": "SYP",
    "name": "Syrian Pound",
    "country": "Syria",
    "aliases": "Syria, Damascus, Aleppo",
    "symbol": "LS",
    "flag": "🇸🇾",
    "popular": false
  },
  "SZL": {
    "code": "SZL",
    "name": "Eswatini Lilangeni",
    "country": "Eswatini (Swaziland)",
    "aliases": "Eswatini, Swaziland, Mbabane",
    "symbol": "L",
    "flag": "🇸🇿",
    "popular": false
  },
  "THB": {
    "code": "THB",
    "name": "Thai Baht",
    "country": "Thailand",
    "aliases": "Thailand, Bangkok, Phuket, Chiang Mai, Siam",
    "symbol": "฿",
    "flag": "🇹🇭",
    "popular": true
  },
  "TJS": {
    "code": "TJS",
    "name": "Tajikistani Somoni",
    "country": "Tajikistan",
    "aliases": "Tajikistan, Dushanbe",
    "symbol": "SM",
    "flag": "🇹🇯",
    "popular": false
  },
  "TMT": {
    "code": "TMT",
    "name": "Turkmenistani Manat",
    "country": "Turkmenistan",
    "aliases": "Turkmenistan, Ashgabat",
    "symbol": "T",
    "flag": "🇹🇲",
    "popular": false
  },
  "TND": {
    "code": "TND",
    "name": "Tunisian Dinar",
    "country": "Tunisia",
    "aliases": "Tunisia, Tunis",
    "symbol": "DT",
    "flag": "🇹🇳",
    "popular": false
  },
  "TOP": {
    "code": "TOP",
    "name": "Tongan Paʻanga",
    "country": "Tonga",
    "aliases": "Tonga, Nukualofa",
    "symbol": "T$",
    "flag": "🇹🇴",
    "popular": false
  },
  "TRY": {
    "code": "TRY",
    "name": "Turkish Lira",
    "country": "Turkey",
    "aliases": "Turkey, Turkiye, Istanbul, Ankara",
    "symbol": "₺",
    "flag": "🇹🇷",
    "popular": false
  },
  "TTD": {
    "code": "TTD",
    "name": "Trinidad & Tobago Dollar",
    "country": "Trinidad and Tobago",
    "aliases": "Trinidad, Tobago, Port of Spain, Caribbean",
    "symbol": "TT$",
    "flag": "🇹🇹",
    "popular": false
  },
  "TVD": {
    "code": "TVD",
    "name": "Tuvaluan Dollar",
    "country": "Tuvalu",
    "aliases": "Tuvalu, Funafuti",
    "symbol": "$",
    "flag": "🇹🇻",
    "popular": false
  },
  "TWD": {
    "code": "TWD",
    "name": "New Taiwan Dollar",
    "country": "Taiwan",
    "aliases": "Taiwan, Taipei",
    "symbol": "NT$",
    "flag": "🇹🇼",
    "popular": false
  },
  "TZS": {
    "code": "TZS",
    "name": "Tanzanian Shilling",
    "country": "Tanzania",
    "aliases": "Tanzania, Dar es Salaam, Dodoma, Zanzibar",
    "symbol": "TSh",
    "flag": "🇹🇿",
    "popular": false
  },
  "UAH": {
    "code": "UAH",
    "name": "Ukrainian Hryvnia",
    "country": "Ukraine",
    "aliases": "Ukraine, Kyiv",
    "symbol": "₴",
    "flag": "🇺🇦",
    "popular": false
  },
  "UGX": {
    "code": "UGX",
    "name": "Ugandan Shilling",
    "country": "Uganda",
    "aliases": "Uganda, Kampala",
    "symbol": "USh",
    "flag": "🇺🇬",
    "popular": false
  },
  "USD": {
    "code": "USD",
    "name": "United States Dollar",
    "country": "United States",
    "aliases": "USA, US, United States of America, America, New York, California, Washington, Dollar",
    "symbol": "$",
    "flag": "🇺🇸",
    "popular": true
  },
  "UYU": {
    "code": "UYU",
    "name": "Uruguayan Peso",
    "country": "Uruguay",
    "aliases": "Uruguay, Montevideo",
    "symbol": "$U",
    "flag": "🇺🇾",
    "popular": false
  },
  "UZS": {
    "code": "UZS",
    "name": "Uzbekistani Som",
    "country": "Uzbekistan",
    "aliases": "Uzbekistan, Tashkent, Samarkand",
    "symbol": "so'm",
    "flag": "🇺🇿",
    "popular": false
  },
  "VES": {
    "code": "VES",
    "name": "Venezuelan Bolívar Soberano",
    "country": "Venezuela",
    "aliases": "Venezuela, Caracas",
    "symbol": "Bs.S",
    "flag": "🇻🇪",
    "popular": false
  },
  "VND": {
    "code": "VND",
    "name": "Vietnamese Dong",
    "country": "Vietnam",
    "aliases": "Vietnam, Hanoi, Ho Chi Minh, Saigon",
    "symbol": "₫",
    "flag": "🇻🇳",
    "popular": false
  },
  "VUV": {
    "code": "VUV",
    "name": "Vanuatu Vatu",
    "country": "Vanuatu",
    "aliases": "Vanuatu, Port Vila",
    "symbol": "VT",
    "flag": "🇻🇺",
    "popular": false
  },
  "WST": {
    "code": "WST",
    "name": "Samoan Tala",
    "country": "Samoa",
    "aliases": "Samoa, Apia",
    "symbol": "WS$",
    "flag": "🇼🇸",
    "popular": false
  },
  "XAF": {
    "code": "XAF",
    "name": "Central African CFA Franc",
    "country": "Central Africa (Cameroon, Gabon)",
    "aliases": "Central Africa, Cameroon, Gabon, Congo, Chad, Central African Republic, Equatorial Guinea, Yaounde",
    "symbol": "FCFA",
    "flag": "🌍",
    "popular": false
  },
  "XCD": {
    "code": "XCD",
    "name": "East Caribbean Dollar",
    "country": "Eastern Caribbean",
    "aliases": "Eastern Caribbean, Antigua, Dominica, Grenada, Saint Kitts, Saint Lucia, Saint Vincent",
    "symbol": "EC$",
    "flag": "🏝️",
    "popular": false
  },
  "XCG": {
    "code": "XCG",
    "name": "Caribbean Guilder",
    "country": "Curaçao & Sint Maarten",
    "aliases": "Curacao, Sint Maarten, Caribbean Guilder",
    "symbol": "Cg",
    "flag": "🇨🇼",
    "popular": false
  },
  "XDR": {
    "code": "XDR",
    "name": "Special Drawing Rights",
    "country": "International Monetary Fund",
    "aliases": "IMF, SDR, International Monetary Fund",
    "symbol": "SDR",
    "flag": "🌐",
    "popular": false
  },
  "XOF": {
    "code": "XOF",
    "name": "West African CFA Franc",
    "country": "West Africa (Senegal, Ivory Coast)",
    "aliases": "West Africa, Senegal, Ivory Coast, Cote dIvoire, Mali, Benin, Burkina Faso, Togo, Niger, Dakar",
    "symbol": "CFA",
    "flag": "🌍",
    "popular": false
  },
  "XPF": {
    "code": "XPF",
    "name": "CFP Franc",
    "country": "French Pacific (Tahiti, New Caledonia)",
    "aliases": "Tahiti, French Polynesia, New Caledonia, Wallis and Futuna",
    "symbol": "₣",
    "flag": "🇵🇫",
    "popular": false
  },
  "YER": {
    "code": "YER",
    "name": "Yemeni Rial",
    "country": "Yemen",
    "aliases": "Yemen, Sanaa, Aden",
    "symbol": "﷼",
    "flag": "🇾🇪",
    "popular": false
  },
  "ZAR": {
    "code": "ZAR",
    "name": "South African Rand",
    "country": "South Africa",
    "aliases": "South Africa, Johannesburg, Cape Town, Pretoria, Durban",
    "symbol": "R",
    "flag": "🇿🇦",
    "popular": true
  },
  "ZMW": {
    "code": "ZMW",
    "name": "Zambian Kwacha",
    "country": "Zambia",
    "aliases": "Zambia, Lusaka",
    "symbol": "ZK",
    "flag": "🇿🇲",
    "popular": false
  },
  "ZWG": {
    "code": "ZWG",
    "name": "Zimbabwe Gold",
    "country": "Zimbabwe",
    "aliases": "Zimbabwe, Zimbabwe Gold, ZiG, Harare",
    "symbol": "ZiG",
    "flag": "🇿🇼",
    "popular": false
  },
  "ZWL": {
    "code": "ZWL",
    "name": "Zimbabwean Dollar",
    "country": "Zimbabwe",
    "aliases": "Zimbabwe, Harare",
    "symbol": "Z$",
    "flag": "🇿🇼",
    "popular": false
  }
};

/**
 * Augment a list of currency objects with country and aliases
 */
export function enrichCurrenciesWithCountries(list = []) {
  return list.map(c => {
    const meta = CURRENCY_COUNTRY_MAP[c.code];
    if (meta) {
      return {
        ...c,
        country: meta.country,
        aliases: meta.aliases,
        symbol: c.symbol || meta.symbol,
        flag: meta.flag || c.flag,
        popular: meta.popular !== undefined ? meta.popular : c.popular
      };
    }
    return {
      ...c,
      country: c.country || c.name,
      aliases: c.name
    };
  });
}

/**
 * Quick search helper by country name or alias
 */
export function searchCurrenciesByCountry(query = '', currencies = []) {
  const q = String(query).trim().toLowerCase();
  if (!q) return currencies;
  return currencies.filter(item => {
    return (
      item.code.toLowerCase().includes(q) ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.country && item.country.toLowerCase().includes(q)) ||
      (item.aliases && item.aliases.toLowerCase().includes(q)) ||
      (item.symbol && item.symbol.toLowerCase().includes(q))
    );
  });
}
