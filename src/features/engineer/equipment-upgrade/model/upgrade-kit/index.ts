import { createEvent, createStore, sample } from 'effector';

enum UpgradeKitType {
    common = 'common',
    uncommon = 'uncommon',
}

const openModal = createEvent();
const closeModal = createEvent<React.MouseEvent<HTMLElement>>();
const setupKit = createEvent<UpgradeKitType | ''>();
const selectKit = createEvent<UpgradeKitType>();

const $selectedKit = createStore<UpgradeKitType | ''>('').on(
    selectKit,
    (_, name) => name
);

const $upgradeKit = createStore<UpgradeKitType | ''>('').on(
    setupKit,
    (_, name) => name
);

const $showKitModal = createStore(false)
    .on(openModal, () => true)
    .on(closeModal, () => false);

// sync modal kit and selected
sample({ clock: openModal, source: $upgradeKit, target: $selectedKit });

export {
    $selectedKit,
    $upgradeKit,
    $showKitModal,
    openModal,
    closeModal,
    setupKit,
    selectKit,
    UpgradeKitType,
};
