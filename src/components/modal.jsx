import React from "react";

export default function Modal({
  show,
  onClose,
  title,
  icon,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClassName = "px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors",
}) {
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <div className="text-gray-600 mb-6">{children}</div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button onClick={onConfirm} className={confirmClassName}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
