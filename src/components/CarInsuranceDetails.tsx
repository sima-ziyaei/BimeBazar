import { useTranslations } from "next-intl";

const CarInsuranceDetails = () => {
  const t = useTranslations();

  const DataRow = ({ label, value }: { label: string; value: string }) => {
    const dashes = "-".repeat(40 - label.length - value.length);

    return (
      <div className="flex flex-row-reverse justify-between w-[280px]">
        <span className="text-[#808080] text-sm">{label}</span>
        <span>
          {value} <span className="text-[#808080] text-sm">{dashes}</span>{" "}
        </span>
      </div>
    );
  };

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
