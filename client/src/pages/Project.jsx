import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
} from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      clientName: "",
      description: "",
      priority: "Medium",
    });

  const fetchProjects =
    async () => {
      try {
        const data =
          await getProjects();

        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchProjects();
  }, []);

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
      await createProject(
        formData
      );

      fetchProjects();

      setFormData({
        name: "",
        clientName: "",
        description: "",
        priority: "Medium",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Projects
      </h1>

      {/* Create Project */}

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Create Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
          />

          <select
            name="priority"
            value={
              formData.priority
            }
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option>
              Low
            </option>
            <option>
              Medium
            </option>
            <option>
              High
            </option>
          </select>

          <button
            className="bg-indigo-600 text-white rounded-xl p-3"
          >
            Create Project
          </button>

        </form>

      </div>

      {/* Projects Table */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Project List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Project
              </th>

              <th className="text-left py-3">
                Client
              </th>

              <th className="text-left py-3">
                Priority
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map(
              (project) => (
                <tr
                  key={
                    project._id
                  }
                  className="border-b"
                >
                  <td className="py-3">
                    {
                      project.name
                    }
                  </td>

                  <td>
                    {
                      project.clientName
                    }
                  </td>

                  <td>

                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">

                      {
                        project.priority
                      }

                    </span>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Projects;