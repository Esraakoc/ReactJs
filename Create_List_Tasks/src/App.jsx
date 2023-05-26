import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const createTask = async (title, taskDesc) => {
    const response = await axios.post('http://localhost:3000/lists', {
      title,
      taskDesc,
    });
    console.log(response);
    const createdList = [...lists, response.data];
    setLists(createdList);
  };
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3000/lists');
    setLists(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/lists/${id}`);
    const afterDeletingTask = lists.filter((list) => {
      return list.id !== id;
    });
    setLists(afterDeletingTask);
  };
  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3000/lists/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = lists.map((list) => {
      if (list.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return list;
    });
    setLists(updatedTasks);
  };
  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList
        lists={lists}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
