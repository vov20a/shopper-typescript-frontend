import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/authSlice';
import { useAppDispatch } from './redux/store';
import CategoryElement from './pages/CategoryElement';
import SearchElement from './pages/SearchElement';
import { ProtectedCategoryProducts } from './hoc/ProtectedCategoryProducts'
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import { ProtectedCreatePassword } from './hoc/ProtectedCreatePassword';
import CreatePassword from './pages/CreatePassword';
import Remember from './pages/Remember';
import { ProtectedAuthRoute } from './hoc/ProtectedAuthRoute';




const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [categoryId, setCategoryId] = React.useState<string>('')
  // console.log(isAuth)

  const [isMainLayout, setMainLayout] = React.useState<boolean>(false);
  // const [categoryId, setCategoryId] = React.useState<string>('')

  React.useEffect(() => {
    if (location.pathname !== "/") {
      //ставим основной Layout
      setMainLayout(false)
      if (location.pathname.includes('/categories')) {
        //переход на категорию из ProductBox(5 using)
        const res: RegExpMatchArray | null = location.pathname.match(/(\/categories\/)(\w+)/);
        setCategoryId(res ? res[2] : '')
      }
    } else {
      //ставим banner Layout
      setMainLayout(true)
    }
  }, [location.pathname])

  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const email = window.localStorage.getItem('restoreEmail');
  const isEmail = email ? true : false;


  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedCategoryProducts categoryId={categoryId}>
            <Layout isMainLayout={isMainLayout} />
          </ProtectedCategoryProducts>
        }>
          <Route
            path="remember"
            element={
              <ProtectedAuthRoute redirectPath='/' isAuth={isAuth}>
                <Remember />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="password"
            element={
              <ProtectedCreatePassword redirectPath='/login' isEmail={isEmail}>
                <CreatePassword />
              </ProtectedCreatePassword>
            }
          />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="categories/:id" element={<CategoryElement />} />
          <Route path="products/:cat_id/:id" element={<ProductPage />} />
          <Route path="query" element={<SearchElement />} />
          <Route path="checkout" element={<OrderPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
