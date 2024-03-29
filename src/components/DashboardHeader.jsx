import React from "react";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";
import UserButton from "./UserButton";

const DashboardHeader = () => {
  return (
    <header className="dashboard__header">
      <Logo />
      <div>
        <MenuDrawer />
        <UserButton />
      </div>
    </header>
  );
};

export default DashboardHeader;
