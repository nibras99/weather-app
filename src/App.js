import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { WiDaySunny ,WiCloud, WiFog, WiRain, WiTime2 } from 'weather-icons-react';
import TemperatureWeek from "./TemperatureWeek"
let API_KEY = "dc9b29dcd3355102d94376f65f853d51"
let URL = "https://api.openweathermap.org/data/2.5/"

let URL_VECKA = "https://api.openweathermap.org/data/2.5/"

let test = "https://api.openweathermap.org/data/2.5/weather?q=Sweden,Stockholm&APPID=dc9b29dcd3355102d94376f65f853d51"
let test1 = "https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen&units=metric&APPID=dc9b29dcd3355102d94376f65f853d51"


let dateBuilder = (d) =>{
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  let day = days[d.getDay()-1]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()
  
  return <>{day} {date} {month} {year}</>
}

let getDay = (id) =>{
  let d = new Date()
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  let day = days[d.getDay()-1+id]

  if(d.getDay()-1+id > 6){
  
  let sum =  d.getDay()-1+id - 7

day = days[sum]
  }

 

  return day
}


const App = () => {
  let [query, setQuery] = useState()
  let [weather, setWeather] = useState({})
  let [veckaWeather, setVeckaWeather] = useState([{}])
  let handlEvent = (e) =>{
  setQuery(e.target.value)

}

  let search = evt => {
    if(evt.key === "Enter" ){
      fetch(`${URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
      .then(res => res.json())
      .then(result => {setWeather(result)
      setQuery("")   
      }
      )
      fetch(`${URL}forecast?q=${query}&units=metric&APPID=${API_KEY}`)
      .then(res => res.json())
      .then(result => {setVeckaWeather(result)
      setQuery("")
      
      }
      )
    }
  }

  let nuDatum = (index) =>{

  let date = new Date()
let år = date.getFullYear()
let månad = ""
let dag = ""
if(date.getMonth() <10){
  månad = "0"+ (date.getMonth()+1)
}
else{
  månad = (date.getMonth()+1)
}

if(date.getDate()+index < 10){
  dag = "0" + date.getDate()+index
}
else{
  dag = date.getDate()+index
}
let p = år + "-" + månad + "-" + dag

let pg = p.toString()
return pg
}

  let dagensDatum = nuDatum(0)


let t = ""
let test = []
let test1 = []
let test2 = []
let test3 = []
let test4 = []
let test5 = []


let lista = veckaWeather.list



if(veckaWeather.cod != "404"){


  if(veckaWeather.length!=1){
    //VISA VEKTOR

    let testar = lista.map(elem => <TemperatureWeek txt = {elem.dt_txt} temp = {Math.round(elem.main.temp)} väder = {elem.weather[0].main}/>)
  let testar2 = lista.map(elem => elem.dt_txt )
  let b = testar2[0]
  
  
                               
  for(let i = 0; i < testar.length; i++){
    let str = testar2[i].substr(0,10)
  
    if(dagensDatum == str){
      test.push(testar[i])
    }
   else if(nuDatum(1) == str){
      test1.push(testar[i])
    }
    else if(nuDatum(2) == str){
      test2.push(testar[i])
    }
    else if(nuDatum(3) == str){
      test3.push(testar[i])
    }
    else if(nuDatum(4) == str){
      test4.push(testar[i])
    }
    else if(nuDatum(5) == str){
      test5.push(testar[i])
      }
    }

  }


}
  
let vecka5 = ""

if(test5.length > 0){
  vecka5 =   <span className = "todo-app">
  {test5}
  </span>
}

let dag1 = ""
if(test.length>0){
  dag1 = "Today"

  
}

let dag2 = "Tomorrow"
let dag3 = getDay(2)
let dag4 = getDay(3)
let dag5 = getDay(4)


let feelsLike = ""

if(typeof weather.main == "undefined"){
  t = ("")
}

else if(weather.weather[0].main =="Clouds"){

  t = <span style = {{color:"lightgrey"}}><WiCloud size = {100} > </WiCloud></span>
  feelsLike = Math.round(weather.main.feels_like) - 1

}
else if(weather.weather[0].main == "Haze"){
  
  t = <span style = {{color:"black"}}><WiFog size = {100}></WiFog></span>
  feelsLike = Math.round(weather.main.feels_like) - 2
}
else if(weather.weather[0].main == "Rain"){
  t = <span style = {{color:"black"}}><WiRain size = {100}></WiRain></span>
  feelsLike = Math.round(weather.main.feels_like) - 3
}
else if(weather.weather[0].main == "Clear"){
  t = <span style = {{color:"sun"}}><WiDaySunny size = {100}></WiDaySunny></span>
  feelsLike = Math.round(weather.main.feels_like) + 2
}
else if(weather.weather[0].main == "Mist"){
  t = <span style = {{color:"black"}}><WiFog size = {100}></WiFog></span>
  feelsLike = Math.round(weather.main.feels_like) - 1
}


let tid = (time) =>{
  let today = new Date()
let h = today.getHours()
let m = today.getMinutes()

if(h < 10){
  h = "0"+today.getHours()
}
if(m < 10){
  m = "0" + today.getMinutes()
}

time = h + ":" + m
  return time
}


let time = ""

  return (
    
    <div className = "app">
      
      <main>
        <div className = "search-box">
          <input type = "text" className = "search-bar" placeholder = "Enter a city..." onChange = {handlEvent} value = {query} onKeyPress = {search}/>
         
        </div>
        {(typeof weather.main != "undefined" && veckaWeather.cod != "404") ? (
    <div>
          <div className = "location-box">
        <div className = "location">{weather.name}, {weather.sys.country} </div>
        <div className = "date">{dateBuilder(new Date())}</div>
        <div className = "time" > <span style = {{color:"black"}}><WiTime2 size = {50} /> </span> {tid(time)}  </div>
        </div>
        <div className = "weather-box">
          <div className = "temp">
          {Math.round(weather.main.temp)}°C
          </div>
          <div>   </div>

          <div className = "temp1">
          {Math.round(weather.main.temp_min)}°C
          </div>

          <span className = "mellantemp">-</span>
          
          <div className = "temp2">
          {Math.round(weather.main.temp_max)}°C
          </div>
           
         <div className = "weather"> {weather.weather[0].main} {t} <span className = "weather1">Feels like {feelsLike}</span>  </div> 
         
     
         
        </div>

        <hr></hr>
      
      <h1 className = "text2">{dag1}</h1>
        <div className = "todo-app">
        {test}
        </div>
        
        <hr></hr>
        <h1 className = "text2">{dag2}</h1>
        <span className = "todo-app">
        {test1}
        </span>
        <hr></hr>
        <h1 className = "text2">{dag3}</h1>
        <span className = "todo-app">
        {test2}
        </span>
        <hr></hr>
        <h1 className = "text2">{dag4}</h1>
        <span className = "todo-app">
        {test3}
        </span>
        <hr></hr>
        <h1 className = "text2">{dag5}</h1>
        <span className = "todo-app">
        {test4}
        </span>
        <hr></hr>
      {vecka5}
          
      </div>

        ):(<div></div>)}    
 
      </main>
     
    </div>
  )
}

export default App


