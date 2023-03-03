import React from 'react'
import classes from "./ModalSlider.module.css"
import { Button, CloseButton } from 'react-bootstrap';

interface ModalSliderProps {
    children: React.ReactNode;
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void
}

const ModalSlider: React.FC<ModalSliderProps> = ({ isVisible, setVisible, children }) => {
    const cssArray = [classes.ModalSlider]
    if (isVisible) {
        cssArray.push(classes.active)
    }
    // console.log(cssArray)
    return (
        <div className={cssArray.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.ModalSliderContent} onClick={(e) => { e.stopPropagation() }}>
                <div className=" p-3">
                    <CloseButton aria-label="Hide" onClick={() => setVisible(false)} />
                </div>
                {children}
            </div>
        </div>
    )
}

export default ModalSlider;