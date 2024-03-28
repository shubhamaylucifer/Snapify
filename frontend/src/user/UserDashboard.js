import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  "";
  const [profile, setProfile] = useState("");
  const { userInfo } = useSelector((state) => state.signIn);
  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `localhost:3000/api/profile`,
        {
          headers: {
            token: userInfo.token,
          },
        }
      );
      console.log("data", data);
      setProfile(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        User dashboard
                      </p>
                      <p>Complete name: {profile && profile.name}</p>
                      <p>E-mail: {profile && profile.email}</p>
                      <p>Role: {profile && profile.role}</p>
                      <h2>
                      see all post {" "}
                      <Link to="/">Click here </Link>
                        
                    </h2>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
