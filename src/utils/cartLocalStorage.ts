import { CartProduct } from '../types/data'

export const cartItemsLS = (): CartProduct[] => {
    const data = localStorage.getItem('cart');
    const items: CartProduct[] = data ? JSON.parse(data) : [];
    return items;
};
export const totalPriceLS = (products: CartProduct[]): number => {
    const total: number = products.reduce((sum, product) => {
        if (product?.count) {
            sum += product.price * product?.count;
        }
        return sum;
    }, 0)
    return total;
};