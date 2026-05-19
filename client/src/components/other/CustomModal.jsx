import React from "react";

const CustomModal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-blue-600 hover:bg-blue-700",
  maxWidth = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className={`bg-white rounded-2xl shadow-xl p-6 w-full ${maxWidth}`}>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        <div>{children}</div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`${confirmButtonClass} text-white px-4 py-2 rounded`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;