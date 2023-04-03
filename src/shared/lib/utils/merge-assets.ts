type BaseAsset = { asset_id: string | number };

/**
 * Function merges assets from the first argument
 * with assets from the second argument and returns them as an array
 * @param targetAssets assets that need to be merged
 * @param sourceAssets assets that will be inject to target assets
 * @returns `targetAssets` in which assets were merged with `sourceAssets`
 */
export const mergeAssets = <T1, T2>(
    targetAssets: (T2 & BaseAsset)[],
    sourceAssets: (T1 & BaseAsset)[]
): (T1 & T2)[] =>
    sourceAssets.map(
        (assetFromSource) =>
            console.log('target', targetAssets, 'source', sourceAssets) || {
                ...assetFromSource,
                ...(targetAssets?.find(
                    (assetFromTarget) =>
                        String(assetFromSource.asset_id) ===
                        String(assetFromTarget.asset_id)
                ) as T2),
            }
    );
