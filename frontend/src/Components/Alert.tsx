import React from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Alert</h2>
        </div>
        <div className="p-4">
          <p>{message}</p>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700 p-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
