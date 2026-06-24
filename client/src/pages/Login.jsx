import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 items-center justify-center p-12">

        <div className="text-white max-w-lg">
          <h1 className="text-6xl font-bold leading-tight">
            Project
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Manage projects, tasks,
            estimations, team members and
            analytics in one place.
          </p>
        </div>

      </div>

      <div className="flex-1 flex items-center justify-center bg-slate-100 px-6">

        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              AP
            </div>

            <h2 className="text-4xl font-bold text-slate-800 mt-4">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          <p className="text-center mt-6 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;