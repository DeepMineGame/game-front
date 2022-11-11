/* eslint-disable max-classes-per-file */
import { isMainNet } from 'app/constants';
import { RarityType } from 'entities/smartcontract';
import { Level } from './types';

type TemplateId = number;

type RarityTemplateIdMap = {
    [RarityType.common]: TemplateId;
    [RarityType.uncommon]: TemplateId;
    [RarityType.rare]: TemplateId;
    [RarityType.epic]: TemplateId;
    [RarityType.legendary]: TemplateId;
};

const mockTemplates: RarityTemplateIdMap = {
    [RarityType.common]: 0,
    [RarityType.uncommon]: 0,
    [RarityType.rare]: 0,
    [RarityType.epic]: 0,
    [RarityType.legendary]: 0,
};

enum Network {
    testNet,
    mainNet,
}

class EquipmentTemplates {
    private network: Network;

    private templateIds: Record<
        Level,
        {
            [Network.testNet]: RarityTemplateIdMap;
            [Network.mainNet]: RarityTemplateIdMap;
        }
    > = {
        [Level.first]: {
            [Network.testNet]: {
                [RarityType.common]: 522137,
                [RarityType.uncommon]: 522371,
                [RarityType.rare]: 522372,
                [RarityType.epic]: 522373,
                [RarityType.legendary]: 522374,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.second]: {
            [Network.testNet]: {
                [RarityType.common]: 524205,
                [RarityType.uncommon]: 524217,
                [RarityType.rare]: 524284,
                [RarityType.epic]: 524292,
                [RarityType.legendary]: 524300,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.third]: {
            [Network.testNet]: {
                [RarityType.common]: 524206,
                [RarityType.uncommon]: 524218,
                [RarityType.rare]: 524285,
                [RarityType.epic]: 524293,
                [RarityType.legendary]: 524301,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.fourth]: {
            [Network.testNet]: {
                [RarityType.common]: 524210,
                [RarityType.uncommon]: 524220,
                [RarityType.rare]: 524286,
                [RarityType.epic]: 524294,
                [RarityType.legendary]: 524302,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.fifth]: {
            [Network.testNet]: {
                [RarityType.common]: 524211,
                [RarityType.uncommon]: 524221,
                [RarityType.rare]: 524287,
                [RarityType.epic]: 524295,
                [RarityType.legendary]: 524303,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.sixth]: {
            [Network.testNet]: {
                [RarityType.common]: 524212,
                [RarityType.uncommon]: 524222,
                [RarityType.rare]: 524288,
                [RarityType.epic]: 524296,
                [RarityType.legendary]: 524304,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.seventh]: {
            [Network.testNet]: {
                [RarityType.common]: 524214,
                [RarityType.uncommon]: 524223,
                [RarityType.rare]: 524289,
                [RarityType.epic]: 524297,
                [RarityType.legendary]: 524305,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.eighth]: {
            [Network.testNet]: {
                [RarityType.common]: 524215,
                [RarityType.uncommon]: 524224,
                [RarityType.rare]: 524290,
                [RarityType.epic]: 524298,
                [RarityType.legendary]: 524306,
            },
            [Network.mainNet]: mockTemplates,
        },
        [Level.ninth]: {
            [Network.testNet]: {
                [RarityType.common]: 524216,
                [RarityType.uncommon]: 524225,
                [RarityType.rare]: 524291,
                [RarityType.epic]: 524299,
                [RarityType.legendary]: 524307,
            },
            [Network.mainNet]: mockTemplates,
        },
    };

    constructor(isMainNetwork: boolean) {
        this.network = isMainNetwork ? Network.mainNet : Network.testNet;
    }

    getTemplateId(level: Level, rarity: keyof RarityTemplateIdMap): TemplateId {
        return this.templateIds[level][this.network][rarity];
    }
}

class MineTemplates {
    private network: Network;

    protected templateIds: Record<
        Level,
        {
            [Network.testNet]: TemplateId;
            [Network.mainNet]: TemplateId;
        }
    > = {
        [Level.first]: {
            [Network.testNet]: 522376,
            [Network.mainNet]: 0,
        },
        [Level.second]: {
            [Network.testNet]: 524134,
            [Network.mainNet]: 0,
        },
        [Level.third]: {
            [Network.testNet]: 524198,
            [Network.mainNet]: 0,
        },
        [Level.fourth]: {
            [Network.testNet]: 524199,
            [Network.mainNet]: 0,
        },
        [Level.fifth]: {
            [Network.testNet]: 524200,
            [Network.mainNet]: 0,
        },
        [Level.sixth]: {
            [Network.testNet]: 524201,
            [Network.mainNet]: 0,
        },
        [Level.seventh]: {
            [Network.testNet]: 524202,
            [Network.mainNet]: 0,
        },
        [Level.eighth]: {
            [Network.testNet]: 524203,
            [Network.mainNet]: 0,
        },
        [Level.ninth]: {
            [Network.testNet]: 524204,
            [Network.mainNet]: 0,
        },
    };

    constructor(isMainNetwork: boolean) {
        this.network = isMainNetwork ? Network.mainNet : Network.testNet;
    }

    getTemplateId(level: Level): TemplateId {
        return this.templateIds[level][this.network];
    }
}

class MineModuleTemplates extends MineTemplates {
    protected templateIds: Record<
        Level,
        {
            [Network.testNet]: TemplateId;
            [Network.mainNet]: TemplateId;
        }
    > = {
        [Level.first]: {
            [Network.testNet]: 522377,
            [Network.mainNet]: 0,
        },
        [Level.second]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.third]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.fourth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.fifth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.sixth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.seventh]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.eighth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.ninth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
    };
}

class FactoryTemplates extends MineTemplates {
    protected templateIds: Record<
        Level,
        {
            [Network.testNet]: TemplateId;
            [Network.mainNet]: TemplateId;
        }
    > = {
        [Level.first]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.second]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.third]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.fourth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.fifth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.sixth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.seventh]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.eighth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
        [Level.ninth]: {
            [Network.testNet]: 0,
            [Network.mainNet]: 0,
        },
    };
}

export const equipmentTemplates = new EquipmentTemplates(isMainNet);
export const mineTemplates = new MineTemplates(isMainNet);
export const mineModuleTemplates = new MineModuleTemplates(isMainNet);
export const factoryTemplates = new FactoryTemplates(isMainNet);
