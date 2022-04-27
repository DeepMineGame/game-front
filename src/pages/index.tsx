import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useLogout } from 'features';
import { ContractorMenu, Title, ContractorMenuItems } from 'shared';
import { Typography } from 'antd';
import { userStore } from 'entities/user';

const IntroPage = lazy(() => import('./introPage'));

export const Routing = () => {
    const user = useStore(userStore);
    const logout = useLogout();
    return (
        <Routes>
            {user?.is_admin && (
                <Route
                    path="/contractor-cabin"
                    element={
                        <div>
                            <Title level={3} italic fontFamily="bai">
                                contractor cabin in progress...🧑🏻‍💻
                            </Title>
                            <Typography.Text strong>
                                WAX address - {user.wax_address}
                            </Typography.Text>
                            <br />
                            <Typography.Link onClick={logout}>
                                logout
                            </Typography.Link>
                            <ContractorMenu
                                config={{
                                    disabledItems: {
                                        [ContractorMenuItems.InfoPanel]: true,
                                        [ContractorMenuItems.MiningDeck]: true,
                                    },
                                    callbacks: {
                                        [ContractorMenuItems.InfoPanel]:
                                            () => {},
                                    },
                                    activeTooltip:
                                        ContractorMenuItems.InfoPanel,
                                    primaryButtonVisibility: true,
                                }}
                            />
                        </div>
                    }
                />
            )}
            <Route path="/intro" element={<IntroPage />} />
            <Route path="*" element={<IntroPage />} />
        </Routes>
    );
};
