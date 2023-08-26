import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
    };
    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (data.status !== "success") {
        toast.error(data.msg);
        setFormData({
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        return;
      }
      console.log(data);
      toast.success("Account Created");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="p-5 rounded-lg mt-6 bg-white">
        <h2 className="font-semibold text-[1.875rem] leading-[2.375rem] text-center">
          Create Account
        </h2>
        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter Name"
              value={formData.firstname}
              className="bg-white rounded-[0.5rem] text-black w-full p-[12px] border"
            />
          </label>
        </div>
        <div className="mt-[20px]">
          <label className="w-full mt-[20px]">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address "
              value={formData.email}
              className="bg-white rounded-[0.5rem] text-black w-full p-[12px] border"
            />
          </label>
        </div>

        {/* createPassword and Confirm Password */}
        <div className="w-full flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className="bg-white rounded-[0.5rem] text-black w-full p-[12px] border"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem]  mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="bg-white rounded-[0.5rem] text-black w-full p-[12px] border"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button className=" w-full bg-blue-900 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6">
          Create Account
        </button>
        <div className="flex justify-center p-2 ">
          <h3>Already have an account?</h3>
          <NavLink to="/login" className="px-2 text-blue-100">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
