import { BsPersonVcardFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventBus } from "../../eventbus";
import TermsConditions from "./TermsConditions";

const Register = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [terms, setTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    address: "",
    verificationCode: "",
  });

  const sendVerification = () => {
    // TODO: send verification code here
    console.log("Sending verification code...");
  };

  const onImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // TODO: call register function here
    console.log(formData);

    navigate("/");
    EventBus.emit("show-login");
  };

  return (
    <div
      className="bg-cover py-10"
      // style={{ backgroundImage: `url(${FirstSection})` }}
    >
      <div className="max-w-[1920px] m-auto px-5">
        <div className="py-10 max-w-7xl mx-auto text-center bg-white">
          <div>
            <div className="text-2xl font-semibold">
              REGISTER YOUR INFORMATION AND CREATE AN ACCOUNT
            </div>
            <div className="text-lg font-light">
              Please input the following details required:
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="flex gap-16 items-center justify-center pt-6 px-5 max-w-5xl mx-auto">
              <div className="grow">
                <div className="text-lg font-semibold mb-3">Registration</div>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          firstName: event.target.value,
                        })
                      }
                    />
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          middleName: event.target.value,
                        })
                      }
                    />
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          lastName: event.target.value,
                        })
                      }
                    />
                  </div>
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        address: event.target.value,
                      })
                    }
                  />
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Email Address"
                    value={formData.emailAddress}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        emailAddress: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex mt-2 gap-1">
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md grow"
                    type="text"
                    placeholder="Verification Code"
                    value={formData.verificationCode}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        verificationCode: event.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="bg-slate-500 text-white px-4 rounded-md"
                    onClick={sendVerification}
                  >
                    Send Code
                  </button>
                </div>
              </div>
              <div className="text-center shrink-0">
                {image ? (
                  <img
                    className="max-w-[217px] mx-auto mb-3"
                    src={image}
                    alt="uploaded_image"
                  />
                ) : (
                  <div className="mb-2">
                    <BsPersonVcardFill className="text-[100px] mx-auto text-gray-700" />
                    <div className="text-[12px]">
                      Attach a selfie with your valid ID.
                    </div>
                    <div className="text-[12px]">
                      Please make sure the image is clear.
                    </div>
                  </div>
                )}

                <label className="relative block">
                  <button
                    type="button"
                    className="w-full bg-slate-500 text-warmGray-50 py-2 rounded-md"
                  >
                    Upload Image
                  </button>
                  <input
                    className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={onImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center px-5 max-w-5xl mx-auto mt-5">
              <label className="flex gap-3">
                <input
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  type="checkbox"
                />
                <div>
                  Read the{" "}
                  <TermsConditions>
                    <span className="text-blue-700 cursor-pointer">
                      {" "}
                      Terms & Condition
                    </span>
                  </TermsConditions>
                </div>
              </label>
              <div>
                <button
                  type="submit"
                  className="bg-slate-500 text-warmGray-50 py-2 rounded-md px-8"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
