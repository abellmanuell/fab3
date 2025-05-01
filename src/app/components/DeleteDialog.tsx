import React from "react";
import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { Trash } from "lucide-react";
import { deleteAirdrop } from "@/lib/db/airdropDB";
import { useRouter } from "next/navigation";

export default function DeleteDialog({
  isOpen,
  setIsOpen,
  airdrop,
}: {
  isOpen: boolean;
  setIsOpen: any;
  airdrop: any;
}) {
  const router = useRouter();
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 dark:bg-black rounded-lg border-none">
            <div className="flex justify-center">
              <div className="bg-primary-2 dark:bg-primary-2/20 rounded-full inline-block p-6 ">
                <Trash size={20} className="text-primary-1" />
              </div>
            </div>

            <Description>Are you sure you want to delete?</Description>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-primary-2 dark:bg-primary-2/20 p-2 dark:text-white text-black cursor-pointer rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary-1 p-2 text-black font-bold cursor-pointer rounded-full"
                onClick={async () => {
                  await deleteAirdrop(airdrop._id, airdrop.userId);
                  setIsOpen(false);
                  router.replace("/airdrops");
                }}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
