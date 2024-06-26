import axios from "axios";
import Layout from "../layout/Layout";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AllRecords() {
  // http://localhost:3000/faculties
  const [records, setRecords] = useState([]);
  const [faculty, setFaculty] = useState();
  const [tableDark, setTableDark] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerpage = 2;
  const lastIndex = currentPage * recordPerpage;
  const firstIndex = lastIndex - recordPerpage;
  const data = records.slice(firstIndex, lastIndex);
  const npage = Math.ceil(records.length / recordPerpage);
  const numbers = [...Array(npage).keys()].slice();
  //  nextPage
  const nextPage = ()=>{
         if(currentPage!==npage)
          setCurrentPage(currentPage+1)
  }
  // previousPage
  const previousPage =()=>{
           if(currentPage!==1)
            setCurrentPage(currentPage-1)
  }
  // change page
  const changePage = (n)=>{
      setCurrentPage(n)
  }

  async function handleView(id) {
    // console.log(id);
    const { data } = await axios.get(`http://localhost:3000/faculties/${id}`);
    setFaculty(data?.record);
    // console.log(data?.record);
  }
  // handleDelete
  async function handleDelete(id) {
    //  console.log(id);
    await axios.delete(`http://localhost:3000/faculties/${id}`);
    getData();
  }

  async function getData() {
    try {
      const { data } = await axios.get(`http://localhost:3000/faculties`);
      // console.log(data);
      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between ">
              <h4>List of all faculties</h4>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  value={tableDark}
                  onChange={() =>
                    tableDark === "table-dark"
                      ? setTableDark("")
                      : setTableDark("table-dark")
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Dark Mode
                </label>
              </div>
            </div>
            {/* {JSON.stringify(records,null,4)} */}
            <div className="table-md-responsive">
              <table className={`table table-hover ${tableDark} `}>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Qualification</th>
                    <th scope="col">Batch</th>
                    <th scope="col">Branch</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    data.map((rec, i) => (
                      <tr key={i}>
                        <td>{rec?.record?.name.toUpperCase()}</td>
                        <td>{rec?.record?.email}</td>
                        <td>{rec?.record?.mobile}</td>
                        <td>{rec?.record?.subject}</td>
                        <td>{rec?.record?.qualification}</td>
                        <td>{rec?.record?.batch}</td>
                        <td>{rec?.record?.branch}</td>
                        <td>
                          <NavLink
                            className="btn btn-sm btn-success mx-2"
                            to={`/update-record/${rec?.id}`}
                          >
                            Edit
                          </NavLink>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              if (window.confirm("Are you sure to delete?")) {
                                handleDelete(rec?.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleView(rec?.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>No record found</tr>
                  )}
                </tbody>
              </table>
              {/* pagination */}
              <nav aria-label="...">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" onClick={previousPage}>Previous</a>
                  </li>

                  {numbers.map((n, i) => (
                    <li className="page-item" key={i}>
                      <a className={`page-link ${currentPage==n+1?"active":""}`} href="#"
                       onClick={()=>changePage(n+1)}>
                        {n+1}
                      </a>
                    </li>
                  ))}

                  <li className="page-item">
                    <a className={`page-link ${currentPage==npage ?'disabled':''}`} href="#" onClick={nextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Faculty Details
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <table className="table table-borderless">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{faculty?.name}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{faculty?.email}</td>
                        </tr>
                        <tr>
                          <th>Mobile</th>
                          <td>{faculty?.mobile}</td>
                        </tr>
                        <tr>
                          <th>Subject</th>
                          <td>{faculty?.subject}</td>
                        </tr>
                        <tr>
                          <th>Qualification</th>
                          <td>{faculty?.qualification}</td>
                        </tr>
                        <tr>
                          <th>Bacth</th>
                          <td>{faculty?.batch}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
