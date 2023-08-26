import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "./Card/Card.js";
const Home = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [isMonth, setIsMonth] = useState(false);
  const [updateTime, setUpdateTime] = useState(0);
  useEffect(() => {
    async function getplan() {
      const token = localStorage.getItem("token");
      const get_plan = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await get_plan.json();
      if (!data.plan) {
        navigate("/subscription");
        return;
      }
      setPlan(data.plan);
      setIsMonth(data.isMonthly);
      setUpdateTime(data.updatedAt);
    }
    getplan();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <Card plan={plan} isMonth={isMonth} updateTime={updateTime} />
    </div>
  );
};

export default Home;
