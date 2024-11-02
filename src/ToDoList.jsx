import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  const [input, setInput] = useState([]);
  const [tasks, setTasks] = useState(storedTasks);

  function inputHandle(e) {
    setInput(e.target.value);
  }

  function addHandle() {
    if (input.trim() !== "") {
      setTasks((t) => [...t, input]);
      setInput("");
    }
  }

  function deleteHandle(index) {
    const del = tasks.filter((_, i) => i !== index);
    setTasks(del);
  }

  function upHandle(index) {
    if (index > 0) {
      const moveUp = [...tasks];
      [moveUp[index], moveUp[index - 1]] = [moveUp[index - 1], moveUp[index]];
      setTasks(moveUp);
    }
  }

  function downHandle(index) {
    if (index < tasks.length - 1) {
      const moveUp = [...tasks];
      [moveUp[index], moveUp[index + 1]] = [moveUp[index + 1], moveUp[index]];
      setTasks(moveUp);
    }
  }

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="flex flex-col pt-20 items-center w-full min-h-screen bg-gray-300">
        <h1 className="text-5xl font-bold mr-20">To-Do-List</h1>
        <div className="text-center mt-10">
          <input
            className="text-center py-2 px-20 rounded outline-none mb-5"
            id="input"
            onChange={inputHandle}
            type="text"
            value={input}
            placeholder="Enter a task"
            autoComplete="off"
          />
          <button
            onClick={addHandle}
            className="ml-3 w-20 h-10 font-semibold rounded bg-blue-500 hover:bg-blue-600"
          >
            Add
          </button>
          <div>
            <ol className="mr-16">
              {tasks.map((element, index) => (
                <li className="my-5" key={index}>
                  <button
                    onClick={() => upHandle(index)}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mr-3 text-white font-semibold"
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    onClick={() => downHandle(index)}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mr-3 text-white font-semibold"
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                  <span className="bg-green-400 px-32 py-2 rounded font-semibold">
                    {element}
                  </span>
                  <button
                    onClick={() => deleteHandle(index)}
                    className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded ml-3 text-white font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
