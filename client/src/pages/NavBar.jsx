import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  return (
    <div className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-indigo-600">
          PMS
        </h1>

        <div className="flex gap-5 items-center">

          <Link
            to="/dashboard"
            className="hover:text-indigo-600"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="hover:text-indigo-600"
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            className="hover:text-indigo-600"
          >
            Tasks
          </Link>

          <Link
            to="/members"
            className="hover:text-indigo-600"
          >
            Members
          </Link>

          <Link
            to="/analytics"
            className="hover:text-indigo-600"
          >
            Analytics
          </Link>

          <div className="text-sm">
            {user?.name}
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;