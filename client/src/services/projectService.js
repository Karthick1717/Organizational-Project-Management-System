import API from "../api/axios";

export const getProjects = async () => {
  const { data } = await API.get("/projects");
  return data;
};

export const createProject = async (
  projectData
) => {
  const { data } = await API.post(
    "/projects",
    projectData
  );

  return data;
};