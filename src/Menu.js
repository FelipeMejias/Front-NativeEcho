import styled, { keyframes } from "styled-components"
import { MyContext } from "./App.js"
import { useContext, useEffect, useState } from "react"
import { languageNames, languages } from "./utils/languages.js"
import { Navigate, useNavigate } from "react-router-dom"

export default function Menu(){
    const {language,setLanguage}=useContext(MyContext)
   const navigate=useNavigate()
    return(
    <Container>
        <h1 onClick={()=>navigate('/')}>Native Echo</h1>
        <Chose onClick={()=>setLanguage('')}>
            <h2>{languageNames[languages.indexOf(language)]}</h2>
            <h3 style={{color:'yellow'}}>Change language</h3>
        </Chose>
    </Container>
    )
}


const Container=styled.div`
background:#3a3a3a;height:70px;
align-items:center;justify-content:space-between;
width:100%;color:white;
h1{font-size:30px;font-weight:600;margin:0;width:250px;padding-left:20px;
cursor:pointer;
}
h2{font-size:20px;font-weight:600;margin:0;}
h3{font-size:15px;font-weight:600;margin:0;}
`
const Chose=styled.div`padding-right:20px;
height:70px;flex-direction:column;align-items:flex-end;
justify-content:space-evenly;
width:100%;cursor:pointer;
`
