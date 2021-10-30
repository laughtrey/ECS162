import React, {} from 'react';
import './App.css';
import {Link} from "react-router-dom";
import listStyle from "./UniversityList.module.css";
import splashPageStyle from './splashPage.module.css';


/* App */
function SubjectList() {

    return (
        <div>
        <ul className={listStyle.text_center}>
          {/* Here, we need to add other subjects similarly */}
          <li className={listStyle.school}><Link to='/subject/?subject=Biology'>Biology</Link></li>
          <li className={listStyle.school2}><Link to='/subject/?subject=Psychology'>Psychology</Link></li>
          <li className={listStyle.school3}><Link to='/subject/?subject=Physical%20Science'>Physical Science</Link></li>
          <li className={listStyle.school4}><Link to='/subject/?subject=History'>History</Link></li>
          <li className={listStyle.school5}><Link to='/subject/?subject=Literature'>Literature</Link></li>
          <li className={listStyle.school}><Link to='/subject/?subject=Computer%20Science'>Computer Science</Link></li>
          <li className={listStyle.school2}><Link to='/subject/?subject=Mathematics'>Mathematics</Link></li>
          <li className={listStyle.school3}><Link to='/subject/?subject=Social%20Sciences'>Social Sciences</Link></li>
        </ul>
        </div>
    )
}

export default SubjectList;