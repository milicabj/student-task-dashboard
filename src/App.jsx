import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Prepare CI/CD presentation", completed: true },
    { id: 2, text: "Create GitHub Actions workflow", completed: false },
    { id: 3, text: "Deploy application", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container">
      <h1>Student Task Dashboard</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <p>
        Completed Tasks: {completedTasks} / {tasks.length}
      </p>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
