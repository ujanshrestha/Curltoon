import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Head from "next/head";


const Register = () => {
  
  const history = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    cardNumber: "",
  });

  const [accountType,setAccountType] = useState("");
  const [formSubmitted,setFormSubmitted] = useState(false);

  

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    if (user.password!=user.cpassword){
      alert("Passwords don't match");
      setFormSubmitted(false);

    }

    else {

    const { name, email, phone, password, cpassword } =
      user;

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phone,
        password: password,
        passwordConfirmation: cpassword,
        role: accountType,
      }),
    });


    if (res.status==200){
        window.alert("Registration Successful");
        history.push("/login"); //for redirect action
    }
    else {
      window.alert("Registration failed");
      setFormSubmitted(false);
    }

  }
  };

  const handleFormSubmit = (e) => {
    setFormSubmitted(true);
    PostData(e);

  }

  return (
    <>
      <Head>
        <title>Register | Curltoon</title>
        <meta name="description" content="Curltoon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>

          <div className="registerTopDiv p-5">

            <h2> CURLTOON </h2>

            <p>
              Intro pargraph 1
            </p>

            <p>
              Intro pargraph 2
            </p>

            <Button>Save 20% with annual billing</Button>

          </div>

          <div className="registerBottomDiv p-5">

            <h5>Included in free trial plan</h5>

            Lorem ipsum

            <ul>

              <li> Feature 1 </li>
              <li> Feature 2 </li>
              <li> Feature 3 </li>
              
            </ul>
          
          </div>  

          <div className="registerCardContainer">

            <Card>

            <Card.Body>
              <h6 className='text-center'> Sign up</h6>

              <form
                id='register-form'
                role='form'
                method='POST'
              >

                <div className="form-group">
                  <label className="me-2">
                    <input type="radio" 
                    checked={accountType === "entrepreneur"}
                    onChange={()=>setAccountType("entrepreneur")}
                    />
                    Entrepreneur
                  </label>

                  <label>
                    <input type="radio" 
                    checked={accountType === "freelancer"}
                    onChange={()=>setAccountType("freelancer")}
                    />
                    Freelancer
                  </label>

                </div>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Full Name'
                    name='name'
                    id='name'
                    autoComplete='off'
                  />
                </div>

                <div className='input-group mb-3'>
                  <input
                    type='email'
                    className='form-control '
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Email Address"
                    name='email'
                    id='email'
                  />
                </div>

              

                <div className='form-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    value={user.password}
                    onChange={handleInputs}
                    name='password'
                    id='password'
                    placeholder='Create Password'
                  />
                </div>

                <div className='form-group mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    value={user.cpassword}
                    onChange={handleInputs}
                    name='cpassword'
                    id='cpassword'
                    placeholder='Confirm Your Password'
                  />
                </div>


                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={user.phone}
                    onChange={handleInputs}
                    name='phone'
                    id='phone'
                    placeholder='Phone Number'
                    autoComplete='off'
                  />
                </div>

                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    value={user.cardNumber}
                    onChange={handleInputs}
                    name='cardNumber'
                    id='cardNumber'
                    placeholder='Card Number'
                    autoComplete='off'
                  />
                </div>

                <div className='form-group form-button text-center'>
                 
                 {!formSubmitted ? <input
                    type='submit'
                    className='btn btn-primary mb-2 w-100'
                    onClick={handleFormSubmit}
                    name='signup'
                    id='signup'
                    value='Submit'
                  /> : <input
                  type='submit'
                  disabled
                  className='btn btn-primary mb-2 w-100'
                  onClick={handleFormSubmit}
                  name='signup'
                  id='signup'
                  value='Submit'
                />}
                </div>


                <br />
                <br />

                {/* <h6>
                  Already have an account?{" "}
                  <span>
                    <Link class='nav-link' href='/login'>
                      Login
                    </Link>
                  </span>
                </h6> */}
              </form>

              </Card.Body>


              </Card>

              </div>
      </section>
    </>
  );
};

export default Register;
