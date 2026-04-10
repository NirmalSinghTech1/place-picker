import { createPortal } from "react-dom";
import { useImperativeHandle, useRef, forwardRef } from "react";

const Modal = forwardRef(function Modal(
  { onRemovePlace, onStopRemovePlace },
  ref,
) {
  const modal = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
      close() {
        modal.current.close();
      },
    };
  }, []);

  return createPortal(
    <dialog
      ref={modal}
      className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-1 backdrop:bg-[rgba(0,0,0,0.6)] bg-amber-50 font-['Quicksand'] w-[25em] open:flex open:flex-col open:items-start open:gap-1.5 p-4 rounded-md shadow-2xl open:animate-[slideDown_0.3s_ease-out_1]"
    >
      <h2 className="text-lg font-['Bricolage_Grotesque'] font-semibold">
        Are you sure?
      </h2>
      <p className="font-medium">Do you really want to delete this place?</p>
      <form method="dialog" className="self-end mt-6">
        <button
          type="submit"
          onClick={onStopRemovePlace}
          className="w-22 bg-orange-400 font-medium rounded-sm py-0.5 text-white text-lg mr-1.5 shadow-md cursor-pointer hover:bg-orange-300 transition-all duration-150"
        >
          No
        </button>
        <button
          type="submit"
          onClick={onRemovePlace}
          className="w-22 bg-orange-400 font-medium rounded-sm py-0.5 text-white text-lg shadow-md cursor-pointer hover:bg-orange-300 transition-all duration-150"
        >
          Yes
        </button>
      </form>
    </dialog>,
    document.body,
  );
});

export default Modal;
