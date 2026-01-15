import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import SubNavbar from "../components/SubNavbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import { Form } from "../components/register/Form.jsx";
import axios from "axios";

const Register = () => {
  const { login } = useOutletContext();
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("signin");

  const [touched, setTouched] = useState({});

  const currentName = formData.name || "";
  const nameParts = formData.name ? formData.name.trim().split(/\s+/) : [];
  const hasNumber = /\d/.test(formData.name);
  const isEachPartLongEnough = nameParts.every((part) => part.length >= 2);
  const minBirthday = new Date(
    new Date().getFullYear() - 18,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];

  const nameError =
    currentName.length !== 0 &&
    (!currentName.includes(" ") || hasNumber || !isEachPartLongEnough)
      ? "Invalid name. Please try again."
      : null;

  const emailError =
    formData.email.length !== 0 &&
    //ประกอบด้วย 3 อย่าง
    //1.หน้า @ ต้องมีตัวอักษร ตัวเลข หรือสัญลักษณ์ที่กำหนด
    //2.หลัง @ ตามด้วยชื่อโดเมน
    //3. มีจุด . ต่อท้าย ตามด้วยอักษร 2 ตัวด้านหลัง
    !/^[a-zA-Z0-9][a-zA-Z0-9._-]{1,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      formData.email
    )
      ? "Please enter a valid email address"
      : null;
  const mobileNumberError =
    formData.mobileNumber.length > 0 &&
    (formData.mobileNumber[0] !== "0" ||
      formData.mobileNumber.length !== 10 ||
      !/^\d+$/.test(formData.mobileNumber))
      ? "Please enter a valid phone number"
      : null;
  const dobError =
    formData.dob.length !== 0 && formData.dob > minBirthday
      ? "You must be at least 18 years old to register."
      : null;
  const passwordError =
    formData.password.length !== 0 &&
    (formData.password.length < 8 ||
      !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) // ต้องมีทั้งตัวอักษรและตัวเลข
      ? "Your password must be at least 8 characters long"
      : null;
  const confirmPasswordError =
    formData.confirmPassword.length > 0 &&
    formData.confirmPassword !== formData.password
      ? "Passwords do NOT match"
      : null;

  const isFormValid =
    mode === "signup"
      ? !nameError &&
        !emailError &&
        !mobileNumberError &&
        !dobError &&
        !passwordError &&
        !confirmPasswordError &&
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.mobileNumber.trim() !== "" &&
        formData.dob.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== ""
      : !emailError &&
        !passwordError &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "";

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      mobileNumber: true,
      dob: true,
      password: true,
      confirmPassword: true,
    });
    setHasSubmitted(true);
    setSubmitSuccess("");

    if (!isFormValid) return;

    setLoading(true);
    try {
      if (mode === "signup") {
        const url = apiBase.endsWith('/register') ? apiBase : `${apiBase}/register`;
        const response = await axios.post(url, formData);

        if (response.data.success || response.status === 200 || response.status === 201) {
          setSubmitSuccess(
            "Account created successfully! You can now sign in to your account."
          );
        }
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          dob: "",
          password: "",
          confirmPassword: "",
        });
        setTouched({});
      } else {
       const isSuccess = await login({
          email: formData.email,
          password: formData.password,
        });
        if (isSuccess) {
          navigate("/userprofile"); // ถ้า Login ผ่าน ให้ย้ายหน้า
        } else {
          alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); // ถ้าไม่ผ่าน ให้แจ้งเตือน
        }
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Failed to create account. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
      setHasSubmitted(false);
    }
  }

  return (
    <>
      <SubNavbar />

      <Form
        formData={formData}
        setFormData={setFormData}
        setHasSubmitted={setHasSubmitted}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        loading={loading}
        handleSubmit={handleSubmit}
        mode={mode}
        setMode={setMode}
        touched={touched}
        setTouched={setTouched}
        nameError={nameError}
        emailError={emailError}
        mobileNumberError={mobileNumberError}
        dobError={dobError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        isFormValid={isFormValid}
      />

      <div className="hidden md:block">
        <SubFooter />
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
};

export default Register;

//  <Link to="/userprofile">
//             <span className="text-[#447F98] font-bold cursor-pointer ml-1">
//               Sign in
//             </span>
//             </Link>
