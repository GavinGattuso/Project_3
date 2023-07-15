export default function LoginPage () {
    const [username, setUsername] = usestate('')
    const [password, setPassword] = useState('')
    return (
    <form className="login">
        <h1>Login</h1>
        <input type='text' 
        placeholder='username'/>
        <input type='password' placeholder='password'/>
        <button>Login</button>
    </form>
    )
}