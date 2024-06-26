import { useState } from "react";
import Layout from "../layout/Layout";
import Menu from "./Menu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddRecord() {
    const navigate = useNavigate()
    const [record,setRecord] = useState({
        name:"", email:"", mobile:"",subject:"",batch:"",qualification:"",
        branch:""
    })
    const handleChange =(e)=>{
        setRecord({...record,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(record);
      const result = await axios.post(`http://localhost:3000/faculties`,{record})
      // console.log(result);
      if(result?.status==201)
        {
          toast.success("Record added successfully!",{autoClose:1000,position:"top-center"})
          setTimeout(()=>{
                navigate("/all-records")
          },2000)
        }
      
    }
  return (
    <Layout>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9">
            <form action="" className="w-75" onSubmit={handleSubmit}>
              <h3 className="text-center p-2 bg-secondary text-white">Add Faculty Info</h3>
              <div className="row">
                <div className="col-md-6 ">
                  {/* name */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingText"
                      placeholder="name"
                      name="name"
                      value={record.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingText">Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* email */}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="email"
                      name="email"
                      value={record.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* mobile */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingMobile"
                      placeholder="mobile"
                      name="mobile"
                      value={record.mobile}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingMobile">Mobile</label>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* subject */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingSubject"
                      placeholder="subject"
                      name="subject"
                      value={record.subject}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingSubject">Subject</label>
                  </div>
                </div>
              </div>

              {/* batch */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingBatch"
                  placeholder="batch"
                  name="batch"
                  value={record.batch}
                  onChange={handleChange}
                />
                <label htmlFor="floatingBatch">Batch</label>
              </div>

              {/* qualification */}
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                name="qualification"
                onChange={handleChange}
              >
                <option selected>Select Qualification</option>
                <option value="MCA">MCA</option>
                <option value="M.TECH">M.TECH</option>
                <option value="MSC">MSC</option>
              </select>

              {/* branch */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingBranch"
                  placeholder="branch"
                  name="branch"
                  value={record.branch}
                  onChange={handleChange}
                />
                <label htmlFor="floatingBranch">Branch</label>
              </div>
              <div>
                <button className="btn btn-primary">ADD RECORD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
