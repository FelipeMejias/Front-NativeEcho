import styled, { keyframes } from "styled-components"
import { MyContext } from "./App.js"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getVideo, getVideoId } from "./utils/api.js"
import Part_Ask from "./Part_Ask.js"
import Part_Load from "./Part_Load.js"
import { languageNames, languages } from "./utils/languages.js"

const back_end_api = process.env.REACT_APP_BACK_END_API

export default function Page_Form(){
    const navigate=useNavigate()
    const {data,setData, setLanguage,error,setError,language,input}=useContext(MyContext)
    const [asking,setAsking]=useState(true)
    function askAi(){
        setAsking(false)
        const idVideoExtracted=getVideoId(input)
        console.log(idVideoExtracted)
        fetch(`${back_end_api}/video/${language}/${idVideoExtracted}`, { mode: "cors" })
            .then(response => {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                function read() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            return
                        }
                        const chunk = decoder.decode(value, { stream: true });
                        let parsedData = chunk.trim().split("\n").map(line => JSON.parse(line));
                        
                        if(parsedData.ytId){
                            return
                        }
                        setData(prev => [...prev, ...parsedData]);
                        return read();
                    });
                }
                return read();
            }).catch(error => {
                console.log("Error fetching route", error);
            })
      }
      useEffect(()=>{
        console.log(data)
        for(let obj of data){
          if(obj.ytId){
            navigate(`/echoes/${obj.ytId}/${language}`)
            setData([])
          }else if(obj.error){
            setAsking(true)
            setError(obj.error)
          }
        }
      },[data])
    return(
    <Container>
        {!language?<Choose>
          {languages.map((lan,i)=><But onClick={()=>setLanguage(lan)}>
            {languageNames[i]}
          </But>)}
        </Choose>:
        asking?<Part_Ask askAi={askAi} />:
        <Part_Load />}
    </Container>
    )
}
const But=styled.div`
cursor:pointer;
width:200px;height:55px;margin:20px 0 0px 0;
background:green;color:white;
border-radius:15px;
align-items:center;justify-content:center;
p{margin:0;}
`

const Container=styled.div`
flex-direction:column;align-items:center;
overflow:auto;
width:100%;height:calc(100% - 70px);
p{text-align:center;
margin:20px 0 0 0;font-size:20px;font-weight:500;
  overflow: hidden;
  white-space: nowrap;

}
`


const Choose=styled.div`
flex-direction:column;align-items:center;
overflow:auto;
width:100% ;height:calc(100% - 40px);
h1{
margin:20px;font-size:24px;
strong{color:green;}
}
`