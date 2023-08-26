import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

console.log(process.env);

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status !== "success") {
        toast.error(data.msg);
        setFormData({
          email: "",
          password: "",
        });
        return;
      }
      localStorage.setItem("token", data.token);
      toast.success("Logged In");

      const get_plan = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const user_plan = await get_plan.json();
      console.log(user_plan.plan);
      if (user_plan.plan) {
        navigate("/home");
        return;
      }
      navigate("/subscription");
    } catch (err) {
      toast.error("Server Error");
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6 bg-white p-5 rounded-lg"
    >
      <h2 className="font-semibold text-[1.875rem] leading-[2.375rem] text-center mb-5">
        Login to your account
      </h2>
      <label className="w-full">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email address"
          name="email"
          className="bg-white rounded-[0.5rem] text-black w-full p-[12px] border"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-white rounded-[0.5rem] text-black-5 w-full p-[12px] border"
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
      <button className=" bg-blue-100 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-0">
        Login
      </button>
      <div className="flex justify-center p-2 ">
        <h3>New to MyApp?</h3>
        <NavLink to="/signup" className="px-2 text-blue-100">
          Signup
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
