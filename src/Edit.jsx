import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();
  const [data, setItem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [id]);
  function handleSubmit(e) {
    e.preventDefault();
    axios.put("http://localhost:3030/users/" + id, data).then((res) => {
      alert("data update");
      navigate("/");
    });
  }
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">id:</label>
            <input
              disabled
              type="text"
              value={data.id}
              name="id"
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={data.name}
              name="name"
              className="form-control"
              onChange={(e) => setItem({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={(e) => setItem({ ...data, email: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-info mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
