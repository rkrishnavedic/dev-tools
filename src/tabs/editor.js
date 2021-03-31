import { useEffect, useState } from 'react';
import '../App.css'

function Editor(props){

    const [codeID, setCodeID] = useState('C++');

function languageHandler(event){
    //console.log(event.target.value)
    let idd = parseInt(event.target.value);
    if(codeID === idd) {
        //do nothing
        return;
    }
    setCodeID(idd)
}

function EditorPage(){
    if(codeID==="C"){
        //C
        return (
            <>
            <iframe title="C compiler" src="https://widgets.judge0.com?widgetId=ygkF&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }
    if(codeID==="JS"){
        //JS
        return (
            <>
            <iframe title="JS compiler" src="https://widgets.judge0.com?widgetId=a8o5&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }
    if(codeID==="python3"){
        //python3
        return (
            <>
            <iframe title="py compiler" src="https://widgets.judge0.com?widgetId=x3jg&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
            </>
        )
    }

    //c++
    return (
        <>
        <iframe title="C++ compiler" src="https://widgets.judge0.com?widgetId=McX4&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe>
        </>
    )
}

    return (
        <div style={{marginTop:"5rem"}} className="font-sans">
            <small className="m-2 text-gray-400"> /editor </small>
                <hr/>
            <div className="m-4 p-3 text-center shadow-md">
                <div className="text-2xl text-gray-500">
            Code Editor : Language
            &ensp; <div class="inline-flex">
  <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select onChange={languageHandler} class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
    <option id="0" >C++</option>
    <option id="1" >C</option>
    <option id="2" >JS</option>
    <option id="3" >python3</option>
  </select>
</div>
                </div>
            </div>

            <section style={{marginTop:"2rem"}} className="pl-7 pr-7">
                <EditorPage/>
            {/* <iframe src="https://widgets.judge0.com?widgetId=ygkF&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            {/* <iframe src="https://widgets.judge0.com?widgetId=McX4&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
             {/* <iframe src="https://widgets.judge0.com?widgetId=a8o5&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            {/* <iframe src="https://widgets.judge0.com?widgetId=x3jg&amp;theme=optional&amp;language=en" style={{width: "100%", height: "30em", border: "node"}}></iframe> */}
            </section>

        </div>
    )
}

export default Editor;