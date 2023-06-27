import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const EditTodo = props => {
  const { onChangeEditTodo, text } = props;
  const [value, setValue] = useState(text);
  return (
    <>
      <Form>
        <Form.Control
          onChange={e => setValue(e.target.value)}
          placeholder="change todo text"
        ></Form.Control>
        <Button
          className="m-2"
          onClick={e => {
            e.preventDefault();
            onChangeEditTodo(value);
          }}
        >
          Save
        </Button>
      </Form>
    </>
  );
};

export default EditTodo;
