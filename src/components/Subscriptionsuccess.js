import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Subscriptionsuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryparams = new URLSearchParams(location.search);
    async function setplan() {
      const token = localStorage.getItem("token");
      const body = {
        userId: queryparams.get("user_id"),
        planId: queryparams.get("plan_id"),
        isMonth: queryparams.get("is_month"),
      };
      const setPlan = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      const data = await setPlan.json();
      if (data.status !== "success") {
        toast.error(data.msg);
        return;
      }
      navigate("/home");
    }
    setplan();
  }, [location.search, navigate]);
  return <div>{toast.success("Subscription Successful")}</div>;
};

export default Subscriptionsuccess;
