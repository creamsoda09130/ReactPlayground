import './App.css';

function MyButton() {
  const img = {
    alt: 'Reactのロゴ',
    src: 'logo512.png',
  };
  return (
    <button className="button">
      <span className="text">これがボタン</span>
      <img
        className="img"
        src={img.src}
        alt={img.alt}
      />
    </button>
  );
}

function App() {
  const title = 'Welcome to My App';
  return (
    <div className="App">
      <h1 className="title">{title + '←ここまでが変数'}</h1>
      {/* TASK: ここにclassNameを付与することはできない、同じコンポーネントで違うクラスを付けたい時の書き方調査 */}
      <div className="contents">
        <MyButton></MyButton>
      </div>
    </div>
  );
}

export default App;
