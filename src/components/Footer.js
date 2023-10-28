import React from "react";
import {
  FaRegCopyright,
  FaFacebookF,
  FaRss,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links">
        <h1 style={{ fontFamily: "PT Serif" }}>A.M</h1>
        <ul>
          <li style={{ fontFamily: "PT Serif" }}>WEEBLY THEMES</li>
          <li style={{ fontFamily: "PT Serif" }}>PRE-SALE FAQS</li>
          <li style={{ fontFamily: "PT Serif" }}>SUBMIT A TICKET</li>
        </ul>
        <ul>
          <li style={{ fontFamily: "PT Serif" }}>SERVICES</li>
          <li style={{ fontFamily: "PT Serif" }}>THEME TWEAK</li>
        </ul>
        <ul>
          <li style={{ fontFamily: "PT Serif" }}>SHWCASE</li>
          <li style={{ fontFamily: "PT Serif" }}>WIDGETKIT</li>
          <li style={{ fontFamily: "PT Serif" }}>SUPPORT</li>
        </ul>
        <ul>
          <li style={{ fontFamily: "PT Serif" }}>ABOUT US</li>
          <li style={{ fontFamily: "PT Serif" }}>CONTACT US</li>
          <li style={{ fontFamily: "PT Serif" }}>AFFILIATES</li>
          <li style={{ fontFamily: "PT Serif" }}>RESOURCES</li>
        </ul>
      </div>
      <div className="footer__social">
        <div className="footer__icons">
          <div className="footer__icon">
            <FaFacebookF />
          </div>

          <div className="footer__icon">
            <FaTwitter />
          </div>
          <div className="footer__icon">
            <FaRss />
          </div>
          <div className="footer__icon">
            <FaGooglePlusG />
          </div>
          <div className="footer__icon">
            <FaInstagram />
          </div>
        </div>
        <p style={{ fontFamily: "PT Serif" }}>
          <FaRegCopyright />
          Copyright, All rights reservved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
