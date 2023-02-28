import React from "react";
import { Category, FirstMenu } from "../types/data";
import { NavDropdown } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import { selectActiveClass, selectCategories } from "../redux/slices/categorySlice";
import { useSelector } from "react-redux";
import { subCategories } from "../utils/subCategories";

interface NodesProps {
    element: FirstMenu;
}

const Nodes: React.FC<NodesProps> = ({ element }) => {
    const { pathname } = useLocation();
    const navLinkRef = React.useRef<HTMLLinkElement>(null);
    // const subLinkRef = React.useRef<HTMLLinkElement>(null);
    // const parentRef = React.useRef<HTMLDivElement>(null);

    const activeClass: string | undefined = useSelector(selectActiveClass);

    // const categories = useSelector(selectCategories)
    // const subCats: Category[] = subCategories(categories)


    // console.log(pathname)
    React.useEffect(() => {
        //при переходе из categoriesElement в home
        if (!pathname.match(RegExp("/categories"))) {
            if (navLinkRef.current?.classList.contains('active')) {
                navLinkRef.current.classList.remove('active')
            }
        }
    }, [pathname])

    React.useEffect(() => {
        //при клике на категорию вне меню
        if (element._id !== activeClass) {
            if (navLinkRef.current?.classList.contains('active')) {
                navLinkRef.current.classList.remove('active')
                // console.log('remove')
                // parentRef.current?.parentElement?.parentElement?.classList.remove('active')
            }
        }


    }, [activeClass])


    const showNodes = () => {
        let arNodes: JSX.Element[] = [];
        if (element.nodes && element.nodes.length > 0) {
            element.nodes.map((element, index) => {
                arNodes.push(
                    <div key={index}
                    // ref={parentRef}
                    >
                        <NavDropdown.Item eventKey={`${element._id}`}
                            className={element._id === activeClass ? "active" : ""}>
                            {element.title}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                    </div>
                );
                return arNodes;
            });
        }
        return arNodes;
    };

    return (
        <>
            {!(element.nodes) ? <NavDropdown.Item ref={navLinkRef}
                eventKey={element.title === 'ALL' ? '63ce9a9e790857857298139f' : `${element._id}`}
                className={element._id === activeClass ? "nav-link active" : "nav-link"} >
                {element.title}
            </NavDropdown.Item> :
                <NavDropdown title={element.title} id={`basic-nav-dropdown ${element._id}`} className='sf-menu'> {showNodes()}
                </NavDropdown>
            }
        </>

    );
};

export default Nodes;

