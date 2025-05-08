import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();

    return (
        <div className="flex items-center justify-end gap-1.5">
            <h1> {t('insurance-policy-details')} </h1>
            <img src={'/assets/car.png'} className="w-8 h-8" /> 
        </div>
    )
}

export default Header