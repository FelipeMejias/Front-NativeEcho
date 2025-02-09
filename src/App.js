import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import Menu from'./Menu.js'
//localStorage.setItem('chave', JSON.stringify(var))
//JSON.parse(localStorage.getItem('chave'))
import { createContext } from 'react';
import Page_Watch from './Page_Watch.js';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router';
import Page_Form from './Page_Form.js';
export const MyContext = createContext();

export function App(){
    const [error,setError]=useState('')
    const [language,setLanguage]=useState(/*JSON.parse(localStorage.getItem('language'))||*/'en')
    const [atual, setAtual] = useState(-1)
    const [input, setInput] = useState('')
    const [embeded, setEmbeded] = useState(false)
    const [captions, setCaptions] = useState([])
    const timeoutsRef = useRef([])
    function cancelAllTimeOuts() {
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
    }
    function setAllTimeOuts() {
        captions.forEach((line, index) => {
            const timeOut=setTimeout(() => {setAtual(index)}, line.start * 1000)
            timeoutsRef.current.push(timeOut)
        })
    }
    function goTo(chosen){
        cancelAllTimeOuts()
        setAtual(chosen)
        const passed=captions[chosen].start
        captions.forEach((line, index) => {
            if(index>chosen){
                const timeOut=setTimeout(() => {setAtual(index)}, (line.start - passed) * 1000)
                timeoutsRef.current.push(timeOut)
            }
        })
    }

    const [data, setData] = useState([])

  
    
    const context={
      error,setError,
      language,setLanguage,
      setAllTimeOuts,goTo,
      atual,setAtual,
      data,setData,
      embeded,setEmbeded,
      captions,setCaptions,
      input,setInput
    }
    return(
<MyContext.Provider value={context}>
<BrowserRouter>
  
  <Container>
  <Menu/>
    <Routes>
        <Route path='/' element={<Page_Form/>}/>
        <Route path='/echoes/:id/:language' element={<Page_Watch/>}/>
    </Routes>
  </Container>
</BrowserRouter>
 </MyContext.Provider>
  )
}


const Container=styled.div`
flex-direction:column;
width:100vw;height:100vh;background:#898989;
align-items:center;justify-content:space-evenly;
`
/*
return(!language||language==-1?
  < Container>
    
    </Container>:

    captions && embeded ?
    <Container>
      <Part_Video />
      <Part_Caption />
    </Container>:
    <Container>
      <Part_Link  />
    </Container>
)
    */