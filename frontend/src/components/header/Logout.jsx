import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/auth";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="text-sm px-4 py-1.5 rounded-full border border-white/20 text-gray-300 hover:bg-white hover:text-gray-900 active:scale-95 transition-all duration-150 origin-left"
    >
      Log out
    </button>
  );
}

export default Logout;
