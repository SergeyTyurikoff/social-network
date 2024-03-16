import {
  getColorIndexByUsername,
  getColorByIndex,
  getGradientByIndex,
} from './getColorByUsername';
import './UserView.css';

export const UserView = ({ user }) => {
  const colorIndex = getColorIndexByUsername(user.username);

  return (
    <div className="user-view">
      <div
        className="user-view__avatar"
        style={{ background: getGradientByIndex(colorIndex) }}
      >
        {user.username.slice(0, 1).toUpperCase()}
      </div>

      <span
        className="user-view__username"
        style={{ color: getColorByIndex(colorIndex) }}
      >
        {user.username}
      </span>
    </div>
  );
};
