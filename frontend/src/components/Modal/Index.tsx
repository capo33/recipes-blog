import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ModalPopupProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  value: string;
};

const ModalPopup = ({
  showModal,
  setShowModal,
  handleDelete,
  value,
}: ModalPopupProps) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className='text-danger'>Delete</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this {value}? The data will be
        permanently removed. This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => setShowModal((prev) => !prev)}>
          Cancel
        </Button>
        <Button variant='danger' onClick={() => handleDelete()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
