import { BsPersonVcardFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TermsConditions from "./TermsConditions";
import supabase from "../../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { addUser, addUserWithConNum, authValues } from "../../components/Auth";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Loader from "../../components/Loader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState(false);
  const [ImageID] = useState(uuidv4);
  
  //for insert data
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");

  //Address holder
  const [Address, setAddress] = useState("");

  const [HouseApptBlkNo, setHouseNo] = useState("");
  const [Street, setStreet] = useState("");
  const [Barangay, setBrgy] = useState("");
  const [CityMunicipality, setCitMun] = useState("");
  const [Province, setProv] = useState("");

  const [EmailAddress, setEmailAddress] = useState("");
  const [ContactNumber, setConNum] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [image, setImage] = useState(null);

  const [hasSignUp, setHasSignUp] = useState(true);

  const [isPressed, setIsPressed] = useState(false);

  const [isSignedUp, setIsSignedUp] = useState(false);

  const [isNumVerified, setIsNumVerif] = useState(false);

  const [noEmail, setNoEmail] = useState(false);
  

  const sendForSignUp = () => {
    authValues.email = EmailAddress;
    authValues.confpassword = ConfPassword;
    addUser(EmailAddress, ConfPassword);
  };

  const sendForSignUpConNum = () => {
    authValues.contactNumber = ContactNumber;
    authValues.confpassword = ConfPassword;
    addUserWithConNum(ContactNumber, ConfPassword);
  };

  const [counter, setCounter] = useState(300);
  const [intervalId, setIntervalId] = useState(null)

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time - minutes * 60);
    if (minutes <= 10) minutes = '0' + minutes;
    if (seconds <= 10) seconds = '0' + seconds;
    return minutes + ":" + seconds;
}
  function timer () {
    if (counter > 0) {
        const id = setInterval(() => setCounter(counter => counter - 1), 1000);
        setIntervalId(id)
    }
    
  }

  const verifier = async () => 
  {
    if (hasSignUp) {
      const { data: OTPD, error: errOTP } = await supabase.auth.verifyOtp({
        email: EmailAddress,
        token: verificationCode,
        type: "email",
      });
      if (errOTP) {
        toast.error("Wrong OTP submitted.");
      } else if (OTPD) {
        toast.success("OTP verified! You have been registered.");
        navigate("/");
      }
      return;
    } else {
      toast.warning("Please finish signing up first.");
    }
  };

  const verifierPhone = async () => 
  {
    if (hasSignUp) {
      const { data: OTPD, error: errOTP } = await supabase.auth.verifyOtp({
        phone: ContactNumber,
        token: verificationCode,
        type: "sms",
      });
      if (errOTP) {
        toast.error("Wrong OTP submitted.");
      } else if (OTPD) {
        toast.success("OTP verified! You have been registered.");
        navigate("/");
      }
      return;
    } else {
      toast.warning("Please finish signing up first.");
    }
  };
  const verifierPicker = () =>
  {
    if(noEmail)
    {
      verifierPhone();
    }
    else
    {
      verifier();
    }
  }
  const submitToDB = async (e) => {
    e.preventDefault();
    try {
      const checker = document.getElementById("finalPass").value;
      if (!FirstName || !LastName || !HouseApptBlkNo || !Street || !Barangay || !CityMunicipality || !Province) 
      {
        alert("Please fill out the form completely");
        return;
      } 
      else if (document.getElementById("confirmPass").value !== document.getElementById("finalPass").value) 
      {
        alert("Password did not match");
      } 
      else if (!document.getElementById("checkT").checked) 
      {
        alert("Please accept the Terms & Conditions.");
      } 
      else if (image === null) 
      {
        alert("Please upload a selfie for verification.");
      } 
      else if (checker.length < 8) 
      {
        alert("Your password should be at least 8 characters");
      } 
      else if (noEmail)
      {
        if (!FirstName || !LastName || !HouseApptBlkNo || !Street || !Barangay || !CityMunicipality || !Province || !ContactNumber)
        {
          alert("Please fill out the form completely");
        }
        else
        {
          const data = await supabase
          .from("VisitorAcc")
          .insert([
            {
              LastName,
              FirstName,
              MiddleName,
              Address,
              ContactNumber,
              ImageID,
              ElderId: selectedOption.value,
            },
          ])
          .single();
        if (data.error) throw data.error;
        else {
          await supabase.from("Notifications").insert([
            {
              message: `${ContactNumber} successfully registered`,
              date: null,
              type: "account",
            },
          ]);
          setIsSignedUp(true);
          setIsPressed(true);
          toast.info("Please wait and verify your OTP.");
          sendForSignUpConNum();
          imageAdd();
          setHasSignUp(true);
          //handleCheck();
        }
        setIsSignedUp(true);
        forSec();
        setHasSignUp(true);
        }
      }
      else if (!EmailAddress)
      {
        alert("Please fill out the form completely pls 2");
      }
      else 
      {
        const data = await supabase
          .from("VisitorAcc")
          .insert([
            {
              LastName,
              FirstName,
              MiddleName,
              Address,
              EmailAddress,
              ContactNumber,
              ImageID,
              ElderId: selectedOption.value,
            },
          ])
          .single();
        if (data.error) throw data.error;
        else {
          await supabase.from("Notifications").insert([
            {
              message: `${EmailAddress} successfully registered`,
              date: null,
              type: "account",
            },
          ]);
          setIsSignedUp(true);
          setIsPressed(true);
          toast.info("Please wait and verify your OTP.");
          sendForSignUp();
          imageAdd();
          setHasSignUp(true);
          //handleCheck();
        }
        setIsSignedUp(true);
        forSec();
        setHasSignUp(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageAdd = async (e) => {
    let img = image;
    const { data: imgData, error: imgErr } = await supabase.storage
      .from("ImageVerif")
      .upload(ImageID + "/" + ImageID, img);
    if (imgErr) {
      console.log(imgErr);
    } else if (imgData) {
      console.log("uploaded");
    }
  };
  const forSec = () =>
  {
    setAddress(HouseApptBlkNo + " " + Street  + ", " + Barangay  + ", " + CityMunicipality + ", " + Province);
    setIsPressed(true);
    if (isPressed)
    {
      timer()
    }
    else
    {
      console.log("else")
    }
  }
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const initializeOptions = async () => {
      const { data: elders } = await supabase.from("ElderTable").select("*");

      const options = elders.map((elder) => {
        return {
          label: elder.NameOfElder,
          value: elder.id,
        };
      });

      setOptions(options);
      setSelectedOption(options[0]);
      setIsLoading(false);
    };

    initializeOptions();
  }, []);

  const onChangeSelectedOption = (data) => {
    setSelectedOption(data);
  };

  const [hasRelatedElder, setHasRelatedElder] = useState(false);


  const [visible, setVisible] = useState(false);
  const isOpen = visible ? "text" : "password";

  const [confVisible, setConfVisible] = useState(false);
  const isOpenConf = confVisible ? "text" : "password";
  return (
    <div
      className="bg-cover py-10"
      // style={{ backgroundImage: `url(${FirstSection})` }}
    >
      {isLoading && <Loader />}
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
          <form onSubmit={submitToDB}>
            <div className="flex gap-16 items-center justify-center pt-6 px-5 max-w-5xl mx-auto">
              <div className="grow">
                <div className="text-lg font-semibold mb-3">Registration</div>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="First Name*"
                      disabled={isSignedUp}
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="Middle Name"
                      disabled={isSignedUp}
                      value={MiddleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <input
                      className="h-10 p-3 border border-gray-400 rounded-md"
                      type="text"
                      placeholder="Last Name*"
                      disabled={isSignedUp}
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="House/Appt/Blk No.*"
                    disabled={isSignedUp}
                    value={HouseApptBlkNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                  />
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Street*"
                    disabled={isSignedUp}
                    value={Street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Barangay*"
                    disabled={isSignedUp}
                    value={Barangay}
                    onChange={(e) => setBrgy(e.target.value)}
                  />
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="City/Municipality*"
                    disabled={isSignedUp}
                    value={CityMunicipality}
                    onChange={(e) => setCitMun(e.target.value)}
                  />
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Province*"
                    disabled={isSignedUp}
                    value={Province}
                    onChange={(e) => setProv(e.target.value)}
                  />
                  </div>
                  <input
                    className = {`h-10 p-3 border border-gray-400 rounded-md ${noEmail ? "" : ""}`} 
                    type="email"
                    placeholder="Email Address*"
                    disabled={!noEmail ? isSignedUp : !isSignedUp}
                    value={EmailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <input
                    className = {`h-10 p-3 border border-gray-400 rounded-md ${!noEmail ? "" : ""}`} 
                    type="text"
                    placeholder={`Contact number* (e.g. 639123456789)`} 
                    disabled={isSignedUp}
                    value={ContactNumber}
                    onChange={(e) => setConNum(e.target.value)}
                  />
                  <label className="text-left flex gap-3 cursor-pointer">
                    <input
                      value={noEmail}
                      onChange={(e) => {
                        setNoEmail(e.target.checked);
                      }}
                      type="checkbox"
                    />
                    <div>
                      I do not have an email address
                    </div>
                  </label>
                  <div className="grid grid-flow-col">
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type={isOpen}
                    placeholder="Password*"
                    disabled={isSignedUp}
                    id="confirmPass"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   <div
                    onClick={() => setVisible(!visible)}
                    className="cursor-pointer mt-[2px] text-[20px] "
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md -mr-10"
                    type={isOpenConf}
                    placeholder="Confirm password*"
                    disabled={isSignedUp}
                    value={ConfPassword}
                    id="finalPass"
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  <div
                    onClick={() => setConfVisible(!confVisible)}
                    className="cursor-pointer mt-[2px] text-[20px] ml-10"
                  >
                    {confVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                  </div>
                  <label className="text-left flex gap-3 cursor-pointer">
                    <input
                      value={hasRelatedElder}
                      onChange={(e) => {
                        setHasRelatedElder(e.target.checked);
                      }}
                      type="checkbox"
                    />
                    <div>
                      Are you related to one of the Elders at Bahay Kalinga?
                    </div>
                  </label>
                  {hasRelatedElder && (
                    <div className="text-left mt-5">
                      <label htmlFor="selectElder" className="mb-2 block">
                        Select Elder
                      </label>
                      <Select
                        value={selectedOption}
                        onChange={onChangeSelectedOption}
                        options={options}
                        id="selectElder"
                      />
                    </div>
                  )}
                </div>
                {/* //!OTP AREA */}
                <div className={`flex mt-2 gap-10`}>
                  <input
                    id="otpHolder"
                    className={`h-10 p-3 border border-gray-400 rounded-md grow  ${
                      !isPressed ? "none" : "none"
                    }`}
                    type="text"
                    placeholder={`Verification Code (${formatTime(counter)})`}
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                    }}
                  />
                  {/* <button
                    type="button"
                    id="sendVerify"
                    
                    className={`bg-slate-500 text-white px-4 rounded-md ${
                      !isPressed ? "none" : "none"
                    }`}
                    // onClick={() => {
                    //   setIsPressed(true);}}
                  >
                    Resend Code
                  </button> */}
                  <ToastContainer />
                </div>
              </div>
              <div className="text-center shrink-0">
                {image ? (
                  <img
                    className="max-w-[217px] mx-auto mb-3"
                    src={URL.createObjectURL(image)}
                    alt="uploaded_image"
                  />
                ) : (
                  <div className="mb-2">
                    <BsPersonVcardFill className="text-[100px] mx-auto text-gray-700" />
                    <div className="text-[12px]">
                      *Attach a selfie with your valid ID.
                    </div>
                    <div className="text-[12px]">
                      Please make sure the image is clear.
                    </div>
                    <div className="text-[12px]">
                      Valid IDs: National ID, Passport, <br/>Driver's License, SSS UMID, PRC ID,<br/> Voter's ID, Postal ID.
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
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
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
                  id="checkT"
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
              <div className="font-light text-sm">
                    <span className="text-red-600">*</span> Please fill up all required fields.
                  </div>
              <div className="flex mt-2 gap-1">
                <button
                  type="submit"
                  onClick={forSec}
                  className={`bg-slate-500 text-warmGray-50 py-2 rounded-md px-8 ${
                    !isPressed ? "none" : "hidden"
                  }`}
                  // onClick={(e) => {setIsSignedUp(true)}}
                >
                  Send OTP
                </button>
                <ToastContainer />
                <button
                  type="button"
                  className={`bg-slate-500 text-warmGray-50 py-2 rounded-md px-8 ${
                    !isPressed ? "hidden" : "none"
                  }`}
                  onClick={verifierPicker}
                >
                  Register
                </button>
                <ToastContainer />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
