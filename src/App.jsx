import { useState } from "react";

// custom hooks
import useLocalStorage from "./hooks/useLocalStorage";

// custom components
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>

      <CustomForm addTask={addTask} />
      {tasks && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
