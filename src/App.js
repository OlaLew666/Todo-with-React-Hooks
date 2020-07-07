import React, {useState} from 'react';
import './App.css';

function AddToDo ({addTodo}){
  const [text, setText] = useState("");

  const submitTodo = (ev)=>{
    ev.preventDefault();

    if(text){
      addTodo(text);
      setText("");
    }else{
      alert('!');
    }
  }

  return(
    <form onSubmit={submitTodo}>
      <label>Add a todo</label>
      <div>
        <input
        className="todo-input"
        placeholder="type here"
        onChange={(ev)=>{
          setText(ev.target.value);
        }}
        value={text}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

function App() {

  const [todos, setTodo] = useState ([{
    text: 'Send letter',
    isDone: false
    },{
    text: 'Clean room',
    isDone: false
    },
  ]);

  const addTodo = (text)=>{
    setTodo([...todos, {text}]);
  }

  const toggleTodoStatus = (payload) => {
    const {status, index} = payload;
    const myNewTodos= [...todos];
    myNewTodos[index].isDone = status;
    setTodo(myNewTodos);
  }

  return (
    <div className="App">
      <h1>To Do</h1>

      <AddToDo addTodo={addTodo}/>

      {
        todos.map((todo, index) => {
          const { text, isDone} = todo;
          const btn = isDone ? "Undo" : "Done";

          return(
            <div key={index} className="todo-list">
              <span>{text}</span>
          <button onClick={()=>toggleTodoStatus({status:!isDone, index})}>{btn}</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
