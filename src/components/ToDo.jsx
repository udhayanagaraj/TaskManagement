import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AddTask from './AddTask'
import TaskDetail from './TaskDetail'
import EditTask from './EditTask'
import HomePage from '../pages/HomePage'
import NotFound from './NotFound'

const ToDo = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/tasks/add" element={<AddTask/>} />
        <Route exact path="/tasks/edit/:id" element={<EditTask/>} />
        <Route exact path="/tasks/:id" element={<TaskDetail/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default ToDo