import { useState } from 'react';

const CustomRangeInput = ({ min, max, step,handleChange,percentage,value }) => {


  return (
    <div className="range-container gradient-border -rotate-90 absolute lg:bottom-28 sm:bottom-24 -right-10 w-[88%] ">
      <input
        type="range"
        className='inputV-range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e)=>handleChange(e)}
        style={{
          background: `linear-gradient(90deg, rgba(1,56,87,1) 4%, rgba(31,166,186,1) ${percentage}%, rgba(36,1,46,1) ${percentage}%)`,
        }}
      />
    </div>
  );
};

export default CustomRangeInput;
