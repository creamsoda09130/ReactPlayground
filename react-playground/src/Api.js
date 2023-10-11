import './Api.css';
import { useEffect, useState } from 'react';
import Heading from './component/heading';

document.title = 'API接続テスト';
export default function Api() {
  // ! useEffect内でそのまま変数に入れても値が更新されちゃうのでuseSateで押さえておくイメージ??
  let [data, setData] = useState(null);
  let [errorMessage, setErrorMessage] = useState('');
  const API_KEY = '5a9599461b045d355aad543237d49d40';
  const LAT = '35.658034';
  const LON = '139.701636';
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&exclude=minutely,hourly&appid=${API_KEY}&lang=ja&units=metric`);
        if (response.ok) {
          // ! ここでもawaitかけてあげることでPendingのままjson化されることがない
          const data = await response.json();
          setData(data);
        } else {
          const error = await response.json();
          if (error.cod === '400') {
            setErrorMessage('緯度か経度がミスってるかもです');
          } else if (error.cod === '401') {
            setErrorMessage('API Keyがミスってるんじゃない??きっと');
          } else {
            setErrorMessage('なんらかのエラーが発生しました' + error.message);
          }
        }
      } catch(error) {
        setErrorMessage('天気の取得に失敗しました' + error);
      }
    };
    fetchData();
  }, []);

  let formattedDt;
  let imageUrl;
  // 現在時間をミリ秒から表示
  if (data && data.dt) {
    const dt = data.dt;
    const dtMilliseconds = dt * 1000;
    const dtJapan = new Date(dtMilliseconds);
    // フォーマットして出力
    formattedDt = `${(dtJapan.getMonth() + 1).toString().padStart(2, '0')}月${dtJapan.getDate().toString().padStart(2, '0')}日 ${dtJapan.getHours().toString().padStart(2, '0')}時${dtJapan.getMinutes().toString().padStart(2, '0')}分`;
  }
  imageUrl = data && data.weather && `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  return (
    <>
      <Heading text="API接続してみた" />
      {errorMessage && <p>{errorMessage}</p>}
    {data && data.weather && (
      <div className="api-section">
        <h2 className="weather-title">{data.name}の天気</h2>
        <p className="weather-update-date">最終更新日時: {formattedDt}</p>
        <div className="weather-detail">
          <img className="weather-detail__icon" src={imageUrl} alt="天気のアイコン" />
          <p className="weather-detail__description">{data.weather[0].description}</p>
          <p className="weather-detail-content">
            <span className="weather-detail-content__text weather-detail-content__text--blue">最低気温: {data.main.temp_min}度</span>
            <span className="weather-detail-content__text weather-detail-content__text--red">最高気温: {data.main.temp_max}度</span>
          </p>
          <p className="weather-detail-content">※ 体感だと{data.main.temp}度くらいらしい！</p>
          <p className="weather-detail-content">湿度: {data.main.humidity}％</p>
        </div>
      </div>
    )}
    </>
  );
}


