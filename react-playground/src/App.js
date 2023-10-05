import './App.css';

function OddButton() {
  const img = {
    alt: 'Reactのロゴ',
    src: 'logo512.png',
  };
  return (
    <button className="button button--red">
      <span className="text">数値が奇数だった場合に表示されるボタン</span>
      <img
        className="img"
        src={img.src}
        alt={img.alt}
      />
    </button>
  );
}

function EvenButton() {
  const img = {
    alt: 'Reactのロゴ',
    src: 'logo512.png',
  };
  return (
    <button className="button button--blue">
      <span className="text">数値が偶数だった場合に表示されるボタン</span>
      <img
        className="img"
        src={img.src}
        alt={img.alt}
      />
    </button>
  );
}

function Message() {
  const message = 'というわけで奇数でした';
  return (
    <p>{message}</p>
  );
}

function PokemonList() {
  const pokemons = [
    {
      id: 957,
      name: 'カヌチャン',
      feature : '赤ちゃんみたいでかわいい',
    },
    {
      id: 958,
      name: 'ナカヌチャン',
      feature : 'ポニーテールがかわいい',
    },
    {
      id: 959,
      name: 'デカヌチャン',
      feature : '強くてかわいい',
    },
  ];
  const pokemonItems = pokemons.map((pokemon, index) => (
    <li key={index}>
      <p>図鑑番号: {pokemon.id}</p>
      <p>{pokemon.name}</p>
      <p>素敵なところ: {pokemon.feature}</p>
    </li>
  ));
  return (
    <ul>
      {pokemonItems}
    </ul>
  );
}

function App() {
  const title = 'Welcome to My App';
  const number = Math.floor(Math.random() * 100);
  let button;
  if (number % 2 === 1) {
    button = <OddButton />;
  } else {
    button = <EvenButton />;
  }
  return (
    <div className="App">
      <h1 className="title">{title + '←ここまでが変数'}</h1>
      {/* TASK: ここにclassNameを付与することはできない、同じコンポーネントで違うクラスを付けたい時の書き方調査 */}
      <div className="contents">
        <p>{number}</p>
        {button}
        {number % 2 === 1 && <Message />}
        <PokemonList></PokemonList>
      </div>
    </div>
  );
}

export default App;
