import "./header.scss";
import UserMenu from "../UserMenu";
import userImage from "../../../public/userImage.png";
import logoEventsCalendar from "../../../public/logoEventsCalendar.png";
import Image from "next/image";
import { logOutUser } from "@/utils/authHelper";

const Header = ({ userName }) => {
  return (
    <header className="headerContainer">
      <Image className="logo" src={logoEventsCalendar} alt="Foto do usuário" />
      <UserMenu
        image={userImage}
        label={userName}
        onLogout={() => logOutUser()}
      />
    </header>
  );
};

export default Header;
