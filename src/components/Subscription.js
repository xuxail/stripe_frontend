import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [isMonth, setIsMonth] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/plan`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setPlans(data.plans);
    }
    fetchData();
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

    const body = {
      plan: plans[selectedPlan]._id,
      isMonth: isMonth,
    };

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/create_session_checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (!result.error) {
      toast.error("Something went wrong");
      return;
    }
  };
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="w-1/2  flex flex-col justify-center relative ">
        <h1 className="text-3xl font-semibold text-center m-2">
          Choose a plan that’s right for you
        </h1>
        <div className="absolute top-[100px] left-0 bg-blue-100 rounded-full">
          <button
            className={`p-2 m-2 rounded-full ${
              isMonth ? "bg-white" : "text-white"
            }`}
            onClick={() => setIsMonth(true)}
          >
            Monthly
          </button>
          <button
            className={`p-2 m-2 rounded-full ${
              isMonth ? "text-white" : "bg-white"
            }`}
            onClick={() => setIsMonth(false)}
          >
            Yearly
          </button>
        </div>
        <div className="flex justify-end">
          <div className="header box-border w-9/12 flex justify-center">
            {plans.map((plan, index) => {
              return (
                <div
                  key={index}
                  className={`w-3/12 h-28 m-3 rounded  text-white flex-auto flex justify-center items-center cursor-pointer hover:bg-blue-100 ${
                    selectedPlan === index ? "bg-blue-100" : " bg-blue-200 "
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  {plan.plan_name}
                </div>
              );
            })}
          </div>
        </div>
        <table className="table-fixed text-gray-400 font-bold">
          <tbody className="">
            <tr className=" border-b border-black">
              <td className="w-3/12 text-left  p-5  box-border">
                {isMonth ? "Monthly" : "Yearly"}
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`w-{18.75} text-center py-3 ${
                      selectedPlan === index ? "text-blue-100" : ""
                    }`}
                  >
                    {"₹" + (isMonth ? plan.m_price : plan.y_price)}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b border-black">
              <td className=" w-3/12 text-left  p-5  box-border">
                Video Quality
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto text-center py-3 ${
                      selectedPlan === index ? "text-blue-100" : ""
                    }`}
                  >
                    {plan.video_quality}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b  border-black">
              <td className="w-3/12 text-left  p-5  box-border">Resolution</td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto text-center  my-3 ${
                      selectedPlan === index ? "text-blue-100" : ""
                    }`}
                  >
                    {plan.resolution + "p"}
                  </td>
                );
              })}
            </tr>
            <tr className=" border-black  box-border">
              <td className="w-3/12 text-left  p-5 ">
                Devices you can use to watch
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto text-center my-3 ${
                      selectedPlan === index ? "text-blue-100" : ""
                    }`}
                  >
                    {plan.devices.map((device) => {
                      return <div className={`py-2 text-xs`}>{device}</div>;
                    })}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <button
            className="w-1/2 m-4 rounded h-11 bg-blue-100 text-white hover:opacity-80"
            onClick={makePayment}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
