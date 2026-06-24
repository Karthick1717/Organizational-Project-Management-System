const SubTask = require(
  "../models/SubTask"
);

const Task = require(
  "../models/Task"
);

const createSubTask = async (
  req,
  res
) => {
  try {
    const {
      task,
      title,
    } = req.body;

    
    const taskExists = await Task.findById(task);


    if (!taskExists) {
      return res.status(404).json({
        message:
          "Task Not Found",
      });
    }

    const subTask =
      await SubTask.create({
        task,
        title,
      });

    res.status(201).json(
      subTask
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getSubTasksByTask =
  async (req, res) => {
    try {
      const subTasks =
        await SubTask.find({
          task:
            req.params.taskId,
        });

      res.json(subTasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const updateSubTaskStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const subTask =
        await SubTask.findById(
          req.params.id
        );

      if (!subTask) {
        return res.status(404).json({
          message:
            "SubTask Not Found",
        });
      }

      subTask.status = status;

      await subTask.save();

      res.json(subTask);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  module.exports = {
  createSubTask,
  getSubTasksByTask,
  updateSubTaskStatus,
};