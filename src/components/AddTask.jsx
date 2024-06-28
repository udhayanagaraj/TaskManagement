import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const BASE_URL = "http://localhost:8000"; // Update with your backend URL
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/tasks/`, {
        title:title,
        desc : description,
        due_date: dueDate,
      });
      history("/");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow">
        <div className="card-body">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
