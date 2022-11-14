import { UpgradeKitType } from 'features/engineer';
import {
    ENGINEER_CERTIFICATE_ID,
    InventoryIdType,
} from 'entities/smartcontract';

const GIF_IMAGES = [
    314105, 314134, 314712, 314721, 314749, 314748, 314747, 314744, 314743,
    314738, 492749, 314739,
];

export const TEST_NET_ASSETS_ID_MAP = new Map(
    Object.entries({
        177577: 314738,
        177576: 314737,
        177575: 314735,
        177574: 314734,
        177573: 314733,
        177453: 314721,
        177452: 314719,
        177451: 314716,
        177450: 314715,
        177449: 314714,
        177448: 314712,
        177447: 314711,
        177446: 314710,
        177445: 314707,
        177444: 314706,
        176896: 314134,
        176895: 314130,
        176894: 314124,
        176891: 314117,
        176885: 314112,
        176879: 314105,
        176874: 314096,
        176873: 314090,
        176872: 314085,
        176871: 314084,
        176450: 314749,
        176449: 314748,
        176448: 314747,
        176447: 314744,
        176446: 314743,
        411113: 492749,
        411112: 492748,
        411111: 492746,
        411110: 492745,
        411109: 492803,
        176451: 314739,
        522137: 619375,
        524205: 619376,
        524206: 619377,
        524210: 619378,
        524211: 619379,
        524212: 619380,
        524214: 619381,
        524215: 619382,
        524216: 619383,
        // Engineer mine schemas
        522376: 619366,
        524134: 619367,
        524198: 619368,
        524199: 619369,
        524200: 619370,
        524201: 619371,
        524202: 619372,
        524203: 619373,
        524204: 619374,
        // Engineer equipment upgrade scheme uncommon
        522371: 619386,
        524217: 619387,
        524218: 619388,
        524220: 619389,
        524221: 619390,
        524222: 619391,
        524223: 619392,
        524224: 619393,
        524225: 619394,
        // Engineer equipment upgrade scheme rare
        522372: 619395,
        524284: 619396,
        524285: 619397,
        524286: 619398,
        524287: 619399,
        524288: 619400,
        524289: 619401,
        524290: 619402,
        524291: 619403,
        // Engineer equipment upgrade scheme epic
        522373: 619405,
        524292: 619406,
        524293: 619408,
        524294: 619409,
        524295: 619410,
        524296: 619411,
        524297: 619412,
        524298: 619413,
        524299: 619414,
        // Engineer equipment upgrade scheme legendary
        522374: 619418,
        524300: 619420,
        524301: 619421,
        524302: 619422,
        524303: 619424,
        524304: 619425,
        524305: 619426,
        524306: 619428,
        524307: 619429,
        // Cutter common
        527838: 617964,
        527839: 617965,
        527840: 617966,
        527841: 617967,
        527842: 617968,
        527843: 617969,
        527844: 617970,
        527845: 617971,
        527846: 617972,
        // Cutter uncommon
        617973: 527857,
        617974: 527848,
        617975: 527849,
        617976: 527850,
        617977: 527851,
        617978: 527852,
        617979: 527853,
        617980: 527854,
        617981: 527855,
        // Cutter rare
        617982: 527966,
        617983: 527967,
        617984: 527968,
        617985: 527969,
        617986: 527970,
        617987: 527971,
        617988: 527972,
        617989: 527973,
        617990: 527974,
        // Cutter epic
        617995: 527975,
        617996: 527976,
        617997: 527977,
        617998: 527978,
        617999: 527979,
        618000: 527980,
        618001: 527981,
        618002: 527982,
        618003: 527983,
        // Plunging Blocks common
        619221: 528083,
        619222: 528084,
        619223: 528085,
        619224: 528086,
        619225: 528087,
        619226: 528088,
        619227: 528089,
        619228: 528090,
        619229: 528091,
        // Plunging Blocks uncommon
        619231: 528092,
        619232: 528093,
        619233: 528094,
        619234: 528095,
        619235: 528096,
        619236: 528097,
        619237: 528098,
        619238: 528099,
        619244: 528100,
        // Plunging Blocks rare
        619247: 528101,
        619249: 528102,
        619250: 528103,
        619251: 528104,
        619252: 528105,
        619253: 528106,
        619254: 528107,
        619255: 528108,
        619256: 528109,
        // Plunging Blocks epic
        619257: 528110,
        619258: 528111,
        619259: 528112,
        619260: 528113,
        619261: 528114,
        619262: 528115,
        619263: 528116,
        619264: 528117,
        619265: 528118,
        // DME Wire common
        619178: 528042,
        619179: 528043,
        619180: 528044,
        619181: 528045,
        619182: 528046,
        619183: 528047,
        619184: 528048,
        619185: 528049,
        619186: 528050,
        // DME Wire uncommon
        619190: 528057,
        619191: 528058,
        619192: 528059,
        619193: 528060,
        619195: 528061,
        619196: 528062,
        619197: 528063,
        619198: 528064,
        619199: 528065,
        // DME Wire rare
        619201: 528074,
        619202: 528075,
        619203: 528076,
        619204: 528077,
        619205: 528078,
        619206: 528079,
        619207: 528080,
        619208: 528081,
        619209: 528082,
        // DME Wire epic
        619211: 528301,
        619212: 528302,
        619213: 528303,
        619214: 528304,
        619215: 528305,
        619217: 528306,
        619218: 528307,
        619219: 528308,
        619220: 528309,
        [ENGINEER_CERTIFICATE_ID]: ENGINEER_CERTIFICATE_ID,
    })
);

export const getImagePath = (templateId: InventoryIdType) => {
    const ID = TEST_NET_ASSETS_ID_MAP.get(String(templateId)) || templateId;
    const isGif = GIF_IMAGES.some((gifId) => gifId === ID);
    const ext = isGif ? 'gif' : 'webp';

    return `/img/cards/${ID}.${ext}`;
};

export const getKitImage = (type: UpgradeKitType) =>
    `/img/upgrade-kit/mine/repair-${type}.webp`;
