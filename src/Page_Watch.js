import styled, { keyframes } from "styled-components"
import { MyContext } from "./App.js"
import { useContext, useEffect, useState } from "react"
import Part_Video from "./Part_Video.js"
import Part_Caption from "./Part_Caption.js"
import { useParams } from "react-router"
import { getVideo } from "./utils/api.js"

export default function Page_Watch(){
    const {id,language}=useParams()
    const { setEmbeded,setCaptions,}=useContext(MyContext)
    
    function getInfosWithAi(){
        const promise=getVideo(id,language)
        promise.then(res=>{
            const {captions:cc,embeded:emb}=res.data
            setEmbeded(emb)
            setCaptions(cc)
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data.message); 
            } else {
                console.log("Erro desconhecido:", error);
            }
        })
        
    } 
    useEffect(getInfosWithAi,[])    
    return(
    <Container>
        <Part_Video />
        <Part_Caption />
    </Container>
    )
}


const Container=styled.div`
align-items:center;
justify-content:space-evenly;
overflow:auto;
width:100%;width:100%;height:calc(100% - 70px);
p{text-align:center;
margin:20px 0 0 0;font-size:20px;font-weight:500;
  overflow: hidden;
  white-space: nowrap;

}
`


