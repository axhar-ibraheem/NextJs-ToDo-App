import { Card, ListGroup } from "react-bootstrap";
import ToDos from "./ToDos";

const TaskList = (props) => {
  console.log(props.todos);
  return (
    <Card className="mt-3 shadow border-0">
      <div className="bg-primary bg-gradient py-2 rounded-top d-flex">
        <span className="ps-5 text-light fw-bold">Task</span>
        <span className="ms-auto pe-3 fw-bold text-light">Action</span>
      </div>
      <ListGroup variant="flush">
        {props.todos.map((todo) => (
          <ToDos
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            id={todo.id}
            deleteTask={props.deleteTask}
          />
        ))}
      </ListGroup>
    </Card>
  );
};

export default TaskList;
