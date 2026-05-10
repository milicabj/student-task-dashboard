import { useEffect, useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Prepare CI/CD presentation",
    category: "Presentation",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Create GitHub Actions workflow",
    category: "DevOps",
    priority: "High",
    completed: false,
  },
  {
    id: 3,
    title: "Write project documentation",
    category: "Documentation",
    priority: "Medium",
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("student-dashboard-tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DevOps");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("student-dashboard-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title,
      category,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setCategory("DevOps");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Active") return !task.completed;
    return true;
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <main className="app">
      <section className="dashboard">
        <div className="header">
          <div>
            <p className="label">CI/CD Demo Project</p>
            <h1>Student Task Dashboard</h1>
            <p className="subtitle">
              React application with tests, local storage and GitHub Actions CI.
            </p>
          </div>

          <div className="status-card">
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
          <div className="stat-card">
            <span>Active</span>
            <strong>{activeTasks}</strong>
          </div>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <section className="form-card">
          <h2>Add new task</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>DevOps</option>
              <option>Testing</option>
              <option>Presentation</option>
              <option>Documentation</option>
            </select>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button onClick={addTask}>Add Task</button>
          </div>
        </section>

        <div className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active-filter" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${task.completed ? "completed-card" : ""}`}
              >
                <div>
                  <h3
                    onClick={() => toggleTask(task.id)}
                    className={task.completed ? "completed" : ""}
                  >
                    {task.title}
                  </h3>

                  <div className="badges">
                    <span>{task.category}</span>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default App;