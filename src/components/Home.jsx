import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
  return (
    <div className="w-100">
      {/* Carousel */}
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://imgix.bustle.com/2016/8/1/Fotolia_70350869_Subscription_Monthly_M-c85939cc-13c0-494d-930a-416b1d668e56.jpg?w=1200&h=675&fit=crop&crop=faces&fm=jpg"
              className="d-block w-100 img-fluid"
              alt="Slide 1"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption p-3 d-block">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-dark p-2 d-inline-block rounded">Child Vaccination Care</h5>
                <p className="text-dark p-2 d-inline-block rounded">
                  Ensuring a healthy future for your child with timely vaccinations.
                </p>
                <button className="btn btn-primary mt-2">Schedule</button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://content.api.news/v3/images/bin/1c4af4adf0a6ed79175f9f0f591fee2a"
              className="d-block w-100 img-fluid"
              alt="Slide 2"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption p-3 d-block">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-dark p-2 d-inline-block rounded">Track Your Child’s Vaccines</h5>
                <p className="text-dark p-2 d-inline-block rounded">
                  Get real-time updates and reminders for upcoming vaccinations.
                </p>
                <button className="btn btn-primary mt-2">Check</button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pfizer.com/pfizercom/styles/convert_to_webp/s3/immunization-schedules.png.webp?VersionId=J56WCBykFHF_HJs7t2e41hiIV0ebY8G_&itok=cIXLuQvD"
              className="d-block w-100 img-fluid"
              alt="Slide 3"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption p-3 d-block">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-dark p-2 d-inline-block rounded">Get Your Child's Vaccination Details</h5>
                <button className="btn btn-primary mt-2">Download</button>
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
      <div className="w-100 mt-5 p-4 bg-light rounded shadow">
        <h2 className="text-center text-primary">Why is Vaccination Required?</h2>
        <p className="mt-3 text-dark">
          Vaccination is a crucial step in protecting your child from life-threatening diseases such as measles, polio, 
          diphtheria, and more. It helps build immunity, preventing the spread of infectious diseases and ensuring 
          long-term health. Vaccines are safe, effective, and recommended by health organizations worldwide. By keeping 
          up with vaccinations, you contribute to a healthier future for your child and the community.
        </p>
      </div>

      {/* Footer */}
      <footer className="w-100 bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; 2025 Child Vaccination Care. All rights reserved.</p>
        <p className="mb-0">
          Contact us at <a href="mailto:support@vaccinationcare.com" className="text-white">support@vaccinationcare.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
