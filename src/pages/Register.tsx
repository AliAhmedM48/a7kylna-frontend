//#region IMPORTS
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { Gender, RegisterForm } from "../interfaces/user";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axiosClient from "../_utils/axiosClient";
import { endpointsAuth } from "../_utils/ApiEndpoints";
import { routes } from "../_utils/Routes";
//#endregion

// * REACT COMPONENT
export default function Register() {
  // & VARIABLES
  const formDataInitial: RegisterForm = {
    email: "",
    fullName: "",
    password: "",
    avatar: "https://avatar.iran.liara.run/public/boy",
    gender: Gender.Male
  };
  const [formData, setFormData]: [RegisterForm, Dispatch<SetStateAction<RegisterForm>>] = useState<RegisterForm>(formDataInitial);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth()
  const _axiosClient = axiosClient(auth.token);

  // ^ HANDLE SUBMIT
  const handleSubmit = async (event: SyntheticEvent) => {
    //#region 
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      setAlertMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await _axiosClient.post(endpointsAuth.register, formData);
      console.log("🚀 ~ handleSubmit ~ response:", response);

      if (response?.status === 201) {
        navigate(routes.Login, { state: formData.email });
        setAlertMessage('Registration successful. Please log in.');
      } else {
        // Handle registration error
        const errorMessage = response?.data?.message || 'Registration failed. Please try again later.';
        setAlertMessage(errorMessage);
      }
    } catch (error: any) {
      // Handle network or server error
      setAlertMessage('Registration failed. Please try again later.');
      console.error('Error submitting form:', error.response?.data?.message);
    }
    //#endregion
  };

  // & HANDLE CHANGE
  const handleChange = (event: SyntheticEvent) => {
    //#region 
    const { name, value } = event.target as HTMLInputElement;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    //#endregion
  };

  // & HANDLE CHANGE GENDER
  const handleGenderChange = (event: SyntheticEvent) => {
    //#region 
    const { value } = event.target as HTMLInputElement;
    setFormData(prevData => ({ ...prevData, gender: value === 'male' ? Gender.Male : Gender.Female }));
    //#endregion
  };

  // * REACT JSX
  return (
    //#region 
    <div className="container max-w-sm md:max-w-md  lg:max-w-3xl  mx-auto">
      <h1 className="text-4xl text-center mb-5">Register</h1>
      <p className="text-center pb-5">Already have an account <Link to={routes.Login} className="underline">Log in</Link></p>

      <form onSubmit={handleSubmit} className="space-y-3">

        <label className="input input-bordered flex items-center gap-2">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text" className="grow" placeholder="Full name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email" className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password" className="grow" placeholder="Password" />
        </label>
        <div className="flex items-center gap-5 ml-2">
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value={Gender.Male}
              checked={formData.gender === Gender.Male}
              onChange={handleGenderChange}
              className="ml-3"
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value={Gender.Female}
              checked={formData.gender === Gender.Female}
              onChange={handleGenderChange}
              className="ml-3"
            />
          </label>
        </div>
        {/* <button type="submit" className="btn btn-dark mx-auto"> */}
        <button type="submit" className="btn btn-dark mx-auto flex w-32">

          Submit</button>
        {alertMessage && (
          <div role="alert" className="alert alert-error">
            <span>{alertMessage}</span>
          </div>
        )}
      </form>
    </div>
    //#endregion
  );
}
