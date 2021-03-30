import React, { useState } from "react";

function FunTools(){
    const [text, setText] = useState("");
    function inputeOnChangeHandler(event){
        //console.log(text)
        setText(event.target.value)
        //console.log(event.target.value)
    }
    return (
        <div>
            funtools
            <input onChange={inputeOnChangeHandler} placeholder="type something">
                
            </input>
        </div>
    )
}

export default FunTools;