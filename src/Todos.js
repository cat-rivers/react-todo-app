import { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import uuid4 from "uuid4";
import { Container, Form, Row, Col } from "react-bootstrap";
import {
  getAllPosts,
  editPost,
  deletePost,
  createPost,
} from "./services/postActions";

// given a filter string
// return a function that can be used with array.filter

const makeTodoFilterFunction = filter => todo =>
  todo.text.toLowerCase().includes(filter.toLowerCase());

const TodoList = ({ todos, toggleComplete, removePost, editTodoText }) =>
  todos.map(todo => (
    <TodoCard
      key={todo.id}
      object={todo}
      onToggleComplete={toggleComplete}
      removePost={removePost}
      onChangeEditTodo={editTodoText}
    />
  ));

//Main TODO  component
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");

  //Fetch the objects
  useEffect(() => {
    console.log("fetching data!");

    getAllPosts().then(posts => {
      setTodos(posts);
    });
  }, []);

  // Edit the todo post text UI and DB
  const updatePostText = (id, newText) => {
    const todo = todos.find(post => post.id === id);
    const changedPost = { ...todo, text: newText };

    editPost(changedPost, id).then(changedPost => {
      setTodos(todos.map(post => (post.id === id ? changedPost : post)));
    });
  };

  // Toggle complete UI and DB
  const toggleComplete = id => {
    const todo = todos.find(post => post.id === id);
    const changedPost = { ...todo, complete: !todo.complete };

    editPost(changedPost, id).then(changedPost => {
      setTodos(todos.map(post => (post.id === id ? changedPost : post)));
    });
  };

  // Delete todo post from UI and DB
  const removePost = id => {
    deletePost(id)
      .then(() => {
        setTodos(todos.filter(post => post.id !== id));
      })
      .catch(() => {
        console.log("failed! °w°");
      });
  };

  // Create new todo post UI and DB
  const createNewTodoPost = task => {
    createPost({
      id: uuid4(),
      text: task,
      complete: false,
    }).then(newPost => {
      setTodos([newPost, ...todos]);
    });
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 text-center text-primary">
          <h1> Todo App</h1>
        </Col>
      </Row>

      <Row className="mx-2">
        <Col className="col-4 ">
          <Form>
            <Form.Control
              className="my-2"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Filter"
            />
          </Form>
        </Col>
      </Row>

      <Row className="mx-2">
        <Col className="col-4">
          <AddTodo onAddNewTodo={createNewTodoPost} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoList
            todos={todos.filter(makeTodoFilterFunction(filter))}
            toggleComplete={toggleComplete}
            removePost={removePost}
            editTodoText={updatePostText}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Todos;
