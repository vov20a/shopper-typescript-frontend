import { RegisterParams } from "../redux/slices/authSlice";



export interface SecondMenu {
    _id: string;
    title: string;
    categoryParent?: string;
    createdAt: string;
    updatedAtAt: string;
    __v: number;

}

export interface Category extends SecondMenu {
    nodes?: [];
}

export interface FirstMenu extends SecondMenu {
    nodes?: SecondMenu[],
};
export interface FoundMenu {
    nodes: FirstMenu[],
};
// =====================
export interface IUserData {
    fullName: string;
    email: string;
    userId: string;
}

export interface IOrderItems extends IUserData {
    cartProducts: CartProduct[];
    totalPrice: number;
    message: string;
    phone: string;
}
export interface IOrderResult {
    fullName: string;
    email: string;
    userId: string;
    phone: string;
    products: CartProduct[];
    totalPrice: number;
}

export type CartProduct = {
    _id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    productUrl: string;
    categoryId: Category;
    size: number;
    color: string;
    count: number;
}

export interface RegisterCartParams extends RegisterParams {
    phone: string;
}

export interface RestorePassordType {
    email: string;
}
export interface CreatePassordType {
    password: string;
    email: string;
    date: Date;
}
export interface CreateResultType {
    token: string;
    fullName: string;
    email: string;
    role: string;
    avatarUrl?: string;
    message?: string;
}