import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();

    return (
        <div className="flex items-center justify-end gap-1.5 px-2 py-3 shadow-[0px_3px_7px_-1px_#2222221A]">
            <h1 className="text-lg"> {t('insurance-policy-details')} </h1>
            <img src={'/assets/car.png'} className="w-8 h-8" /> 
        </div>
    )
}

export default Header