export default {
  tierItems: [
    { Tier: 0.25, starshipBuildPoints: 25 },
    { Tier: 0.33, starshipBuildPoints: 30 },
    { Tier: 0.5, starshipBuildPoints: 40 },
    { Tier: 1, starshipBuildPoints: 55 },
    { Tier: 2, starshipBuildPoints: 75 },
    { Tier: 3, starshipBuildPoints: 95 },
    { Tier: 4, starshipBuildPoints: 115 },
    { Tier: 5, starshipBuildPoints: 135 }
  ],
  frameItems: [
    {
      name: "Racer",
      size: 'T',
      maneuverability: 'perfect',
      piloting: 2,
      turn: 0,
      HP: 20,
      DT: 0,
      CT: 4,
      MinCrew: 1,
      MaxCrew: 1,
      Cost: 4
    },
    {
      name: "Interceptor",
      size: 'T',
      maneuverability: 'perfect',
      piloting: 2,
      turn: 0,
      HP: 30,
      DT: 0,
      CT: 6,
      MinCrew: 1,
      MaxCrew: 1,
      Cost: 6
    },
    {
      name: "Fighter",
      size: 'T',
      maneuverability: 'perfect',
      piloting: 1,
      turn: 1,
      HP: 35,
      DT: 0,
      CT: 7,
      MinCrew: 1,
      MaxCrew: 2,
      Cost: 8
    }
  ],
  powerCoreItems: [
    {
      core: 'Micron Light',
      size: 'T',
      PCU: 50,
      cost: 4
    },
    {
      core: 'Micron Heavy',
      size: 'T',
      PCU: 70,
      cost: 6
    },
    {
      core: 'Micron Ultra',
      size: 'T',
      PCU: 80,
      cost: 8
    },
    {
      core: 'Arcus Light',
      size: 'T,S',
      PCU: 75,
      cost: 7
    },
    {
      core: 'Pulse Brown',
      size: 'T,S',
      PCU: 90,
      cost: 9
    },
    {
      core: 'Pulse Black',
      size: 'T,S',
      PCU: 120,
      cost: 12
    },
    {
      core: 'Pulse White',
      size: 'T,S',
      PCU: 140,
      cost: 14
    }
  ],
  thrusterItems: [
    {name: 'T6',size: 'T',speed: 6,piloting: 1,PCU: 20,cost: 3},
    {name: 'T8',size: 'T',speed: 8,piloting: 0,PCU: 25,cost: 4},
    {name: 'T10',size: 'T',speed: 10,piloting: 0,PCU: 30,cost: 5},
    {name: 'T12',size: 'T',speed: 12,piloting: -1,PCU: 35,cost: 6},
    {name: 'T14',size: 'T',speed: 14,piloting: -2,PCU: 40,cost: 7},
    {name: 'S6',size: 'S',speed: 6,piloting: 1,PCU: 30,cost: 3},
    {name: 'S8',size: 'S',speed: 8,piloting: 0,PCU: 40,cost: 4},
    {name: 'S10',size: 'S',speed: 10,piloting: 0,PCU: 50,cost: 5},
    {name: 'S12',size: 'S',speed: 12,piloting: -1,PCU: 60,cost: 6},
    {name: 'M4',size: 'M',speed: 4,piloting: 2,PCU: 40,cost: 2},
    {name: 'M6',size: 'M',speed: 6,piloting: 1,PCU: 50,cost: 3},
    {name: 'M8',size: 'M',speed: 8,piloting: 0,PCU: 60,cost: 4},
    {name: 'M10',size: 'M',speed: 10,piloting: 0,PCU: 70,cost: 5},
    {name: 'M12',size: 'M',speed: 12,piloting: -1,PCU: 80,cost: 6}
  ],
  armorItems: [
    {name: 'Mk1', acBonus: 1, TL: 0, turnMod: 0, cost: 1},
    {name: 'Mk2', acBonus: 2, TL: 0, turnMod: 0, cost: 2},
    {name: 'Mk3', acBonus: 3, TL: 0, turnMod: 0, cost: 3},
    {name: 'Mk4', acBonus: 4, TL: 0, turnMod: 0, cost: 5},
    {name: 'Mk5', acBonus: 5, TL: -1, turnMod: 0, cost: 7},
    {name: 'Mk6', acBonus: 6, TL: -1, turnMod: 0, cost: 9},
    {name: 'Mk7', acBonus: 7, TL: -1, turnMod: 0, cost: 12}
  ],
  computerItems: [
    {name: 'Basic', bonus: 0, nodes: 0, PCU: 0, cost: 0},
    {name: 'Mk 1 mononode', bonus: 1, nodes: 1, PCU: 10, cost: 1},
    {name: 'Mk 1 duonode', bonus: 1, nodes: 2, PCU: 10, cost: 2},
    {name: 'Mk 1 trinode', bonus: 1, nodes: 3, PCU: 10, cost: 3},
    {name: 'Mk 1 tetranode', bonus: 1, nodes: 4, PCU: 10, cost: 4},
    {name: 'Mk 2 mononode', bonus: 2, nodes: 1, PCU: 15, cost: 4},
    {name: 'Mk 2 duonode', bonus: 2, nodes: 2, PCU: 15, cost: 8},
    {name: 'Mk 2 trinode', bonus: 2, nodes: 3, PCU: 15, cost: 12},
    {name: 'Mk 2 tetranode', bonus: 2, nodes: 4, PCU: 15, cost: 16},
    {name: 'Mk 3 mononode', bonus: 3, nodes: 1, PCU: 20, cost: 9},
    {name: 'Mk 3 duonode', bonus: 3, nodes: 2, PCU: 20, cost: 18},
    {name: 'Mk 3 trinode', bonus: 3, nodes: 3, PCU: 20, cost: 27},
    {name: 'Mk 3 tetranode', bonus: 3, nodes: 4, PCU: 20, cost: 36}
  ]
}
