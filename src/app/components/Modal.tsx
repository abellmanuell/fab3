"use client";

import { ModalContext } from "@/app/contexts/modal-context";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Modal({ children }: { children?: React.ReactNode }) {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();
  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          <DialogPanel className="space-y-4 bg-white dark:bg-black p-12 rounded-lg border-none">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  router.push(".");
                }}
                className="bg-secondary-1 dark:bg-secondary-1/20 rounded-full p-2 cursor-pointer dark:hover:bg-secondary-1/15"
              >
                <X size={15} />
              </button>
            </div>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
