import { CloseButton } from "react-bootstrap";
const DeleteTodo = props => {
  const { id, removePost } = props;

  return (
    <CloseButton
      className="btn-close mx-5"
      onClick={() => removePost(id)}
    ></CloseButton>
  );
};

export default DeleteTodo;
