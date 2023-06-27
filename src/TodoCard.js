import "./TodoCard.css";
import DeleteTodo from "./DeleteTodo";
import { useState } from "react";
import EditTodo from "./EditTodo";
import { Button } from "react-bootstrap";
const TodoCard = props => {
  const { object, onToggleComplete, removePost, onChangeEditTodo } = props;

  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className={
        object.complete ? "todo-card color-green" : "todo-card color-red"
      }
    >
      <input
        className="checkbox "
        type="checkbox"
        checked={object.complete}
        onChange={() => {
          onToggleComplete(object.id);
        }}
      />
      {!editMode ? (
        <p className="display-1"> {object.text}</p>
      ) : (
        <EditTodo
          text={object.text}
          onChangeEditTodo={text => {
            onChangeEditTodo(object.id, text);
            setEditMode(!editMode);
          }}
        />
      )}

      <DeleteTodo id={object.id} removePost={removePost} />

      {!editMode && <Button onClick={() => setEditMode(true)}>Edit</Button>}
    </div>
  );
};

export default TodoCard;
