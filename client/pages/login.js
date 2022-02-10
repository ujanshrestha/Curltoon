import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Card from 'react-bootstrap/Card';
import { UserContext } from "../context/UserContext";
const Login = () => {

  const history = useRouter();

  const { setUserFetched } = useContext(UserContext);

    

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const [rememberMe,setRememberMe] = useState(false);

  const [formSubmitted,setFormSubmitted] = useState(false);

  const PostData = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (data.errors) {
      window.alert("Login failed");
      setFormSubmitted(false);
    } else {
      window.alert("Login Successful");
      setUserFetched(false);
      history.push("/"); //for redirect action


    }
  };

  const handleFormSubmit = (e) => {
    setFormSubmitted(true);
    PostData(e);

  }

  return (
    <>
      <Head>
        <title>Login | Curltoon</title>
        <meta name="description" content="Curltoon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section style={{backgroundColor:'#E5E5E5',height:'100vh'}} className="w-100 d-flex justify-content-center align-items-center">
      <div className="d-flex w-50">

        <div className="w-50">
       
          <Card style={{height:'360px'}}>
              <Card.Body>
              <div className="p-2">

              <h5 className="text-bold mb-4"> CURLTOON </h5>

              <h6 className="text-center mb-4"> Sign In</h6>

              <span className="text-muted mb-4" style={{fontSize:'12px',margin:'auto'}}>
                  Need an account?{" "}
                  <span>
                    <Link class='nav-link' href='/register'>
                      Get started
                    </Link>
                  </span>
                </span>

              <form
                id='register-form'
                role='form'
                method='POST'
                className="mt-3"
              >

                <div className='input-group mb-3'>
                  <input
                    type='email'
                    className='form-control '
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    name='email'
                    id='email'
                  />
                </div>

                <div className='form-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    name='password'
                    id='password'
                    placeholder='Password'
                  />
                </div>

                <div>
                    <label style={{fontSize:'12px'}} className="me-3"> 
                        <input type="checkbox" 
                        value={rememberMe}
                        onChange={(e)=>setRememberMe(e.target.checked)} />
                        Remember me
                    </label>

                    <span style={{fontSize:'12px'}} className="ms-2">
                      Forgot password? 
                    </span>
                </div>


                <div className='form-group form-button text-center'>
                
                {!formSubmitted ? <input
                    type='submit'
                    className='btn btn-primary mb-2 w-100'
                    onClick={handleFormSubmit}
                    name='login'
                    id='login'
                    value='Sign in'
                  /> : <input
                  type='submit'
                  disabled
                  className='btn btn-primary mb-2 w-100'
                  onClick={handleFormSubmit}
                  name='login'
                  id='login'
                  value='Sign in'
                />}
                </div>


                <br />
                <br />

               
              </form>

              </div>
              </Card.Body>
          </Card>

        </div>


        <div className="w-50">
         <img src="/loginCover.png" className="w-100"></img>
        </div>

        </div>
            
      </section>
    </>
  );
};

export default Login;
