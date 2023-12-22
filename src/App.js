import * as React from "react";

import sunny from './icons/sunny.png';
import cloudy from './icons/cloudy.png';
import Partly from './icons/partlyCloudy.png';
import rain from './icons/rain.png';


export default function App() {
  const [text, setText] = React.useState("");
  const [weather, setWeather] = React.useState(null);
  const [cards, setCards] = React.useState(null);
  const [info, setInfo] = React.useState({ cor: "#fff" });

  const dataAtual = new Date();
  const numeroDiaSemana = dataAtual.getDay();
  const abreviacoesDiasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const abreviacaoDiaSemana = abreviacoesDiasDaSemana[numeroDiaSemana];
  console.log(`Hoje é ${abreviacaoDiaSemana}`);

  function obterInformacoes(clima) {
    let informacoes = {};

    switch (clima) {
      case "Clear":
        informacoes.descricao = "Limpo";
        informacoes.cor = "#42A0F0";
        informacoes.imagem = sunny;
        break;
      case "Sunny":
        informacoes.descricao = "Ensolarado";
        informacoes.cor = "#42A0F0";
        informacoes.imagem = sunny;
        break;
      case "rainy":
        informacoes.descricao = "Chuvoso";
        informacoes.cor = "#063164";
        informacoes.imagem = rain;
        break;
      case "Cloudy":
        informacoes.descricao = "Nublado";
        informacoes.cor = "#8091A5";
        informacoes.imagem = cloudy;
        break;
      case "Partly cloudy":
        informacoes.descricao = "Parcialmente nublado";
        informacoes.cor = "#C5CCD4";
        informacoes.imagem = Partly;
        break;
      default:
        informacoes.descricao = clima;
        informacoes.cor = "#fff";
        break;
    }

    return informacoes;
  }

  const getWeather = (text) => {
    console.log(text)
    setText(text);
    setWeather({});
    setTimeout(() => {
      fetch(`https://goweather.herokuapp.com/weather/${text}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeather(data);
          setCards(data.forecast);
          setInfo(obterInformacoes(data.description));
        });
    }, 1500);
  };


  const card = (item, index) => (
    <div style={{width:"30%", textAlign:"center",  maxWidth:"800px"}} className="glass" key={index}>
      <h1 style={{fontSize:28}}>Max {item?.temperature}</h1>
      <h2>Vento de {item?.wind}</h2>
      <h2>{abreviacoesDiasDaSemana[numeroDiaSemana+index+1 >6? numeroDiaSemana+index-6 :numeroDiaSemana+index+1 ]}</h2>
    </div>
  );
  return (
    <div className="backgroundImage" style={{color:"white", display:"flex", alignItems:'center', flexDirection:"column",  }}>
        <input className="glass"
          style={{ width: "50%",height:50, fontSize: 26, color: "white", textAlign:"center", maxWidth:"800px" }}
          onChange={(e) => getWeather(e.target.value)}
          placeholder="Digite o nome da cidade"
          
          />
        {weather && (
          <>
            <p style={{fontSize:34,  maxWidth:"800px", }}>Buscando o clima de {text}</p>
            <div className="glass" style={{width:"50%",  maxWidth:"800px"}}>
              <div style={{display :"flex" ,alignItems:"center", justifyContent:"space-evenly", marginTop:10}}>
                <div>
                  <h1 style={{ fontSize: 50, margin: 0 }}>{text}</h1>
                  <p style={{ fontSize: 70, margin:0 }}>{weather?.temperature?.[0]=="+"?weather?.temperature?.substring(1):weather?.temperature}</p>
                </div>
                <img
                  style={{ width: 150 }}
                  src={info?.imagem}
                  resizeMode="contain"
                  alt={"weather icon"}
                  />
              </div>
              <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <p style={{fontSize:35, marginTop:20}}>Clima {info?.descricao}</p>
                <p style={{fontSize:35, marginTop: 3, }}>Vento de {weather.wind}</p>
              </div>
            </div>
          </>
        )}
        <div
          style={{
            width:"50%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop:20,
            maxWidth:"800px"
          }}
          >
          {/* {console.log(weather?.forecast)} */}
          {cards && cards?.map((item, index) => card(item, index))}
        </div>
    </div>
  );
}
