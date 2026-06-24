import { useEffect, useState } from "react";
import { getSummary } from "../services/dashboardServices";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

const Analytics = () => {
  const [summary, setSummary] =
    useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary =
    async () => {
      try {
        const data =
          await getSummary();

        setSummary(data);
      } catch (error) {
        console.log(error);
      }
    };

  if (!summary)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  const pieData = [
    {
      name: "Projects",
      value:
        summary.totalProjects,
    },
    {
      name: "Tasks",
      value:
        summary.totalTasks,
    },
    {
      name: "Members",
      value:
        summary.totalMembers,
    },
  ];

  const barData = [
    {
      name: "Projects",
      value:
        summary.totalProjects,
    },
    {
      name: "Tasks",
      value:
        summary.totalTasks,
    },
    {
      name: "Members",
      value:
        summary.totalMembers,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-slate-500">
            Total Projects
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              summary.totalProjects
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-slate-500">
            Total Tasks
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              summary.totalTasks
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-slate-500">
            Team Members
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {
              summary.totalMembers
            }
          </h1>
        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Resource Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
              >
                {pieData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={barData}
            >

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default Analytics;