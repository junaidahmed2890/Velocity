import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo.jpeg";
import "../../styles/app.css";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  userId: Yup.string().required("User Id is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const initialValues = {
  userId: "",
  password: "",
};

export const LoginForm: React.FC<any> = ({ onLogin }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: { userId: string; password: string }) => {
    try {
      const response = await UserService.login(values.userId, values.password);
      if (response.status === "success") {
        onLogin();
        toast.success(response.message);
        navigate("/homepage");
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="rounded-left"
      style={{
        padding: "10%",
        backgroundColor: "white",
        height: "100vh",
        borderTopLeftRadius: "3%",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-6">
          <img src={logo} alt={logo} height={"120px"} width={"150px"} />
        </div>
      </div>
      <div className="pt-2 pb-2">
        {" "}
        Update candidate information in profile after conversations. This helps
        to keep the data updated.
      </div>
      <div className="row justify-content-center">
        <h3 className="col-10  pt-2 pb-2" style={{ color: "#144991" }}>
          Welcome Back
        </h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-2">
              <label htmlFor="userId" className="form-label">
                User Id<span className="text-danger"> *</span>
              </label>
              <Field name="userId" type="text" className="form-control" />
              <ErrorMessage
                name="userId"
                component="div"
                className="error text-danger p-1"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="error text-danger p-1"
              />
            </div>
            <div className="row justify-content-center ">
              <button
                type="submit"
                className="btn col-8 mt-1"
                style={{ backgroundColor: "#144991", color: "white" }}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
