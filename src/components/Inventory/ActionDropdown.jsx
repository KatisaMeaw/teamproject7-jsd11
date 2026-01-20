import { Edit2, Eye, MoreHorizontal } from "lucide-react";

const ActionDropdown = ({ item, onEdit, onDetail, isOpen, onToggle }) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click events
          onToggle();
        }}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-slate-300" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={onToggle}></div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 absolute right-0 mt-2 w-36 rounded-xl shadow-lg z-20 overflow-hidden">
            <div className="py-1">
              <button
                onClick={() => {
                  onDetail(item);
                  onToggle();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:text-gray-500 dark:hover:text-white dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Eye className="w-4 h-4 mr-2" /> View Detail
              </button>
              <button
                onClick={() => {
                  onEdit(item);
                  onToggle();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:text-gray-500 dark:hover:text-white dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Edit2 className="w-4 h-4 mr-2" /> Edit Item
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionDropdown;
