import { Button, Modal } from "@mui/material";
import { AiOutlineDoubleRight } from "../icons";

// eslint-disable-next-line react/prop-types
const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      className="flex items-center justify-center px-6"
    >
      <div className="w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md">
        <h2 className="text-xl font-semibold mb-6 flex gap-2 items-center">
          <AiOutlineDoubleRight className="w-4 h-4" /> Confirm Deletion
        </h2>
        <p>Are you sure you want to delete your account ?</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={onConfirm}
          >
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
