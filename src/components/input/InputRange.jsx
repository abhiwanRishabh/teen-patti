import { useRef } from "react";

function InputRange({ value, onChange }) {
    const inputRangeRef = useRef();

    const handleChange = (e) => {
        const val = e.target.value;
        inputRangeRef.current.style.border = '2px solid #ffffff;'
        onChange(val);
    }

    return (
        <>
            <input
                ref={inputRangeRef}
                type="range"
                min={0.01}
                max={10}
                value={value}
                id="range1"
                step="0.01"
                className="range-input"
                onInput={handleChange}
            />
        </>
    );
}

export default InputRange;