import FetchNestData from './components/fetchAllTodo';
import PostAPIData from './components/postApi';

function App() {
  return (

    <div className="App">
      <h1>To Do list</h1>
        <PostAPIData />
        <FetchNestData />
    </div>
  );
}

export default App;