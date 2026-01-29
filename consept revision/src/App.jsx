import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './redux/features/counterReducer';
import { change } from './redux/features/theme';

function App() {
  const dispatch=useDispatch()
  let num=useSelector(state=>state.counter.value)
  let theme=useSelector(state=>state.theme.value)
  return (
    <main>
      <h1>{num}</h1>
      <h2>{theme}</h2>
      
      <button
      onClick={()=>{
dispatch(increment())
      }}
      >increase</button>
      <button
      onClick={()=>{
        dispatch(decrement())
      }}
      >decrease</button>

      <button onClick={()=>{
        dispatch(change())
      }}>
        theme

      </button>
    </main>
  )
}

export default App
