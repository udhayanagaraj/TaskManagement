import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const TaskDetail = () => {
  const BASE_URL = "http://localhost:8000"; // Update with your backend URL
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${id}/`);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  if (!task) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Task Detail</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title">{task.title}</h4>
          <p className="card-text">{task.desc}</p>
          <p className="card-text">Due Date: {task.due_date}</p>
          <div className="d-flex justify-content-center">
            <Link to={`/tasks/edit/${task.id}`} className="btn btn-primary me-2">
              Edit
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Task List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
