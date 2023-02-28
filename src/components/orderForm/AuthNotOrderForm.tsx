import React, { Dispatch } from 'react'
import { Alert, Button, Col, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/store';
import { CartProduct, IOrderItems, RegisterCartParams } from '../../types/data';
import { createProductsHtmlTable } from '../../utils/createProductsHtml';
import { FetchAuthParams, RegisterParams, fetchRegister, selectStatus, setDefaultAuthStatus } from '../../redux/slices/authSlice';
import { clearItems } from '../../redux/slices/cartSlice';
import { StatusFetch, fetchOrder, selectOrderStatus, setDefaultOrderStatus } from '../../redux/slices/orderSlice';
import { useSelector } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';


interface AuthNotOrderFormProps {
    cartProducts: CartProduct[];
    totalPrice: number;
}

const AuthNotOrderForm: React.FC<AuthNotOrderFormProps> = ({ cartProducts, totalPrice }) => {
    const dispatch = useAppDispatch()
    const authStatus = useSelector(selectStatus)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: 'Petr',
            email: 'petr@mail.ru',
            password: '123456',
            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            phone: '123456789',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });

    React.useEffect(() => {
        dispatch(setDefaultOrderStatus(StatusFetch.loading))
        dispatch(setDefaultAuthStatus(StatusFetch.loading))
    }, [])

    const orderStatus = useSelector(selectOrderStatus);
    const onSubmit = async (values: RegisterCartParams) => {
        if (values.avatarUrl === '') {
            delete values.avatarUrl;
        }
        const { fullName, email, avatarUrl, password, phone } = values;
        const registerParams: RegisterParams = { fullName, email, avatarUrl, password }
        const dataRegister: any = await dispatch(fetchRegister(registerParams))
        if (!dataRegister.payload) {
            return;
        } else {
            const userId: string = dataRegister.payload?._id
            const productsHtml = createProductsHtmlTable(cartProducts, totalPrice);
            const orderParams: IOrderItems = {
                fullName, email, userId, phone, cartProducts, totalPrice,
                message: `<h2>Hello ${fullName}</h2>
            ${productsHtml}`
            }
            const dataOrder = await dispatch(fetchOrder(orderParams));

            if (!dataOrder.payload) {
                return;
            } else {
                dispatch(clearItems());
            }
        }
    };

    return (
        <Col lg={4}>
            {authStatus === StatusFetch.error &&
                <Alert variant='danger'>
                    User not created. Try one more later.
                </Alert>}
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

                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Full Name"
                                required
                                isValid={isValid}
                                {...register('fullName', {
                                    required: 'Укажите почту', minLength: 3
                                })}
                            />
                            < Form.Text className="text-muted" >
                                {errors.fullName?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                required
                                isValid={isValid}
                                {...register('email', {
                                    required: 'Укажите почту', pattern: /\w+@\w+\.\w+/
                                })}
                            />
                            < Form.Text className="text-muted" >
                                {errors.email?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password"
                                required
                                isValid={isValid}
                                {...register('password', { required: 'Укажите пароль', minLength: 6 })}
                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }}>
                                {errors.password?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAvatarUrl">
                            <Form.Label>AvatarUrl</Form.Label>
                            <Form.Control type="text" placeholder="Enter https avatar"
                                isValid={isValid}
                                {...register('avatarUrl', {
                                    required: false,
                                    pattern: { value: /^https?:\/\/(?!.*:\/\/)\S+/, message: 'Неверный формат' },
                                })}
                            />
                            < Form.Text className="text-muted" >
                                {errors.avatarUrl?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

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
                            <Button variant="primary" type="submit" disabled={!isValid}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            }
        </Col>
    )
}

export default AuthNotOrderForm