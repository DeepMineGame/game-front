import { city } from 'app/router/paths';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'shared';
import { BlockchainAuthPage } from './blockchain';
import { GoogleAuthPage } from './google';

export const AuthPage = () => {
    const query = useQuery();
    const forwardFromOnboarding = Boolean(query.get('forwardFromOnboarding'));
    const navigate = useNavigate();
    const [section, setSection] = useState<'blockchain' | 'google'>('google');

    if (forwardFromOnboarding) {
        sessionStorage.setItem('forwardFromOnboarding', 'true');
    }

    const handleGoogleAuthSuccess = useCallback(() => {
        setSection('blockchain');
    }, []);

    const handleBlockchainAuthSuccess = useCallback(() => {
        navigate(city, { replace: true });
    }, [navigate]);

    return section === 'google' ? (
        <GoogleAuthPage onSuccess={handleGoogleAuthSuccess} />
    ) : (
        <BlockchainAuthPage onSuccess={handleBlockchainAuthSuccess} />
    );
};
