import { useState } from 'react';


const LoginPage = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
  
    const onSubmitClick = (e)=>{
      e.preventDefault()
      console.log("You pressed login")
      let opts = {
        'email': email,
        'password': password
      }
      console.log(opts)
      fetch('http://127.0.0.1:5000/login', {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(r => r.json())
        .then(token => {
          if (token.access_token){
            console.log(token)          
          }
          else {
            console.log("Please type in correct email/password")
          }
        })
    }
  
    const handleemailChange = (e) => {
      setemail(e.target.value)
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
  
    return (
      <div>
        <h2>Login</h2>
        <form action="#">
          <div>
            <input type="text" 
              placeholder="email" 
              onChange={handleemailChange}
              value={email} 
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button onClick={onSubmitClick} type="submit">
            Login Now
          </button>
        </form>
      </div>
    )
  };

export default LoginPage;
