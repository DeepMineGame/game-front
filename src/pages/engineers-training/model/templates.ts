// eslint-disable-next-line max-classes-per-file
import { isMainNet } from 'app/constants';
import { Level, RarityType } from 'entities/smartcontract';

type TemplateId = number;

type RarityTemplateIdMap = {
    [RarityType.common]: TemplateId;
    [RarityType.uncommon]: TemplateId;
    [RarityType.rare]: TemplateId;
    [RarityType.epic]: TemplateId;
    [RarityType.legendary]: TemplateId;
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
            [Network.mainNet]: {
                [RarityType.common]: 619375,
                [RarityType.uncommon]: 619386,
                [RarityType.rare]: 619395,
                [RarityType.epic]: 619405,
                [RarityType.legendary]: 619418,
            },
        },
        [Level.second]: {
            [Network.testNet]: {
                [RarityType.common]: 524205,
                [RarityType.uncommon]: 524217,
                [RarityType.rare]: 524284,
                [RarityType.epic]: 524292,
                [RarityType.legendary]: 524300,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619376,
                [RarityType.uncommon]: 619387,
                [RarityType.rare]: 619396,
                [RarityType.epic]: 619406,
                [RarityType.legendary]: 619420,
            },
        },
        [Level.third]: {
            [Network.testNet]: {
                [RarityType.common]: 524206,
                [RarityType.uncommon]: 524218,
                [RarityType.rare]: 524285,
                [RarityType.epic]: 524293,
                [RarityType.legendary]: 524301,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619377,
                [RarityType.uncommon]: 619388,
                [RarityType.rare]: 619397,
                [RarityType.epic]: 619408,
                [RarityType.legendary]: 619421,
            },
        },
        [Level.fourth]: {
            [Network.testNet]: {
                [RarityType.common]: 524210,
                [RarityType.uncommon]: 524220,
                [RarityType.rare]: 524286,
                [RarityType.epic]: 524294,
                [RarityType.legendary]: 524302,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619378,
                [RarityType.uncommon]: 619389,
                [RarityType.rare]: 619398,
                [RarityType.epic]: 619409,
                [RarityType.legendary]: 619422,
            },
        },
        [Level.fifth]: {
            [Network.testNet]: {
                [RarityType.common]: 524211,
                [RarityType.uncommon]: 524221,
                [RarityType.rare]: 524287,
                [RarityType.epic]: 524295,
                [RarityType.legendary]: 524303,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619379,
                [RarityType.uncommon]: 619390,
                [RarityType.rare]: 619399,
                [RarityType.epic]: 619410,
                [RarityType.legendary]: 619424,
            },
        },
        [Level.sixth]: {
            [Network.testNet]: {
                [RarityType.common]: 524212,
                [RarityType.uncommon]: 524222,
                [RarityType.rare]: 524288,
                [RarityType.epic]: 524296,
                [RarityType.legendary]: 524304,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619380,
                [RarityType.uncommon]: 619391,
                [RarityType.rare]: 619400,
                [RarityType.epic]: 619411,
                [RarityType.legendary]: 619425,
            },
        },
        [Level.seventh]: {
            [Network.testNet]: {
                [RarityType.common]: 524214,
                [RarityType.uncommon]: 524223,
                [RarityType.rare]: 524289,
                [RarityType.epic]: 524297,
                [RarityType.legendary]: 524305,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619381,
                [RarityType.uncommon]: 619392,
                [RarityType.rare]: 619401,
                [RarityType.epic]: 619412,
                [RarityType.legendary]: 619426,
            },
        },
        [Level.eighth]: {
            [Network.testNet]: {
                [RarityType.common]: 524215,
                [RarityType.uncommon]: 524224,
                [RarityType.rare]: 524290,
                [RarityType.epic]: 524298,
                [RarityType.legendary]: 524306,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619382,
                [RarityType.uncommon]: 619393,
                [RarityType.rare]: 619402,
                [RarityType.epic]: 619413,
                [RarityType.legendary]: 619428,
            },
        },
        [Level.ninth]: {
            [Network.testNet]: {
                [RarityType.common]: 524216,
                [RarityType.uncommon]: 524225,
                [RarityType.rare]: 524291,
                [RarityType.epic]: 524299,
                [RarityType.legendary]: 524307,
            },
            [Network.mainNet]: {
                [RarityType.common]: 619383,
                [RarityType.uncommon]: 619394,
                [RarityType.rare]: 619403,
                [RarityType.epic]: 619414,
                [RarityType.legendary]: 619429,
            },
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
            [Network.mainNet]: 619366,
        },
        [Level.second]: {
            [Network.testNet]: 524134,
            [Network.mainNet]: 619367,
        },
        [Level.third]: {
            [Network.testNet]: 524198,
            [Network.mainNet]: 619368,
        },
        [Level.fourth]: {
            [Network.testNet]: 524199,
            [Network.mainNet]: 619369,
        },
        [Level.fifth]: {
            [Network.testNet]: 524200,
            [Network.mainNet]: 619370,
        },
        [Level.sixth]: {
            [Network.testNet]: 524201,
            [Network.mainNet]: 619371,
        },
        [Level.seventh]: {
            [Network.testNet]: 524202,
            [Network.mainNet]: 619372,
        },
        [Level.eighth]: {
            [Network.testNet]: 524203,
            [Network.mainNet]: 619373,
        },
        [Level.ninth]: {
            [Network.testNet]: 524204,
            [Network.mainNet]: 619374,
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
