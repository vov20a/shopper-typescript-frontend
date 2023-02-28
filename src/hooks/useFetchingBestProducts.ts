import React from 'react'
import { Product } from '../redux/slices/productSlice';
import axios from '../axios';

export function useFetchingBestProducts(callback: () => void): [() => Promise<void>, boolean, string] {
    const [isLoading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>('');

    const fetching = async () => {
        try {
            setLoading(true);
            await callback();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return [fetching, isLoading, error];

}