import { useState, useEffect } from "react";

import styles from "./TaskItem.module.css";
// library imports
import { PencilIcon } from "@heroicons/react/24/solid";

const EditForm = ({ editTask, updateTask, closeEditMode }) => {
  const [updateTaskName, setUpdateTaskName] = useState(editTask.name);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...editTask, name: updateTaskName });
  };

  useEffect(() => {
    const closeModalIfEscape = (e) => {
      e.key === "Escape" && closeEditMode();
    };

    window.addEventListener("keydown", closeModalIfEscape);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscape);
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updateTaskName}
            onInput={(e) => setUpdateTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Edit Task"
          />
          <label htmlFor="editTask" className="label">
            Edit Task
          </label>
        </div>
        <button className="btn" aria-label="Edit Task" type="submit">
          <PencilIcon />
        </button>
      </form>
    </div>
  );
};
export default EditForm;
