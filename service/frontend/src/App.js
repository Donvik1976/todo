import React from "react";
import axios from "axios";
import './App.css';
import UsersList from "./components/Users.js";
import ProjectList from "./components/Project.js";
import TODOList from "./components/TODO.js";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import {HashRouter,Route, BrowserRouter} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'project':[],
            'todo':[],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
                {
                    'users':response.data
                }
            )}).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/').then(response => {
            this.setState(
                {
                    'project':response.data
                }
            )}).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/').then(response => {
            this.setState(
                {
                    'todo':response.data
                }
            )}).catch(error => console.log(error))


    }

    render() {
        return (
            <div>
                <BrowserRouter>

                    <Menu/>

                    <Route exact path='/' component={() => < UsersList users={this.state.users}/>}/>
                    <Route exact path='/project' component={() => < ProjectList projects={this.state.project}/>}/>
                    <Route exact path='/todo' component={() => < TODOList todos={this.state.todo}/>}/>

                    <Footer/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;