import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalTable from './ModalTable';
import { useAppDispatch } from "../../redux/store"
import { clearItems } from '../../redux/slices/cartSlice';
import { useNavigate } from "react-router-dom"


interface CartModalProps {
    isVisible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({ isVisible, setVisible }) => {
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        setVisible(false);
    }
    const handleShow = () => setShow(true);

    React.useEffect(() => {
        handleShow()
    }, [isVisible])

    const handleRemoveAll = () => {
        if (window.confirm("Are you sure?")) {
            dispatch(clearItems())
        }
    }
    const handleOrder = () => {
        handleClose();
        navigate('/checkout');
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>YOUR CART</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalTable />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="secondary" onClick={handleOrder}>
                    Create Order
                </Button>
                <Button variant="primary" onClick={handleRemoveAll}>
                    Remove All
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CartModal;