import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Link from "next/link";


import {promisify} from "util";
import crypto from "crypto";

const randomBytes = promisify(crypto.randomBytes)
const Technology = () => {
    const history = useRouter();
    //    -------------------checking user is login or not
    const [userData, setUserData] = useState({});

    const userHome = async () => {
        try {
            const res = await fetch("/userdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            // console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            // history.push("/signin");
        }
    };

    useEffect(() => {
        userHome();
    }, []);


//-----------------------------------./user details




        /*---------------------Get languages Data to view in list----*/

    const [technologydata, setTechnologydata] = useState([])
    const getAll = async () => {
        try {
            const res = await fetch("/api/auth/getAlltechnology", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            console.log(data)
            setTechnologydata(data)
        } catch (e) {
            console.log(e)
        }


    }

    useEffect(() => {
        getAll()
    }, [])

// ------------------------load technology enteries data in to setUser
    /*-----Loading Hook-------*/
    const [loading, setLoading] = useState(false)
    /*-----./Loading Hook-------*/


    /*----------Delete individual technology data----------*/
    const deletetechnology = async (id) => {
        // alert(id)
        const res = await fetch(`/delgetAlltechnology/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data.error);
        if (data.error) {
            window.alert("fail to delete Technology");
            console.log('fail to delete Technology');
        } else {
            await getAll()
            window.alert("Technology deleted success !");
            console.log('Technology deleted success !');

        }
        // setLoading(false)
    }



    /*-----------Global file upload function------------*/
    const upload = async (file) => {
        //Random file name generate
        const rawBytes = await randomBytes(16)
        const fileName = rawBytes.toString('hex')

        // get secure url from our server
        const res = await fetch('/api/s3', {
            method: "POST",
            body: JSON.stringify({
                type: file.type,
                name: fileName
            })
        })
        const {url} = await res.json()

        // post the image directly to the s3 bucket
        const upload = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-type': file.type
            }
        })

        const imageUrl = url.split('?')[0]
        // console.log(imageUrl)
        if (upload)
            return imageUrl
        else
            return false
    }
    /*-----------./Global file upload function------------*/
    /*-----./File Upload----------*/

    /*----------./Delete individual technology data----------*/
    //----------------------------technology entery
    const [technologyData, setTechnology] = useState({
        name: "",
        description: "",
        featured_image: "",
        status: "0"

    });
    let name, value
    const handleTechnology = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setTechnology({...technologyData, [name]: value});
    }
    /*-----File Upload------*/

    const [file, setFile] = useState('')
    const handleTechnologyUpload = (e) => {
        setFile(e.target.files[0])
    }





// -------------------taking data from client to server (server side)
    // taking data from client to server (server side)
    const postTechnology = async (e) => {
        e.preventDefault();
        setLoading(true)

        let {
            name, description, featured_image, status
        } = technologyData;

        //-------------upload file category and group
        let rtn;
        if (rtn = await upload(file)) {
            featured_image = rtn
            rtn = ''
        }


        /*-----File Upload------*/



        const res = await fetch("/technology", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                featured_image: featured_image,
                status: status
            })

        })
        //-------------upload file category and group

        const techdata = await res.json();
        console.log(techdata.error);
        if (techdata.error) {
            window.alert("Please fill required Some data are missing.!");
            console.log('Please fill required Some data are missing.!');
        } else {
            // console.log(data.status);
            // document.getElementById("error-message").style.display = "block";
            // document.getElementById("error-message").innerHTML = "Send message";
            await getAll()
            window.alert("New Technology created success !");
            console.log('Technology created success !');
            // history.push("/signin");
        }


    }

    return (
        <>


            <div id="page" className="differ-site">
                <div className="dashboard-wrapper">
                    <div className="container">
                        <div className="dashboard">
                            <div className="left-menu-wraper">

                               
                                    <div className="profile-info p-3 d-flex align-items-center">
                                        <img className="rounded-circle img-lg mb-2" src={userData.featured_image}
                                             alt="profile image"/>
                                        <div className="wrapper ps-2 lh-sm">
                                            <p className="profile-user-name text-sm-left mb-0">{userData.name}</p>
                                            <span className="user-designatiion">Professional mentor</span>
                                            <div className="rating-wrap">
                                                <div className="fav-meta bg-filled">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <div className="fav-meta bg-filled">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <div className="fav-meta bg-filled">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <div className="fav-meta bg-filled">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                                <div className="fav-meta ">
                                                    <i className="fas fa-star"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inner-menu-wrap">
                                        <ul className="navbar-nav navbar-sidenav">
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/useraccess">
                                                    <i className="fas fa-user-lock"></i>
                                                    <span className="nav-link-text">User Access</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin/students">
                                                    <i className="fas fa-user-graduate"></i>
                                                    <span className="nav-link-text">Students</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin/premiumstudents">
                                                    <i className="fas fa-video"></i>
                                                    <span className="nav-link-text">Premium Students</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin/mentors">
                                                    <i className="fas fa-user-graduate"></i>
                                                    <span className="nav-link-text">Mentors</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin/privatementors">
                                                    <i className="fas fa-user-lock"></i>
                                                    <span className="nav-link-text">Private Mentors</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/admin/allcourses">
                                                    <i className="fas fa-laptop"></i>
                                                    <span className="nav-link-text">All Courses</span>
                                                </a>
                                            </li>
                                            {/*<li className="nav-item">*/}
                                            {/*    <a className="nav-link" href="reviews.html">*/}
                                            {/*        <i className="fas fa-star"></i>*/}
                                            {/*        <span className="nav-link-text">Reviews</span>*/}
                                            {/*    </a>*/}
                                            {/*</li>*/}
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/allcontacts">
                                                    <i className="fa fa-bell"></i>
                                                    <span className="nav-link-text">All Contacts</span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/assessment">
                                                    <i className="fab fa-wpforms"></i>
                                                    <span className="nav-link-text">All Assessments</span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/allpayments">
                                                    <i className="fas fa-file-upload"></i>
                                                    <span className="nav-link-text">All Payments</span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/payupayments">
                                                    <i className="fas fa-file-upload"></i>
                                                    <span className="nav-link-text">All Pay U Payments</span>
                                                </a>
                                            </li>
                                            <hr/>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/publishedblog">
                                                    <i className="fas fa-user-edit"></i>
                                                    <span className="nav-link-text">Published Blogs</span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/coursecategory">
                                                    <i className="fas fa-cog"></i>
                                                    <span className="nav-link-text">Create Category</span>
                                                </a>
                                            </li>
                                            <li className="nav-item active">
                                                <a className="nav-link" href="/admin/technology">
                                                    <i className="fas fa-cog"></i>
                                                    <span className="nav-link-text">Create Technology</span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link" href="/admin/language">
                                                    <i className="fas fa-cog"></i>
                                                    <span className="nav-link-text">Create Language</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>



                            <div className="right-content-wraper ">
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="content-title mb-2 pb-2">
                                                <h4>Create Technology lists<span className="badge bg-badge ms-2">{technologydata.length}</span> </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">

                                            <div className="course-form-wrapper">
                                                <form id="contact-form" role="form" method="POST" encType="multipart/form-data">
                                                    <div className="form-group  ">
                                                        Technology Name: <label htmlFor='contact-form-name'> <i
                                                        className="zmdi zmdi-assignment-account zmdi-hc-2x"/>
                                                    </label>
                                                        <input type="text" className="form-control"
                                                               name="name"
                                                               value={technologyData.name}
                                                               onChange={handleTechnology}
                                                               placeholder="Name" id="contact-form-name"
                                                               required/></div>
                                                    <div className="form-group">
                                                        Technology Description: <label htmlFor='name'> <i
                                                        className="zmdi zmdi-email zmdi-hc-2x"/>
                                                    </label>
                                                        <input type="text" className="form-control"
                                                               name="description"
                                                               value={technologyData.description}
                                                               onChange={handleTechnology}

                                                               id="description" required
                                                               aria-describedby="emailHelp" placeholder="Description"/>
                                                    </div>

                                                    {/*upload image ------------------- */}
                                                    <div className="form-group">
                                                        Image
                                                        <input type="file" className="form-control" id="image"
                                                               name="featured_image"
                                                               value={technologyData.featured_image}
                                                               onChange={handleTechnologyUpload}/>
                                                    </div>

                                                    <br/><br/>

                                                    <div className="action-btn-wrapper text-end">
                                                        <button type="button" className="btn btn-primary" onClick={postTechnology}>Save
                                                        </button>
                                                    </div>

                                                    <div className="error-message text-center " id="error-message">
                                                <span className="error-message text-center"
                                                      id="error-message"> <b/></span>
                                                    </div>
                                                </form>



                                            </div>
                                        </div>


                                        <div className="col-md-4">

                                            <div className="container">
                                                {/*----------------category list*/}
                                                <h5> Category list -({technologydata.length})</h5>
                                                {technologydata.map(technology => (
                                                    <div key={technology._id} className="row shadow-lg p-3 mb-5 bg-body rounded">
                                                        <div className="col">
                                                            {/*{() => handleShow(courses._id)}*/}
                                                            {/*<button type="button" className="btn btn-dark btn-sm"*/}
                                                            {/*>Edit*/}
                                                            {/*</button>*/}
                                                            <button type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => deletetechnology(technology._id)}>Delete
                                                            </button>
                                                            <br/>
                                                            <span> {technology.name} <br/>
                                                                <img src= {technology.featured_image} height="90" width="90" className=" text-center"/>

                                                            </span>
                                                           <span>{technology.description}</span>


                                                        </div>
                                                    </div>
                                                ))}

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            

            {/*----------------------new page------*/}

        </>

    );

}

export default Technology;