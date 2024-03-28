import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <div>
       <Navbar />
   
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                <Link
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                  to="/"
                ><a href="#" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                        Take Me Home Page</a> 
                        </Link>
                </div>
            </div>
        </div>
    </div>
    </div>
    <Footer />
    </div>
  )
}

export default NotFound