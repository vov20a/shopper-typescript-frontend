import React from 'react'
import { CloseButton, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/logo.png';
import { useSelector } from 'react-redux';
import { selectIsAuth, logout, selectUser } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/store';
import { fetchCategories, selectItems, setActiveClass } from '../redux/slices/categorySlice';
import Nodes from './Nodes';
import { SelectCallback } from 'react-bootstrap/esm/helpers';
import { setCurrentPage } from '../redux/slices/productSlice';
import debounce from 'lodash.debounce'
import { setSearch } from '../redux/slices/filterSlice';
import { selectTotalPrice } from '../redux/slices/cartSlice';
import CartModal from './cart/CartModal';




const HeaderTop: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation()


    const [value, setValue] = React.useState<string>('');
    const searchRef = React.useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setValue('');
        dispatch(setSearch(''));
        searchRef.current?.focus();
        dispatch(setCurrentPage(1))
        navigate(`/`);
    };
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearch(str));
            navigate(`/query/?search=${str}`)
        }, 1000),
        [],
    );
    const onChangeValue = (value: string) => {
        dispatch(setCurrentPage(1))
        setValue(value);
        updateSearchValue(value);
    };

    React.useEffect(() => {
        if (!localStorage.getItem('items')) {
            dispatch(fetchCategories());
        }
        if (location.pathname.includes('/categories')) {
            const activeClass: string | null = window.localStorage.getItem('activeClass')
            if (activeClass) dispatch(setActiveClass(activeClass))
        } else if (location.pathname.includes('/')) {
            dispatch(setActiveClass(''))
        }
    }, [location.pathname])
    const Items = useSelector(selectItems);
    // console.log(Items)

    const [isVisible, setVisible] = React.useState<boolean>(false)
    const totalPrice = useSelector(selectTotalPrice);
    const modalShow = () => {
        setVisible(true)
    }


    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    // console.log("isAuth", user)

    const logoutHandle = () => {
        if (window.confirm('Are you sure?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
            navigate('/login');
        }
    }


    const handleSelect: SelectCallback = (eventKey) => {
        dispatch(setCurrentPage(1))
        // console.log(eventKey)
        if (eventKey) {
            eventKey === '63ce9a9e790857857298139f' ? dispatch(setActiveClass('63ce9a9e790857857298139f')) :
                dispatch(setActiveClass(eventKey))
            window.localStorage.setItem('activeClass', eventKey)
        }
        navigate(`/categories/${eventKey}`)
    }

    return (
        <header className="main-header">
            <Row>
                <Col md={5} sm={12} className="mt-3">
                    <Form>
                        <Form.Group className="mb-3 search_form">
                            <input ref={searchRef} value={value}
                                onChange={(e) => onChangeValue(e.target.value)}
                                placeholder="Search..." />{value ? <CloseButton className='search_close' onClick={onClickClear} /> : <></>}
                        </Form.Group>
                    </Form>
                </Col>
                {/* /.col-md-5 */}
                <Col md={7} sm={12} className="text-center">
                    <nav className="navbar navbar-expand-md">
                        <div className=" navbar-collapse top-menu" id="navbarSupportedContent1">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item" onClick={modalShow}>
                                    {totalPrice > 0 ?
                                        <a className="nav-link" >${totalPrice}</a> :
                                        <a className="nav-link" >Cart Empty</a>
                                    }
                                </li>
                                {!isAuth ?
                                    <> <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={logoutHandle} >Logout</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link user-avatar"><img src={user.avatarUrl} alt="avatar" /> {user?.email}</a>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </Col>
                {/* /.col-md-7  */}
            </Row>

            <div id="bottom-bar">
                <Row>
                    <Col md={4} className="logo-menu justify-content-start align-text-top">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </Col>
                    {/* /.col-md-4  */}
                    <Col md={8} className="bottom-menu">
                        <Navbar bg="light" expand="md">
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto bottom-menu" onSelect={handleSelect}>
                                        {Items.nodes.map((element, index) => (
                                            <Nodes key={index} element={element} />
                                        ))}
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Col>
                    {/* /.col-md-8  */}
                </Row>
                {/* /.row  */}
            </div>
            {isVisible ? <CartModal isVisible={isVisible} setVisible={setVisible} /> : <></>}
        </header >
    )
}

export default HeaderTop