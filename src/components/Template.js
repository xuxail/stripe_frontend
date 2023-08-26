import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

const Template = ({ title, formtype, setIsLoggedIn }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-11/12 max-w-[450px]">
        {formtype === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default Template;
