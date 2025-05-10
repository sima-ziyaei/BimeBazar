import { useTranslations } from "next-intl";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { Order } from "@/models/Order.model";

interface Props {
    setOpen: (a: boolean) => void;
    onClick: (data?: Order) => Promise<void>;
    loading: boolean;
    disable: boolean;
}

const ErrorModal = ({setOpen, onClick, loading, disable}: Props) => {
    const t = useTranslations();
    const router = useRouter();
    return(
        <div className="bg-white absolute bottom-0 w-full text-right">
            <p className="mt-[18px] px-3"> {t('an-error-occurred')} </p>
            <p className="mb-4 px-3"> {t('again-try')} </p>
            <div className="flex gap-2.5 p-2.5 mt-2">
                <Button title={t('return')} onClick={()=>{ router.push('/'); setOpen(false) }} outlined className="grow" />
                <Button title={t('try-again')} onClick={onClick} className="grow" loading={loading} disable={disable} />
            </div>
        </div>
    )
}

export default ErrorModal;