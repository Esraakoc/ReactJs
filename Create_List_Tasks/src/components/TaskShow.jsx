import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskShow({ list, onDelete, onUpdate }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const handleUpdateClick = () => {
    setShowUpdate(!showUpdate);
  };
  const handleDeleteClick = () => {
    onDelete(list.id);
  };
  const handleSubmit = (id, updatedTitle, updatedTaskDesc) => {
    setShowUpdate(false);
    onUpdate(id, updatedTitle, updatedTaskDesc);
  };
  console.log(list);
  return (
    <div className="taskShow">
      {showUpdate ? (
        <TaskCreate list={list} listformUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3 className="task-title">Göreviniz</h3>
          <p>{list.title}</p>
          <h3 className="task-title">Yapılacaklar</h3>
          <p>{list.taskDesc}</p>
          <div>
            <button className="task-delete" onClick={handleDeleteClick}>
              Sil
            </button>
            <button className="task-edit" onClick={handleUpdateClick}>
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;
