import React from 'react'
import { Col, NavDropdown, Row } from 'react-bootstrap'
import BestSellers from './BestSellers'
import { Product } from '../../redux/slices/productSlice'
import Randomize from './Randomize';
import SubCategories from './SubCategories';
import { useSelector } from 'react-redux';
import { Sort, SortItemEnum, selectSort, setSort } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

export const sortList: Sort[] = [
    { name: 'rating', sortProperty: SortItemEnum.RATING },
    { name: 'title', sortProperty: SortItemEnum.TITLE },
    { name: 'price', sortProperty: SortItemEnum.PRICE },
];

interface SideBarProps {
    bestProducts: Product[];
    errorBestProducts: string;
    isBestLoading: boolean;
    randomizeProducts: Product[];
    errorRandomizeProducts: string;
    isRandomizeLoading: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ bestProducts, errorBestProducts, isBestLoading, randomizeProducts, errorRandomizeProducts, isRandomizeLoading }) => {
    const sortItem: Sort = useSelector(selectSort)
    const dispatch = useAppDispatch()

    const sortHandle = (item: Sort) => {
        dispatch(setSort(item))
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <div className="sidebar-block">
                        <SubCategories />
                        <br />
                        <NavDropdown title={sortItem.name ? sortItem.name : "SORT"} className='text-left sort-head' id="basic-nav-dropdown">
                            {sortList.map((item) =>
                                <NavDropdown.Item key={item.sortProperty} className='sort-item' onClick={() => { sortHandle(item) }}>{item.name}</NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="sidebar-block" id="randomize-carousel">
                        <Randomize randomizeProducts={randomizeProducts}
                            errorRandomizeProducts={errorRandomizeProducts}
                            isRandomizeLoading={isRandomizeLoading}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="sidebar-block">
                        <h4 className="title-small"><strong>Best</strong> Seller</h4>
                        <BestSellers errorBestProducts={errorBestProducts} bestProducts={bestProducts} isBestLoading={isBestLoading} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default SideBar