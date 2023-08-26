import React from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;

  return (
    <div className="flex justify-center items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <nav>
        <ul className="text-richblack-100 flex gap-x-6"></ul>
      </nav>

      {/* Login - SignUp - LogOut - Dashboard */}
      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className="bg-white text-black py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log in
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className="bg-white text-black py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
            >
              Sign up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
