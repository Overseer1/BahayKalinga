import React, {useContext, useEffect, useMemo, useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import TermsConditions from "../Register/TermsConditions";
import YearlyCalendar from "../../components/YearlyCalendar";
import supabase from "../../config/supabaseClient";
import Loader from "../../components/Loader";
import {UserContext} from "../../providers/UserProvider";
import relationships from "../../refs/ref_relationship";
import {formatISO} from "date-fns";
import {useNavigate} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { ToastContainer } from "react-toastify";

/**
 * Generates a function comment for the given function body.
 *
 * @return {undefined} No return value
 */
//! TODO: Create Read for appointment, Can only submit an appointment once *(max. of 2 / year).
//! *optional

const MemberDashboard = () => {
    const {user} = useContext(UserContext);

    const relationshipOptions = relationships;

    const [elderOptions, setElderOptions] = useState([]);
    const [elderId, setElderId] = useState("");

    const defaultDetail = {
        fullName: "", relationship: "Select Relationship", image: null, // Add image property to store the selected image file
    };
    const [step, setStep] = useState(1);
    const [details, setDetails] = useState([Object.assign({}, defaultDetail)]);
    const initializeAppointedDates = async () => {
        const {data: appointedDates} = await supabase
            .from("AppointedDates")
            .select("*");

        const combinedAppointedDates = [];

        appointedDates.forEach((appointedDate) => {
            const date = appointedDate.date;
            const schedule = appointedDate.schedule;

            const combinedAppointedDate = combinedAppointedDates.find((date) => {
                return appointedDate.date === date.compareDate;
            });

            if (combinedAppointedDate) {
                console.log(combinedAppointedDate, schedule);
                if (schedule === "morning") {
                    combinedAppointedDate.occupied.morning = "occupied";
                } else if (schedule === "afternoon") {
                    combinedAppointedDate.occupied.afternoon = "occupied";
                }
            } else {
                combinedAppointedDates.push({
                    compareDate: date, date: new Date(date), occupied: {
                        morning: schedule === "morning" ? "occupied" : null,
                        afternoon: schedule === "afternoon" ? "occupied" : null,
                    },
                });
            }
        });

        setMarkedDates(combinedAppointedDates);
    };
    const addDetails = () => {
        setDetails([...details, Object.assign({}, defaultDetail, {
            elderName: elderOptions.length ? elderOptions[0].id : 0,
        }),]);
    };
    const deleteDetails = () => {
        if (details.length > 1) {
            const updatedDetails = [...details];
            updatedDetails.pop();
            setDetails(updatedDetails);
        }
    };
    const submitDetails = async () => {
        const emptyDetails = details.filter((detail) => {
            return (detail.fullName === "" || detail.relationship === "Select Relationship" || detail.image === null);
        });

        if (emptyDetails.length > 0 || elderId === null) {
            alert("Please input all details");
            return;
        }

        // Get all dates from AppointedDates table
        initializeAppointedDates();

        setStep(2);
    };
    const handleInputChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = value;
        setDetails(updatedDetails);
    };
    const handleImageChange = (index, image) => {
        const updatedDetails = [...details];
        updatedDetails[index].image = image;
        setDetails(updatedDetails);
    };

    // Calendar
    const [markedDates, setMarkedDates] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const selectedMarkedDate = useMemo(() => {
        if (selectedDate) {
            return markedDates.find((date) => {
                // compare date string
                return (new Date(date.date).toDateString() === selectedDate.toDateString());
            });
        } else {
            return null;
        }
    }, [selectedDate, markedDates]);
    const [openTime, setOpenTime] = useState(false);
    const onDatePicked = (day) => {
        if (day.date instanceof Date && !isNaN(day.date.getTime())) {
            setSelectedDate(new Date(day.date));
        } else {
            setSelectedDate(new Date(day.element.children[0].children[0].getAttribute("date")));
        }
        setOpenTime(true);
    };
    const [selectedTime, setSelectedTime] = useState(null);
    const saveTime = async (time) => {
        setIsLoading(true);
        setSelectedTime(time);

        const BUCKET_NAME = "ImageCompanion";

        const submitDate = new Date(selectedDate);
        submitDate.setHours(0, 0, 0, 0);
        submitDate.setDate(submitDate.getDate() + 1);

        // validate date should be greater than today
        if (submitDate < new Date()) {
            alert("Please select a date greater than today");
            setIsLoading(false);
            return;
        }

        /* Add Appointment */
        const {data, error} = await supabase
            .from("Appointments")
            .insert([{
                ElderToVisit: elderId, Date: submitDate, Schedule: time, Status: "pending", UserId: user.id,
            },])
            .select();

        if (error) {
            alert(error.message);
            return;
        }

        // get id of inserted appointment
        const appointmentId = data[0].id;

        /* Add Visitor */
        await Promise.all(details.map(async (detail) => {
            const randomString = Math.random().toString(36).substring(2, 15);
            const filePath = `${randomString}-${detail.image.name}`;
            const {error: uploadError} = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, detail.image);
            if (uploadError) {
                console.error(uploadError);
                return;
            }
            const response = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filePath);
            const publicURL = response?.data?.publicUrl;
            const {error} = await supabase.from("AppointmentVisitors").insert([{
                name: detail.fullName,
                relationship: detail.relationship,
                image_url: publicURL,
                appointment_id: appointmentId,
            },]);
            if (error) {
                alert(error.message);
                return;
            }
            // insert to AppointedDates table
            const {error: error2} = await supabase.from("AppointedDates").insert([{
                date: submitDate, schedule: time,
            },]);
            if (error2) {
                alert(error2.message);

            }
        }));

        /* Add Notification */
        await supabase.from("Notifications").insert([{
            message: `${user.EmailAddress === null ? user.ContactNumber : user.EmailAddress} has pending appointment`, date: null, type: "pending",
        },]);

        setIsLoading(false);

        setStep(3);
    };

    const [appointmentStatus, setAppointmentStatus] = useState("pending");
    const [appointmentRemarks, setAppointmentRemarks] = useState("");
    const [appointmentId, setAppointmentId] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
        if (user) {
            // validate if has appointment already
            const getAppointment = async () => {
                const currentDate = formatISO(new Date(), {representation: "date"});

                const {data: approvedAppointments, error} = await supabase
                    .from("Appointments")
                    .select("*")
                    .eq("UserId", user.id)
                    .eq("Status", "approved")
                    .gte("Date", currentDate)
                    .eq("Ignore", false);

                if (error) {
                    alert(error.message);
                    return;
                }

                const {data: declinedAppointments, declinedError} = await supabase
                    .from("Appointments")
                    .select("*")
                    .eq("UserId", user.id)
                    .eq("Status", "rejected")
                    .eq("Ignore", false);

                if (declinedError) {
                    alert(declinedError.message);
                    return;
                }

                const {data: pendingAppointments, pendingError} = await supabase
                    .from("Appointments")
                    .select("*")
                    .eq("UserId", user.id)
                    .eq("Status", "pending")
                    .gte("Date", currentDate)
                    .eq("Ignore", false);

                if (pendingError) {
                    alert(pendingError.message);
                    return;
                }

                if ((approvedAppointments && approvedAppointments.length) || (declinedAppointments && declinedAppointments.length) || (pendingAppointments && pendingAppointments.length)) {
                    let lastAppointment = null;

                    if (approvedAppointments && approvedAppointments.length) {
                        lastAppointment = approvedAppointments[approvedAppointments.length - 1];
                    }

                    if (declinedAppointments && declinedAppointments.length) {
                        lastAppointment = declinedAppointments[declinedAppointments.length - 1];
                    }

                    if (pendingAppointments && pendingAppointments.length) {
                        lastAppointment = pendingAppointments[pendingAppointments.length - 1];
                    }

                    setAppointmentId(lastAppointment.id);
                    setAppointmentStatus(lastAppointment.Status);
                    setAppointmentRemarks(lastAppointment.Reason);

                    const appointmentVisitors = await supabase
                        .from("AppointmentVisitors")
                        .select("*")
                        .eq("appointment_id", lastAppointment.id);

                    setDetails(appointmentVisitors?.data?.map((visitor) => {
                        return Object.assign({}, defaultDetail, {
                            fullName: visitor.name,
                        });
                    }));

                    await initializeAppointedDates();
                    setSelectedDate(new Date(lastAppointment.Date));
                    setSelectedTime(lastAppointment.Schedule);
                    setStep(3);
                }
            };

            // get ElderTable data and set to elderOptions
            const getElderOptions = async () => {
                const {data: elders, error} = await supabase
                    .from("ElderTable")
                    .select("*");

                if (error) {
                    alert(error.message);
                    return;
                }

                if (elders) {
                    setElderOptions(elders.map((elder) => {
                        return {
                            id: elder.id, label: elder.NameOfElder,
                        };
                    }));

                    setElderId(user.ElderId || elders[0].id);
                }
            };

            const initialize = async () => {
                await getAppointment();
                await getElderOptions();
                setIsLoading(false);
            };

            initialize();
        }
    }, [user]); // Empty dependency array means this runs once on mount

    const [isLoading, setIsLoading] = useState(true);

    const confirm = async () => {
        setIsLoading(true);

        const {error} = await supabase
            .from("Appointments")
            .update({Ignore: true})
            .eq("id", appointmentId);

        if (error) {
            alert(error.message);
            return;
        }

        setIsLoading(false);
        setDetails([Object.assign({}, defaultDetail)]);
        setStep(1);
    };

    const [cancelDialog, setCancelDialog] = useState(false);
    const [reason, setReason] = useState("");

    const cancel = async (reason) => {
        setIsLoading(true);

        const {error} = await supabase
            .from("Appointments")
            .update({Status: 'rejected', Reason: reason, Ignore: true})
            .eq("id", appointmentId);

        if (error) {
            alert(error.message);
            return;
        }

        setIsLoading(false);
        setDetails([Object.assign({}, defaultDetail)]);
        setStep(1);
    }

    return (<>
        <div className="text-center">
            {isLoading && <Loader/>}
            {step === 1 && (<>
                <div className="text-2xl font-bold">Name of visitors</div>
                <label className="text-md font-light">
                    *This includes you and your companions.
                </label>
                <div className="text-md font-light">
                    Please input the following details required:
                </div>
                <div className="flex flex-col gap-2 items-start justify-center mt-10">
                    <label>Name of Elder to Visit</label>
                    <div>
                        <select
                            className="h-12 px-4 rounded-md border border-gray-400 bg-white"
                            placeholder="Relationship with the elder"
                            value={elderId}
                            onChange={(e) => setElderId(e.target.value)}
                        >
                            {elderOptions.map((option) => (<option key={option.id} value={option.id}>
                                {option.label}
                            </option>))}
                        </select>
                    </div>
                </div>

                {details.map((detail, index) => {
                    return (<div
                        className="flex gap-10 items-start justify-center mt-10"
                        key={index}
                    >
                        <div className="flex flex-col gap-2 grow">
                            <label className="text-left">Visitor Details</label>
                            <input
                                className="h-12 px-4 rounded-md border border-gray-400"
                                type="text"
                                placeholder="Full Name"
                                value={detail.fullName}
                                onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
                            />
                            <select
                                className="h-12 px-4 rounded-md border border-gray-400 bg-white"
                                placeholder="Relationship with the elder"
                                onChange={(e) => handleInputChange(index, "relationship", e.target.value)}
                            >
                                {relationshipOptions.map((option) => (<option key={option} value={option}>
                                    {option}
                                </option>))}
                            </select>
                            <div className="font-light text-sm">
                                <span className="text-red-600">*</span> Please make sure all
                                information are correct.
                            </div>
                        </div>
                        <div className="shrink-0">
                            {detail.image ? (<div className="image-preview">
                                <img
                                    className="w-[300px] aspect-video object-contain bg-gray-200 rounded-lg"
                                    src={URL.createObjectURL(detail.image)}
                                    alt="Preview"
                                />
                            </div>) : (<div
                                className="rounded-lg font-bold text-9xl bg-gray-200 aspect-video flex items-center justify-center w-[300px]">
                                <PersonIcon fontSize=""/>
                            </div>)}
                            <div className="font-light text-sm mt-2">
                                {/* <span className="text-red-600">*</span> Attach a picture of
                    who you are with */}
                            </div>
                            <label className="relative block">
                                <button
                                    className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md">
                                    Upload
                                </button>
                                <input
                                    className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>);
                })}
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={addDetails}
                        className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md"
                    >
                        + Add More
                    </button>
                    <button
                        onClick={deleteDetails}
                        className="mt-5 h-10 text-red-600 border border-red-600 px-6 rounded-md"
                    >
                        Delete
                    </button>
                </div>
                <div className="flex justify-between mt-8">
                    <div className="text-xl">
                        Read the{" "}
                        <TermsConditions>
                <span className="text-blue-600 cursor: pointer;">
                  Terms & Condition
                </span>
                        </TermsConditions>
                    </div>
                    <div className="flex gap-5">
                        <button
                            onClick={submitDetails}
                            className="border border-blue-600 text-white h-10 text-base bg-blue-600 px-10"
                        >
                            Next
                        </button>
                        {/* <button className="border border-blue-600 text-blue-600 h-10 text-base px-10">
            Cancel
          </button> */}
                    </div>
                </div>
            </>)}
            {step === 2 && (<div className="flex items-start flex-wrap justify-center gap-5">
                {markedDates && (<YearlyCalendar
                    markedDates={markedDates}
                    onDatePicked={onDatePicked}
                    isMonthlyView={true}
                />)}
                <Dialog.Root open={openTime} onOpenChange={setOpenTime}>
                    <Dialog.Portal>
                        <Dialog.Overlay
                            className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"/>
                        <Dialog.Content
                            className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            {(!selectedMarkedDate?.occupied?.morning || !selectedMarkedDate?.occupied?.afternoon) && (<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                {selectedDate && selectedDate.toDateString()}
                            </Dialog.Title>)}
                            {(!selectedMarkedDate?.occupied?.morning || !selectedMarkedDate?.occupied?.afternoon) && (
                                <Dialog.Description
                                    className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                    Select Time
                                </Dialog.Description>
                            )}
                            {(!selectedMarkedDate?.occupied?.morning || !selectedMarkedDate?.occupied?.afternoon) && (
                                <div className="flex gap-5">
                                    <button
                                        onClick={() => !selectedMarkedDate?.occupied?.morning && saveTime("morning")}
                                        className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all ${selectedMarkedDate?.occupied?.morning && "opacity-50"}`}
                                        disabled={selectedMarkedDate?.occupied?.morning ? true : false}
                                    >
                                        7:00 AM - 10:00 AM
                                    </button>
                                    <button
                                        onClick={() => !selectedMarkedDate?.occupied?.afternoon && saveTime("afternoon")}
                                        className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all ${selectedMarkedDate?.occupied?.afternoon && "opacity-50"}`}
                                        disabled={selectedMarkedDate?.occupied?.afternoon}
                                    >
                                        1:00 PM - 3:00 PM
                                    </button>
                                </div>)}

                            {selectedMarkedDate?.occupied?.morning && selectedMarkedDate?.occupied?.afternoon && (
                                <div className="text-center text-lg font-bold mt-5">
                                    Schedules for this date is already occupied
                                </div>)}

                            <Dialog.Close asChild>
                                <button
                                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                    aria-label="Close"
                                >
                                    <Cross2Icon/>
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>)}
            {step === 3 && (<>
                <div className="text-2xl font-medium">Thank you!</div>
                <div className="text-lg font-light mb-5">
                    {appointmentStatus === "pending" && "Here is the summary of your appointment. You will receive a notification when your appointment gets approved or declined."}
                    {appointmentStatus === "approved" && "Your appointment has been approved. See you soon."}
                    {appointmentStatus === "rejected" && `I'm sorry. Your appointment has been declined. Reason ${appointmentRemarks}. Kindly set an appointment another time. Thank you`}
                </div>
                <div className="flex justify-center items-start gap-10">
                    <div className="flex flex-col gap-3 text-left">
                        <div className="text-lg font-bold">Name of visitors:</div>
                        <ul className="font-normal text-base flex flex-col gap-2">
                            {details.map((detail, index) => (<li key={index}>{detail.fullName}</li>))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-lg font-bold">Schedule</div>
                        <div className="bg-stone-600 text-white px-4 py-2">
                            {selectedDate.toDateString()}
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-2">
                            {selectedTime === "morning" ? "7:00 AM - 10:00 AM" : "1:00 PM - 3:00 PM"}
                        </div>
                    </div>
                </div>
                {appointmentStatus === "rejected" && (<button
                    onClick={confirm}
                    className="mt-8 bg-blue-600 text-white py-2 px-4 cursor-pointer hover:bg-blue-400"
                >
                    Confirm
                </button>)}
                {appointmentStatus !== "rejected" && (<button
                    onClick={() => setCancelDialog(true)}
                    className="mt-8 bg-red-600 text-white py-2 px-4 cursor-pointer hover:bg-red-400"
                >
                    Cancel
                </button>)}
            </>)}
        </div>
        <Dialog.Root open={cancelDialog} onOpenChange={setCancelDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"/>
                <Dialog.Content
                    className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Reason for cancellation
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Explain why you want to cancel
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
                                onClick={() => cancel(reason)}
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
                            <Cross2Icon/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>);
};

export default MemberDashboard;
