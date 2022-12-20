import React, { useState } from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import constants from "../../constants";
import { Link } from "react-router-dom";

export default function Test() {
  const [current, setCurrent] = useState("TODOMALL");

  return (
    <>
      <StyledBottomNavBar showLabels>
        <NavBarButton
          icon={
            <>
              <img
                src={
                  current === "TODOSTORAGE"
                    ? constants.TODOSTORAGE_COLORED
                    : constants.TODOSTORAGE_UNCOLORED
                }
                style={{ width: 35, height: 45, objectFit: "cover" }}
                height={20}
              />
            </>
          }
          onClick={() => {
            setCurrent("TODOSTORAGE");
          }}

          //   component={Link}
          //   to="/todo"
        />

        <NavBarButton
          icon={
            <>
              <img
                src={
                  current === "TODOMALL"
                    ? constants.TODOMALL_COLORED
                    : constants.TODOMALL_UNCOLORED
                }
                style={{ width: 35, height: 45, objectFit: "cover" }}
                height={25}
              />
            </>
          }
          onClick={() => {
            setCurrent("TODOMALL");
          }}
          //   component={Link}
          //   to="/planmarket"
        />
        <NavBarButton
          icon={
            <>
              <img
                src={
                  current === "MYPAGE"
                    ? constants.MYPAGE_COLORED
                    : constants.MYPAGE_UNCOLORED
                }
                style={{ width: 35, height: 45, objectFit: "cover" }}
                height={25}
              />
            </>
          }
          onClick={() => {
            setCurrent("MYPAGE");
          }}

          //   component={Link}
          //   to="/todo"
        />
      </StyledBottomNavBar>
    </>
  );
}

const NavText = styled.span`
  font-family: "SFProDisplay";
  font-size: 12px;
  color: ${(props) => (props.selected ? "#8977f7" : "#c4c4c4")};
  margin-top: 2px;
`;

const StyledBottomNavBar = styled(BottomNavigation)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 85px !important;
  filter: drop-shadow(0px -3px 4px rgba(0, 0, 0, 0.04));
`;

const NavBarButton = styled(BottomNavigationAction)`
  padding: 0px 12px 8px !important;
`;
