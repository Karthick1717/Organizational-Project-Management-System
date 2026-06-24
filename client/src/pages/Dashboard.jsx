import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Project Management System
          </h1>

          <p className="text-slate-500">
            Welcome Back 👋
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>

          <div>
            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-slate-500">
              Administrator
            </p>
          </div>
        </div>

      </div>

      {/* Content */}
      <div className="p-8">

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-500">
                  Projects
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  12
                </h2>
              </div>

              <FaProjectDiagram className="text-4xl text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-500">
                  Tasks
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  48
                </h2>
              </div>

              <FaTasks className="text-4xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-500">
                  Members
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  10
                </h2>
              </div>

              <FaUsers className="text-4xl text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-slate-500">
                  Progress
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  76%
                </h2>
              </div>

              <FaChartLine className="text-4xl text-pink-600" />
            </div>
          </div>

        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow mt-8 p-6">

          <h2 className="text-xl font-bold mb-4">
            Recent Projects
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Project
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Budget
                </th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-3">
                  E-Commerce Platform
                </td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </td>

                <td>
                  ₹60,000
                </td>
              </tr>

              <tr>
                <td className="py-3">
                  CRM System
                </td>

                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>

                <td>
                  ₹45,000
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;