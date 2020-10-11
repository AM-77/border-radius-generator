import React from 'react';

import logo from '../assets/logo.png';
import twitterIcon from '../assets/twitter.svg';
import githubIcon from '../assets/github.svg';
import linkedinIcon from '../assets/linkedin.svg';

export default function Footer() {
  return (
    <div className="footer">
      <p className="copyrights">
        <span>{`© ${new Date().getFullYear()} | by `}</span>
        <span>
          <a href="https://www.github.com/AM-77">
            <img src={logo} alt="AM-77 logo" title="Made by AM-77" />
          </a>
        </span>
      </p>

      <div className="links">
        <ul>
          <li>
            <a href="https://twitter.com/__AM77__" title="twitter">
              <img src={twitterIcon} alt="twitter icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mohamed-amine-griche"
              title="linkedin"
            >
              <img src={linkedinIcon} alt="linkedin icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/AM-77" title="github">
              <img src={githubIcon} alt="github icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
