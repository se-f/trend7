interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  zindex?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
  zindex,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-90
        disabled:cursor-not-allowed 
        rounded-full 
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${zindex ? "z-50" : ""}
        
        ${fullWidth ? "w-full" : "w-fit"}
        ${secondary ? "bg-white" : "bg-purple-700"}
        ${secondary ? "text-black" : "text-white"}
        ${secondary ? "border-black" : "border-purple-700"}
        ${large ? "text-xl" : "text-md"}
        ${large ? "px-5" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-white" : ""}
        ${outline ? "text-white" : ""}
        `}
    >
      {label}{" "}
    </button>
  );
};

export default Button;
