import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedAuthRouteProps {
    isAuth: boolean;
    redirectPath: string;
    children: ReactElement<JSX.Element, any> | null;
}



export const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({ isAuth, redirectPath, children }) => {
    // console.log('user:', isAuth);
    if (isAuth) {
        return <Navigate to={ redirectPath } replace />;
    }

    return children ? children : <Outlet />;
};
