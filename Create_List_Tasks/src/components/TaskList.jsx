import TaskShow from "./TaskShow";

function TaskList({ lists, onDelete, onUpdate }) {
  return (
    <div className="task-list">
      {lists.map((list, index) => {
        return (
          <TaskShow
            key={index}
            list={list}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
