import { useTranslations } from "next-intl";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";
import DeleteModal from "./DeleteModal";
import { Address } from "@/models/Address.model";
import { Controller } from "react-hook-form";

interface Props {
  setOpen: (a: boolean) => void;
  setSelectedAddress: (a: Address) => void;
  selectedAddress: Address;
  setValue: (a, b, c) => void;
  addresses: Address[];
  control: any;
  setAddresses: (a: Address[])=> void;
}

const AddressModal = ({
  setOpen,
  setSelectedAddress,
  control,
  selectedAddress,
  setValue,
  addresses,
  setAddresses
}: Props) => {
  
  const t = useTranslations();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>();
  const [deletedAddress, setDeletedAddress] = useState();

  const handleSelect = (address) => {
    setSelectedAddress(address);
    setValue('addressId', address.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDelete = (address) => {
    setOpenDeleteModal(true);
    setDeletedAddress(address)
  };

  return (
    <>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="w-full absolute bottom-0 left-0 bg-white">
        {!openDeleteModal ? (
          <>
            <div className="flex py-4 px-3 justify-between w-full items-center border-b border-solid border-[#E0E0E0] ">
              <RxCross2
                onClick={() => {
                  setOpen(false);
                  setSelectedAddress(null);
                }}
                className="text-[#C2C2C2] w-6 h-6 cursor-pointer"
              />
              <p> {t("choose-address")} </p>
            </div>
            <div className="py-2 px-3 gap-4 flex flex-col">
              {addresses?.map((address, i) => {
                return (
                  <div key={address.id} className=" ">
                    <div className="flex flex-row-reverse items-center">
                      <label className="text-sm">
                        {address.name}
                        <Controller
                          name="addressId"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="radio"
                              name="address"
                              className="ml-1.5"
                              checked={selectedAddress?.id === address?.id}
                              onChange={() => handleSelect(address)}
                            />
                          )}
                        />
                      </label>
                      <RxCross2
                        onClick={() => handleDelete(address)}
                        className="text-[#FFA5A5] w-2.5 h-2.5 mr-auto cursor-pointer"
                      />
                    </div>
                    <p className="text-right text-[#757575] text-xs">
                      {address.details}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="p-2.5 w-full">
              <Button
                disable={!selectedAddress}
                title={t("choose")}
                className="w-full"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
          </>
        ) : (
          <DeleteModal
            address={deletedAddress}
            setAddresses={setAddresses}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            setOpen={setOpenDeleteModal}
          />
        )}
      </div>
    </>
  );
};

export default AddressModal;
