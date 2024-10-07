import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import wait from "../../utils/timer";
import { getFromSessionStorage } from "../../utils/storage";


// eslint-disable-next-line react/prop-types, no-unused-vars
const CircularProgressBar = ({ height, width, start = false, player ,packed }) => {
  let [percentage, setPercentage] = useState(0);
  const [degress, setDegree] = useState(0);

  const timerRef = useRef();
  
  // useEffect(() => {
  //   const timeStamp = +getFromSessionStorage('timeStamp');
  //   const currentTimeStamp = new Date().getTime();
  //   const currentTime = timeStamp - currentTimeStamp;
  //   const findalDegree = (currentTime / 50) * 0.33;
  //   const finalPercentage = 98 - findalDegree;
  //   console.log("currentTime", finalPercentage);
  //   setPercentage(finalPercentage);
  // },[]);
   
  useEffect(() => {
    if (player?.turn) {
       // Set interval to update the rotation
        const intervalId = setInterval(() => {
          // Update the current rotation
          console.log("percentage>>>>",degress,percentage)
          if(percentage >= 98) {
             packed();
             clearInterval(intervalId);
          } else {
            setPercentage(prev => prev + 0.33);
            setDegree(prev => prev + 1);
          }
      }, 30000);

      return () => {
        clearInterval(intervalId);
        // setPercentage(0);
      };
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degress, percentage, player?.turn]);

  return (
    <div className="lg:w-20 md:w-12 sm:w-12 absolute z-30">
      <CircularProgressbar
        value={percentage}
        strokeWidth={50}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor:
            percentage > 80
              ? `rgba(255,0,0,0.6)`
              : percentage > 60
              ? `rgba(220,160,0,0.6)`
              : `rgba(175,255, 0, 0.7)`,
          // textColor: "#f88",
          // trailColor: `rbga(175, 255, 0, 0.1)`,
          // backgroundColor: "",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
