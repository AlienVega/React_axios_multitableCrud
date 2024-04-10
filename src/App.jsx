import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3030/users").then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }, [handleSubmit]);

  return (
    <div className="container mt-5 ">
      <div className="text-end">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link
                  to={`/update/${d.id}`}
                  className="btn btn-sm btn-success mx-1"
                >
                  Update
                </Link>
                <button
                  onClick={(e) => handleSubmit(d.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleSubmit(id) {
    const conf = window.confirm("do you want to delete?");
    if (conf) {
      axios
        .delete(`http://localhost:3030/users/${id}`)
        .then((res) => {
          elert("record has deleted");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default App;
