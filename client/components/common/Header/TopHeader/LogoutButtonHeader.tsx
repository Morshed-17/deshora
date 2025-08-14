"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

function LogoutButtonHeader() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };
  return (
    <Button onClick={() => handleLogout()} className="hoverEffect">
      Logout
    </Button>
  );
}

export default LogoutButtonHeader;
