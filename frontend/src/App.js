import './App.css';
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage'
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import ProfilePage from './pages/ProfilePage';
import TaskEditPage from './pages/TaskEditPage';
import SettingsPage from './pages/SettingsPage';
import UserListPage from './pages/UserListPage';
import TaskListPage from './pages/TaskListPage';
import FileUploadPage from './pages/FileUploadPage';

function App() {
  return (
    <Router>
      <Header/>
      <Container>
        <Route path = '/' component = {HomePage} exact />
        <Route path = '/login' component = {LoginPage}/>
        <Route path = '/register' component = {RegisterPage}/>
        <Route path = '/task/:id' component = {TaskDetailsPage} exact/>
        <Route path = '/profile' component = {ProfilePage}/>
        <Route path = '/task/:id/edit' component = {TaskEditPage}/>
        <Route path = '/settings' component = {SettingsPage}/>
        <Route path = '/admin/userList' component = {UserListPage}/>
        <Route path = '/admin/taskList' component = {TaskListPage}/>
        <Route path = '/file' component = {FileUploadPage}/>
      </Container>
    </Router>
   
  );
}

export default App;
