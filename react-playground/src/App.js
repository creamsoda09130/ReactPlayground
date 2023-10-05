import './App.css';
import { useState } from 'react';

function Button(props) {
  const img = {
    alt: 'Reactのロゴ',
    src: 'logo512.png',
  };
  const buttonClass = 'button--' + props.buttonStyle;
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    alert('クリックされたよ！');
  }

  return (
    <button className={`button ${buttonClass}`} onClick={handleClick}>
      <div className="text">
        <p>数値が{props.type}だった場合に表示されるボタン</p>
        <p>押された回数 → {count}</p>
      </div>
      <img
        className="img"
        src={img.src}
        alt={img.alt}
      />
    </button>
  );
}

function OddButton() {
  return (
    <Button buttonStyle="red" type="奇数"></Button>
  );
}

function EvenButton() {
  return (
    <Button buttonStyle="blue" type="偶数"></Button>
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
