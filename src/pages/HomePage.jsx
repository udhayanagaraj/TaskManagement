import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const BASE_URL = "http://localhost:8000"; // Update with your backend URL
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="text-center">Task Management Application</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <Link to="/tasks/add" className="btn btn-primary mb-3">
            Add New Task
          </Link>
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <Link to={`/tasks/${task.id}`} className="text-decoration-none">
                    <h4>{task.title}</h4>
                  </Link>
                  <p>{task.desc}</p>
                  <p>Due Date: {task.due_date}</p>
                </div>
                <div>
                  <Link to={`/tasks/edit/${task.id}`} className="btn btn-primary me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this task?")) {
                        handleDelete(task.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
