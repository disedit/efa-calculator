const settings = {
  coefficients: {
    intercept: 2000,
    local: -1250,
    regional: 150,
    MRPs: -50,
    state: 150,
    MSPs: 125,
    euparl: 2300,
    MEPs: 750,
    government: 4325
  },

  roundTo: 25,

  GDPBrackets: {
    1: 0.95,
    2: 1,
    3: 1.05
  },

  parties: [
    { name: 'Alands Framtid', bracket: 3 },
    { name: 'Bayernpartei', bracket: 3 },
    { name: 'Bloc Nacionalista Valencia - BLOC', bracket: 1 },
    { name: 'Bloque Nacionalista Galego - BNG', bracket: 1 },
    { name: 'Dostluk Esitlik Bariz Partisi - DEB', bracket: 1 },
    { name: 'Enotna Lista', bracket: 2 },
    { name: 'Erdelyi Magyar Neppart - HPPT', bracket: 1 },
    { name: 'Esquerra Republicana de Catalunya - ERC', bracket: 2 },
    { name: 'Eusko Alkartasuna - EA', bracket: 2 },
    { name: 'Femu a Corsica', bracket: 1 },
    { name: 'Fryske Nasjonale Partij - FNP', bracket: 3 },
    { name: 'Kaszëbsko Jednota', bracket: 3 },
    { name: 'L\'Altro Sud', bracket: 1 },
    { name: 'Latvian Russian Union - LRU', bracket: 1 },
    { name: 'Lausitzer Allianz - Luzicka Alianca', bracket: 1 },
    { name: 'Liga Veneta Repubblica', bracket: 2 },
    { name: 'Lista Za Rijeku - Lista Per Fiume', bracket: 1 },
    { name: 'Magyar Kereszténydemokrata Szövetség - MKDSZ', bracket: 1 },
    { name: 'Moravian Movement', bracket: 1 },
    { name: 'Mouvement Région Savoie - MRS', bracket: 2 },
    { name: 'Nieuw-Vlaamse Alliantie - N-VA', bracket: 3 },
    { name: 'Nueva Canarias', bracket: 1 },
    { name: 'Oljka Party', bracket: 1 },
    { name: 'Omo Ilinden Pirin', bracket: 1 },
    { name: 'Partit Occitan', bracket: 2 },
    { name: 'Partitu di a Nzione Corsa - PNC ', bracket: 1 },
    { name: 'Patrie Furlane', bracket: 2 },
    { name: 'Patto per l\'Autonomia', bracket: 2 },
    { name: 'Pro Lombardia Indipendenza', bracket: 2 },
    { name: 'PSM-EN', bracket: 1 },
    { name: 'Rainbow - Vinozhito', bracket: 1 },
    { name: 'Ruch Autonomii Slaska - RAS', bracket: 2 },
    { name: 'Schleswigsche Partei - SP', bracket: 1 },
    { name: 'Slovenska Skupnost', bracket: 2 },
    { name: 'Sud Tiroler Freiheit - STF', bracket: 3 },
    { name: 'Südschleswigschen Wählerverbands - SSW', bracket: 2 },
    { name: 'Union Démocratique Bretonne – UDB', bracket: 1 },
    { name: 'Unitat Catalana - UC', bracket: 1 },
    { name: 'Unser Land', bracket: 2 }
  ]
}

export const { coefficients, roundTo, GDPBrackets, parties } = settings
