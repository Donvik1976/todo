import React from "react";
import axios from "axios";
import './App.css';
import UsersList from "./components/Users.js";
import ProjectList from "./components/Project.js";
import TODOList from "./components/TODO.js";
import Footer from "./components/Footer.js";
import Menu from "./components/Menu.js";
import OneListProject from "./components/OneProject.js";
import LoginForm from "./components/Auth.js";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound404 from "./components/NotFound404.js";
import ProjectForm from "./components/ProjectForm.js";
import TODOForm from "./components/TODOForm.js";
import Cookies from "universal-cookie";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'project':[],
            'todo':[],
            'token':'',
            'username':'',
        }
    }

    createProject(name, repo_url, users){
        const headers = this.get_headers()
        const data = {name: name, repo_url: repo_url, users: [users]}
        axios.post('http://127.0.0.1:8000/api/project/', data, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }

    createTODO(project, text, user){
        const headers = this.get_headers()
        const data = {project: project, text: text, user: user}
        axios.post('http://127.0.0.1:8000/api/todo/', data, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }


    deleteProject(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }

    deleteTODO(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }

    load_data(){
        const headers = this.get_headers()
        const username = this.state.username
        axios.get('http://127.0.0.1:8000/api/users/', {headers}, {username}).then(response => {
            this.setState(
                {
                    users:response.data.results
                }
            )}).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/', {headers}, {username}).then(response => {
            this.setState(
                {
                    project:response.data.results
                }
            )}).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}, {username}).then(response => {
            this.setState(
                {
                    todo:response.data.results
                }
            )}).catch(error => console.log(error))
    }


    set_token(token, username){
        // localStorage.setItem('token', token)
        // let item = localStorage.getItem('login')
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token, 'username': username}, ()=>this.load_data())
        console.log(this.state.token)
    }


    get_token(username, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
                this.set_token(response.data['token'], username)
            }).catch(error => alert('Не верный логин или пароль'));
    }

    is_auth(){
        return !!this.state.token
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }

        if(this.is_auth()){
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }


    logout(){
        this.set_token('', '')

    }

    get_token_from_cookies(){
        const cookies = new Cookies();
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, ()=>this.load_data())
    }

    componentDidMount() {
        this.get_token_from_cookies()
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <header>
                        <Menu isAuth={this.is_auth()}
                              logout={()=>this.logout()}
                              username={this.state.username}/>
                    </header>
                    <Switch>
                        <Route exact path='/' component={() => < UsersList users={this.state.users}/>}/>
                        <Route exact path='/project' component={() => < ProjectList projects={this.state.project}
                                                                                    deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/project/create' component={()=>
                            <ProjectForm createProject={(name, repo_url, users)=>this.createProject(name, repo_url, users)}/>}></Route>

                        <Route exact path='/todo' component={() => < TODOList todos={this.state.todo}
                                                                              deleteTODO={(id) => this.deleteTODO(id)}/>}/>
                        <Route exact path='/todo/create' component={()=>
                            <TODOForm project={this.state.project}
                                      createTODO={(project, text, user)=>this.createTODO(project, text, user)}/>}></Route>

                        <Route path='/project/:id' component={() => <OneListProject projects={this.state.project}/>} />
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}
                        />}/>
                        <Route component={NotFound404}/>
                    </Switch>

                    <Footer/>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
