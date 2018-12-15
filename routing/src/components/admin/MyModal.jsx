import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MyModal = props => {
  return (
    <div>
      <Modal isOpen={props.show}>
        <ModalHeader>Message</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.showMessage}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyModal;
