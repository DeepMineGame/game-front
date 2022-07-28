import { home } from 'app/router/paths';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { BlockchainAuthPage } from './blockchain';
import { GoogleAuthPage } from './google';

export const AuthPage = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState<'blockchain' | 'google'>('google');

    const handleGoogleAuthSuccess = useCallback(() => {
        setSection('blockchain');
    }, []);

    const handleBlockchainAuthSuccess = useCallback(() => {
        navigate(home, { replace: true });
    }, [navigate]);

    return section === 'google' ? (
        <GoogleAuthPage onSuccess={handleGoogleAuthSuccess} />
    ) : (
        <BlockchainAuthPage onSuccess={handleBlockchainAuthSuccess} />
    );
};
