import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading]=useState(false)
  const [tours,setTours]=useState([])

  const removeId=(id)=>{
    const newTours=tours.filter((tour)=>tour.id!==id)
    setTours(newTours)
  }
  const refreshTours=()=>{
    setTours(tours)
  }
  const fetchTours=async()=>{
    setLoading(true)
    try {
      const response =await fetch(url);
      const tours=await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
   

    
  }
  useEffect(()=>{
    fetchTours();
  },[])
  if(loading){
    return(
      <main>
        <Loading/>
      </main>
    );

  }
  if(tours.length===0){
    return <button className="btn" onClick={()=>fetchTours()}> Refresh Tours</button>
  }
  return(<main>
    <Tours tours={tours} removeTour={removeId}/>
   
  </main>)

}

export default App
