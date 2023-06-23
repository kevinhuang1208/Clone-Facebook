import React from 'react';
import './Footer.css';

function Footer() {

    return (
        <div className="allFooterContainer">
            <div className='titles'>
            <h2>Technologies Used:</h2>
            <h2 className = 'contributers'>Contributors:</h2>
            </div>
            <div className = 'allColumns'>
            <div className='firsttwo-columns'>
            <div className="footerColumn1">
                <div className="">Javascript</div>
                <div className="">REACT</div>
                <div className="">Redux</div>
                <div className="">Amazon Web Services</div>
            </div>
            <div className="footerColumn2">
                <div className="">Python</div>
                <div className="">Flask</div>
                <div className="">SQLAlchemy</div>
                <div className="">PostgreSQL</div>
            </div>
            </div>
            <div className="footerColumn3">

                <div className = 'kevin'>

                <div className="footerNameBlock">
                    <p className="footerNameTag">Kevin Huang</p>
                    <a href="https://www.linkedin.com/in/kevin-huang-a53139186/" target="_blank">
                        <img className="linkedinLogo" src="https://cdn.discordapp.com/attachments/1113213089702228038/1115021661377400832/linkedinLogo.png" />
                    </a>
                    <a href="https://github.com/kevinhuang1208" target="_blank">
                        <img className="githubLogo" src="https://cdn.discordapp.com/attachments/1117948168353628201/1121823679731478629/github-g4b811f6c0_640.png" />
                    </a>
                </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;
