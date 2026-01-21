import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showHeader = true,
  showFooter = true,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        {showHeader && (
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}

        <div className="p-6">{children}</div>

        {showFooter && (
          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
