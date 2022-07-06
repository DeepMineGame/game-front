const GIF_IMAGES = [
    314105, 314134, 314712, 314721, 314749, 314748, 314747, 314744, 314743,
    314738, 492749,
];

export const TEST_NET_ASSETS_ID_MAP = {
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
    // TODO: ADD MINE TEMPLATE IMAGES
    176451: undefined,
    0: undefined,
};

export type TemplateIdType = keyof typeof TEST_NET_ASSETS_ID_MAP;

export const getImagePath = (templateId: TemplateIdType) => {
    const ID = TEST_NET_ASSETS_ID_MAP[templateId] || templateId;
    const isGif = GIF_IMAGES.some((gifId) => gifId === ID);
    const ext = isGif ? 'gif' : 'png';

    return `/img/cards/${ID}.${ext}`;
};