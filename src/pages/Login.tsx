import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button, Alert, } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { LoginParams, fetchAuth, selectStatus, selectIsAuth } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import { StatusFetch } from '../redux/slices/orderSlice';


const Login: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch();
    const status = useSelector(selectStatus);
    const isLoading = status === StatusFetch.loading || false;
    const isAuth = useSelector(selectIsAuth)


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: 'petr@mail.ru',
            password: '123456',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });

    const onSubmit = async (values: LoginParams) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться');
        }

    };

    const isCreatedPassword = Boolean(location?.state === 'Password created');

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section >
            {isCreatedPassword &&
                <Alert variant='primary'>
                    Пароль создан. Войдите в аккаунт!
                </Alert>}
            {isLoading ? <Loader /> :
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <h4 className="title text-center">
                            <span className="pull-left "><span className="text">Login</span><span className="line"><strong>form</strong></span></span>
                        </h4>
                        <Form onSubmit={handleSubmit(onSubmit)}>
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


                            <div className='form-button__login'>
                                <Button variant="warning" type='button' >
                                    <Link to="/remember">Remember password</Link>
                                </Button>
                                <Button variant="secondary" type="submit" disabled={!isValid}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>}
        </section >
    )
}

export default Login


