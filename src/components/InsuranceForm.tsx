import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { formSchema, formData } from "@/validations/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AddressModal from "@/components/modals/AddressModal";
import { Address } from "@/models/Address.model";
import { Order } from "@/models/Order.model";
import ErrorModal from "./modals/ErrorModal";
import { useRouter } from "next/navigation";

const InsuranceForm = () => {
  const t = useTranslations();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState<Address[]>();
  const [loading, setLoading] = useState<boolean>();
  const [disable, setDisable] = useState<boolean>();
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nationalId = watch("nationalId");
  const phoneNumber = watch("phoneNumber");

  const onValidSubmit = async (data?: Order) => {
    if (!selectedAddress) {
      setAddressError(true)
      return;
    }
    setLoading(true);
    setDisable(true);
    const merged = { ...data, addressId: selectedAddress.id };
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(merged),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      console.log(data);
      router.push('/result');
    } catch (e) {
      setOpenErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const onInvalidSubmit=()=>{
    if (!selectedAddress) {
      setAddressError(true)
    }
  }

  const handleOpenModal =async () => {
    setOpenAddressModal(true);
  };

  const getAddresses =async () =>{
    try {
      const res = await fetch('/api/my-addresses', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      setAddresses(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAddresses();
  }, []);

  const isFormFilled =
    selectedAddress !== null ||
    nationalId?.length > 0 ||
    phoneNumber?.length > 0;

  return (
    <>
      <form
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
        className="w-full text-right px-5 py-6"
      >
        <p className="pb-1.5"> :{t("enter-owner-data")} </p>

        <input
          placeholder={t("national-code")}
          id="nationalId"
          {...register("nationalId")}
          className={` ${
            errors.nationalId
              ? "text-[#E61F10] border-[#E61F10]"
              : "text-[#757575] border-[#b4b4b4] "
          } p-3 border border-solid w-full text-sm text-right mb-1`}
        />
        <div className="h-6">
          {errors.nationalId && (
            <p className="text-[#E61F10]">{t(errors.nationalId.message)}</p>
          )}
        </div>

        <input
          placeholder={t("phone-number")}
          id="phoneNumber"
          {...register("phoneNumber")}
          className={` ${
            errors.nationalId
              ? "text-[#E61F10] border-[#E61F10]"
              : "text-[#757575] border-[#b4b4b4] "
          } p-3 border border-solid w-full text-sm text-right my-1`}
        />

        <div className="h-6">
          {errors.phoneNumber && (
            <p className="text-[#E61F10]">{t(errors.phoneNumber.message)}</p>
          )}
        </div>

        <div className="mt-6 w-full text-right">
          <p className="mb-1.5"> {t("address-on-insurance-policy")} </p>

          <div>
            {selectedAddress ? (
              <p className="h-[94px] text-[#757575]">
                {selectedAddress.details}
              </p>
            ) : (
              <>
                <p
                  className={`${
                    addressError ? "text-[#E61F10]" : "text-black"
                  } text-sm`}
                >
                  .{t("select-address")}
                </p>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="py-3 cursor-pointer w-full bg-[#FFC453] mt-1.5 font-semibold"
                >
                  {t("choose-from-addresses")}
                </button>
              </>
            )}
          </div>

          <Button
            disable={!isFormFilled}
            title={t("ok-and-continue")}
            loading={loading}
            type={"submit"}
            className={"mt-6 float-left"}
            onClick={() => {}}
          />
        </div>
      </form>

      {openAddressModal && (
        <AddressModal
          control={control}
          setAddresses={setAddresses}
          addresses={addresses}
          setValue={setValue}
          setOpen={setOpenAddressModal}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
      {openErrorModal && (
        <>
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <ErrorModal setOpen={setOpenErrorModal} onClick={()=> onValidSubmit()} loading={loading} disable={disable} />
        </>
      )}
    </>
  );
};

export default InsuranceForm;
