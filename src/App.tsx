import { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";

interface Itodo {
  id: number;
  text: string;
}
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [myState, setMyState] = useState<Itodo>();

  // const reducer = (state: Itodo[], action: ActionType) => {
  //   switch (action.type) {
  //     case "ADD":
  //       return [
  //         ...state,
  //         {
  //           id: state.length,
  //           text: action.text,
  //         },
  //       ];
  //     case "REMOVE":
  //       return state.filter(({ id }) => id !== action.id);
  //   }
  // };
  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);
  const [todos, dispatch] = useReducer((state: Itodo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);
  return (
    <div className="App">
      <input type="text" ref={newTodoRef} />
      <button onClick={onAddTodo}>Add</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
