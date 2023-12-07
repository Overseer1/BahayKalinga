import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import supabase from "../../config/supabaseClient";
import Loader from "../../components/Loader";

const AdminCancelledRequests = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);
  const onDecline = () => {
    console.log(123);
    setDeniedDialog(true);
  };

  // get appointments from database
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAppointments = async () => {
    // join users and elder table
    const { data, error } = await supabase
      .from("Appointments")
      .select(
        `*,
        VisitorAcc: UserId (
          FirstName,
          MiddleName,
          LastName,
          EmailAddress
        ),
        ElderTable: ElderToVisit (
          NameOfElder
        )`
      )
      .eq("Status", "rejected");

    console.log(data);

    if (error) console.log(error);
    else {
      setAppointments(data);
      setLoading(false);
    }
  };
  if (loading) fetchAppointments();

  return (
    <div className="mx-4 rounded-md">
      {loading && <Loader />}
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">User Name</th>
            <th className="py-3 px-5 border-b border-gray-200">Elder Name</th>
            <th className="py-3 px-5 border-b border-gray-200">fuck u</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Date of Appointment
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="text-center">
              <td className="py-3 px-5">
                {appointment.VisitorAcc.FirstName}{" "}
                {appointment.VisitorAcc.MiddleName}{" "}
                {appointment.VisitorAcc.LastName}
              </td>
              <td className="py-3 px-5">
                {appointment.ElderTable.NameOfElder}
              </td>
              <td className="py-3 px-5">
                {appointment.VisitorAcc.EmailAddress}
              </td>
              <td className="py-3 px-5">{appointment.Date}</td>
              <td className="py-3 px-5">
                <div className="flex items-center gap-2 justify-center">
                  {appointment.Reason}
                </div>
              </td>
            </tr>
          ))}
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

export default AdminCancelledRequests;
