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
    return (
        <Col lg={4}>
            {orderStatus === StatusFetch.error &&
                <Alert variant='danger'>
                    Order not created. Try one more later.
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