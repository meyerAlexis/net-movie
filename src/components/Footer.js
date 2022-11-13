import React, { useState,  } from "react";
import '../styles/Header.css';



export default function Footer ({ black, textFoot }) {

    return(
        <footer className={black ?'black': ''}>
               <div className='footer--logo'>
                {textFoot.footerTitle1} <a href="http://cv-meyer-alexis.fr/">{textFoot.footerTitle2}</a> <br />
                {textFoot.content1}<br />
                {textFoot.content2}
            </div>
        </footer>

    );
}