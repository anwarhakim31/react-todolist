import { useState } from "react";

// custom components
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import EditForm from "./components/EditForm";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.task", []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((prev) => prev.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((prev) => {
        return prev.id === id ? { ...prev, checked: !prev.checked } : prev;
      })
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((prev) => {
        return prev.id === task.id ? { ...prev, name: task.name } : prev;
      })
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };

  const enterEditMode = (tasks) => {
    setEditTask(tasks);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing && (
        <EditForm
          editTask={editTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
