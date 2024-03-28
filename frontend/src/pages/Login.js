import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userSignInAction } from "../redux/actions/userAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = () => {
    navigate("/register");
  };

  const intialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, userInfo, error } = useSelector(state => state.signIn);
  useEffect(() => {

      if (isAuthenticated) {
          if (userInfo.role === 'admin') {
              navigate('/admin/dashboard');
          } else {
              navigate('/user/dashboard');
          }
      }

  }, [isAuthenticated]);
  
  const submitForm = () => {
    console.log(formValues);
      dispatch(userSignInAction(formValues));
       
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

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
                        User LogIn
                      </p>
                      {Object.keys(formErrors).length === 0 && error && (
                        <span className="success-msg">
                          Login Failed
                        </span>
                      )}
                      <form onSubmit={handleSubmit} noValidate>
                        <div className={formErrors.email ? "form-outline mb-4 error" : "form-outline mb-4"}>
                          <label className="form-label" for="form2Example1">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="form2Example1"
                            value={formValues.email}
                            onChange={handleChange}
                            className={"form-control"}
                            //className={formErrors.email && "input-error"}
                          />

                          {formErrors.email && (
                            <span>{formErrors.email}</span>
                          )}
                        </div>

                        <div className={formErrors.password ? "form-outline mb-4 error" : "form-outline mb-4"}>
                          <label className="form-label" htmlFor="form2Example2">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example2"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className={"form-control input-error"}
                          />

                          {formErrors.password && (
                            <span>{formErrors.password}</span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                        >
                          Sign in
                        </button>

                        <div className="text-center">
                          <p>
                            Not a member?{" "}
                            <a href="#!" onClick={handleRegister}>
                              Register
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
