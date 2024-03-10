//#region IMPORTS
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { LoginForm } from "./../interfaces/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axiosClient from "../_utils/axiosClient";
import { endpointsAuth } from "../_utils/ApiEndpoints";
import { routes } from "../_utils/Routes";
//#endregion

// * REACT COMPONENT
export default function Login() {

  // & VARIABLES
  const formDataInitial: LoginForm = {
    email: null,
    password: null,
  };

  const [formData, setFormData]: [LoginForm, Dispatch<SetStateAction<LoginForm>>] = useState<LoginForm>(formDataInitial);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || routes.Home;
  const auth = useAuth()
  const _axiosClient = axiosClient(auth.token);


  // ^ HANDLE SUBMIT
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setAlertMessage("Please provide both email and password.");
      return;
    }

    try {
      const response = await _axiosClient.post(endpointsAuth.login, formData);
      console.log("🚀 ~ handleSubmit ~ response:", response)

      if (response?.status === 200) {
        const { token } = response.data;
        auth.login(token);
        navigate(redirectPath, { replace: true });
        setAlertMessage("Login successful!");
      } else {
        setAlertMessage("Login failed. Please check your credentials and try again.");
      }

    } catch (error: any) {
      //#region 
      // Handle network or server errors
      setAlertMessage("An unexpected error occurred. Please try again later.");
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Registration failed with status:", error.response.status);
        console.error("Error message:", error.response.data);
        throw new Error(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server.");
        throw new Error("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up registration request:", error.message);
        throw new Error("Error setting up registration request.");
      }
      //#endregion
    }
  };

  // & HANDLE CHANGE
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //#region 
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    //#endregion
  };

  // * REACT JSX
  return (
    //#region 
    <div className="container max-w-sm md:max-w-md  lg:max-w-3xl  mx-auto">
      <h1 className="text-4xl text-center mb-5">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            type="email"
            className="grow"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>
        <button type="submit" className="btn btn-dark mx-auto flex w-32">
          Submit
        </button>
        {alertMessage && (
          <div role="alert" className="alert alert-error">
            <span>{alertMessage}</span>
          </div>
        )}
      </form>
      <p className="text-center pt-5">or <Link to={routes.Register} className="underline">create an account</Link></p>
    </div>
    //#endregion
  );
}
