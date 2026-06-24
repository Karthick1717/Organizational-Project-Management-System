import API from "../api/axios";

export const getTasks = async () => {
  const { data } = await API.get("/tasks");
  return data;
};

export const createTask = async (
  taskData
) => {
  const { data } = await API.post(
    "/tasks",
    taskData
  );

  return data;
};

export const updateTaskStatus =
  async (id, status) => {
    const { data } =
      await API.put(
        `/tasks/status/${id}`,
        { status }
      );

    return data;
  };