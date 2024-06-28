import React from "react";

export const ToDo = () => {
  return (
    <>
      <h2>Todo component</h2>
      <div className="container">
        <div className="col-12 text-end">
          <button className="btn btn-primary " onClick={handleAdd}>
            Add New Task
          </button>
        </div>
      </div>
      <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="text-center">
            <h2></h2>
          </div>
          <form className="col-12 p-2">
            <label htmlFor="title" className="my-2">
              Enter Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className="w-100 my-1 p-2"
            />
            <label className="my-2" htmlFor="description">
              Enter
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-100 my-1 p-2"
            />
            <button className="btn btn-primary my-2">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};
