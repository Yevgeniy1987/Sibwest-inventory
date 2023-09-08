import { createPortal } from "react-dom";

export const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalElem =  <div className="fixed inset-0 flex justify-center items-center bg-black/30">
  <div className="bg-white w-[500px] flex flex-col gap-3 rounded border p-4 min-h-[100px] relative">
    <button className="absolute right-2 top-1" onClick={onClose}>
      &times;
    </button>
    {children}
  </div>
</div>

const modalRoot = document.getElementById("modal")

  return (
   <>{createPortal(modalElem, modalRoot)}</>
  );
};
