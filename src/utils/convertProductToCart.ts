import { Product } from "../redux/slices/productSlice";
import { CartProduct } from "../types/data";

export const convertProductToCart = (product: Product, size: number, color: string): CartProduct => {
    const { _id, title, description, price, rating, productUrl, categoryId } = product
    const cartProduct: CartProduct = {
        _id, title, description, price, rating, productUrl, categoryId, size, color,
        count: (product?.count ? product.count : 1)
    }
    return cartProduct;
}

// _id: string;
// title: string;
// description: string;
// price: number;
// rating: number;
// productUrl: string;
// categoryId: Category;
// size: number;
// color: string;
// count: number;