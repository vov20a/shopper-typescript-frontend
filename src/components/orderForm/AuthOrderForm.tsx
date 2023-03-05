import React from 'react'
import { Alert, Col, Form } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { StatusFetch, fetchOrder, selectOrderStatus, setDefaultOrderStatus } from '../../redux/slices/orderSlice';
import { CartProduct, IOrderItems, IUserData } from '../../types/data';
import { clearItems } from '../../redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { createProductsHtmlTable } from '../../utils/createProductsHtml';


interface AuthOrderFormProps {
    user: IUserData;
    cartProducts: CartProduct[];
    totalPrice: number;
}

const AuthOrderForm: React.FC<AuthOrderFormProps> = ({ user, cartProducts, totalPrice }) => {
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(setDefaultOrderStatus(StatusFetch.loading))
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            phone: '123456789',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });

    const orderStatus = useSelector(selectOrderStatus);

    const onSubmit = async (values: { phone: string }) => {
        const productsHtml = createProductsHtmlTable(cartProducts, totalPrice);
        const { fullName, email, userId } = user
        const params: IOrderItems = {
            fullName, email, userId, phone: values.phone, cartProducts, totalPrice,
            message: `<h2>Hello ${user.fullName}</h2>
        ${productsHtml}`
        }

        const data = await dispatch(fetchOrder(params));

        if (!data.payload) {
            return;
        } else {
            dispatch(clearItems());
        }
    };

    const onClickRemove = () => {
        dispatch(setDefaultOrderStatus(StatusFetch.loading))
    }

    return (
        <Col lg={4}>
            {orderStatus === StatusFetch.error &&
                <Alert variant='danger' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    Order not created. Try one more later.
                    <button style={{ border: "none" }} onClick={onClickRemove} className="button button--outline button--circle">
                        <svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="#ff0000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill=""></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill=""></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                    </button>
                </Alert>}
            <h4 className="title">
                <span className="pull-left "><span className="text">Order</span><span
                    className="line"><strong>form</strong></span></span>
            </h4>
            {orderStatus === StatusFetch.loaded ?
                <Alert variant='primary'>
                    Order created! The message have been sending to you!
                </Alert> :
                <Col lg={12} className='register-form'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter phone number"
                                required
                                isValid={isValid}
                                {...register('phone', {
                                    required: 'Укажите телефон',
                                    pattern: {
                                        value: /^(\+7|8)( |-)?\d{3}( |-)?\d{3}( |-)?\d{2}( |-)?\d{2}$/,
                                        message: 'Неверный формат',
                                    },
                                })}
                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }}>
                                {errors.phone?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <div className='form-button'>
                            <button type="submit" className="btn btn-cart" disabled={!isValid}>Оформить</button>
                        </div>
                    </Form>
                </Col>
            }

        </Col>
    )
}

export default AuthOrderForm