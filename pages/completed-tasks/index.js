import { ListGroup } from "react-bootstrap";
import CompletedTodos from "@/components/CompletedTasks";
import { MongoClient } from "mongodb";
import { useState } from "react";
const CompletedTasks = (props) => {
  const completedTasks = props.todos.filter((task) => task.completed);
  const [tasks, setTasks] = useState([...completedTasks]);
  const content = (
    <div className="text-center pt-5">
      <h5>No completed Tasks!</h5>
    </div>
  );
  return (
    <div className="p-4">
      <div className="text-center pb-2 border-bottom">
        <h4 className="text-danger">Completed Tasks</h4>
      </div>
      {tasks.length > 0 ? (
        <ListGroup
          variant="flush"
          className="mx-auto shadow rounded-3 mt-3"
          style={{ maxWidth: "35rem" }}
        >
          {tasks.map((todo) => (
            <CompletedTodos
              key={todo.id}
              task={todo.task}
              completed={todo.completed}
              id={todo.id}
              deleteTask={props.deleteTask}
            />
          ))}
        </ListGroup>
      ) : (
        content
      )}
    </div>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://azharibraheem482:0o0lLf3TWEAukMqW@cluster0.qgbncx2.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find().toArray();
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        task: todo.task,
        completed: todo.completed,
      })),
    },
  };
}
export default CompletedTasks;
