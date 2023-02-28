import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RestoreService } from '../API/ResotoreService';

const CreatePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            password: '123456',
            confirm_password: '1234',
        },
        //valid after change somthing in form
        mode: 'onChange',
    });
    // const inputRef = React.useRef<HTMLInputElement>(null)
    // const passPattern = document.querySelector('form input')?.value;
    let pass: string | null | undefined = ''
    const el: HTMLInputElement | null = document.querySelector('#formBasicPassword');
    if (el) {
        //@ts-ignore
        pass = document.querySelector('#formBasicPassword')?.value;
    }
    const onSubmit = async (values: any) => {
        const params: any = window.localStorage.getItem('restoreEmail');
        const { email, date } = JSON.parse(params);
        const data = await RestoreService.fetchUpdatePassword({ password: `${values.password}`, email: email, date: date });
        window.localStorage.removeItem('restoreEmail');
        // console.log('first', data);
        if (data instanceof Error) {
            alert(data.message);
            navigate('/login', { replace: true });
        } else if (data?.message) {
            alert('Истекло время дествия ссылки');
            navigate('/login', { replace: true })
        } else if (data?.token) {
            window.localStorage.setItem('token', data.token);
            navigate('/login', { state: 'Password created' });
        }
    };

    return (
        <section >
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h4 className="title text-center">
                        <span className="pull-left "><span className="text">Restore</span><span className="line"><strong>Password</strong></span></span>
                    </h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label >Password</Form.Label>
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
                        {/* <TextField
                id="cpass"
                className={styles.field}
                label="Подтвердите пароль"
                error={Boolean(errors.confirm_password?.message)}
                helperText={errors.confirm_password?.message}
                {...register('confirm_password', {
                    required: 'Нет совпадения',
                    pattern: { value: new RegExp(`^${pass}$`), message: 'Неверный формат' },
                })}
                fullWidth
                type="password"
                autoComplete="current-password"
            /> */}
                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                            <Form.Label>ConfirmPassword</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password"
                                required
                                isValid={isValid}
                                {...register('confirm_password', {
                                    required: 'Нет совпадения',
                                    pattern: { value: new RegExp(`^${pass}$`), message: 'Неверный формат' }, minLength: 6,
                                }
                                )}
                            />
                            <Form.Text className="text-muted" style={{ color: 'red' }}>
                                {errors.confirm_password?.message}
                            </Form.Text>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="secondary" type="submit" disabled={!isValid}>
                            Отправить
                        </Button>
                    </Form>
                </Col>
            </Row>
        </section >
    );
};

export default CreatePassword;


