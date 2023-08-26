import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Card({ plan, isMonth, updateTime }) {
  const [isCancel, setIsCancel] = useState(false);
  const date = new Date(updateTime);
  const expiryDate = isMonth
    ? date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + date.getDate()
    : date.getFullYear() +
      1 +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();

  const cancelPlan = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/`;
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.status !== "success") {
      toast.error("Could not cancel.");
    }
    toast.success("Plan deleted.");
    setIsCancel(true);
  };

  const navigate = useNavigate();
  return (
    <div className="bg-white w-2/4 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl ">Current plan details</h1>
          <p
            className={
              "bg-blue-300 m-2 p-1 rounded-lg font-bold " +
              (isCancel ? "text-red-500" : "text-blue-100")
            }
          >
            {isCancel ? "Cancelled" : "Active"}
          </p>
        </div>
        {!isCancel && (
          <button
            className=" m-2 p-1  font-bold text-blue-100"
            onClick={cancelPlan}
          >
            Cancel
          </button>
        )}
      </div>
      <div className="py-3">
        <p>{plan?.plan_name}</p>
        <p>
          {plan?.devices?.map((device) => (
            <span className="bg-blue-300 p-1 rounded-lg font-bold text-blue-100">
              {device}
            </span>
          ))}
        </p>
      </div>
      <h2 className="text-5xl py-5 font-bold">
        {"₹" + (isMonth ? plan?.m_price + "/month" : plan?.y_price + "/yr")}
      </h2>
      <button
        className="py-3  px-6 rounded-lg font-bold  border border-blue-100 "
        onClick={() => navigate("/subscription")}
      >
        {isCancel ? "Choose Plan" : "Change Plan"}
      </button>
      <p className="text-2xl py-3 text-gray-500">
        {isCancel
          ? "Your subscription was cancelled and you will lose access to services on " +
            expiryDate
          : "Your subscription has started on " +
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " and will auto renew on " +
            expiryDate +
            "."}
      </p>
    </div>
  );
}

export default Card;
