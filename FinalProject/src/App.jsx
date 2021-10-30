
import React, { useRef, useEffect } from 'react';
import MyD3Component from "./MyD3Component.jsx";
import SubjectList from './SubjectList';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SchoolList from './SchoolList';
import SplashPage from './SplashPage';




/* App */
function App() {
    return (
        <div>

          <Router>
            <div>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/subject/">
                {/* when accessed by '/subject/?subject=subjectNameHere' return list of the schools on the subject
                    The subject is passed as query string (subject=subjectNameHere) list of the schools are retrieved from the server */}
                  <SchoolList />
                </Route>
                <Route path="/">
                  {/* when accessed by '/' return splash page */}
                  <SplashPage />
                </Route>
              </Switch>
            </div>
          </Router>

          {/*<p>A bar chart! </p>

        
          <div  className="barChart">
            <MyD3Component data={[1,5,6,3]}/>
          </div>*/}

        </div>
    )
}

export default App;