import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const AdminPendingAppointments = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);
  const onDecline = () => {
    console.log(123);
    setDeniedDialog(true);
  };

  return (
    <div className="mx-4 rounded-md">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">
              Name of Visitor
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Elder to Visit
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Date of Appointment
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Email</th>
            <th className="py-3 px-5 border-b border-gray-200">Address</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Attached Photo
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="py-3 px-5">Edward Guevarra</td>
            <td className="py-3 px-5">Grandfather</td>
            <td className="py-3 px-5">August 25, 2023</td>
            <td className="py-3 px-5">edwardguevarra2003@gmail.com</td>
            <td className="py-3 px-5">#18 Marco St.</td>
            <td className="py-3 px-5">
              <img
                className="w-14 h-14 m-auto"
                src="https://unsplash.it/100/100"
                alt="placeholder"
              />
            </td>
            <td className="py-3 px-5">
              <div className="flex items-center gap-2 justify-center">
                <div className="cursor-pointer text-blue-600">Approve</div>
                <div>/</div>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <div className="cursor-pointer text-blue-600">Decline</div>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                      <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Are you sure you want to deny NAME's appointment?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        This action cannot be undone.
                      </AlertDialog.Description>
                      <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                          <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            Cancel
                          </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button
                            onClick={onDecline}
                            className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                          >
                            Yes
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Dialog.Root open={deniedDialog} onOpenChange={setDeniedDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Select Reason
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Explain why their appointment is denied
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <select
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
              >
                <option value="Testing">Testing</option>
              </select>
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Submit
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default AdminPendingAppointments;
