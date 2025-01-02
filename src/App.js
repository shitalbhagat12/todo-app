import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import EmailModal from "./components/EmailModal";
import Fireworks from "./components/Fireworks";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showCrackers, setShowCrackers] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, updatedText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText } : task
      )
    );
  };

  const addTaskWithEmailMessage = (email) => {
    const emailTask = {
      text: `You have a meeting with ${email}`,
      id: Date.now(),
      completed: false,
    };
    addTask(emailTask);
  };

  const getFilteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowCrackers(true);
    } else {
      setShowCrackers(false);
    }
  }, [tasks]);

  return (
    <div className="wrapper">
      <h1>To-Do App</h1>
      <div className="container">
        <AddTask addTask={addTask} />
        <div className="email">
          <button className="btn" onClick={() => setEmailModalOpen(true)}>
            Set Meeting
          </button>
          {isEmailModalOpen && (
            <EmailModal
              closeModal={() => setEmailModalOpen(false)}
              addTaskWithEmailMessage={addTaskWithEmailMessage}
            />
          )}
        </div>
        <div className="filters">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All Task
          </button>
          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed Task
          </button>
          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending Task
          </button>
        </div>
        <div className="task-container">
          <div className="task-list-scrollable">
            <TaskList
              tasks={getFilteredTasks()}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        </div>
        {showCrackers && <Fireworks />}
      </div>
    </div>
  );
}

export default App;