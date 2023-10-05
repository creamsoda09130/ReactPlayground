import './App.css';

function MyButton() {
  return (
    <button className="button">
      これがボタン
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="title">Welcome to My App</h1>
      {/* TASK: ここにclassNameを付与することはできない、同じコンポーネントで違うクラスを付けたい時の書き方調査 */}
      <div className="contents">
        <MyButton></MyButton>
      </div>
    </div>
  );
}

export default App;
