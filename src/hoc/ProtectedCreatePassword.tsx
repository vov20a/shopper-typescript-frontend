import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedCreatePasswordProps {
    isEmail: boolean;
    redirectPath: string;
    children: ReactElement<JSX.Element, any> | null;
}

export const ProtectedCreatePassword: React.FC<ProtectedCreatePasswordProps> = ({ isEmail, redirectPath, children }) => {
    //   console.log('user:', isAuth);
    if (!isEmail) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};
