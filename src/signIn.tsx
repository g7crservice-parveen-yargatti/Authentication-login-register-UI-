import React from 'react'
import { useState } from 'react'
import './signIn.css';
import { color } from '@mui/system';
import { axiosInstance } from './Axios.config';
import { saveToken } from './config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import validator from 'validator';
import { Alert, Snackbar } from '@mui/material';

function SignIn() {
   const[signIn,setSignIn]=useState("active")
   const[signUp,setSignUp]=useState("")
   const[overlay_c,setOverlay_c]=useState(100)
   const[overlay,setOverlay]=useState(-50)

   const[signinEmail,setSigninEmail]=useState("")
   const[signinPassword,setSigninPassword]=useState("")

   const[signupfullname,setSignupFullname]=useState("")
   const[signupEmail,setSignupEmail]=useState("")
   const[signupPassword,setSignupPassword]=useState("")
   const [errorState, setErrorState] = useState<string>('')
   const[SignUpAllError,setSignUpAllError]=useState("")
   const[SigninAllError,setSigninAllError]=useState("")


   
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const returnUrl = searchParams.get('returnUrl')
    const[emailError1,setEmailError1]=useState("")
    const[emailError2,setEmailError2]=useState("")
  
    const[nameError,setNameError]=useState("")
    const [signUpbtn,setSignUpbtn]=useState(true)

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const validateEmail = (value:any,e: any) => {
          let email = e.target.value
  
           if (validator.isEmail(email)) {
            if(value==1){
              setEmailError1('')
            }
            else if(value==2){
              setEmailError2('')
            }
              
           } else {
            if(value==1){
              setEmailError1('Peease enter valid input')
            }
            else if(value==2){
              setEmailError2('Peease enter valid input')
            }
           }
       }
       
       
      const validateName = (e: any) => {
          var name = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
  
          if (e.target.value.match(name)) {
              setNameError('')
          } else {
              setNameError('Enter valid Name!')
          }
      }
   
 const handleSignIn=()=>{
    setSignIn("active")
    setSignUp("")
    setOverlay_c(100)
    setOverlay(-50)
 }
 const handleSignUp=()=>{
    setSignIn("")
    setSignUp("active")
    setOverlay_c(0)
    setOverlay(0)
 }

const handleSignInEmail=(e:any)=>{
    setSigninEmail(e.target.value)
}

const handleSignInPassword=(e:any)=>{
    setSigninPassword(e.target.value)
}

const handleSignUpFullname=(e:any)=>{
    setSignupFullname(e.target.value)
}


const handleSignUpEmail=(e:any)=>{
    setSignupEmail(e.target.value)
}

const handleSignUpPassword=(e:any)=>{
    setSignupPassword(e.target.value)
}

const handleSubmitSignup=()=>{
  if(signupfullname!="" && signupEmail!=="" && signupPassword!=="" &&emailError2=="" &&nameError==""){
    
   
    let obj={
    fullname:signupfullname,
    username:signupEmail,
    password:signupPassword

  }

  const AxiosSignUpPost=axiosInstance.post(`register`,obj)
  AxiosSignUpPost.then((data)=>{
    console.log(data.data);
   if(data.data.statusCode==201){
    setSignIn("active")
    setSignUp("")
    setOverlay_c(100)
    setOverlay(-50)
    setSignUpAllError("")
    handleClick()
    setSignupFullname("")
    setSignupPassword("")
    setSignupEmail("")
  }
    else{
      setSignUpAllError("User Already exits")
    }
  })
  .catch((err)=>{
    console.log(err.message);
    
  })


}else{
  setSignUpAllError("Please Enter All Details")
}
}

 
const handleSubmitSignin=()=>{
  if(signinEmail!=="" && signinPassword!=="" &&emailError1=="" ){
    setSigninAllError("")
  let obj={
    username:signinEmail,
    password:signinPassword

  
  }


  const AxiosSignInPost=axiosInstance.post(`login`,obj)
  AxiosSignInPost.then((data)=>{
    if (data.data.data !== null) {
      const decodeJwt:any=JSON.parse(atob(data.data.data.split(".")[1]))
      console.log(decodeJwt.subject);
      sessionStorage.setItem("userName",`${decodeJwt.subject}`)
      saveToken(data.data.data)
      
      if (returnUrl) {        
          navigate(`/${returnUrl}`)
      } else
      
          navigate(`/${`pages/movies`}`)
  } else {
      setErrorState(data.data.message)
      setSigninAllError(data.data.message)
  }
    
  })
  .catch((err)=>{
    console.log(err.message);
    setSigninAllError(err.message)
    
  })
}else{
  setSigninAllError("Please Enter All Details")
}

}



  return (
    <>
    <section>
    <div className="container ">
      <div className={`form sign-in-form ${signIn}`}>
        <div className="wrapper">
          <form action="#">
            <h1>Sign in</h1>
            
            <p>use your email and password to sign in</p>
            <input type="email" value={signinEmail} onChange={(e:any)=>{handleSignInEmail(e)
             validateEmail(1,e)}} placeholder="Email"/>
            <div>
            <span className="errortext" style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}>{emailError1}</span>
                                            </div>
            <input type="password" value={signinPassword}  onChange={handleSignInPassword} placeholder="password"/>
            <div> <span className="errortext" style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}>{SigninAllError}</span>
                                            </div>
            <button onClick={handleSubmitSignin}>SIGN IN</button>
          </form>
        </div>
      </div>
      <div className={`form sign-up-form  ${signUp}`}>
        <div className="wrapper">
          <form action="#">
            <h1>Sign up</h1>
            <p>Please, provide all the correct info to create an account</p>
            <input type="text"  value={signupfullname} onChange={(e:any)=>{handleSignUpFullname(e)
            validateName(e)}}  placeholder="Full Name"/>
            <div>
            <span className="errortext" style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}>{nameError}</span>
                                            </div>
            <input type="email"  value={signupEmail} onChange={(e:any)=>{handleSignUpEmail(e)
            validateEmail(2,e)
            }}  placeholder="Email"/>
            <div>
            <span className="errortext" style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}>{emailError2}</span>
                                            </div>
            <input type="password"  value={signupPassword} onChange={handleSignUpPassword}  placeholder="password"/>
             <div> <span className="errortext" style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}>{SignUpAllError}</span>
                                            </div>
            <button onClick={handleSubmitSignup}>SIGN UP</button>
          </form>
        </div>
      </div>
      <div className="overlay-container" style={{transform : `translateX(${overlay_c}%)`}}>
        <div className="overlay" style={{transform :`translateX(${overlay}%)`}}>
          <div className="overlay-left">
            <h1>Welcome back !</h1>
            <p>To keep conected with us please login with your personal information</p>
            <button id="signInButton"  onClick={handleSignIn}>SIGN IN</button>
          </div>
          <div className="overlay-right">
            <h1>Hello Friend !</h1>
            <p>Enter your personal details and start journey with us</p>
            <button id="signUpButton"  onClick={handleSignUp}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={()=>{setOpen(false)}}>
        <Alert onClose={()=>{setOpen(false)}} severity="success" sx={{ width: '100%' }}>
          Successfully Registered
        </Alert>
      </Snackbar>
  </section>
  
  
  
   </>
     )
}

export default SignIn