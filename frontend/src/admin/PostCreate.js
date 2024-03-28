import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from 'axios'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const PostCreate = () => {
  const intialValues = {
    title: "",
    content: "",
    image: "",
  };

  const BASE_URL = String(process.env.BASEAPP_URL);
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test");
    console.log(formValues);
    createNewPost(formValues);
  };
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.signIn);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createNewPost = async (values) => {
    try {
        const { data } = await axios.post(`localhost:3000/api/post/create`, values,  {headers: {
          token: userInfo.token
        }});
        toast.success('post created');
        navigate("/");
    } catch (error) {
        console.log(error);
        //toast.error(error);
    }
}
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
                    <div className="col-md-12 col-lg-12 col-xl-12">
                      <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Create Post
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <div className="d-flex flex-row mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.title
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example1c">
                              Title
                            </label>

                            <input
                              type="text"
                              id="form3Example1c"
                              name="title"
                              className="form-control"
                              value={formValues.title}
                              onChange={handleChange}
                            />

                            {formErrors.title && (
                              <span>{formErrors.title}</span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.content
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example3c">
                              post Content
                            </label>
                            <textarea
                              class="form-control"
                              rows="5"
                              id="comment"
                              name="content"
                              className="form-control"
                              value={formValues.content}
                              onChange={handleChange}
                            ></textarea>

                            {formErrors.content && (
                              <span>{formErrors.content}</span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            className={
                              formErrors.postimage
                                ? "form-outline flex-fill mb-0 error"
                                : "form-outline flex-fill mb-0"
                            }
                          >
                            <label className="form-label" for="form3Example3c">
                              Post image
                            </label>
                            <div class="form-control" style={{background: "#ddd"}}>
                            <Dropzone
                              acceptedFiles=".jpg,.jpeg,.png"
                              multiple={false}
                              //maxFiles={3}
                              onDrop={(acceptedFiles) =>
                                acceptedFiles.map((file, index) => {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onloadend = () => {
                                  // setFieldValue("image", reader.result);
                                  setFormValues({ ...formValues, "image":  reader.result });
                                  };
                                })
                              }
                            >
                              {({
                                getRootProps,
                                getInputProps,
                                isDragActive,
                              }) => (
                                <div
                                  {...getRootProps()}
                                 
                                >
                                  <input name="banner" {...getInputProps()} />
                                  {isDragActive ? (
                                    <>
                                      <p style={{ textAlign: "center" }}>
                                       click
                                      </p>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {" "}
                                        Drop here!
                                      </p>
                                    </>
                                  ) : formValues.image === "" ? (
                                    <>
                                      <p style={{ textAlign: "center" }}>
                                         click
                                      </p>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Drag and Drop here or click to choose
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div>
                                          <img
                                            style={{ maxWidth: "100px" }}
                                            src={formValues.image}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </Dropzone>
                            </div>
                            {formErrors.image && (
                              <span>{formErrors.image}</span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Post
                          </button>
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

export default PostCreate;
