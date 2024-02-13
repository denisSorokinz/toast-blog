"use client";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useModalStore from "@/stores/modal";
import { IoIosClose } from "react-icons/io";
import AuthForm from "./AuthForm";

const Modal = () => {
  const { isShown, hide } = useModalStore();
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isShown} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={hide}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                <AuthForm
                  onAuthSuccess={hide}
                  Heading={() => (
                    <Dialog.Title
                      as="h3"
                      className="text-center text-base font-semibold leading-6 text-gray-900"
                    >
                      Authorize to get access
                    </Dialog.Title>
                  )}
                  Footer={() => (
                    <div className="bg-gray-50 p-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm hover:bg-purple-600 sm:ml-3 sm:w-auto"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={hide}
                        ref={cancelButtonRef}
                      >
                        <IoIosClose size={24} />
                        Close
                      </button>
                    </div>
                  )}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
