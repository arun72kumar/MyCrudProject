import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateRecords() {
  const navigate = useNavigate()
  const [record,setRecord] = useState({
      name:"", email:"", mobile:"",subject:"",batch:"",qualification:"",
      branch:""
  })
  const [search,setSearch] = useState("")
   const {id}  = useParams();
   function getFacultyDetial(){
    try {
           axios.get(`http://localhost:3000/faculties/${id}`)
           .then((res)=>setRecord(res?.data?.record))
           .catch(err=>console.log(err))
    } catch (error) {
      console.log(error);
    }
   }
   useEffect(()=>{
       getFacultyDetial()
   },[])

  //  handleChange
  const handleChange = (e)=>{
    setRecord({...record,[e.target.name]:e.target.value})
  }
  // handleUpdate
  const handleUpdate = async(e)=>{
    e.preventDefault()
    try {
       await axios.put(`http://localhost:3000/faculties/${id}`,{record});
      //  console.log(res);
       toast.success("Record updated successfully!",{autoClose:1000,position:"top-center"});
       setTimeout(()=>{
          navigate("/all-records")
       },2000)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
    <div className="container-fluid my-3">
        <div className="row">
              <div className="col-md-3">
                 <Menu/>
              </div>
              <div className="col-md-9">
                 {/* {JSON.stringify(rec,null)} */}

                 <form action="" className="w-75" onSubmit={handleUpdate}>
              <h3 className="text-center p-2 bg-secondary text-white">Edit Faculty Info</h3>
              <div className="row">
                <div className="col-md-6 ">
                  {/* name */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingText"
                      placeholder="name" 
                      value={record?.name} 
                      name="name"
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
                      value={record?.email}
                      name="email"
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
                      value={record?.mobile}
                      name="mobile"
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
                      value={record?.subject}
                      name="subject"
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
                  value={record?.batch}
                  name="batch"
                  onChange={handleChange}
                 
                />
                <label htmlFor="floatingBatch">Batch</label>
              </div>

              {/* qualification */}
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                value={record?.qualification}
                onChange={handleChange}
                
              >
                <option>Select Qualification</option>
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
                 value={record?.branch}
                 name="branch"
                 onChange={handleChange}
                />
                <label htmlFor="floatingBranch">Branch</label>
              </div>
              <div>
                <button className="btn btn-success">UPDATE RECORD</button>
              </div>
            </form>
              </div>
        </div>
    </div>
</Layout>
  )
}
