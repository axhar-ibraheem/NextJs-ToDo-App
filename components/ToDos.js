import { ListGroup, Form } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";

const ToDos = (props) => {
  const [completed, setCompleted] = useState(props.completed);
  const { id } = props;
  const onCheckHandler = async () => {
    setCompleted(!completed);
    const response = await fetch("/api/new-todos", {
      method: "PUT",
      body: JSON.stringify({
        id: props.id,
        task: props.task,
        completed: !props.completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const onDeleteHandler = () => {
    props.deleteTask(id);
  };

  return (
    <ListGroup.Item className="py-3">
      <div className="d-flex">
        <div className="d-flex">
          <Form>
            <Form.Check
              onChange={onCheckHandler}
              checked={completed}
              type="checkbox"
            />
          </Form>
          <span className="ps-3">{props.task}</span>
        </div>
        <div className="ms-auto">
          <BsFillTrashFill
            style={{ cursor: "pointer" }}
            className="fs-4 text-primary"
            onClick={onDeleteHandler}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default ToDos;
