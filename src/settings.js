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
  }
}

export const { coefficients, roundTo, GDPBrackets } = settings
