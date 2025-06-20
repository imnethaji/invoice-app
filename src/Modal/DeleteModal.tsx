import { motion } from "framer-motion";
import ModalBgDiv from "./ModalBgDiv";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";

interface DeleteModalProps {
  invoiceId: string | undefined;
  handleCloseModal: () => void;
  handleDeleteInvoice: () => void;
  isActive: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  invoiceId,
  isActive,
  onClose,
  handleCloseModal,
  handleDeleteInvoice,
}) => {
  const navigate = useNavigate();
  const [deleteProgress, setDeleteProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isActive) {
      window.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, onClose]);

  const handleDelete = async () => {
    setDeleteProgress(true);

    // First timeout - Show loading spinner
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    setShowSuccess(true);

    // Second timeout - Wait before navigation
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Handle deletion and navigation
    handleDeleteInvoice();
    navigate("/");
  };

  return (
    <ModalBgDiv
      ref={modalRef}
      key={"delete-modal-bg"}
      onClick={() => !deleteProgress && handleCloseModal()}
    >
      <motion.div
        initial={{ y: "250%" }}
        animate={{ y: 0 }}
        exit={{ y: "250%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-[480px] h-[249px] flex flex-col bg-[#10111d] text-white p-12 rounded-xl space-y-6"
      >
        {deleteProgress ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="mt-4 text-lg font-semibold">
                  Invoice Deleted Successfully
                </p>
              </motion.div>
            ) : (
              <CircularProgress />
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-5">
              <h1 className="font-bold text-2xl">Confirm Deletion</h1>

              <p className="text-sm">
                Are you sure you want to delete invoice #{invoiceId}? This
                action cannot be undone.
              </p>
            </div>

            <div className="bottom flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-[#252945] text-sm p-3 px-6 rounded-full font-bold hover:bg-[#373B53] transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-[#EC5757] text-sm p-3 px-6 rounded-full font-bold hover:bg-[#FF9797] transition-colors"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </motion.div>
    </ModalBgDiv>
  );
};

export default DeleteModal;
