import React from 'react'
import Modal from "react-bootstrap/Modal"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Confirm = (props) => {
    return (
        <Modal show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header>
                <Modal.Title>Confirma exclusão?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
                Deseja realmente Excluir este objetivo?
            </Modal.Body> */}
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={props.hideModal}><FontAwesomeIcon icon="times" /> Não</button>
                <button className="btn btn-primary" onClick={props.confirmAction}><FontAwesomeIcon icon="check" /> Sim</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirm
