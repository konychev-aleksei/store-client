import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Button from "@mui/material/Button";
import ListIcon from "@mui/icons-material/List";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import C from "../../constants";

export const AuthPanel = ({ user, signInGoogle, signOut, inOrder }) => {
  const navigate = useNavigate();

  const signOutWithNavigation = async () => {
    navigate("/");
    await signOut();
  };

  return (
    <div className={style.wrapper}>
      {user ? (
        <>
          <Button
            onClick={() => navigate(inOrder ? "/search" : "/orders")}
            variant="contained"
            className={style.button}
            startIcon={<ListIcon />}
            sx={{
              background: "black",
              color: "white",
            }}
          >
            {inOrder ? C.SEARCH : C.MY_ORDERS}
          </Button>
          <Button
            onClick={signOutWithNavigation}
            variant="contained"
            className={style.button}
            startIcon={<LogoutIcon />}
            sx={{
              background: "black",
              color: "white",
            }}
          >
            {C.LOG_OUT}
          </Button>
        </>
      ) : (
        <Button
          onClick={signInGoogle}
          variant="contained"
          className={style.button}
          startIcon={<LoginIcon />}
          sx={{
            background: "black",
            color: "white",
          }}
        >
          {C.SIGN_IN}
        </Button>
      )}
    </div>
  );
};
