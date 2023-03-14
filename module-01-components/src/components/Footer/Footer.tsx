import React from 'react';
import './Footer.css';
import githubLogo from '../../assets/icons/github.png';
import rsLogo from '../../assets/icons/rs-school.png';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="github__wrapper">
          <a
            className="github__link"
            href="https://github.com/mkoroleva5/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github__logo" src={githubLogo} alt="GitHub" />
            <div className="github__name">mkoroleva5</div>
          </a>
        </div>
        <p className="footer__year">2023</p>
        <a className="rs__link" href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img className="rs__logo" src={rsLogo} alt="Rolling Scopes School" />
        </a>
      </footer>
    );
  }
}
