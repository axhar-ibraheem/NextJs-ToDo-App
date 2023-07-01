import { ListGroup, Form } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
const ToDos = (props) => {
  const onCheckHandler = async () => {
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

  return (
    <ListGroup.Item className="py-3">
      <div className="d-flex">
        <div className="d-flex">
          <Form className="">
            <Form.Check onChange={onCheckHandler} type="checkbox" />
          </Form>
          <span className="ps-3">{props.task}</span>
        </div>
        <div className="ms-auto">
          <BsFillTrashFill
            style={{ cursor: "pointer" }}
            className="fs-4 text-primary"
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default ToDos;
