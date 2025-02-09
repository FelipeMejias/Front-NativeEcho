import styled from "styled-components"
import { MyContext } from "./App.js";
import { useContext, useEffect, useRef } from "react";
import MovingEllipsis from "./utils/DotsMotion.js";
export default function Part_Ask({askAi}){
    const {input,setInput,setPag,language,error}=useContext(MyContext)
    const inputRef = useRef(null);
    const handlePaste = async () => {
        try {
          const pastedText = await navigator.clipboard.readText();
          setInput(pastedText);
        } catch (err) {
          console.error('Error acessing the transference area', err);
        }
      };
      const handleKeyDown = (event) => { if (event.key === "Enter") { askAi() }};
      useEffect(() => { inputRef.current?.focus();  }, []);
    return(
    <Container>
        {error?<h1 style={{color:'red'}}>Error {error}</h1>:<></>}
        <Holder><h1>{error?'Enter another Youtube link':'Enter your Youtube link'}</h1><MovingEllipsis/></Holder>
        <Enter>
            <input onKeyDown={handleKeyDown}   ref={inputRef}  value={input} placeholder="https://www.youtube..."
            onChange={(e)=>setInput(e.target.value)}/>
            <Paste onClick={handlePaste}><h3>Paste</h3></Paste>
        </Enter>
        {input?<Send onClick={askAi}><h3>Translate</h3></Send>:<></>}
    </Container>
    )
}
const Holder=styled.div`
align-items:center;

`
const Container=styled.div`
flex-direction:column;align-items:center;
overflow:auto;
width:100% ;height:calc(100% - 40px);
h1{
margin:20px;font-size:24px;
strong{color:green;}
}
input{

width:calc(100% - 120px);
margin:10px 0 10px 0;font-size:16px;
background:#494949;color:white;padding-left:10px;
border:0;border-radius:10px;height:60px;
}
`
const Paste=styled.div`
cursor:pointer;background:blue;color:white;
height:60px;width:100px;margin-left:10px;
border-radius:10px;
justify-content:center;align-items:center;
`
const Enter=styled.div`
max-width:1050px;
width:95%;
align-items:center;
`
const Send=styled.div`
cursor:pointer;background:green;color:white;
height:60px;width:176px;margin-top:30px;
border-radius:10px;
justify-content:center;align-items:center;
`