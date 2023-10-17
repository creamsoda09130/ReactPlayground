import './Api.css';
import { useEffect, useState } from 'react';
import Heading from './component/heading';

const API_KEY = '5a9599461b045d355aad543237d49d40';
const LAT = '35.658034';
const LON = '139.701636';

function Weather() {
  // ! useEffect内でそのまま変数に入れても値が更新されちゃうのでuseSateで押さえておくイメージ??
  const [state, setState] = useState({
    data: null,
    errorMessage: '',
    formattedDt: '',
    imageUrl: ''
  });

  const getErrorMessage = (error) => {
    switch (error.cod) {
      case '400':
        return '緯度か経度がミスってるかもです';
      case '401':
        return 'API Keyがミスってるんじゃない??きっと';
      default:
        return 'なんらかのエラーが発生しました' + error.message;
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&exclude=minutely,hourly&appid=${API_KEY}&lang=ja&units=metric`);
        if (response.ok) {
          // ! ここでもawaitかけてあげることでPendingのままjson化されることがない
          const data = await response.json();
          let formattedDt = '';
          if (data && data.dt) {
            // 現在時間をミリ秒から表示
            const dtMilliseconds = data.dt * 1000;
            const dtJapan = new Date(dtMilliseconds);
            formattedDt = `${(dtJapan.getMonth() + 1).toString().padStart(2, '0')}月${dtJapan.getDate().toString().padStart(2, '0')}日 ${dtJapan.getHours().toString().padStart(2, '0')}時${dtJapan.getMinutes().toString().padStart(2, '0')}分`;
          }
          const imageUrl = data && data.weather ? `https://openweathermap.org/img/w/${data.weather[0].icon}.png` : '';
          setState({ data, formattedDt, imageUrl, errorMessage: '' });
        } else {
          const error = await response.json();
          setState(prevState => ({ ...prevState, errorMessage: getErrorMessage(error) }));
        }
      } catch(error) {
        setState(prevState => ({ ...prevState, errorMessage: '天気の取得に失敗しました' + error }));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="api-section">
      {state.errorMessage && <p>{state.errorMessage}</p>}
  {state.data && state.data.weather && (
    <>
      <h2 className="api-section__title">【Open Weather API】{state.data.name}の天気</h2>
      <p className="weather-update-date">最終更新日時: {state.formattedDt}</p>
      <div className="weather-detail">
        <img className="weather-detail__icon" src={state.imageUrl} alt="天気のアイコン" />
        <p className="weather-detail__description">{state.data.weather[0].description}</p>
        <p className="weather-detail-content">
          <span className="weather-detail-content__text weather-detail-content__text--blue">最低気温: {state.data.main.temp_min}度</span>
          <span className="weather-detail-content__text weather-detail-content__text--red">最高気温: {state.data.main.temp_max}度</span>
        </p>
        <p className="weather-detail-content">※ 体感だと{state.data.main.temp}度くらいらしい！</p>
        <p className="weather-detail-content">湿度: {state.data.main.humidity}％</p>
      </div>
    </>
  )}
    </div>
  );
}

const pokemonId = Math.floor(Math.random() * 1017) + 1;

function Pokemon() {
  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const getErrorMessage = (error) => {
    switch (error.cod) {
      case '404':
        return 'idがミスってるかもです';
      case '401':
        return 'API Keyがミスってるんじゃない??きっと';
      default:
        return 'なんらかのエラーが発生しました' + error.message;
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        if (response.ok) {
          const rawData = await response.json();
          if (rawData && rawData.names) {
            const japaneseName = rawData.names.filter(name => name.language.name === 'ja-Hrkt')[0].name;
            const japaneseDescriptionArray = rawData.flavor_text_entries.filter(text => text.language.name === 'ja-Hrkt');
            const japaneseDescription = japaneseDescriptionArray[japaneseDescriptionArray.length - 1].flavor_text;
            const japaneseGenera = rawData.genera.filter(genus => genus.language.name === 'ja-Hrkt')[0].genus;
            const pokemon = {
              id: rawData.id,
              name: japaneseName,
              genera: japaneseGenera,
              description: japaneseDescription,
              evolution: rawData.evolution_chain,
            };
            setData(pokemon);
          }
        } else {
          const error = await response.json();
          setErrorMessage(getErrorMessage(error));
        }

        const imageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          const images = {
            default: imageData.sprites.front_default,
            shiny: imageData.sprites.front_shiny
          }
          setImages(images);
        } else {
          const error = await imageResponse.json();
          setErrorMessage(getErrorMessage(error));
        }
      } catch(error) {
        setErrorMessage('ポケモンの取得に失敗しました' + error);
      }
    };
    fetchData();
  }, []);

  // 必要なデータだけ持ってくる
  if (data && data.names) {
    const japaneseName = data.names.filter(name => name.language.name === 'ja-Hrkt')[0].name;
    const japaneseDescriptionArray = data.flavor_text_entries.filter(text => text.language.name === 'ja-Hrkt');
    const japaneseDescription = japaneseDescriptionArray[japaneseDescriptionArray.length - 1].flavor_text;
    const japaneseGenera = data.genera.filter(genus => genus.language.name === 'ja-Hrkt')[0].genus;
    const pokemon = {
      id: data.id,
      // 名前・種別は1個しかない前提&複数あっても1つ目だけ取れれば問題ないためこの取り方
      name: japaneseName,
      genera: japaneseGenera,
      // 複数ある場合は最新の説明合わせるので末尾の要素を見る
      description: japaneseDescription,
      evolution: data.evolution_chain,
    };
    setData(pokemon);
  }

  return (
    <div className="api-section">
      <h2 className="api-section__title">【Poke API】ポケモンたちの何か</h2>
      {data ? (
        <>
          <div className="pokemon-title">
            <p className="pokemon-title__detail">ポケモン番号: {data.id}</p>
            <p className="pokemon-title__detail">お名前: {data.name}</p>
          </div>
          {images && (
            <div className="pokemon-image">
              <div className="pokemon-image-content">
                <img src={images.default} alt={data.name + "の画像"} />
                <p>普段のすがた</p>
              </div>
              <div className="pokemon-image-content">
                <img src={images.shiny} alt={data.name + "の色違いの画像"} />
                <p>色違いのすがた</p>
              </div>
            </div>
          )}
          <p className="pokemon-text">{data.genera}</p>
          <p className="pokemon-text">{data.description}</p>
        </>
      ): (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

document.title = 'API接続テスト';

export default function Api() {
  return (
    <>
      <Heading text="API接続してみた" />
      <Weather />
      <Pokemon />
    </>
  );
}
