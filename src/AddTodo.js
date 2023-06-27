import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddTodo = props => {
  const { onAddNewTodo } = props;
  const [taskTodo, setTaskTodo] = useState("");

  const inputTask = e => {
    setTaskTodo(e.target.value);
  };
  return (
    <Form>
      <Form.Control
        className="my-2"
        onChange={e => inputTask(e)}
        type="text"
        name="submit"
        value={taskTodo}
        placeholder="Add new Todo"
      />
      <Button
        className="my-2"
        onClick={e => {
          e.preventDefault();
          onAddNewTodo(taskTodo);
        }}
      >
        Add New
      </Button>
    </Form>
  );
};

export default AddTodo;
