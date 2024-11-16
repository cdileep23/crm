import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [sortField, setSortField] = useState(""); 
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = contacts.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(contacts.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/v1/contacts", { withCredentials: true })
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const deleteContact = (id) => {
    const confirm = window.confirm("Would you like to delete this contact?");
    if (confirm) {
      axios
        .delete(`http://localhost:9090/api/v1/contacts/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setContacts(contacts.filter((contact) => contact._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

 
  const nextPage = () => {
    if (currentPage < nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const handleSortChange = (e) => {
    const field = e.target.value;
    setSortField(field);

    if (field) {
      
      const sortedContacts = contacts.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
      setContacts(sortedContacts);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>Contacts</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex flex-row justify-content-between mb-3">
          <div>
            <select
              className="form-select"
              style={{ width: "200px" }}
              onChange={handleSortChange}
              value={sortField}
            >
              <option value="">Sort By</option>
              <option value="firstName">First Name</option>
              <option value="email">Email</option>
              <option value="phoneNumber">Phone Number</option>
            </select>
          </div>
          <Link to="/create" className="btn btn-success">
            Add Contact
          </Link>
        </div>

        {contacts.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No contacts found. Please add a contact.
          </div>
        ) : (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((d) => (
                  <tr key={d._id}>
                    <td>{d.firstName}</td>
                    <td>{d.lastName}</td>
                    <td>{d.email}</td>
                    <td>{d.phoneNumber}</td>
                    <td>{d.company}</td>
                    <td>{d.jobTitle}</td>
                    <td>
                      <Link
                        to={`/update/${d._id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteContact(d._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <ul className="pagination d-flex flex-row justify-content-end">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={prePage}>
                  Prev
                </button>
              </li>
              {numbers.map((n) => (
                <li
                  key={n}
                  className={`page-item ${currentPage === n ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => changeCurrentPage(n)}
                  >
                    {n}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === nPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
