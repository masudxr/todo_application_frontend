import FetchNestData from './components/fetchAllTodo';
// import PostAPIData from './components/postApi';

export default function App() {

  return (
    <div className="App">
      <h1>To Do list</h1>
      {/* <PostAPIData /> */}
      <FetchNestData />
    </div>
  );
}