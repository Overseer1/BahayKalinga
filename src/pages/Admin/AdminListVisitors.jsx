import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Loader from "../../components/Loader";
import FormModal from "../../components/FormModal";
import relationships from "../../refs/ref_relationship";
import uploadImage from "../../utils/uploadImage";
import ViewVisitorModal from "../../components/ViewVisitorModal";

const AdminListVisitors = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState([]);

  // get all visitors from database
  const fetchVisitors = async () => {
    setLoading(true);
    let { data: visitors, error } = await supabase
      .from("AppointmentVisitors")
      .select(
        `*, 
        Appointments: appointment_id (
          *,
          VisitorAcc: UserId (*), 
          ElderTable: ElderToVisit (*)
        )`
      )
      .order("id", { ascending: false });

    if (error) console.log("error", error);
    else setVisitors(visitors);
    setLoading(false);
  };

  const timeSince = (date) => {
    if (!date || date === "Invalid Date" || isNaN(date.getTime())) {
      return "-";
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    if (seconds < 0) return "-";
    return Math.floor(seconds) + " seconds ago";
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const [open, setOpen] = useState(false);
  const [viewImage, setViewImage] = useState("");

  const openImage = (imageUrl) => {
    setViewImage(imageUrl);
    setOpen(true);
  };

  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState([
    {
      label: "Name",
      type: "text",
      id: "name",
      name: "name",
      value: "",
      placeholder: "Enter name of visitor",
      required: true,
    },
    {
      label: "Relationship",
      type: "select",
      id: "relationship",
      name: "relationship",
      value: "",
      placeholder: "Select relationship",
      required: true,
      options: relationships,
    },
    {
      label: "Image",
      type: "image",
      id: "image",
      name: "image",
      value: "",
      placeholder: "Upload image",
      required: true,
    },
    {
      label: "Address",
      type: "text",
      id: "address",
      name: "address",
      value: "",
      placeholder: "Enter address of visitor",
      required: true,
    },
    {
      label: "Mobile Number",
      type: "text",
      id: "mobile_number",
      name: "mobile_number",
      value: "",
      placeholder: "Enter mobile number of visitor",
      required: true,
    },
    {
      label: "Accompanied By",
      type: "text",
      id: "accompanied_by",
      name: "accompanied_by",
      value: "",
      placeholder: "Enter accompanied by of visitor",
      required: true,
    },
  ]);

  const [editId, setEditId] = useState(null);

  const showEdit = async (visitor) => {
    const getFormField = (name) => {
      const formField = formData.find((field) => {
        return field.name === name;
      });
      return formField;
    };

    setLoading(true);

    getFormField("name").value = visitor.name;
    getFormField("relationship").value = visitor.relationship;

    // convert image to blob
    if (visitor.image_url) {
      const blob = await fetch(visitor.image_url).then((r) => r.blob());
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      getFormField("image").value = file;
    }

    getFormField("address").value = visitor.address;
    getFormField("mobile_number").value = visitor.mobile_number;
    getFormField("accompanied_by").value = visitor.accompanied_by;

    setEditId(visitor.id);

    setOpenForm(true);
    setLoading(false);
  };

  const submitFormData = async (data) => {
    setLoading(true);

    const updateData = {
      name: data.name,
      relationship: data.relationship,
      address: data.address,
      mobile_number: data.mobile_number,
      accompanied_by: data.accompanied_by,
    };

    // upload image
    if (data.image) {
      updateData.image_url = await uploadImage("ImageCompanion", data.image);
    }

    const { error } = await supabase
      .from("AppointmentVisitors")
      .update(updateData)
      .eq("id", editId)
      .single();

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    await fetchVisitors();

    setLoading(false);
    setOpenForm(false);
  };

  const deleteVisitor = async (data) => {
    setLoading(true);

    const { error } = await supabase
      .from("AppointmentVisitors")
      .delete()
      .eq("id", data.id);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    await fetchVisitors();

    setLoading(false);
    setOpenForm(false);
  };

  const [viewVisitor, setViewVisitor] = useState(false);
  const [viewVisitorData, setViewVisitorData] = useState({});

  return (
    <div className="mx-4 rounded-md">
      {loading && <Loader />}
      <FormModal
        open={openForm}
        setOpen={setOpenForm}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
        title="Visitor Information"
        subtitle="Edit the information of the visitor here."
      />
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">
              Name of Visitor
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Email</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Elder Visited
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Last Visited</th>
            <th className="py-3 px-5 border-b border-gray-200">Address</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Attached Photo
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Accompanied By
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id} className="text-center">
              <td className="py-3 px-5">{visitor.name}</td>
              <td className="py-3 px-5">
                {visitor?.Appointments?.VisitorAcc?.EmailAddress || "-"}
              </td>
              <td className="py-3 px-5">
                {visitor?.Appointments?.ElderTable?.NameOfElder || "-"}
              </td>
              <td className="py-3 px-5">
                {timeSince(new Date(visitor?.Appointments?.Date))}
              </td>
              <td className="py-3 px-5">
                {visitor?.Appointments?.VisitorAcc?.Address}
              </td>
              <td className="py-3 px-5">
                <img
                  className="w-14 h-14 m-auto cursor-pointer"
                  src={visitor?.image_url}
                  alt="placeholder"
                  onClick={() => openImage(visitor?.image_url)}
                />
              </td>
              <td className="py-3 px-5">
                <div onClick={() => {
                  setViewVisitorData(visitor);
                    setViewVisitor(true);
                }} className="text-blue-600 text-lg cursor-pointer">See More</div>
              </td>
              <td className="py-3 px-5 text-center">
                <button
                  onClick={() => showEdit(visitor)}
                  className="mb-2 bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVisitor(visitor)}
                  className="bg-red4 text-red11 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Delete
                </button>
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
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: viewImage }]}
      />
      <ViewVisitorModal visitor={viewVisitorData} open={viewVisitor} setOpen={setViewVisitor} />
    </div>
  );
};

export default AdminListVisitors;
