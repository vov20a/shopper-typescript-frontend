import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { fetchAuthMe, FetchAuthParams, fetchRegister, RegisterParams, selectIsAuth, selectStatus } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import { StatusFetch } from '../redux/slices/orderSlice';




const Register: React.FC = () => {
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useAppDispatch();
    const status = useSelector(selectStatus);
    const isLoading = status === StatusFetch.loading || false;

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

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
        },
        //valid after change somthing in form
        mode: 'onChange',
    });


    const onSubmit = async (values: RegisterParams) => {
        if (values.avatarUrl === '') {
            delete values.avatarUrl;
        }

        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            alert('Не удалось зарегистрироваться');
            return;
        }
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section >
            {isLoading ? <Loader /> :
                <Row className="justify-content-md-center">
                    <Col md={5}>
                        <h4 className="title text-center">
                            <span className="pull-left "><span className="text">Register</span><span className="line"><strong>form</strong></span></span>
                        </h4>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Full Nam"
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

                            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                            <div className='form-button'>
                                <Button variant="secondary" type="submit" disabled={!isValid}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            }
        </section>
    )
}

export default Register