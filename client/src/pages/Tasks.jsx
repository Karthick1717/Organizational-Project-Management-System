import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../services/taskServices";

const Tasks = () => {
  const [tasks, setTasks] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      estimatedHours: "",
    });

  const fetchTasks =
    async () => {
      try {
        const data =
          await getTasks();

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
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
      await createTask(
        formData
      );

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        estimatedHours: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus =
    async (id, status) => {
      try {
        await updateTaskStatus(
          id,
          status
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Tasks
      </h1>

      {/* Create Task */}

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Create Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="estimatedHours"
            placeholder="Hours"
            value={
              formData.estimatedHours
            }
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
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className="bg-indigo-600 text-white rounded-xl">
            Create Task
          </button>

        </form>

      </div>

      {/* Task Table */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Task List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">
              <th className="text-left py-3">
                Title
              </th>

              <th className="text-left py-3">
                Priority
              </th>

              <th className="text-left py-3">
                Hours
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-b"
              >

                <td className="py-3">
                  {task.title}
                </td>

                <td>
                  {task.priority}
                </td>

                <td>
                  {
                    task.estimatedHours
                  }
                </td>

                <td>

                  <select
                    value={
                      task.status
                    }
                    onChange={(e) =>
                      changeStatus(
                        task._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-2"
                  >
                    <option>
                      Not Started
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>

                    <option>
                      Blocked
                    </option>

                  </select>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Tasks;