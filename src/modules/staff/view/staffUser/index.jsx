import React from 'react'
import { useParams } from 'react-router-dom';

const StaffUserView = () => {
    let params = useParams();
    console.log(params); 
  return (
    
    <h1>StaffUserView</h1>
    
  )
}

export default StaffUserView;