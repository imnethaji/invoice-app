interface DeleteModalProps {
  invoiceId: string | undefined;
  handleDeleteModalActions: (action: "cancel" | "delete") => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  invoiceId,
  handleDeleteModalActions,
}) => {
  return (
    <div className="fixed inset-0 h-screen w-screen items-center z-50 bg-black bg-opacity-60 flex justify-center p-10">
      <div className="w-[480px] flex flex-col bg-[#10111d] text-white p-12 rounded-xl space-y-6">
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
          <button className="bg-[#EC5757] text-sm p-3 px-6 rounded-full font-bold">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
