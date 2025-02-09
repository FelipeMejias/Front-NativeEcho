import styled, { keyframes } from "styled-components"
import { MyContext } from "./App.js"
import { useContext, useState } from "react"
import ytPlayer from './utils/ytPlayer.png'

export default function Part_Load(){
    const {data,error}=useContext(MyContext)
    return(
    <Container>
        {data.map((item,i) =>item.title?
            <Holder>
                <p>{item.message}</p>
                <Miniature>
                    <img src={item.imageUrl||ytPlayer}/>
                    <h4>{item.title}</h4>
                </Miniature>
            </Holder>:
            <p>{item.message}</p>
        )}
        {error?<p style={{color:'red'}}>{error}</p>:<></>}
    </Container>
    )
}
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container=styled.div`
flex-direction:column;align-items:center;
overflow:auto;
width:100%;height:calc(100% - 40px);
p{text-align:center;
margin:20px 0 0 0;font-size:20px;font-weight:500;
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 1.0s steps(20, end) forwards;

}
`
const Miniature=styled.div`
animation: ${fadeIn} 0.5s ease-out;
width:90%;max-width:550px;
height:160px;padding:30px;border-radius:10px;
margin:15px 0 0 0;
background:white;
h4{
margin:0px;font-size:18px;font-weight:400;
}
img{
height:100%;margin-right:20px;
}
`
const Holder=styled.div`
flex-direction:column;align-items:center;
`