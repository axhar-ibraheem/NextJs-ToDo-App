import { ListGroup } from "react-bootstrap";
import { MdOutlineFileDownloadDone } from "react-icons/md";
const CompletedTodos = (props) => {
  return (
    <ListGroup.Item className="py-3">
      <div className="d-flex">
        <span className="ps-3">{props.task}</span>
        <div className="ms-auto">
          <MdOutlineFileDownloadDone className="fs-4 text-primary" />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default CompletedTodos;
