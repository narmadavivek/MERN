import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

// type UserAuth = boolean;
export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
   
  const { user } = useAuth();
  console.log("frontend user", user.email);
  const [userData, setUserData] = useState(true);

 

  if(userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message:"",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    
    setContact((prev) => ({...prev, [name]: value}));
  };

 const handleContactForm = async (e) => {
  e.preventDefault();
 try {
  const response = await fetch("https://mern-1-56w8.onrender.com/api/form/contact",{
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(contact),
  });

  if(response.ok){
    setContact(defaultContactFormData);
    const data = await response.json();
    console.log(data);
    alert('message send successfully');
    } 
  }
  catch (error) {
    alert('message not send');
  console.log(error);
    }
 };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* <h1>Contact Page</h1> */}
        <div className="container grid grid-half-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>
          
          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={contact.username}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={contact.email}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea name="message"
                  id="message"
                  value={contact.message}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                  cols="30"
                  rows="6">
                </textarea>
                 
              </div>
             
              <div>
                <button type="submit"> Submit </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};