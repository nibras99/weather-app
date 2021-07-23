import React from 'react'
import {FcCalendar} from "react-icons/fc"
import {WiDaySunny ,WiCloud, WiFog, WiRain, WiTime2} from "weather-icons-react"

const TemperatureWeek = ({txt, temp, väder, feels_like}) => {

txt = txt.substr(4,12)
txt = txt.substr(6)


    
let t = ""

 if(väder =="Clouds"){
  t = <span style = {{color:"lightgrey"}}><WiCloud size = {100}></WiCloud></span>

}
else if(väder == "Haze"){
  
  t = <WiFog size = {100}></WiFog>
 
}
else if(väder == "Rain"){
  t = <span style = {{color:"darkblue"}}><WiRain size = {100}></WiRain></span>

}
else if(väder == "Clear"){
  t = <span style = {{color:"yellow"}}><WiDaySunny size = {100}></WiDaySunny></span>

}
else if(väder == "Mist"){
  t = <WiFog size = {100}></WiFog>
 
}

    let str = txt.substr(0,10)
    let str1 = txt.substr(10)
 

    return (
        <div className = "text">
            
                <li>
                   
             <WiTime2/>
             {txt}
             <span className = "mellanrum"> </span>

             <span className = "mellanrum">
             <span className = "mellanrum"> </span>
             {t}
            {väder}
            </span>

             <span className = "mellanrum1">
             <span className = "mellanrum"> </span>
            {temp} °C
            </span>
            
            <hr></hr>
            </li>
           
        </div>
    )
}

export default TemperatureWeek
