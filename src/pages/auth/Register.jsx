import { useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validation
      if (!data.name)
        toast.error("Name is required!", {
          autoClose: 1000,
          position: "top-center",
        });
      else if (!data.email)
        toast.error("Email is required!", {
          autoClose: 1000,
          position: "top-center",
        });
      else if (!data.password)
        toast.error("Password is required!", {
          autoClose: 1000,
          position: "top-center",
        });
      else if (!data.cpassword)
        toast.error("Cpassword is required!", {
          autoClose: 1000,
          position: "top-center",
        });
      else if (
        data.password.length !== data.cpassword.length &&
        data.password !== data.cpassword
      )
        toast.error("password and cpassword must be same!", {
          autoClose: 1000,
          position: "top-center",
        });
      else if (!data.mobile || data.mobile.length !== 10)
        toast.error("Name is required!  Only 10 digits are allowed!", {
          autoClose: 1000,
          position: "top-center",
        });
      else {
        await axios.post(`http://localhost:3000/users`, data);
        toast.success("User registered successfully!", {
          autoClose: 1000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-3 mb-3">
            <form className="bg-light p-5" onSubmit={handleSubmit}>
              <h4 className="mb-3">Registration Form</h4>
              {/* name */}
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
              </div>
              {/* email */}
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                {/* password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {/* re-password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={data.cpassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                {/* mobile */}
                {/* name */}
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="mobile"
                      name="mobile"
                      value={data.mobile}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput">Mobile</label>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="mt-3">
                <button className="btn btn-primary w-100">REGISTER</button>
              </div>
              <p className="text-center mt-3">
                Already registered!
                <NavLink to="/login" className="ps-2">
                  Login Here
                </NavLink>
              </p>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
