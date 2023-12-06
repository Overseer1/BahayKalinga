import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import fetchAppointmentVisitorsByAppointmentId from "../utils/fetchAppointmentVisitorsByAppointmentId";
import Loader from "./Loader";
import ViewVisitorImageModal from "./ViewVisitorImageModal";

const ViewVisitorModal = ({ visitor, setOpen, open }) => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewImage, setViewImage] = useState('');
    const [openImage, setOpenImage] = useState(false);

    const handleViewImage = (image) => {
        setViewImage(image);
        setOpenImage(true);
    };

    useEffect(() => {
        if (visitor && visitor.hasOwnProperty('appointment_id')) {
            setLoading(true);
            setVisitors([]);
            fetchAppointmentVisitorsByAppointmentId(visitor.appointment_id).then(visitors => {
                setVisitors(visitors);
                setLoading(false);
            });
        }
    }, [visitor]);

    return (
        <>
            {loading && <Loader />}
            <ViewVisitorImageModal visitorImage={viewImage} open={openImage} setOpen={setOpenImage} />
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="overflow-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">View Visitors</Dialog.Title>
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">List Of Visitors</Dialog.Description>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                        {visitor && (<table className="w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-3 px-5 border-b border-gray-200">Name</th>
                                <th className="py-3 px-5 border-b border-gray-200">Relationship</th>
                                <th className="py-3 px-5 border-b border-gray-200">Image</th>
                            </tr>
                            </thead>
                            <tbody>
                                {visitors.map(visitor => (
                                    <tr className="text-center" key={visitor.id}>
                                        <td className="py-3 px-5">{visitor.name}</td>
                                        <td className="py-3 px-5">{visitor.relationship}</td>
                                        <td className="py-3 px-5 text-center">
                                            <img onClick={() => handleViewImage(visitor.image_url)} className="max-w-[100px] m-auto" src={visitor.image_url} alt={`visitor_${visitor.name}_${visitor.relationship}`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
};

export default ViewVisitorModal;