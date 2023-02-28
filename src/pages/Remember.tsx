import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RestorePassordType } from '../types/data';
import { RestoreService } from "../API/ResotoreService"



const Remember: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });

    const onSubmit = async (values: RestorePassordType) => {
        const email = await RestoreService.fetchRestorePassword(values);
        // console.log(email)
        if (email instanceof Error) {
            alert(email.message);
            navigate('/login', { replace: true });
            return;
        }
        // console.log('pass', data.payload);
        const date = Date.now();
        const params = { email, date: date };
        window.localStorage.setItem('restoreEmail', JSON.stringify(params));

        navigate('/', { state: 'sendEmail' });
    };

    return (
        <section >
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h4 className="title text-center">
                        <span className="pull-left "><span className="text">Restore</span><span className="line"><strong>Password</strong></span></span>
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
                        <div className='form-button'>
                            <Button variant="secondary" type="submit" disabled={!isValid}>
                                Отправить email
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </section >
    );
};

export default Remember;


