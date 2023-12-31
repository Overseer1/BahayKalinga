import { Half2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time - minutes * 60);
    if (minutes <= 10) minutes = '0' + minutes;
    if (seconds <= 10) seconds = '0' + seconds;
    return minutes + ":" + seconds;
}
export default function useCountdown({seconds})
{
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();
    useEffect(() => {
        timerId.current = setInterval(() =>
        {
            setCountdown(prev => prev - 1)
        }, 1000)    
    
      return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
      if (countdown <= 0){
        clearInterval(timerId.current)
        alert("OTP expired")
      }
    }, [countdown])
    
    return(
        <p>{countdown}</p>
    )

}