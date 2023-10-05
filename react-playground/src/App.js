import './App.css';

function MyButton() {
  return (
    <button>
      これがボタン
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <h1>Welcome to My App</h1>
        <MyButton></MyButton>
      </div>
    </div>
  );
}

export default App;
