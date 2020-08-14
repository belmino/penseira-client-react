import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt, faSave, faPlus, faPencilAlt, faTags, faCheckSquare, faFilter, faMinus, faTimes, faSquare, faCheck} from '@fortawesome/free-solid-svg-icons'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'



import Navigation from './components/Navigation'
import TagList from './components/TagList'
import TagForm from './components/TagForm'
import ContextList from './components/ContextList'
import PageList from './components/ContextPages'
import Page from './components/Page'
import BlockForm from './components/BlockForm'
import TagFilter from './components/TagFilter'


library.add(faTrashAlt, faSave, faPlus, faPencilAlt, faTags, faCheckSquare, faFilter, faMinus, faTimes, faSquare, faCheck)

function App() {
  return (
    
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/" exact component={TagList} />
        <Route path="/cad/:type?/:id?/:spid?" exact component={TagForm} />
        <Route path="/contexts" exact component={ContextList} />
        <Route path="/pages/:id" exact component={PageList} />
        <Route path="/page/:id" exact component={Page} />
        <Route path="/block/:id/:spid" exact component={BlockForm} />
        <Route path="/filter" exact component={TagFilter} />
      </div>

    </Router>
  );
}

export default App;
