
import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setActiveClass } from '../redux/slices/categorySlice';
import React from 'react';
interface ProtectedCategoryProductsProps {
    categoryId: string;
    redirectPath?: string;
    children: ReactElement<JSX.Element, any> | null;
}

export const ProtectedCategoryProducts: React.FC<ProtectedCategoryProductsProps> = ({ categoryId, redirectPath = '/', children }) => {

    const dispatch = useAppDispatch()

    // console.log('cats:', categoryId);
    React.useEffect(() => {
        // if (!categoryId) {
        //     return <Navigate to={redirectPath} replace />;
        // }
        dispatch(setActiveClass(categoryId));
        window.localStorage.setItem('activeClass', categoryId);

    }, [categoryId])
    return children ? children : <Outlet />;
};