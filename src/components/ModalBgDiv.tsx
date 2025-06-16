import { motion } from "framer-motion";
import React, { forwardRef } from "react";

interface ModalBgDivProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalBgDiv = forwardRef<HTMLDivElement, ModalBgDivProps>(
  ({ children, onClick }, ref) => {
    return (
      <motion.div
        ref={ref}
        key="modal-bg"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 h-screen w-screen z-50 bg-black bg-opacity-60 flex justify-center items-center p-10"
      >
        {children}
      </motion.div>
    );
  }
);

export default ModalBgDiv;
