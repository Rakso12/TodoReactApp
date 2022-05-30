import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './Components/TaskList/TaskList';
import Form from './Components/Form/Form';

function App() {
  return (
    <Router>

    <div className="App">
      <Navbar></Navbar>
      
      <Switch>
      
        <Route exact path="/">
          <TaskList></TaskList>
        </Route>

        <Route exact path='/signin'>
          
        </Route>
      
      </Switch>
    </div>
    
    </Router>
  );
}

export default App;
