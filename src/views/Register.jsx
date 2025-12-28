import React from "react";

const Register = () => {
  return (
    <>
      <div className="flex flex-col jusitfy-center items-center p-10 border border-gray-100 w-[450px] h-[920px] mx-auto shadow-xl hover:shadow-xl/30 rounded-xl mt-30 mb-40">
        <div className="font-medium text-xl ">Register with</div>

        <div>
          <div className="flex flex-row items-center p-6">
            <div className="w-20 h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4">
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

            <div className="w-20 h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4">
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

            <div className="w-20 h-20 border border-[#E2E8F0]  rounded-lg flex items-center justify-center mr-4">
              <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-[#2D3748] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-[#A0AEC0] text-xl">or</h3>

        <div className="mt-10 flex flex-col gap-x-4 gap-y-6 w-[95%]">
          <div>
            <label for="fullname" className="block text-md  text-[#2D3748]">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Your full name"
                className="w-95 h-12 rounded-lg bg-none  border border-[#E6EAF1] px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] "
              />
            </div>
          </div>

          <div>
            <label for="email" className="block text-md  text-[#2D3748]">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-95 h-12 rounded-lg bg-none border border-[#E6EAF1] px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] "
              />
            </div>
          </div>

          <div>
            <label for="tel" className="block text-md  text-[#2D3748]">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                placeholder="Your mobile number"
                className="w-95 h-12 rounded-lg bg-none border border-[#E6EAF1] px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] "
              />
            </div>
          </div>

          <div>
            <label for="birthdate" className="block text-md  text-[#2D3748]">
              Date of birth
            </label>
            <div className="mt-2">
              <input
                type="date"
                placeholder="Your date of birth"
                className="w-95 h-12 rounded-lg bg-none border border-[#E6EAF1] px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] "
              />
            </div>
          </div>

          <div>
            <label for="password" className="block text-md  text-[#2D3748]">
              Password
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder="****************"
                className="w-95 h-12 rounded-lg bg-none border border-[#E6EAF1] px-6 py-1.5 text-base text-[#2D3748] outline-1 -outline-offset-1 outline-black/10 placeholder:text-sm placeholder:text-[#border border-[#E6EAF1]] focus:outline-2 focus:-outline-offset-2 focus:outline-[#2D3748] "
              />
            </div>

            <label className="inline-flex items-center cursor-pointer mt-5">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-9 h-5 bg-gray-200   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#447F98]"></div>
              <span className="select-none ms-3 text-sm font-medium text-heading">
                Remember me
              </span>
            </label>
          </div>

          <button className="bg-[#447F98] hover:bg-[#5591A9] w-95 h-12 rounded-lg text-sm font-bold text-white cursor-pointer">
            {" "}
            SIGN UP
          </button>
          <div className="flex flex-row py-2 justify-center items-center text-[#A0AEC0]">
            Already have an account?
            <span className="text-[#447F98] font-bold cursor-pointer ml-1">
              Sign in
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
