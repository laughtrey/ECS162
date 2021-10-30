import React, { useRef, useEffect, useState  } from 'react';
import {useLocation, Link} from 'react-router-dom'
import queryString from 'query-string'
import './App.css';
import listStyle from "./UniversityList.module.css";
// import $ from "jquery";


function SchoolList() {

  const { search } = useLocation()
  // values hold the query string as a list, I think.
  const values = queryString.parse(search)
  let subject = values.subject;
  console.log(subject);

  const [lecturesFetched, setLecturesFetched] = useState(false);
  const [lectures, setLectures] = useState();
  const [modalvideo, setmodalvideo] = useState(null);
  const [elPopupClose, setElPopupClose] = useState(null);
  const [elPopupOverlay, setElPopupOverlay] = useState(null);

  useEffect(async function(){
    // fetching a list of entries on the subject.
    fetch("/api/subject?subject="+ subject)
    .then(res => res.json())
    .then(json => {
      setLectures(json);
      setLecturesFetched(true);
      })
  }, [])

  var player = null;
  // var tag = document.createElement("script");
  // tag.id = "iframe-api";
  // tag.src = "https://www.youtube.com/iframe_api";
  // var firstScriptTag = document.getElementsByTagName("script")[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("existing-iframe-example");
  }
  // var elPopupClose = $(".popup__close");
  // var elPopupClose = document.getElementById("popup__close");
  // var elPopupOverlay = document.getElementById("popup__overlay");

  // var elPopupOverlay = $(".popup__overlay");
  function popupDidClose() {
    if (player !== null) {
      player.pauseVideo();
    }
  }
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  function getStartTime(url){
    const newUrl = new URL(url);
    let startTime = newUrl.searchParams.get('t');
    return startTime;
  }

  async function showPopup(videoLink){
    var vid = getId(videoLink);
    var startTime = getStartTime(videoLink);
    var source = "https://www.youtube.com/embed/" + vid + "?start=" + startTime;
    await setModalHTML(source)
    setElPopupClose(document.getElementById("popup__close"));
    setElPopupOverlay(document.getElementById("popup__overlay"));
  }

  async function setModalHTML(source){
      setmodalvideo(
        <div id="popup__overlay">
          <div className={listStyle.text_center}>
            <a href="#" id="popup__close">X</a>
            <iframe className={listStyle.center_element} id="existing-iframe-example" width="853" height="800" type="text/html" src={source} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
    )
  }
  
  // elPopupClose.click(function () {
  //   elPopupOverlay.css({ display: "none", visibility: "hidden", opacity: 0 });
  //   popupDidClose();
  // });

  if(elPopupClose){
    elPopupClose.addEventListener("click", function(){
      elPopupClose.style.display = "none";
      elPopupClose.style.visibility = "hidden";
      elPopupClose.style.opacity = 0;
      elPopupOverlay.style.display = "none";
      elPopupOverlay.style.visibility = "hidden";
      elPopupOverlay.style.opacity = 0;
      setLecturesFetched(true);
      // console.log(lectures);
    })
  }


  // elPopupOverlay.click(function (event) {
  //   event = event || window.event;
  //   if (event.target === this) {
  //     elPopupOverlay.css({ display: "none", visibility: "hidden", opacity: 0 });
  //     popupDidClose();
  //   }
  // });

if(elPopupOverlay){
  elPopupOverlay.addEventListener("click", function(){
      event = event || window.event;
      if (event.target === this) {
        elPopupOverlay.style.display = "none";
        elPopupOverlay.style.visibility = "hidden";
        elPopupOverlay.style.opacity = 0;
        popupDidClose();
      }  
  })
}


  async function showModal(e, videolink){
    setLecturesFetched(false);
    console.log(e.target.text)
    console.log(videolink)
    await showPopup(videolink)
    // elPopupOverlay.css({ display: "block", visibility: "visible", opacity: 1 });
    await showOverlay()
  }

  async function showOverlay(){
    if(elPopupOverlay){
      elPopupOverlay.style.display = "block";
      elPopupOverlay.style.visibility = "visible";
      elPopupOverlay.style.opacity = 1;
    }
  }


  // create buttons for each school 
  function createSchoolButtons(lecturesList){
    console.log("lectures: ", lecturesList);
    if (Array.isArray(lecturesList)){
      const retElements = lecturesList.map((entry) => 
        <li className={`${listStyle.school} ${listStyle.school_border} ${listStyle.center_element} ${listStyle.text_center}`} key={entry.rowIdNum}><a onClick={(e) => showModal(e, entry.videolink)}>{entry.university}</a></li>
      )
      return <ul className={listStyle.spaceBetweenButtons}>{retElements}</ul>;
    }else{
      console.log("lecturesList is not array")
      return null;
    }
  }

    return (
        <div>
        <Link to="/">Go Back</Link>
          {lecturesFetched ? createSchoolButtons(lectures) : null}
          {modalvideo ? modalvideo : null}
        </div>
    )
}

export default SchoolList;