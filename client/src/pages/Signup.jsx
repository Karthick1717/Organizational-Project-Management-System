import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option>
              Employee
            </option>
            <option>
              Manager
            </option>
            <option>
              Admin
            </option>
          </select>

          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-xl"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?

          <Link
            to="/"
            className="text-indigo-600 ml-2"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;