// import React, { useState } from 'react'

export const Form = ({
  formData,
  setFormData,
  hasSubmitted,
  setHasSubmitted,
  submitSuccess,
  setSubmitSuccess,
  loading,
  handleSubmit,
  mode,
  setMode,
  touched,
  setTouched,
  nameError,
  emailError,
  mobileNumberError,
  dobError,
  passwordError,
  confirmPasswordError,
  isFormValid,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
    setSubmitSuccess("");
    setHasSubmitted(false);
    setTouched({});

    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      dob: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitSuccess && mode === "signup" && (
        <div className="relative flex justify-center items-center mt-40 ">
          <p className="px-40 py-10 rounded-xl border border-green-300 bg-green-50 font-bold text-lg text-green-600">
            {submitSuccess}
          </p>
        </div>
      )}
      <div className="flex flex-col jusitfy-center items-center p-10 border border-none md:border md:border-gray-100 w-full md:w-[480px]  mx-auto md:shadow-xl md:hover:shadow-xl/30 rounded-xl mb-20 mt-20 md:mb-40 ">
        <div className="font-medium text-xl ">
          {mode === "signup" ? "Register with" : "Login"}
        </div>

        {/* <div>
          <div className="flex flex-row items-center p-6 ">
            <div className="w-15 h-15 md:w-20 md:h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4 ">
              <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#2D3748] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
              </span>
            </div>

            <div className="w-15 h-15 md:w-20 md:h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4">
              <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#2D3748] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                </svg>
              </span>
            </div>

            <div className="w-15 h-15 md:w-20 md:h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4">
              <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-[#2D3748] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                  {/* <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </span>
            </div>
          </div>
        </div> */} 

        {/* ---------------------------------ช่อง input ----------------------------------------------- */}
        {/* <h3 className="text-[#A0AEC0] text-xl">or</h3> */}

        <div className="mt-10 flex flex-col md:gap-x-4 w-[95%]">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${
            mode === "signup"
              ? "max-h-32 opacity-100 mb-4"
              : "max-h-0 opacity-0"
          }`}
          >
            <label htmlFor="fullname" className="block text-md  text-[#2D3748]">
              Name
            </label>
            <div className="mt-2">
              <input
                name="name"
                type="text"
                value={formData.name || ""}
                placeholder="Your full name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none  border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  touched.name && nameError
                    ? "border border-red-500 focus:outline-red-500"
                    : ""
                } `}
              />

              {(touched.name || hasSubmitted) && nameError && (
                <p className="text-red-500  mt-1 px-2">{nameError}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-md  text-[#2D3748]">
              Email
            </label>

            <div className="mt-2 mb-4">
              <input
                name="email"
                type="email"
                value={formData.email || ""}
                placeholder="Your email address"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  touched.email && emailError
                    ? "border border-red-500 focus:outline-red-500"
                    : ""
                }`}
              />

              {(touched.email || hasSubmitted) && emailError && (
                <p className="text-red-500  mt-1 px-2">{emailError}</p>
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${
            mode === "signup"
              ? "max-h-32 opacity-100 mb-4"
              : "max-h-0 opacity-0"
          }`}
          >
            <label htmlFor="tel" className="block text-md  text-[#2D3748]">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber || ""}
                placeholder="Your mobile number"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  touched.mobileNumber && mobileNumberError
                    ? "border border-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
              {(touched.mobileNumber || hasSubmitted) && mobileNumberError && (
                <p className="text-red-500  mt-1 px-2">{mobileNumberError}</p>
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${
            mode === "signup"
              ? "max-h-32 opacity-100 mb-4"
              : "max-h-0 opacity-0"
          }`}
          >
            <label
              htmlFor="birthdate"
              className="block text-md  text-[#2D3748]"
            >
              Date of birth
            </label>
            <div className="mt-2">
              <input
                name="dob"
                type="date"
                value={formData.dob || ""}
                placeholder="Your date of birth"
                onChange={handleChange}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  dobError ? "border border-red-500 focus:outline-red-500" : ""
                } `}
              />

              {dobError && (
                <p className="text-red-500  mt-1 px-2">{dobError}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-md  text-[#2D3748]">
              Password
            </label>
            <div className="mt-2 mb-4">
              <input
                value={formData.password || ""}
                name="password"
                type="password"
                placeholder="****************"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  touched.password && passwordError
                    ? "border border-red-500  focus:outline-red-500"
                    : ""
                }  `}
              />

              {(touched.password || hasSubmitted) && passwordError && (
                <p className="text-red-500  mt-1 px-2">{passwordError}</p>
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${
            mode === "signup"
              ? "max-h-32 opacity-100 mb-4"
              : "max-h-0 opacity-0"
          }`}
          >
            <label
              htmlFor="confirmPassword"
              className="block text-md  text-[#2D3748]"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                placeholder="****************"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full h-10 md:w-95 md:h-12 rounded-lg bg-none border border-[#E6EAF1] px-4 md:px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] ${
                  touched.confirmPassword && confirmPasswordError
                    ? "border border-red-500  focus:outline-red-500"
                    : ""
                } `}
              />

              {(touched.confirmPassword || hasSubmitted) && confirmPasswordError && (
                <p className="text-red-500  mt-1 px-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </div>
{/* 
          <label className="inline-flex items-center cursor-pointer mb-4">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-9 h-5 bg-gray-200   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#447F98]"></div>
            <span className="select-none ms-3 text-sm font-medium text-heading">
              Remember me
            </span>
          </label> */}

          
          <button
            type="submit"
            disabled={loading || !isFormValid}
            
            className={`bg-[#447F98] w-full h-10 md:w-95 md:h-12 mt-8 rounded-lg text-sm font-bold text-white
              
              ${
                loading || !isFormValid
                  ? "opacity-60 cursor-default"
                  : "cursor-pointer hover:bg-[#5591A9]"
              }`}
          >
            {loading
              ? mode === "signup"
                ? "Registering..."
                : "Signing In..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>

          {mode === "signup" ? (
            <div className="flex flex-row justify-center items-center mt-6 text-[#A0AEC0]">
              Already have an account?
              <span
                onClick={() => toggleMode("signin")}
                className="text-[#447F98] font-bold cursor-pointer ml-1"
              >
                Sign in
              </span>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center mt-6 text-[#A0AEC0]">
              Not registered?
              <span
                onClick={() => toggleMode("signup")}
                className="text-[#447F98] font-bold cursor-pointer ml-1"
              >
                Create an account
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block"></div>
    </form>
  );
};
