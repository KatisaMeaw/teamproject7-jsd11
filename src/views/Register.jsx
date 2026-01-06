import React, { useState } from "react";
import SubNavbar from "../components/SubNavbar";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import {Form} from "../components/register/Form.jsx";

const Register = () => {

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [dob, setDob] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",

  });

  return (
    <>
      <SubNavbar />
      
      <Form 
      formData={formData}
      setFormData={setFormData}

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
