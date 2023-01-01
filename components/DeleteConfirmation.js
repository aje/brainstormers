import {Button, Modal, Text} from "@nextui-org/react";

const DeleteConfirmation = ({visible, closeHandler, onDelete, renderItem}) => {
    return <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text b id="modal-title" size={18}>
                <Text color={"red"} b>Delete</Text> Confirmation
            </Text>
        </Modal.Header>
        <Modal.Body>
            <Text>Are you sure that you want to delete this item?</Text>
            <div className="bg-gray-100 p-4 rounded-3xl">
            {typeof renderItem === "function" && renderItem()}
            </div>
        </Modal.Body>
        <Modal.Footer >
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