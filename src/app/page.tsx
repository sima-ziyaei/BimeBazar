"use client";

import CarInsuranceDetails from "@/components/CarInsuranceDetails";
import InsuranceForm from "@/components/InsuranceForm";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center pt-6 flex-col">
      <CarInsuranceDetails />
      <div className="flex items-center justify-end gap-1.5 px-2 py-3 w-full shadow-[0px_3px_7px_-1px_#2222221A]">
        <h1 className="text-lg"> {t("car-owner")} </h1>
        <img src={"/assets/car.png"} className="w-8 h-8" />
      </div>
      <InsuranceForm />
    </div>
  );
}
