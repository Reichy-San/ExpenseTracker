import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/expense.css";
import pic1 from "../Images/picl.svg";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".navbar__menu");

    const toggleMenu = () => {
      menu.classList.toggle("is-active");
      menuLinks.classList.toggle("active");
    };

    menu.addEventListener("click", toggleMenu);
    return () => {
      menu.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar__container">
          <a href="/" id="navbar__logo">
            <i className="fas fa-gem"></i> TRACKER
          </a>
          <div className="navbar__toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <a href="/" className="navbar__links">Dashboard</a>
            </li>
            <li className="navbar__item">
              <a href="/login" className="navbar__links">Login</a>
            </li>
            <li className="navbar__btn">
              <a href="/signup" className="button">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="main">
        <div className="main__container">
          <div className="main__content">
            <h1>EXPENSE TRACKER</h1>
            <h2>TECHNOLOGY</h2>
            <p>See what makes us different</p>
            <button className="main__btn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
          </div>
          <div className="main__img--container">
            <img src={pic1} alt="pic" id="main__img" />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services">
        <h1>See what the hype is about</h1>
        <div className="services__container">
          <div className="services__card">
            <h2>Experience Bliss</h2>
            <p>AI Powered Technology</p>
            <button>Get Started</button>
          </div>
          <div className="services__card">
            <h2>Are you Ready?</h2>
            <p>Take the leap</p>
            <button>Get Started</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer__container">
        <div className="footer__links">
          <div className="footer__link--wrapper">
            <div className="footer__link--items">
              <h2>About Us</h2>
              <a href="/signup">How it works</a>
              <a href="/">Testimonials</a>
              <a href="/">Careers</a>
              <a href="/">Investments</a>
              <a href="/">Terms of Services</a>
            </div>
            <div className="footer__link--items">
              <h2>Contact Us</h2>
              <a href="/">Contact</a>
              <a href="/">Support</a>
              <a href="/">Destination</a>
              <a href="/">Sponsorships</a>
            </div>
          </div>
          <div className="footer__link--wrapper">
            <div className="footer__link--items">
              <h2>Videos</h2>
              <a href="/">Ambassadors</a>
              <a href="/">Agency</a>
              <a href="/">Influencers</a>
            </div>
            <div className="footer__link--items">
              <h2>Social Media</h2>
              <a href="/">Instagram</a>
              <a href="/">Facebook</a>
              <a href="/">Twitter</a>
              <a href="/">YouTube</a>
            </div>
          </div>
        </div>
        <div className="social__media">
          <div className="social__media--wrap">
            <div className="footer__logo">
              <a href="/" id="footer__logo">
                <i className="fas fa-gem"></i> Tracker
              </a>
            </div>
            <p className="website__right">Tracker 2025. All rights reserved</p>
            <div className="social__icons">
              <a href="/" className="social__icons--link" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="/" className="social__icons--link" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/" className="social__icons--link" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="social__icons--link" target="_blank" rel="noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
