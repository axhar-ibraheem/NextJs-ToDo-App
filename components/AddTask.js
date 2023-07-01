import { Button, Collapse, Form } from "react-bootstrap";
import { useState, useRef } from "react";
const AddTask = (props) => {
  const [open, setOpen] = useState(false);
  const taskRef = useRef();

  const onTaskSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredTask = {
      task: taskRef.current.value,
      completed: false,
    };
    const response = await fetch("/api/new-todos", {
      method: "POST",
      body: JSON.stringify(enteredTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const task = {
      id: data.insertedId,
      ...enteredTask,
    };
    props.addTask(task);
    console.log(data);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="info"
        className="w-100 mb-3"
      >
        Add Task
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form onSubmit={onTaskSubmitHandler} className="d-flex">
            <Form.Group className="w-100 me-3" controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                className="border-2 border-dark"
                placeholder="Enter New Task"
                ref={taskRef}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="dark"
              className="align-self-end ms-auto px-5"
            >
              Add
            </Button>
          </Form>
        </div>
      </Collapse>
    </>
  );
};

export default AddTask;
