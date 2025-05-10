"use client";

import Button from "@/components/Button";
import CarInsuranceDetails from "@/components/CarInsuranceDetails";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';

const ResultPage = () => {
  const t = useTranslations();
  const router = useRouter(); 

  return (
    <div className="flex items-center justify-center pt-6 flex-col relative h-[687px]">
      <div>
        <img src={"/assets/validation_form.png"} className="w-[60px]" />
      </div>

      <div
        className="mt-4 mb-8"
        dangerouslySetInnerHTML={{
          __html: t("your-information-was-successfully-registered", {
            span: `<span class='text-[#34A862]'>${t("success")}</span>`,
          }),
        }}
      />
      <CarInsuranceDetails />
      <Button title={t('return')} onClick={()=> router.push('/')} className="mr-auto ml-[18px] mb-3 mt-auto" />
    </div>
  );
};

export default ResultPage;
