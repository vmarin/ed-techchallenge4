import ArrowLeft from "./arrow-left";
import Home from "./home";
import Plus from "./plus";
import ThreeDotsHorizontal from "./three-dots-horizontal";
import { SvgProps } from "react-native-svg";
import UserIcon from "./user-icon";
import TrashIcon from "./trash";
import NewUserIcon from "./new-user";
import LogoutIcon from "./logout";
import LoginIcon from "./login";

type IconProps = SvgProps & {
  name: keyof typeof icons
}

const icons = {
  home: Home,
  threeDotsHorizontal: ThreeDotsHorizontal,
  plus: Plus,
  arrowLeft: ArrowLeft,
  userIcon: UserIcon,
  newUserIcon: NewUserIcon,
  loginIcon: LoginIcon,
  logoutIcon: LogoutIcon,
  trashIcon: TrashIcon
}

export default function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name]

  return (
    <IconComponent {...props} />
  )

}