import {Button, Modal, Text} from "@nextui-org/react";

const DeleteConfirmation = ({visible, closeHandler, onDelete}) => {
    return <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
                Welcome to
                <Text b size={18}>
                    NextUI
                </Text>
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text>Are you sure that you want to delete this item?</Text>
        </Modal.Body>
        <Modal.Footer>
            <Button auto  flat onClick={closeHandler}>
                Close
            </Button>
            <Button auto color="error" onClick={onDelete}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}

export default DeleteConfirmation