import React, { useRef, useEffect, useState } from 'react';
import SubjectList from './SubjectList';
import splashPageStyle from './splashPage.module.css';

function SplashPage(){
    return (
      <div>
        <script defer src="https://d3js.org/d3.v6.min.js"></script>
        <div className="flex_whole">
          <div className={splashPageStyle.flex_top}>
            <div className={splashPageStyle.video_top}>
              <img className={splashPageStyle.center_image} src="./src/sign.gif" alt="loading...." />
            </div>
          </div>
          <div className={splashPageStyle.flex_center}>
            <div className={splashPageStyle.text_center}>
              <p>College is becoming ever</p>
              <p>more expensive, but it is</p>
              <p>also true that great</p>
              <p>college courses, for free,</p>
              <p>are just a click away...</p>
              <p> Scroll down to explore </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
          <div className={splashPageStyle.flex_bottom}>
      
          <SubjectList />
          </div>
        </div>
      </div>
  )
};

export default SplashPage;