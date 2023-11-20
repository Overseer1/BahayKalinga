import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

const AdminListElders = () => {
  const [deniedDialog, setDeniedDialog] = useState(false);

  //! Data holder
  const [nameOfElder, setElderName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [lastVisited, setLastVisited] = useState("");
  const [family, setFamily] = useState("");
  const [imageOfElder, setImageOfElder] = useState("");
  const [remarks, setRemarks] = useState("");
  
  //! 
  const [tableElder, setTableElder] = useState("");
  useEffect(() => 
  {
    const reader = async() =>
    {
      const { data, error } = await supabase
      .from('ElderTable')
      .select()
      if (error)
      {
        console.log(error);
      }
      else if (data)
      {
        setTableElder(data);
        console.log(data);
      }
    }
    reader();
  }, [])
  

  return (
    <div className="mx-4 rounded-md">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">Name of Elder</th>
            <th className="py-3 px-5 border-b border-gray-200">Birthday</th>
            <th className="py-3 px-5 border-b border-gray-200">Age</th>
            <th className="py-3 px-5 border-b border-gray-200">Address</th>
            <th className="py-3 px-5 border-b border-gray-200">Last Visited</th>
            <th className="py-3 px-5 border-b border-gray-200">Family</th>
            <th className="py-3 px-5 border-b border-gray-200">Attached Photo</th>
            <th className="py-3 px-5 border-b border-gray-200">Remarks</th>
          </tr>
        </thead>
        <tbody>
        {tableElder && (
            <tr>
              {tableElder.map(elderList =>(
                   <>
                   <td className="py-3 px-5">{elderList.NameOfElder}</td>
                   <td className="py-3 px-5">{elderList.Birthday}</td>
                   <td className="py-3 px-5">{elderList.Age}</td>
                   <td className="py-3 px-5">{elderList.Address}</td>
                   <td className="py-3 px-5">{elderList.LastVisited}</td>
                   <td className="py-3 px-5">{elderList.Family}</td>
                   <td className="py-3 px-5">
                    <img className="w-14 h-14 m-auto" src="https://unsplash.it/100/100" alt="placeholder"/>
                   </td>
                   <td className="py-3 px-5">{elderList.Remarks}</td>
                   </>
              ))}
           </tr>
          )} 
          </tbody>
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
