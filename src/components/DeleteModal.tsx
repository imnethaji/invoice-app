import { motion } from "framer-motion";
import ModalBgDiv from "./ModalBgDiv";

interface DeleteModalProps {
  invoiceId: string | undefined;
  handleDeleteModalActions: (action: "cancel" | "delete") => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  invoiceId,
  handleDeleteModalActions,
}) => {
  return (
    <ModalBgDiv key={"delete-modal-bg"}>
      <motion.div
        initial={{ y: "250%" }}
        animate={{ y: 0 }}
        exit={{ y: "250%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-[480px] flex flex-col bg-[#10111d] text-white p-12 rounded-xl space-y-6"
      >
        <div className="flex flex-col space-y-5">
          <h1 className="font-bold text-2xl">Confirm Deletion</h1>
          <p className="text-sm">
            Are you sure you want to delete invoice #{invoiceId}? This action
            cannot be undone.
          </p>
        </div>
        <div className="bottom flex justify-end space-x-4">
          <button
            onClick={() => handleDeleteModalActions("cancel")}
            className="bg-[#252945] text-sm p-3 px-6 rounded-full font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteModalActions("delete")}
            className="bg-[#EC5757] text-sm p-3 px-6 rounded-full font-bold"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </ModalBgDiv>
  );
};

export default DeleteModal;
