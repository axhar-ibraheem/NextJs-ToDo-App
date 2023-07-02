import Head from "next/head";
import { Row, Col, Button } from "react-bootstrap";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { MongoClient } from "mongodb";
import { useState } from "react";
import { useRouter } from "next/router";
const HomePage = (props) => {
  const [tasks, setTasks] = useState([...props.todos]);
  const router = useRouter();
  const addTaskHandler = (taskItem) => {
    setTasks([...tasks, taskItem]);
  };

  const deleteTaskHandler = async (id) => {
    const response = await fetch(`/api/new-todos?id=${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTasks((prev) => prev.filter((task) => task.id !== id));
    console.log(data);
  };

  const onClickHandler = () => {
    router.push("/completed-tasks");
  };

  return (
    <>
      <Head>
        <title>To do App</title>
        <meta
          name="description"
          content="make your todos in easy and sophisticated way"
        />
      </Head>

      <main>
        <Row className="text-center mx-0 mt-3">
          <Col lg="6" className="mx-auto py-2 rounded-top-3">
            <h1 className="fs-4">Todo App</h1>
            <div className="">
              <AddTask addTask={addTaskHandler} />
            </div>
            <div>
              <div className="pt-2">
                <Button
                  onClick={onClickHandler}
                  variant="danger"
                  className="w-100"
                >
                  View Completed Tasks
                </Button>
              </div>
              <TaskList todos={tasks} deleteTask={deleteTaskHandler} />
            </div>
          </Col>
        </Row>
      </main>
    </>
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

export default HomePage;
