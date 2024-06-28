import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";


export const ToDo = () => {
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [editMessage, seteditMessage] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setitems] = useState([]);

  const BASE_URL = 'http://127.0.0.1:8000'

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/`);
      setitems(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInput = (e) => {
    setinputTitle(e.target.value);
  };

  const handleInputdesc = (e) => {
    setinputDesc(e.target.value);
  };
  
  const handleInputDueDate = (e) => {
    setDueDate(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Please fill in both title and description.");
      return;
    }
    
    
    
    const newTask = {
      title: inputTitle,
      desc: inputDesc,
      due_date: dueDate || null, // Ensure due_date is null if not provided
      status: true,
    };


      try {
        const response = await axios.post(`${BASE_URL}/tasks/`, newTask);
        setitems([response.data, ...items]);
        setinputTitle("");
        setinputDesc("");
        setDueDate("");
        setshowform(false);
      } catch (error) {
        console.error("Error creating task:", error);
      }
  };


  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Please fill in both title and description.");
      return;
    }

    const updatedTask = {
      title: inputTitle,
      desc: inputDesc,
      due_date: dueDate || null,
      status: true,
    };

    try {
      const response = await axios.put(`${BASE_URL}/tasks/${isEditItem}/`, updatedTask);
      setitems(
        items.map((item) =>
          item.id === isEditItem ? { ...item, ...updatedTask } : item
        )
      );
      setinputTitle("");
      setinputDesc("");
      setDueDate("");
      settoggleSubmit(true);
      setshowform(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}/`);
      setdeleteMessagesuccess(true);
      setTimeout(() => {
        setitems(items.filter((item) => item.id !== id));
        setdeleteMessagesuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (id) => {
    setisEditItem(id);
    const editedItem = items.find((item) => item.id === id);
    setinputTitle(editedItem.title);
    setinputDesc(editedItem.desc);
    setDueDate(editedItem.due_date || "");
    settoggleSubmit(false);
    setshowform(true);
  };

  const handleAdd = () => {
    setshowform(true);
    setshowList(true);
    setshowNew(false);
  };

  const handleCancle = () => {
    settoggleSubmit(true);
    setshowList(true);
    setshowDelete(true);
    setshowNew(true);
  }

  return (
    <>
      {showNew && (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary " onClick={handleAdd}>
              New
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <>
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="text-center">
                <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
              </div>
              <form className="col-12 p-2" onSubmit={toggleSubmit ? handleSubmit : handleSubmitEdit}>
                <label htmlFor="title" className="my-2">
                  Enter Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  className="w-100 my-1 p-2"
                  onChange={handleInput}
                  value={inputTitle}
                />
                <label className="my-2" htmlFor="description">
                  Enter Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="w-100 my-1 p-2"
                  onChange={handleInputdesc}
                  value={inputDesc}
                />
                <label htmlFor="dueDate" className="my-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="w-100 my-1 p-2"
                  onChange={handleInputDueDate}
                  value={dueDate}
                />
                {toggleSubmit ? (
                  <button className="btn btn-primary my-2">Save</button>
                ) : (
                    <div>
                        <button className="btn btn-primary my-2">Update</button>
                        <button className="btn btn-primary my-2" onClick={handleCancle}>Cancel</button>
                    </div>
                )}
              </form>
            </div>
          </div>
        </>
      )}

      {showList && (
        <div className="container py-2 ">
          {deleteMessagesuccess && (
            <p className="text-center text-danger">Item Deleted Successfully</p>
          )}
          {items.map((item) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-3 bg-white rounded  p-2"
                key={item.id}
              >
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <p> Due date: {item.due_date}</p>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    {showDelete && (
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this task?"
                            )
                          ) {
                            console.log(item.id);
                            handleDelete(item.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
