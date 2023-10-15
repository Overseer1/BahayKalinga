import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MemberDashboard = () => {
  const defaultDetail = {
    fullName: "",
    address: "",
    elderName: "",
    relationship: "",
    reason: "",
    image: null, // Add image property to store the selected image file
  };

  const defaultMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [step, setStep] = useState(1);
  const [details, setDetails] = useState([Object.assign({}, defaultDetail)]);

  const addDetails = () => {
    setDetails([...details, Object.assign({}, defaultDetail)]);
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
              <span className="text-blue-600 cursor: pointer;">
                Terms & Condition
              </span>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setStep(2)}
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
          {defaultMonths.map((month) => {
            return (
              <div>
                <div className="font-medium mb-3 text-lg">{month}</div>
                <Calendar
                  defaultActiveStartDate={
                    new Date(`${month} 1, ${new Date().getFullYear()}`)
                  }
                  showNavigation={false}
                  tileClassName={({ activeStartDate, date, view }) =>
                    view === "month" && date.getDay() === 3 ? "wednesday" : null
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
