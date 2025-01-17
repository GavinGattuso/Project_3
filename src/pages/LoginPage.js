import {useState} from 'react' 
import { Await, Navigate } from 'react-router-dom'


export default function LoginPage () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false) //default is false
    async function login(ev){
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password }),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', //includes cookie
        })
        if (response.ok){
            setRedirect(true)
        } else {
            alert('Wrong Username or Password')
        }
    }
    // form for login

    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type='text' 
        placeholder='username' 
        value ={username}
        onChange={ev => setUsername(ev.target.value)}/>
      <input type='password' 
        placeholder='password'
        value={password}
        onChange={ev => setPassword(ev.target.value)}/>
      <button>Login</button>
    </form>
    )
}