import { useState } from "react";
import ModalPage from "../UI/Modal";
import Snackbar from "../UI/Snackbar";
import TaskCard from "../common/TaskCard";
import Button from "../UI/Button";
import "./index.scss";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../common/environment";
import FormPage from "../UI/FormPage";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [deletingId, setDeletingId] = useState(0);
  const [updatingId, setupdatingId] = useState(0);
  const [showModalPage, setShowModalPage] = useState(false);
  const [showFormPage, setShowFormPage] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [severity, setSeverity] = useState();
  const [method, setMethod] = useState();

  //fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Fetch task error:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setShowFormPage(true);
  };

  const handleEdit = () => {
    setShowFormPage(true);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //create new task
    try {
      if (method === "create") {
        const response = await axios.post(`${API_URL}/tasks/create`, values);
        if (response.status >= 200 && response.status < 300) {
          setSnackbarMessage("New task added succesfully");
          setSeverity("success");
        } else {
          console.error("Create task error: ", response);
        }
      }

      // update task
      else if (method === "edit") {
        const response = await axios.put(
          `${API_URL}/tasks/${updatingId}`,
          values
        );
        if (response.status >= 200 && response.status < 300) {
          setSeverity("success");
          setSnackbarMessage("Task updated succesfully");
        } else {
          console.error("Create task error: ", response);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      resetForm();
      setShowFormPage(false);
      setShowSnackbar(true);
      fetchTasks();
    }
  };

  //Delete task
  const handleDelete = (id, title) => {
    setMessage(`Are you sure you want to delete the '${title}' task?`);
    setDeletingId(id);
    setShowModalPage(true);
  };

  const handleConfirmDelete = async () => {
    setShowModalPage(false);
    try {
      const response = await axios.delete(`${API_URL}/tasks/${deletingId}`);
      if (response.status === 200) {
        setSnackbarMessage(`task deleted successfully.`);
        setSeverity("success");
        await fetchTasks();
      }
    } catch (error) {
      console.error(error);

      setSnackbarMessage(`Failed to delete the task.`);
      setSeverity("error");
    } finally {
      setShowSnackbar(true);
    }
  };

  return (
    <div className="tasks-page">
      {/* UI ->Modal page, Form page, Snackbar */}
      <FormPage
        visibility={showFormPage}
        isShowFormPage={setShowFormPage}
        method={method}
        id={updatingId}
        onSubmit={handleSubmit}
        isShowSnackbar={setShowSnackbar}
      />
      <ModalPage
        onConfirm={handleConfirmDelete}
        id={deletingId}
        visibility={showModalPage}
        isShowModalPage={setShowModalPage}
        message={message}
      />
      <Snackbar
        message={snackbarMessage}
        severity={severity}
        visibility={showSnackbar}
        reset={() => setShowSnackbar(false)}
      />

      {/* Create button */}
      <Button
        className="tasks-page__button"
        label="Create"
        onClick={() => {
          setMethod("create");
          handleCreate();
        }}
      />
      {/* Task cards */}
      <div className="tasks-page__cards-container">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              status={task.status}
              description={task.description}
              date={task.date}
              setMethod={setMethod}
              onDelete={() => handleDelete(task.id, task.title)}
              onEdit={() => {
                setMethod("edit");
                handleEdit();
                setupdatingId(task.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TasksPage;
