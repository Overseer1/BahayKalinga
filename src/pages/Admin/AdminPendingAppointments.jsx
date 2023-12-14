import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import supabase from "../../config/supabaseClient";
import Loader from "../../components/Loader";
import emailjs from "@emailjs/browser";
import ViewVisitorModal from "../../components/ViewVisitorModal";

const AdminPendingAppointments = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);
  const onDecline = () => {
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
          EmailAddress,
          ContactNumber
        ),
        ElderTable: ElderToVisit (
          NameOfElder
        )`
      )
      .eq("Status", "pending");

    console.log(data);

    if (error) console.log(error);
    else {
      setAppointments(data);
      setLoading(false);
    }
  };
  if (loading) fetchAppointments();

  const approve = async (appointment) => {
    // update appointment status to approved
    setLoading(true);
    await supabase
      .from("Appointments")
      .update({ Status: "approved" })
      .eq("id", appointment.id)
      .then((data) => {
        emailjs
      .send(
        "service_kyd5pgu",
        "template_green",
        {
          user_email:`${appointment.VisitorAcc.EmailAddress}`,
          visitor_name:`${appointment.VisitorAcc.FirstName}`,
          dateOfAppointment:`${appointment.Date}`,
          timeSched: `${appointment.Schedule}`
        },
        "nvnvA876L4ftHfSIf"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
        fetchAppointments();
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const decline = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const [reason, setReason] = useState("");
  const submitDecline = async () => {
    // update appointment status to declined
    setLoading(true);
    await supabase
      .from("Appointments")
      .update({ Status: "rejected", Reason: reason })
      .eq("id", selectedAppointment.id)
      .then(async (data) => {
        emailjs.send("service_kyd5pgu", "template_red",
          {
            user_email:`${selectedAppointment.VisitorAcc.EmailAddress}`,
            visitor_name:`${selectedAppointment.VisitorAcc.FirstName}`,
            dateOfAppointment:`${selectedAppointment.Date}`,
            timeSched: `${selectedAppointment.Schedule}`,
            message: reason
          },
          "nvnvA876L4ftHfSIf"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
        await supabase.from("Notifications").insert([
          {
            message: `You declined ${selectedAppointment.VisitorAcc.EmailAddress === null ? selectedAppointment.VisitorAcc.ContactNumber : selectedAppointment.VisitorAcc.EmailAddress}'s appointment`,
            date: null,
            type: "cancelled",
          },
        ]);

        await supabase
          .from("AppointedDates")
          .delete()
          .eq("date", selectedAppointment.Date)
          .eq("schedule", selectedAppointment.Schedule);

        fetchAppointments();
        setDeniedDialog(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
useEffect(() => {


 
})

  const [viewVisitor, setViewVisitor] = useState(false);
  const [viewVisitorData, setViewVisitorData] = useState({});

  return (
    <div className="mx-4 rounded-md">
      {loading && <Loader />}
      <ViewVisitorModal visitor={viewVisitorData} open={viewVisitor} setOpen={setViewVisitor} />
      <table className="w-full bg-white">
        <thead>
        <tr>
          <th className="py-3 px-5 border-b border-gray-200">User Name</th>
          <th className="py-3 px-5 border-b border-gray-200">Elder Name</th>
          <th className="py-3 px-5 border-b border-gray-200">
            Date of Appointment
          </th>
          <th className="py-3 px-5 border-b border-gray-200">
            Contact number
          </th>
          <th className="py-3 px-5 border-b border-gray-200">
            Email address
          </th>
          <th className="py-3 px-5 border-b border-gray-200">Time</th>
          <th className="py-3 px-5 border-b border-gray-200">Accompanied By</th>
          <th className="py-3 px-5 border-b border-gray-200">Actions</th>
        </tr>
        </thead>
        <tbody id="myTable">
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
              <td className="py-3 px-5">{appointment.Date}</td>
              <td className="py-3 px-5" id="visEma">{appointment.VisitorAcc.ContactNumber === null ? "N/A" : appointment.VisitorAcc.ContactNumber}</td>
              <td className="py-3 px-5" id="visEma">{appointment.VisitorAcc.EmailAddress === null ? "N/A" : appointment.VisitorAcc.EmailAddress}</td>
              <td className="py-3 px-5">
                {appointment.Schedule === "morning"
                    ? "7:00 AM - 10:00 AM"
                    : "1:00 PM - 3:00 PM"}
              </td>
              <td className="py-3 px-5">
                <div onClick={() => {
                  setViewVisitorData({ appointment_id: appointment.id });
                  setViewVisitor(true);
                }} className="text-blue-600 text-lg cursor-pointer">See More
                </div>
              </td>
              <td className="py-3 px-5">
                <div className="flex items-center gap-2 justify-center">
                  <button
                      type="submit"
                      onClick={() => approve(appointment)}
                      className="cursor-pointer text-blue-600"
                  >
                    Approve
                  </button>
                  <div>/</div>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <div
                          onClick={() => decline(appointment)}
                          className="cursor-pointer text-blue-600"
                      >
                        Decline
                      </div>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"/>
                      <AlertDialog.Content
                          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        {selectedAppointment && (
                            <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                              Are you sure you want to deny{" "}
                              {selectedAppointment.VisitorAcc.FirstName}{" "}
                              {selectedAppointment.VisitorAcc.MiddleName}{" "}
                              {selectedAppointment.VisitorAcc.LastName}
                              's appointment?
                            </AlertDialog.Title>
                        )}
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                          This action cannot be undone.
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <button
                                className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
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
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="py-3 min-h-[100px] text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ></textarea>
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  onClick={() => submitDecline()}
                  className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
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
