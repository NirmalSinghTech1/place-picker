import { createPortal } from "react-dom";
import {
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import ProgressBar from "./ProgressBar";

const Modal = forwardRef(function Modal(
  { onRemovePlace, onStopRemovePlace, isModalOpen },
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
      className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-1 backdrop:bg-[rgba(0,0,0,0.6)] bg-amber-50 font-['Quicksand'] min-w-[24em] w-full max-w-[30em] max-sm:max-w-[18em] open:flex open:flex-col open:items-start open:gap-3 p-4 rounded-md shadow-2xl open:animate-[slideDown_0.3s_ease-out_1]"
    >
      <h2 className="text-lg font-['Bricolage_Grotesque'] font-semibold">
        Are you sure?
      </h2>
      <p className="font-medium">Do you really want to delete this place?</p>
      <div className="flex items-end justify-between w-full max-sm:flex-col max-sm:items-stretch">

        {isModalOpen && <ProgressBar isModalOpen={isModalOpen} onRemovePlace={onRemovePlace} />}

        <form method="dialog" className="self-end mt-6 max-sm:w-full">
          <button
            onClick={onStopRemovePlace}
            className="sm:w-22 w-2/5 bg-orange-400 font-medium rounded-sm py-0.5 text-white text-lg mr-1.5 shadow-md cursor-pointer hover:bg-orange-300 transition-all duration-150"
          >
            No
          </button>
          <button
            onClick={onRemovePlace}
            className="sm:w-22 w-2/5 bg-orange-400 font-medium rounded-sm py-0.5 text-white text-lg shadow-md cursor-pointer hover:bg-orange-300 transition-all duration-150"
          >
            Yes
          </button>
        </form>
      </div>
    </dialog>,
    document.body,
  );
});

export default Modal;
