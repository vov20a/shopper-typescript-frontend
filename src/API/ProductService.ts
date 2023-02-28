import axios from "../axios";
import { Product } from "../redux/slices/productSlice";

export default class ProductService {

    static async getProducts(sort: string, limit: number, startProduct: number) {
        const response = await axios.get<Product[]>(`/products/?sort=${sort}&startProduct=0&limit=3`);
        return response.data;
    }

    static async getProductsRandomize() {
        const response = await axios.get<Product[]>(`/randomize/products`);
        return response.data;
    }

    static async getProductsRelated(cat_id: string | undefined) {
        const response = await axios.get<Product[]>(`/products/categories/${cat_id}`);
        return response.data;
    }
}
