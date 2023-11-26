import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import Loader from "../../components/Loader";
import FormModal from "../../components/FormModal";
import uploadImage from "../../utils/uploadImage";
import Lightbox from "yet-another-react-lightbox";

const AdminListElders = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);
  const [tableElder, setTableElder] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchElders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("ElderTable").select();
    if (error) {
      console.log(error);
    } else if (data) {
      setTableElder(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchElders();
  }, []);

  /* Form Dependencies */
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState([
    {
      label: "Name",
      type: "text",
      id: "name",
      name: "name",
      value: "",
      placeholder: "Enter name of elder",
      required: true,
    },
    {
      label: "Age",
      type: "number",
      id: "age",
      name: "age",
      value: "",
      placeholder: "Enter age of elder",
      required: true,
    },
    {
      label: "Address",
      type: "text",
      id: "address",
      name: "address",
      value: "",
      placeholder: "Enter address of elder",
      required: true,
    },
    {
      label: "Last Visited",
      type: "date",
      id: "last_visited",
      name: "last_visited",
      value: "",
      placeholder: "Enter date of last visited",
      required: true,
    },
    {
      label: "Family",
      type: "text",
      id: "family",
      name: "family",
      value: "",
      placeholder: "Enter family name of elder",
      required: true,
    },
    {
      label: "Remarks",
      type: "text",
      id: "remarks",
      name: "remarks",
      value: "",
      placeholder: "Enter remarks",
      required: true,
    },
    {
      label: "Birthday",
      type: "date",
      id: "birthday",
      name: "birthday",
      value: "",
      placeholder: "Enter birthday of elder",
      required: true,
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
  ]);
  const submitFormData = async (data) => {
    setLoading(true);

    const updateData = {
      NameOfElder: data.name,
      Age: data.age,
      Address: data.address,
      LastVisited: data.last_visited,
      Family: data.family,
      Remarks: data.remarks,
      Birthday: data.birthday,
    };

    // upload image
    if (data.image) {
      updateData.ImageElder = await uploadImage("ImageCompanion", data.image);
    }

    const { error } = await supabase
      .from("ElderTable")
      .update(updateData)
      .eq("id", editId)
      .single();

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    await fetchElders();

    setLoading(false);
    setOpenForm(false);
  };
  const [editId, setEditId] = useState(null);
  const showEdit = async (data) => {
    const getFormField = (name) => {
      const formField = formData.find((field) => {
        return field.name === name;
      });
      return formField;
    };

    setLoading(true);

    getFormField("name").value = data.NameOfElder;
    getFormField("age").value = data.Age;
    getFormField("address").value = data.Address;
    getFormField("last_visited").value = data.LastVisited;
    getFormField("family").value = data.Family;
    getFormField("remarks").value = data.Remarks;
    getFormField("birthday").value = data.Birthday;

    // convert image to blob
    if (data.ImageElder) {
      const blob = await fetch(data.ImageElder).then((r) => r.blob());
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      getFormField("image").value = file;
    }

    setEditId(data.id);
    setOpenForm(true);
    setLoading(false);
  };

  const [open, setOpen] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const showImage = (image) => {
    setViewImage(image);
    setOpen(true);
  };

  return (
    <div className="mx-4 rounded-md">
      {loading && <Loader />}
      <FormModal
        open={openForm}
        setOpen={setOpenForm}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
        title="Elder Information"
        subtitle="Edit the information of the elder here."
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: viewImage }]}
      />
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">
              Name of Elder
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Birthday</th>
            <th className="py-3 px-5 border-b border-gray-200">Age</th>
            <th className="py-3 px-5 border-b border-gray-200">Address</th>
            <th className="py-3 px-5 border-b border-gray-200">Last Visited</th>
            <th className="py-3 px-5 border-b border-gray-200">Family</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Attached Photo
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Remarks</th>
            <th className="py-3 px-5 border-b border-gray-200">Actions</th>
          </tr>
        </thead>

        {tableElder && (
          <tbody>
            {tableElder.map((elderList) => (
              <tr key={elderList.id}>
                <td className="py-3 px-5">{elderList.NameOfElder}</td>
                <td className="py-3 px-5">{elderList.Birthday}</td>
                <td className="py-3 px-5">{elderList.Age}</td>
                <td className="py-3 px-5">{elderList.Address}</td>
                <td className="py-3 px-5">{elderList.LastVisited}</td>
                <td className="py-3 px-5">{elderList.Family}</td>
                <td className="py-3 px-5">
                  <img
                    onClick={() => showImage(elderList.ImageElder)}
                    className="w-14 h-14 m-auto"
                    src={elderList.ImageElder}
                    alt="placeholder"
                  />
                </td>
                <td className="py-3 px-5">{elderList.Remarks}</td>
                <td className="py-3 px-5 text-center">
                  <button
                    onClick={() => showEdit(elderList)}
                    className="mb-2 bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                  >
                    Edit
                  </button>
                  <button className="bg-red4 text-red11 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        {/* <tbody>
          <tr className="text-center">
            <td className="py-3 px-5">Lolo Juan</td>
            <td className="py-3 px-5">August 25, 1985</td>
            <td className="py-3 px-5">25</td>
            <td className="py-3 px-5">#18 Marco St.</td>
            <td className="py-3 px-5">5 days ago</td>
            <td className="py-3 px-5">Guevarra</td>
            <td className="py-3 px-5">
              <img className="w-14 h-14 m-auto" src="https://unsplash.it/100/100" alt="placeholder"/>
            </td>
            <td className="py-3 px-5">No Remarks</td>
          </tr>
        </tbody> */}
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

export default AdminListElders;
