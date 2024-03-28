import {LogoutButton} from "../LogoutButton";
import {UserView, UserViewProps} from "../UserView";
import {FC} from "react";
import './UserFrame.css';

export const UserFrame: FC<UserViewProps> = ({user}) => {

  return (
      <div className="user-frame flex justify-center flex-col">
        <h5>Добрый день!</h5>
        <UserView user={user}/>
        <LogoutButton/>
      </div>
  )
}