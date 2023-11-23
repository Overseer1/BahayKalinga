import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FirstSection from "../../images/FirstSection.png";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import supabase from "../../config/supabaseClient";
import relationships from "../../refs/ref_relationship";
import Loader from "../../components/Loader";

const buttons = [
  {
    name: "Calendar",
    path: "/admin",
  },
  {
    name: "Pending Appointments",
    path: "/admin/pending-appointments",
  },
  {
    name: "Approved Appointments",
    path: "/admin/upcoming-appointments",
  },
  {
    name: "Cancelled Appointments",
    path: "/admin/cancelled-requests",
  },
  {
    name: "List of Elders",
    path: "/admin/list-elders",
  },
  {
    name: "List of Visitors",
    path: "/admin/list-visitors",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const relationshipOptions = relationships;

  const logout = () => {
    localStorage.removeItem("tokenAdmin");
    navigate("/admin/login");
  };

  const currentPageName = useMemo(() => {
    const page = {};
    buttons.forEach((button) => {
      page[button.path] = button.name;
    });
    return page[location.pathname] || "Error";
  }, [location.pathname]);

  useEffect(() => {
    if (!localStorage.getItem("tokenAdmin")) {
      navigate("/admin/login");
    }
  });

  const [openMigrate, setOpenMigrate] = useState(false);
  const [image, setImage] = useState(null);

  const [elderOptions, setElderOptions] = useState([]);

  useEffect(() => {
    // get ElderTable data and set to elderOptions
    const getElderOptions = async () => {
      const { data: elders, error } = await supabase
        .from("ElderTable")
        .select("*");

      if (error) {
        alert(error.message);
        return;
      }

      if (elders) {
        setElderOptions([
          {
            id: "",
            label: "Select an elder",
          },
          ...elders.map((elder) => {
            return {
              id: elder.id,
              label: elder.NameOfElder,
            };
          }),
        ]);
      }
    };

    getElderOptions();
  }, []);

  // form data
  const [formData, setFormData] = useState({
    nameOfVisitor: "",
    relationshipWithElder: "",
    nameOfElderVisited: "",
    dateVisited: "",
    address: "",
    mobileNumber: "",
    accompaniedBy: "",
    time: "",
  });

  const onSubmitMigrate = async () => {
    if (!formData.nameOfVisitor) {
      alert("Please enter name of visitor");
      return;
    }

    if (!formData.relationshipWithElder) {
      alert("Please select relationship with elder");
      return;
    }

    if (!formData.nameOfElderVisited) {
      alert("Please select name of elder visited");
      return;
    }

    if (!formData.dateVisited) {
      alert("Please select date visited");
      return;
    }

    if (!formData.time) {
      alert("Please select time");
      return;
    }

    if (!formData.address) {
      alert("Please enter address");
      return;
    }

    if (!formData.mobileNumber) {
      alert("Please enter mobile number");
      return;
    }

    // allow only number
    if (!/^\d+$/.test(formData.mobileNumber)) {
      alert("Please enter a valid mobile number");
      return;
    }

    if (!formData.accompaniedBy) {
      alert("Please enter accompanied by");
      return;
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    // upload image
    const BUCKET_NAME = "ImageCompanion";
    const randomString = Math.random().toString(36).substring(2, 15);
    const filePath = `${randomString}-${image.name}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, image);
    if (uploadError) {
      console.error(uploadError);
      return;
    }
    const response = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const publicURL = response?.data?.publicUrl;

    const { data: uploadImage, error: errorUploadImage } =
      await supabase.storage
        .from("images")
        .upload(`visitor/${image.name}`, image);

    // insert "AppointmentVisitors"
    const { data: appointmentVisitors, error: errorInsertAppointmentVisitors } =
      await supabase.from("AppointmentVisitors").insert([
        {
          name: formData.nameOfVisitor,
          relationship: formData.relationshipWithElder,
          appointment_id: null,
          image_url: publicURL,
          address: formData.address,
          mobile_number: formData.mobileNumber,
          accompanied_by: formData.accompaniedBy,
        },
      ]);

    if (errorInsertAppointmentVisitors) {
      alert(errorInsertAppointmentVisitors.message);
      return;
    }

    setLoading(false);
    setOpenMigrate(false);
  };

  const [loading, setLoading] = useState(false);

  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const { data: notifications, error } = await supabase
      .from("Notifications")
      .select("*");

    if (error) {
      alert(error.message);
      return;
    }

    if (notifications) {
      setNotifications(notifications);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const viewNotification = (notification) => {
    if (notification.type === "pending") {
      navigate(`/admin/pending-appointments`);
    } else if (notification.type === "approved") {
      navigate(`/admin/upcoming-appointments`);
    } else if (notification.type === "cancelled") {
      navigate(`/admin/cancelled-requests`);
    }
    setOpenNotifications(false);
  };

  const deleteNotification = async (notification) => {
    const { data: deleteNotification, error: errorDeleteNotification } =
      await supabase.from("Notifications").delete().eq("id", notification.id);

    if (errorDeleteNotification) {
      alert(errorDeleteNotification.message);
      return;
    }

    alert("Notification deleted");
    setOpenNotifications(false);
    getNotifications();
  };

  return (
    <div
      className="min-h-screen flex bg-cover"
      style={{ backgroundImage: `url(${FirstSection})` }}
    >
      {loading && <Loader />}
      <div className="shrink-0 w-64 flex flex-col gap-3 p-4 bg-opacity-50 bg-black">
        {buttons.map((button) => (
          <button
            key={button.path}
            onClick={() => navigate(button.path)}
            className={`font-medium rounded-md h-14 hover:bg-green-500 hover:text-white ${
              location.pathname === button.path
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            {button.name}
          </button>
        ))}
      </div>
      <div className="grow">
        <div className="text-center text-lg font-medium bg-gray-200 py-2">
          Admin Dashboard
        </div>
        <div className="text-center flex justify-between p-4 items-center">
          <div className="flex items-center">
            <button className="font-medium text-xl bg-white rounded-md h-10 cursor-default px-4">
              {currentPageName}
            </button>
          </div>
          <div className="flex gap-3">
            {location.pathname === "/admin/list-elders" && (
              <button className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4">
                Add
              </button>
            )}
            <Dialog.Root open={openMigrate} onOpenChange={setOpenMigrate}>
              <Dialog.Trigger asChild>
                {location.pathname === "/admin/list-visitors" && (
                  <button className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4">
                    Migrate
                  </button>
                )}
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Migrate
                  </Dialog.Title>
                  <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    List of Visitors
                  </Dialog.Description>

                  <form onSubmit={() => onSubmitMigrate()}>
                    <div className="flex gap-5">
                      <div className="flex-grow">
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Name of Visitor
                          </label>
                          <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            value={formData.nameOfVisitor}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nameOfVisitor: e.target.value,
                              })
                            }
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Relationship with Elder
                          </label>
                          <select
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                relationshipWithElder: e.target.value,
                              })
                            }
                            className="bg-white text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          >
                            {relationshipOptions.map((relationshipOption) => (
                              <option
                                key={relationshipOption}
                                value={relationshipOption}
                              >
                                {relationshipOption}
                              </option>
                            ))}
                          </select>
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Name of Elder Visited
                          </label>
                          <select
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nameOfElderVisited: e.target.value,
                              })
                            }
                            className="bg-white text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          >
                            {elderOptions.map((elderOption) => (
                              <option
                                key={elderOption.id}
                                value={elderOption.id}
                              >
                                {elderOption.label}
                              </option>
                            ))}
                          </select>
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-start gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px] pt-1">
                            Date Visited
                          </label>
                          <div className="flex-grow">
                            <input
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dateVisited: e.target.value,
                                })
                              }
                              type="date"
                              className="mb-3 text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            />
                            <div className="flex gap-2">
                              <button
                                className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all flex-grow ${
                                  formData.time === "morning" &&
                                  "opacity-50 cursor-not-allowed"
                                }`}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    time: "morning",
                                  })
                                }
                              >
                                7:00 AM - 10:00 AM
                              </button>
                              <button
                                className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-400 transition-all flex-grow ${
                                  formData.time === "afternoon" &&
                                  "opacity-50 cursor-not-allowed"
                                }}`}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    time: "afternoon",
                                  })
                                }
                              >
                                1:00 PM - 3:00 PM
                              </button>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Address
                          </label>
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Mobile Number
                          </label>
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobileNumber: e.target.value,
                              })
                            }
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                          <label className="text-violet11 w-[175px] text-right text-[15px]">
                            Accompanied by
                          </label>
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accompaniedBy: e.target.value,
                              })
                            }
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                          />
                        </fieldset>
                      </div>
                      <div className="shrink-0 text-center">
                        {image ? (
                          <div className="image-preview">
                            <img
                              className="w-[300px] aspect-video object-contain bg-gray-200 rounded-lg"
                              src={URL.createObjectURL(image)}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <div className="rounded-lg font-bold text-6xl bg-gray-200 aspect-video flex items-center justify-center w-[300px]">
                            +
                          </div>
                        )}
                        <div className="font-light text-sm mt-2">
                          <span className="text-red-600">*</span> Attach a
                          picture of who you are with
                        </div>
                        <label className="relative block">
                          <button className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md">
                            Upload
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
                    <div className="mt-[25px] flex justify-end">
                      <button
                        type="submit"
                        className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>

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
            <Dialog.Root
              open={openNotifications}
              onOpenChange={setOpenNotifications}
            >
              <Dialog.Trigger asChild>
                <button
                  onClick={getNotifications}
                  className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4"
                >
                  Notifications
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Notifications
                  </Dialog.Title>

                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="py-3 text-left">Message</th>
                        <th className="py-3 w-13 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map((notification) => (
                        <tr key={notification.id}>
                          <td>{notification.message}</td>
                          <td className="text-center flex gap-1 justify-center">
                            <button
                              onClick={() => viewNotification(notification)}
                              className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-400 transition-all"
                            >
                              See More
                            </button>
                            <button
                              onClick={() => deleteNotification(notification)}
                              className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-400 transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

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
            <button
              onClick={logout}
              className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4"
            >
              Sign Out
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
