import { useNavigate } from 'react-router-dom';

export const useReloadPage = () => {
    const navigate = useNavigate();
    return () => navigate(0);
};
