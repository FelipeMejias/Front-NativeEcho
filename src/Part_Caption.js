import { useContext } from "react"
import styled from "styled-components"
import { MyContext } from "./App.js"
export default function Part_Caption(){
    const {captions,goTo,atual}=useContext(MyContext)
    return(
    <Container>
        {captions.map((line,i)=>{
            const {text,start,duration}=line
            return(
                <Line onClick={()=>goTo(i)}>
                {i==atual?<p><strong>{text}</strong></p>:<p>{text}</p>}
                </Line>
            )
        })}
    </Container>
    )
}
const Container=styled.div`
flex-direction:column;align-items:center;
overflow:auto;max-width:500px;
width:calc(100% - 800px);height:calc(100% - 40px);
p{
margin:10px;font-size:16px;
strong{color:green;}
}
`
const Line=styled.div`
cursor:pointer;
`