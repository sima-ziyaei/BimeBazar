import { useTranslations } from "next-intl";

const CarInsuranceDetails = () => {
  const t = useTranslations();

  const DataRow = ({ label, value }) => (
    <div className="flex items-center">
      <span className="">{value}</span>
      <span className="grow border-b border-dashed border-[#E0E0E0] mx-[0.5px] translate-y-[-0.1em]" />
      <span className="text-[#808080]">{label}</span>
    </div>
  );

  return (
    <>
      <img src={"/assets/car_plate.png"} className="w-[280px]" />
      <div className="flex flex-col justify-between w-[280px] py-6">
        <DataRow label={t("insurance-company")} value={t("parsian")} />
        <DataRow label={t("car-brand")} value={t("pejo")} />
        <DataRow label={t("car-model")} value={t("206")} />
      </div>
    </>
  );
};

export default CarInsuranceDetails;
