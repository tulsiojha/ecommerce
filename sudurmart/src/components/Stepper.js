import { useRef, useState } from "react";

export default function Stepper(props) {
    const {out, setOut, min, max} = props;

    const onIncreased=()=>{
        console.log(out);
        if (out <max) {
            setOut((prevState)=>{
                var tempValue = prevState;
                tempValue +=1;
                return tempValue;
            })
        }
    }

    const onDecreased=()=>{
        if (out>min) {
            setOut((prevState)=>{
                var tempValue = prevState;
                tempValue -=1;
                return tempValue;
            })
        }
    }
    return(
    <div class="btn-group flex flex-row items-center">
        <button class="btn btn-outline btn-sm font-bold" onClick={onIncreased}>+</button>
        <input type="number" defaultValue="1" class="text-center w-14 input border-black rounded-none input-sm ml-px mr-0.5" onChange={(e)=>setOut(e.target.value)} value={out}/>
        <button class="btn btn-outline btn-sm font-bold" onClick={onDecreased}>-</button>
    </div>
)
}