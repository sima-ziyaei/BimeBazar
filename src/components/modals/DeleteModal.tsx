import { useTranslations } from "next-intl";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";
import { Address } from "@/models/Address.model";

interface Props {
  address: Address;
  setSelectedAddress: (a: Address)=> void;
  selectedAddress: Address;
  setOpen: (a: boolean)=> void
}

const DeleteModal = ({
  address,
  setSelectedAddress,
  selectedAddress,
  setOpen,
}: Props) => {
  const t = useTranslations();

  const handleDelete = (id) => {
    // setAddresses((prevAddresses) =>
    //   prevAddresses.filter((address) => address.id !== id)
    // );
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
    setOpen(false)
  };

  return (
    <div>
      <div className="flex py-4 px-3 justify-between w-full items-center border-b border-solid border-[#E0E0E0] ">
        <RxCross2
          onClick={() => {
            setOpen(false);
            setSelectedAddress(null);
          }}
          className="text-[#C2C2C2] w-6 h-6 cursor-pointer"
        />
        <p> {t("delete-address")} </p>
      </div>
      <div className="p-2.5">
           <p className="mb-4 text-sm text-right"> {t('are-you-sure-you-want-to-delete-your-address?')} </p>
      <div className="bg-[#F2F2F2] p-2 text-right mb-4">
        <p className="text-sm"> {address.name} </p>
        <p className="text-[#757575] text-xs"> {address?.details} </p> 
      </div>
      <div className="flex gap-2.5 w-full ">
          <Button onClick={()=> {setOpen(false)}} title={t('return')} outlined className="grow" />
        <Button onClick={()=>handleDelete(address.id)} title={t('ok')} className="grow " />
      </div>
      </div>
   

    </div>
  );
};

export default DeleteModal;
