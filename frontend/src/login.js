import React, { useState } from 'react'

const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  const submit = async () => {
    const a = { username, password }

    try {
      const result = await fetch("http://localhost:9000/login", {
        method: "post",
        body: JSON.stringify(a),
        headers: {
          "Content-Type": "application/json"   
        }
      })

      const res = await result.json()

      if (res.statuscode == 1) {
        alert("data send")
      } else {
        console.log("not send")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '1.5rem'
        }}>Login</h2>
        
        <input 
          type='text' 
          placeholder='Enter username' 
          onChange={(e)=>setusername(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        
        <input 
          type='password' 
          placeholder='Enter password' 
          onChange={(e)=>setpassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />

        <button 
          onClick={submit}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Login