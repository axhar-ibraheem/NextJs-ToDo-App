import { Card, ListGroup } from "react-bootstrap";
import ToDos from "./ToDos";
const todos = [
  { title: "Complete assignment", completed: false },
  { title: "Go grocery shopping", completed: true },
  { title: "Attend meeting", completed: false },
  { title: "Exercise for 30 minutes", completed: false },
  { title: "Read a book", completed: true },
];
const TaskList = () => {
  return (
    <Card className="mt-3 shadow border-0">
      <div className="bg-primary bg-gradient py-2 rounded-top d-flex">
        <span className="ps-5 text-light fw-bold">Task</span>
        <span className="ms-auto pe-3 fw-bold text-light">Action</span>
      </div>
      <ListGroup variant="flush">
        {todos.map((todo) => (
          <ToDos
            key={Math.random()}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ListGroup>
    </Card>
  );
};

export default TaskList;
