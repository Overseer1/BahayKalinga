import React, { useMemo, useState } from "react";
import Calendar from "rc-year-calendar";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import TermsConditions from "../Register/TermsConditions";

/**
 * Generates a function comment for the given function body.
 *
 * @return {undefined} No return value
 */
const MemberDashboard = () => {
  const defaultDetail = {
    fullName: "",
    address: "",
    elderName: "",
    relationship: "",
    reason: "",
    image: null, // Add image property to store the selected image file
  };

  const currentYear = new Date().getFullYear();

  const [markedDates, setMarkedDates] = useState([
    {
      date: new Date(currentYear, 4, 28),
      occupied: {
        morning: null,
        afternoon: "Edward Guevarra",
      },
    },
    {
      date: new Date(currentYear, 5, 20),
      occupied: {
        morning: "Lloyd Badillo",
        afternoon: "Lloyd Badillo",
      },
    },
    {
      date: new Date(currentYear, 5, 23),
      occupied: {
        morning: "Lloyd Badillo",
        afternoon: null,
      },
    },
  ]);

  const [step, setStep] = useState(1);
  const [details, setDetails] = useState([Object.assign({}, defaultDetail)]);

  const addDetails = () => {
    setDetails([...details, Object.assign({}, defaultDetail)]);
  };

  const submitDetails = () => {
    const emptyDetails = details.filter((detail) => {
      return (
        detail.fullName === "" ||
        detail.address === "" ||
        detail.elderName === "" ||
        detail.relationship === "" ||
        detail.reason === "" ||
        detail.image === null
      );
    });
    if (emptyDetails.length > 0) {
      alert("Please input all details");
      return;
    }
    setStep(2);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  // Function to handle image file changes
  const handleImageChange = (index, image) => {
    const updatedDetails = [...details];
    updatedDetails[index].image = image;
    setDetails(updatedDetails);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const selectedMarkedDate = useMemo(() => {
    if (selectedDate) {
      return markedDates.find((date) => {
        return date.date.getTime() === selectedDate.getTime();
      });
    } else {
      return null;
    }
  }, [selectedDate, markedDates]);
  const onDatePicked = (day) => {
    if (day.date instanceof Date && !isNaN(day.date.getTime())) {
      setSelectedDate(new Date(day.date));
    } else {
      setSelectedDate(
        new Date(day.element.children[0].children[0].getAttribute("date"))
      );
    }

    setOpenTime(true);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const saveTime = (time) => {
    setSelectedTime(time);
    setStep(3);
  };
  const [openTime, setOpenTime] = useState(false);

  return (
    <div className="text-center">
      {step === 1 && (
        <>
          <div className="text-2xl font-bold">Who are you with?</div>
          <div className="text-md font-light">
            Please input the following details required:
          </div>
          {details.map((detail, index) => {
            return (
              <div
                className="flex gap-10 items-start justify-center mt-10"
                key={index}
              >
                <div className="flex flex-col gap-2 grow">
                  <input
                    className="h-12 px-4 rounded-md border border-gray-400"
                    type="text"
                    placeholder="Full Name"
                    value={detail.fullName}
                    onChange={(e) =>
                      handleInputChange(index, "fullName", e.target.value)
                    }
                  />
                  <input
                    className="h-12 px-4 rounded-md border border-gray-400"
                    type="text"
                    placeholder="Address"
                    value={detail.address}
                    onChange={(e) =>
                      handleInputChange(index, "address", e.target.value)
                    }
                  />
                  <input
                    className="h-12 px-4 rounded-md border border-gray-400"
                    type="text"
                    placeholder="Name of elder you are visiting"
                    value={detail.elderName}
                    onChange={(e) =>
                      handleInputChange(index, "elderName", e.target.value)
                    }
                  />
                  <input
                    className="h-12 px-4 rounded-md border border-gray-400"
                    type="text"
                    placeholder="Relationship with the elder"
                    value={detail.relationship}
                    onChange={(e) =>
                      handleInputChange(index, "relationship", e.target.value)
                    }
                  />
                  <input
                    className="h-12 px-4 rounded-md border border-gray-400"
                    type="text"
                    placeholder="Reason for visit"
                    value={detail.reason}
                    onChange={(e) =>
                      handleInputChange(index, "reason", e.target.value)
                    }
                  />
                  <div className="font-light text-sm">
                    <span className="text-red-600">*</span> Please make sure all
                    information are correct.
                  </div>
                </div>
                <div className="shrink-0">
                  {detail.image ? (
                    <div className="image-preview">
                      <img
                        className="w-[300px] aspect-video object-contain bg-gray-200 rounded-lg"
                        src={URL.createObjectURL(detail.image)}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg font-bold text-6xl bg-gray-200 aspect-video flex items-center justify-center w-[300px]">
                      +
                    </div>
                  )}
                  <div className="font-light text-sm mt-2">
                    <span className="text-red-600">*</span> Attach a picture of
                    who you are with
                  </div>
                  <label className="relative block">
                    <button className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md">
                      Upload
                    </button>
                    <input
                      className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </label>
                </div>
              </div>
            );
          })}
          <button
            onClick={addDetails}
            className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md"
          >
            + Add More
          </button>
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
        </>
      )}
      {step === 2 && (
        <div className="flex items-start flex-wrap justify-center gap-5">
          <Calendar
            onDayClick={onDatePicked}
            dataSource={markedDates}
            customDayRenderer={(html, date) => {
              const markDate = markedDates.find((markedDate) => {
                return (
                  markedDate.date.getFullYear() === date.getFullYear() &&
                  markedDate.date.getMonth() === date.getMonth() &&
                  markedDate.date.getDate() === date.getDate()
                );
              });
              if (markDate) {
                html.innerHTML = `<div date="${date.toDateString()}" class="tooltip" style="position: relative;">
                  <div>${html.innerHTML}</div>
                  ${
                    markDate.occupied.morning
                      ? '<div class="square morning" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>'
                      : ""
                  }
                  ${
                    markDate.occupied.afternoon
                      ? '<div class="square afternoon" style="position: absolute; bottom: 0; left: -2.5px; right: 0; top: -1px; opacity: 0.5; width: 20px; height: 20px;"></div>'
                      : ""
                  }
                  <div class="tooltiptext">
                    <div>Morning: ${markDate.occupied.morning || "None"}</div>
                    <div>Afternoon: ${
                      markDate.occupied.afternoon || "None"
                    }</div>
                  </div>
                </div>`;
              }
            }}
          />
          <Dialog.Root open={openTime} onOpenChange={setOpenTime}>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                  {selectedDate && selectedDate.toDateString()}
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                  Select Time
                </Dialog.Description>

                <div className="flex gap-5">
                  <button
                    onClick={() =>
                      !selectedMarkedDate?.occupied?.morning &&
                      saveTime("morning")
                    }
                    className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all ${
                      selectedMarkedDate?.occupied?.morning && "opacity-50"
                    }`}
                    disabled={
                      selectedMarkedDate?.occupied?.morning ? true : false
                    }
                  >
                    7:00 AM - 10:00 AM
                  </button>
                  <button
                    onClick={() =>
                      !selectedMarkedDate?.occupied?.afternoon &&
                      saveTime("afternoon")
                    }
                    className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all ${
                      selectedMarkedDate?.occupied?.afternoon && "opacity-50"
                    }`}
                    disabled={selectedMarkedDate?.occupied?.afternoon}
                  >
                    1:00 PM - 3:00 PM
                  </button>
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
      )}
      {step === 3 && (
        <>
          <div className="text-2xl font-medium">Thank you!</div>
          <div className="text-lg font-light mb-5">
            Here is the summary of your appointment. An email will be sent to
            your email address.
          </div>
          <div className="flex justify-center items-start gap-10">
            <div className="flex flex-col gap-3 text-left">
              <div className="text-lg font-bold">You are with:</div>
              <ul className="font-normal text-base flex flex-col gap-2">
                {details.map((detail, index) => (
                  <li key={index}>{detail.fullName}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-lg font-bold">Schedule</div>
              <div className="bg-stone-600 text-white px-4 py-2">
                {selectedDate.toDateString()}
              </div>
              <div className="bg-blue-600 text-white px-4 py-2">
                {selectedTime === "morning"
                  ? "7:00 AM - 10:00 AM"
                  : "1:00 PM - 3:00 PM"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberDashboard;
