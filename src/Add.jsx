import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Add = () => {
  const [inputData, setInputData] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3030/users", inputData)
      .then((res) => {
        alert("data added");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-info mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
