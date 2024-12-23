"use client";

import React, { useState } from "react";
import "./userMenu.scss";
import Image from "next/image";
import { Button } from "..";

const UserMenu = ({ label, image, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="user-menu">
      <span className="user-menu-label">{label}</span>
      <Image
        src={image}
        alt="Foto do usuário"
        className="user-menu-avatar"
        onClick={toggleDropdown}
        aria-label="Abrir menu do usuário"
      />
      {isDropdownOpen && (
        <div className="user-menu-dropdown">
          <Button
            onClick={() => {
              closeDropdown();
              onLogout();
            }}
            label="Logout"
            className="user-menu-logout-button"
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
