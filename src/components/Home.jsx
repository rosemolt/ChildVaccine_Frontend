import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "antd/dist/reset.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-100 bg-light">
      <Navbar />
      {/* Blinking Registration Notice */}
      <motion.div
        className="blinking-badge"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Register Below!
      </motion.div>
      {/* Carousel */}
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://imgix.bustle.com/2016/8/1/Fotolia_70350869_Subscription_Monthly_M-c85939cc-13c0-494d-930a-416b1d668e56.jpg?w=1200&h=675&fit=crop&crop=faces&fm=jpg"
              className="d-block w-100 img-fluid"
              alt="Slide 1"
              style={{ height: "560px", objectFit: "cover" }}
            />
            <div className="carousel-caption p-3 d-block">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-dark p-2 d-inline-block rounded">Child Vaccination Care</h5>
                <p className="text-dark p-2 d-inline-block rounded">
                  Ensuring a healthy future for your child with timely vaccinations.
                </p>
                <Link to="/info" className="mt-2">
                  <Button type="primary" className="btn-light text-dark">Click Here to Learn More</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://content.api.news/v3/images/bin/1c4af4adf0a6ed79175f9f0f591fee2a"
              className="d-block w-100 img-fluid"
              alt="Slide 2"
              style={{ height: "560px", objectFit: "cover" }}
            />
            <div className="carousel-caption p-3 d-block">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-dark p-2 d-inline-block rounded">Track Your Child’s Vaccines</h5>
                <p className="text-dark p-2 d-inline-block rounded">
                  Get real-time updates and reminders for upcoming vaccinations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Why Vaccination is Required Section */}
      <motion.div
        className="w-100 mt-5 p-4 rounded shadow-lg text-white"
        style={{ backgroundColor: "#FFB74D" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center">Why is Vaccination Required?</h2>
        <p className="mt-3">
          Vaccination is a crucial step in protecting your child from life-threatening diseases.
          It helps build immunity, preventing the spread of infectious diseases.
        </p>
      </motion.div>

      {/* Infant Caregiver Section */}
      <motion.div
        className="w-100 mt-5 p-4 bg-white rounded shadow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-success">Infant Caregiver Services</h2>
        <p>
          Infant caregivers provide essential support for new parents, ensuring the well-being of newborns.
          Register now to offer your services or request a caregiver.
        </p>
        <div className="text-center">
          <Link to="/reg-caregiver">
            <Button type="primary">Register as Caregiver</Button>
          </Link>
        </div>
      </motion.div>

      {/* Registration Cards Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          {[
            { title: "For Parents", text: "Register to schedule vaccinations.", link: "/register", color: "#FF7043" },
            { title: "For Asha Workers", text: "Join to track vaccinations.", link: "/register-asha", color: "#66BB6A" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="col-md-5"
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="card shadow-lg p-3 mb-5 rounded" style={{ backgroundColor: item.color, color: "white" }}>
                <div className="card-body text-center">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.text}</p>
                  <Link to={item.link}>
                    <Button type="primary" className="btn-light text-dark">Register</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-100 text-white text-center py-3 mt-5" style={{ backgroundColor: "#FF7043" }}>
        <p className="mb-0">&copy; 2025 Child Vaccination Care. All rights reserved.</p>
        <p className="mb-0">
          Contact us at <a href="mailto:support@vaccinationcare.com" className="text-white">support@vaccinationcare.com</a>
        </p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .blinking-badge {
          position: absolute;
          top: 80px;
          right: 10px;
          background-color: red;
          color: white;
          padding: 8px 20px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 5px;
          text-align: center;
          z-index: 1050;
        }
      `}</style>
    </div>
  );
};

export default Home;
