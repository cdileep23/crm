import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    
    axios
      .post("http://localhost:9090/api/v1/contacts", contact)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message); 
        } else {
          setError("An error occurred. Please try again.");
        }
        console.error(err);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a Contact</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" >
              {error}
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Enter First Name"
              value={contact.firstName}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Enter Last Name"
              value={contact.lastName}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={contact.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              onChange={handleChange}
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="Enter Phone Number"
              value={contact.phoneNumber}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="company">Company:</label>
            <input
              onChange={handleChange}
              type="text"
              name="company"
              className="form-control"
              placeholder="Enter Company"
              value={contact.company}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="jobTitle">Job Title:</label>
            <input
              onChange={handleChange}
              type="text"
              name="jobTitle"
              className="form-control"
              placeholder="Enter Job Title"
              value={contact.jobTitle}
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Create;
