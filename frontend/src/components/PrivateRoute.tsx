import { AppContext } from '@context/contexts';
import { useContext } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
    const {
        user: { user },
        isLoggedIn: { isLoggedIn },
        isAuthLoading: { isAuthLoading },
    } = useContext(AppContext);

    const location = useLocation();

    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center">
                <BarLoader color="#5F6FFF" />
            </div>
        );
    }

    if (!isLoggedIn || !user)
        return (
            <Navigate to="/login" replace state={{ from: location.pathname }} />
        );

    return element;
};

export default PrivateRoute;
