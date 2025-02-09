import { useContext, useState } from "react";
import styled from "styled-components";
import { MyContext } from "./App.js";
export default function Part_Video(){
    const {embeded,setAllTimeOuts}=useContext(MyContext)
    const [noneBut,setNoneBut]=useState(false)
    return(
        <Container>
        {noneBut?<></>:<Button onClick={() => {
            setNoneBut(true)
            setTimeout(setAllTimeOuts, 1000);
        }}>Play</Button>}
        <iframe
            width="700"
            height="394"
            src={`https://www.youtube.com/embed/${embeded}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    </Container>
    )
}
const Button=styled.div`
position:absolute;top:10px;right:0;
width:100px;height:40px;background:green;color:white;
align-items:center;justify-content:center;
border-radius:50px;cursor:pointer;
`
const Container=styled.div`
position:relative;
flex-direction:column;justify-content:space-evenly;
align-items:center;
width:700px;height:calc(100% - 40px);
`