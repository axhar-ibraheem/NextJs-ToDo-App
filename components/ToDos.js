import { ListGroup, Form } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
const ToDos = (props) => {
  return (
    <ListGroup.Item className="py-3">
      <div className="d-flex">
        <div className="d-flex">
          <Form className="">
            <Form.Check type="checkbox" />
          </Form>
          <span className="ps-3">{props.title}</span>
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
