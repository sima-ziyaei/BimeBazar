interface Props {
  disable?: boolean;
  outlined?: boolean;
  title: string;
  loading?: boolean;
  className?: string;
  onClick: () => void;
  type?: "submit" | "reset" | "button";
}

const Button = ({
  disable = false,
  outlined = false,
  title,
  loading = false,
  className = "",
  onClick,
  type = "button",
}: Props) => {
  return (
    <button
      onClick={!disable ? onClick : null}
      className={`py-3 w-[140px] cursor-pointer ${
        disable ? "!cursor-not-allowed" : ""
      } ${className} ${
        (disable || loading) && outlined
          ? "bg-white border-[#797979] border border-solid"
          : disable
          ? "bg-[#DAD8D8] text-[#858484]"
          : loading
          ? "bg-[#ACACAC] text-[#525252]"
          : outlined
          ? "bg-white text-black border-black border border-solid"
          : "bg-black text-white"
      }`}
      type={type}
    >
      {title}
      {/* {loading?  : null} */}
    </button>
  );
};
export default Button;
