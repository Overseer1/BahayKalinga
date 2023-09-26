import { BsPersonVcardFill } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../config/supabaseClient";

import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const [image] = useState(null);

  const [ins, setIns] = useState(true);
  //modal box
  const [TeCo, setTeCo] = useState(true);
  //navigation
  const navigate = useNavigate();

  //* for errors
  const [formError, setFormError] = useState("");

  //* for insert data
  const [FullName, setFullName] = useState("");
  const [Address, setAddress] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [ApptDateTime, setApptDateTime] = useState("");
  const [ImageVerif, setImageVerif] = useState("");
  const connect = async (e) => {
    //e.preventDefault();
    if (!FullName || !Address || !ContactNumber) 
    {
      //! appointment date and time is allowed nullable. revert to not allowed after select date and time is finished.
      setFormError("Can't process due to empty text box");
      return;
    }
    const { data, error } = await supabase
      .from("VisitorAcc")
      .insert([{ FullName, Address, ContactNumber }]);
    if (error) 
    {
      console.log("error " + setFormError);
    } 
    else if (data)
     {
      console.log("inserted");
      setFormError(null);
    }
  };
  //TODO: add a code where it will not add if there is already a match in the storage bucket
  const imageAdd = async (e) => {
    const { data: getID, error: getIDErr } = await supabase
      .from("VisitorAcc")
      .select("id")
      .eq(FullName, "FullName")
      .single();
    let img = ImageVerif;
    const { data: imgData, error: imgErr } = await supabase.storage
      .from("ImageVerif")
      .upload(getID.id + "/" + uuidv4(), img);
    if (imgErr) {
      console.log(imgErr);
    } else if (imgData) {
      console.log("uploaded");
      setFormError(null);
    }
  };
  const forTandCs = () => {
    //*for terms and conditions.
    //TODO: put the mf t&c to the mf system like right tf now
    setTeCo(false);
  };
  function handletest() {
    if (!FullName || !Address || !ContactNumber) {
      alert("Data not registered! Text box/boxes empty.");
    } else if (document.getElementById("checkTandCs").value) {
      alert("Data not registered! Please accept the Terms & Conditions.");
    } else {
      alert(
        "Data registered! Only the Name, Address, and contact number has been uploaded."
      );
      navigate("/");
    }
  }
  function returnToHome() {
    navigate("/Admin");
  }
  return (
    <div className="">
      <Link to="/">
        <div className="flex ">
          <MdOutlineArrowForwardIos className="rotate-180" />
          <div className="text-[15px]">BACK</div>
        </div>
      </Link>
      <div className=" bg-white h-screen font-mono place-content-center">
        <center>
          <div className="bg-slate-100 w-screen ">
            {/* //! OTP and Photo upload currently not available. Add both function ASAP */}
            <div className="pb-[1%] font-sans font-semibold pt-10 md:text-[30px] text-[26px]">
              REGISTER YOUR INFORMATION AND CREATE AN ACCOUNT
            </div>
            <div className="font-mono pb-[5%] md:text-[16px] text-[13px]">
              Pelase input the following details required:
            </div>
          </div>
        </center>
        <div className=" rounded-md w-[100%] ">
          {/* //* REGISTRATION */}
          <div className=" grid md:grid-cols-2 grid-cols-1 w-[100%]  p-[2%] bg-slate-200">
            <center>
              <form
                className="justify-center flex-col  items-center grid  gap-y-2"
                id="Registration"
              >
                <div className="font-sans font-semibold text-[25px]">
                  REGISTRATION
                </div>
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Full name"
                  id="FullNameID"
                  value={FullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Address"
                  id="Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Mobile Number"
                  id="MobileNumber"
                  value={ContactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    className=" rounded-xl p-2 bg-gray-300 text-black"
                    placeholder="OTP CODE"
                  />
                  <button className="bg-gray-300 p-2 rounded-xl hover:bg-white hover:border-2 border-2 border-gray-300 hover:border-blue-600">
                    Send OTP
                  </button>
                </div>
              </form>
            </center>

            <div className="md:mt-0 mt-[5%] w-[100%] place-items-center">
              <center>
                {/* !!PICTURE UPLOAD FOR VERIFICATION IS PAUSED DUE TO DATA UPLOAD ERROR!! */}
                {ins ? (
                  <div className="">
                    <div className="bg-slate-400 p-[10%] w-[60%] mb-[2%] rounded-md">
                      {/* change to illustration */}
                      {/* Picture to */}
                    </div>
                    <div className="text-center md:text-[17px] text-[11px]">
                      {/* Put Illustration here on how to upload a file */}
                    </div>
                    <button
                      onClick={() => setIns(false)}
                      className="text-center bg-gray-400 rounded-md w-[100px] hover:bg-white hover:border-2 border-2 hover:border-blue-600"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className=" bg-slate-200 w-[50%] mt-[5%] p-[2%] rounded-md">
                    {image ? (
                      <img src={image} alt="" />
                    ) : (
                      <div className="mb-2">
                        <BsPersonVcardFill className="text-[100px] mt-[4%]" />
                        <div className="text-[12px]">
                          Attach a selfie with your valid ID.
                        </div>
                        <div className="text-[12px]">
                          Please make sure the image is clear.
                        </div>
                      </div>
                    )}
                    <input
                      className=""
                      type="file"
                      on={(e) => setImageVerif(e.target.files[0])}
                    />
                  </div>
                )}
              </center>
            </div>
          </div>

          {/*  //* SELECT THE DATE OF VISIT */}
          <div className="md:p-[3%] p-[10%] bg-slate-100 ">
            <center>
              <div>
                <div className="pb-[1%] font-mono text-[30px]">
                  Select the date of visit
                </div>
                <div className="font-mono pb-[5%] text-[16px]">
                  Please input the following details required:
                </div>
                <br />
                <div className="font-mono text-[16px]">
                  Select available time of visit:
                </div>
                <div className="md:flex grid justify-center gap-x-[2%]  ">
                  <div className="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      name="default-radio"
                      className="rounded-full w-4 h-4 "
                    />
                    <label htmlFor="default-radio-1" className="ml-2 ">
                      7:00A.M - 10:00A.M
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      name="default-radio"
                      className="rounded-full w-4 h-4"
                    />
                    <label htmlFor="default-radio-2" className="ml-2 ">
                      1:00P.M - 3:00P.M
                    </label>
                  </div>
                </div>
              </div>
            </center>
          </div>

          {/* WHO ARE YOU WITH */}
          <div className="bg-slate-200 md:p-[3%] p-[5%]">
            <center>
              <div className="flex flex-col  justify-center">
                <div className=" font-mono text-[30px]">Who are you with?</div>
                <div className="font-mono pb-[1%] md:text-[16px] text-[12px]">
                  Please input the following details required:
                </div>
              </div>
            </center>

            <center>
              <form className=" justify-center grid  p-5 gap-2 ">
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Full Name"
                  id="CompNAME"
                ></input>
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Address"
                  id="CompAddress"
                ></input>
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Elder"
                  id="Elder"
                ></input>
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                  placeholder="Relationship with the elder"
                  id="Relationship"
                ></input>
                <input
                  type="text"
                  className="p-2 rounded-xl bg-gray-300 text-black "
                  placeholder="Reason for Visit"
                  id="Reason"
                ></input>
              </form>
            </center>
          </div>

          {/* Thank you page (Summary page) */}
          <div className=" grid md:grid-cols-2 grid-cols-1 bg-slate-100 w-[100%] place-content-center justify-center">
            <center>
              <div className="">
                <div className="pb-[1%] font-mono pt-10 text-[30px]">
                  Thank you!
                </div>
                <div className="font-mono w-[80%] pb-[5%] text-[16px]">
                  Here is the summary of your appointment. A text reminder will
                  be sent to your mobile number 24 hours before you visit.
                </div>
              </div>
            </center>

            <center>
              <form className=" justify-center grid  p-5 gap-2 ">
                {/* add onSubmit={} */}
                <div className="font-sans font-semibold text-[25px]">
                  Summary
                </div>
                {/* add this if needed | value = {Address} onChange={(e) => setAddress(e.target.value)} */}
                <div className="w-[100%] grid gap-y-1">
                  <input
                    type="text"
                    className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                    placeholder="Full Name"
                    id="FullName1"
                  />
                  <input
                    type="text"
                    className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                    placeholder="Full Name"
                    id="FullName2"
                  />
                  <input
                    type="text"
                    className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                    placeholder="Full Name"
                    id="FullName3"
                  />
                  <input
                    type="text"
                    className="p-2 rounded-xl bg-gray-300 text-black md:w-[300px] w-[100%]"
                    placeholder="Full Name"
                    id="Fullname4"
                  />
                </div>
              </form>
            </center>
          </div>
        </div>

        {/* TERMS AND CONDITION */}
        <div className=" bg-slate-200 h-[160px] w-[100%] md:flex grid items-center md:justify-between justify-center ">
          <div className=" ml-[1%] flex">
            <div className="text-[20px] flex w-[320px]">
              <input type="checkbox" className="mr-1" id="checkTandCs" />
              Read the
              <div
                className="text-[20px] ml-1 text-blue-500 hover:underline cursor-pointer"
                onClick={forTandCs}
              >
                Terms & Conditions
              </div>
            </div>
          </div>

          <div
            className={`${
              TeCo ? "hidden" : "visible w-screen justify-center flex"
            }  `}
          >
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center place-content-center">
              <div className="bg-slate-300 md:h-[42%] h-[30%] md:w-[25%] w-[65%] rounded-md">
                <div className="justify-center flex font-semibold text-[20px] bg-slate-200 rounded-t-md p-1">
                  TERMS AND CONDITIONS
                </div>
                <div className="overflow-y-auto h-64">1. User Data Collection and Usage<br/>
1.1. As part of the registration process, users are required to provide legitimate and valid information, including but not limited to name, email address, contact number, and any other details necessary for scheduling purposes.
<br/>
1.2. The user acknowledges and agrees that the data provided during registration and any subsequent usage of the platform will be collected, processed, and stored by us solely for the purpose of facilitating scheduling and related services.
<br/>
1.3. We are committed to protecting the user's data and will implement appropriate security measures to safeguard against unauthorized access, disclosure, or alteration of user information.
<br/>
1.4. The user's data will not be shared, sold, or otherwise transferred to any third parties without explicit consent, except in cases where it is required by law or necessary for providing the scheduled services (e.g., sharing the user's contact information with a service provider for an appointment).
<br/>
1.5. Users have the right to access, modify, or delete their personal information from our database. To exercise this right, users can contact us through the provided contact details on our platform.
<br/>
2. User Responsibilities<br/>
2.1. Users must provide accurate, complete, and up-to-date information during the registration process. It is the user's responsibility to ensure that the information provided remains accurate and current.
<br/>
2.2. Users are solely responsible for maintaining the confidentiality of their login credentials (username and password) and for any activities that occur under their account.
<br/>
2.3. Users must not use the platform for any unlawful, unauthorized, or malicious purposes that may harm the platform, other users, or third parties.
<br/>
2.4. Users must not attempt to gain unauthorized access to the platform, its systems, or the data of other users.
<br/>
3. Service Availability and Limitations<br/>
3.1. While we strive to provide uninterrupted access to our platform, we do not guarantee its availability at all times. We may temporarily suspend access for maintenance, updates, or other reasons.
<br/>
3.2. The platform's performance and functionality may be subject to limitations due to factors beyond our control, such as internet connectivity, device capabilities, or third-party services.
<br/>
4. Intellectual Property
4.1. All intellectual property rights, including but not limited to copyrights, trademarks, and patents, related to the platform and its content, are owned by us or our licensors.
<br/>
4.2. Users must not reproduce, modify, distribute, or create derivative works based on the platform or its content without our explicit written consent.
<br/>
5. Indemnification
5.1. Users agree to indemnify and hold us harmless from any claims, damages, liabilities, or expenses arising from their use of the platform, violation of these terms, or infringement of any rights of third parties.
<br/>
6. Amendments to the Terms
6.1. We reserve the right to modify these Terms and Conditions at any time. Updated versions will be posted on the platform, and users will be notified of significant changes.
<br/>
6.2. Continued use of the platform after changes to the Terms implies acceptance of the modified terms.
<br/>
7. Termination<br/>
7.1. Users may terminate their account at any time by following the account closure procedures available on the platform.
<br/>
7.2. We reserve the right to terminate or suspend user accounts if they violate these Terms and Conditions or for any other reason deemed necessary.
<br/>
8. Governing Law<br/>
8.1. These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflicts of law principles.
<br/>
By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you have any questions or concerns, please contact us at [contact email/phone number].
<br/>
                </div>
                <a
                  onClick={() => setTeCo(!TeCo)}
                  className="p-1 rounded-md mt-2 bg-slate-100 hover:bg-red-300 cursor-pointer items-center text-center grid p-2 "
                >
                  Close
                </a>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className=" flex w-[100%]  md:justify-end justify-center">
            {/* multiple function for this button */}
            <button
              onClick={() => {
                handletest();
                connect();
                imageAdd();
              }}
              className="p-1 h-[50%]  md:w-[10%]   mr-2 rounded-md hover:border-2 border-0 hover:border-blue-600 bg-blue-400 hover:bg-slate-100 "
            >
              Register
            </button>
            {formError && console.log(formError)}
            <button
              onClick={() => returnToHome()}
              className="p-1 h-[50%]  md:w-[10%]   rounded-md hover:border-2 border-0 hover:border-blue-600 bg-blue-400 hover:bg-slate-100 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
