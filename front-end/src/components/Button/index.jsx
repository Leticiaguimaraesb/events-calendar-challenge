import Image from "next/image";
import "./button.scss";

const Button = ({ label, className = "", onClick, type, icon }) => {
  return (
    <button
      className={`default-button ${className}`}
      onClick={onClick}
      type={type}
    >
      {icon ? <Image src={icon} alt="ícone" /> : ""}
      {label}
    </button>
  );
};

export default Button;
