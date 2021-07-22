import React from 'react'
import {FcCalendar} from "react-icons/fc"
import {WiDaySunny ,WiCloud, WiFog, WiRain, WiTime2} from "weather-icons-react"

const TemperatureWeek = ({txt, temp, väder}) => {


    
let t = ""


 if(väder =="Clouds"){

  t = <WiCloud size = {100} > </WiCloud>


}
else if(väder == "Haze"){
  
  t = <WiFog size = {100}></WiFog>
 
}
else if(väder == "Rain"){
  t = <WiRain size = {100}></WiRain>

}
else if(väder == "Clear"){
  t = <WiDaySunny size = {100}></WiDaySunny>

}
else if(väder == "Mist"){
  t = <WiFog size = {100}></WiFog>
 
}

    let str = txt.substr(0,10)
    let str1 = txt.substr(10)
 

    return (
        <div className = "text">
            
                <li>
                    
            <FcCalendar/>
            {str}

            <span className = "mellanrum">
        
            </span>
            
          <span className = "mellanrum1">
            
             <WiTime2/>
             {str1}
             
             </span>

             <span className = "mellanrum">
             {t}
            {väder}
            </span>

             <span className = "mellanrum1">
            {temp} °C
            </span>
            <hr></hr>
            </li>
           
        </div>
    )
}

export default TemperatureWeek
