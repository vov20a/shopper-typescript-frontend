import React from 'react'
import Table from 'react-bootstrap/Table';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { minusItem, addItem, removeItem, selectCartProducts, selectTotalPrice } from '../../redux/slices/cartSlice';
import { CartProduct } from '../../types/data';
import { v4 } from 'uuid'


const ModalTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const products: CartProduct[] = useSelector(selectCartProducts)
    const totalPrice = useSelector(selectTotalPrice)

    const countTotal = products.reduce((sum: number, item: CartProduct) => {
        if (item.count) {
            sum += item.count;
            return sum;
        }
        return 0;
    }, 0)

    const onPlusProduct = (product: CartProduct) => {
        dispatch(addItem(product))
    }
    const onMinusProduct = (product: CartProduct) => {
        dispatch(minusItem(product))
    }

    const onClickRemove = (item: CartProduct) => {
        if (window.confirm('Are you sure?')) {
            dispatch(removeItem(item));
        }
    };

    return (
        <>
            {products.length ?
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Action</th>
                                <th style={{ textAlign: 'center' }}>Img</th>
                                <th style={{ textAlign: 'center' }}>Title</th>
                                <th style={{ textAlign: 'center', minWidth: 150 }}>Qty</th>
                                <th style={{ textAlign: 'center' }}>Size</th>
                                <th style={{ textAlign: 'center' }}>Color</th>
                                <th style={{ textAlign: 'center' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) =>
                                <tr key={v4()}>
                                    <td style={{ textAlign: 'center' }}>
                                        <button style={{ border: "none" }} onClick={() => onClickRemove(product)} className="button button--outline button--circle">
                                            <svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="#ff0000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill=""></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill=""></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                        </button>
                                    </td>
                                    <td style={{ textAlign: 'center' }}><img src={process.env.REACT_APP_API_URL + '/uploads/' + product.productUrl} width={50} /></td>
                                    <td style={{ textAlign: 'center' }}>{product.title}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button style={{ border: "none" }} disabled={product.count === 1} onClick={() => onMinusProduct(product)} className="button button--outline button--circle cart__item-count-minus">
                                            <svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        </button>
                                        {product.count}
                                        <button style={{ border: "none" }} onClick={() => onPlusProduct(product)} className="button button--outline button--circle cart__item-count-plus">
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        </button>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{product.size}</td>
                                    <td style={{ textAlign: 'center' }}>{product.color}</td>
                                    <td style={{ textAlign: 'center' }}>{product.price}</td>

                                </tr>
                            )}
                            <tr>
                                <td style={{ textAlign: 'center' }}>Итого:</td>
                                <td></td>
                                <td></td>
                                <td style={{ textAlign: 'center' }} className=" cart-qty">{countTotal}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>На сумму:</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{ textAlign: 'center' }} className=" cart-sum">{totalPrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div> :
                <h3>Cart is empty</h3>
            }
        </>
    );
}
export default ModalTable;