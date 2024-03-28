import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpAction } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigate("/login");
  };

  const intialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = () => {
    console.log(formValues);
    dispatch(userSignUpAction(formValues));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Cannot be blank";
    }
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
    if (!values.confirmpassword) {
      errors.confirmpassword = "Cannot be blank";
    } else if (values.confirmpassword.length < 4) {
      errors.confirmpassword = "Password must be more than 4 characters";
    } else if (values.password.length !== values.confirmpassword.length) {
      errors.confirmpassword = "Password not match";
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
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.name
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              name="name"
                              className="form-control"
                              value={formValues.name}
                              onChange={handleChange}
                            />

                            {formErrors.name && <span>{formErrors.name}</span>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.email
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="form3Example3c"
                              className="form-control"
                              value={formValues.email}
                              onChange={handleChange}
                            />

                            {formErrors.email && (
                              <span>{formErrors.email}</span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.password
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              name="password"
                              className="form-control"
                              value={formValues.password}
                              onChange={handleChange}
                            />

                            {formErrors.password && (
                              <span>{formErrors.password}</span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.confirmpassword
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              name="confirmpassword"
                              className="form-control"
                              value={formValues.confirmpassword}
                              onChange={handleChange}
                            />

                            {formErrors.confirmpassword && (
                              <span>{formErrors.confirmpassword}</span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div
                            className={
                              formErrors.confirmpassword
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <label className="form-label" for="form3Example4cd">
                              role
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="role"
                              className="form-control"
                              onChange={handleChange}
                            >
                              <option selected>Select Role type</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            for="form2Example3"
                          >
                            Already Member{" "}
                            <a href="#!" onClick={handleLogin}>
                              {" "}
                              Login{" "}
                            </a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
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

export default Register;
