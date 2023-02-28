import React from 'react'
import { useSelector } from 'react-redux'
import { selectActiveClass, selectCategories } from '../../redux/slices/categorySlice'
import { subCategories } from '../../utils/subCategories'
import { Category } from '../../types/data'
import { Link } from 'react-router-dom'

const SubCategories: React.FC = () => {
    const categories = useSelector(selectCategories)
    const subCats: Category[] = subCategories(categories)
    const activeClass = useSelector(selectActiveClass)
    // console.log(subCats)
    return (
        <ul className="nav nav-list">
            <li className="nav-header text-left">SUB CATEGORIES</li>
            {subCats.map((cat) =>
                <li key={cat._id} className={activeClass === cat._id ? "text-left active" : "text-left"}>
                    <Link to={`/categories/${cat._id}`}>{cat.title}</Link>
                </li>
            )}
        </ul>
    )
}

export default SubCategories