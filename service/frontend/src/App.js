import React from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import UsersList from "./components/Users.js";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[]
        }
    }

    componentDidMount() {
        // const users = [
        //     {
        //         "username": "TimRus",
        //         "first_name": "Тимофей",
        //         "last_name": "Руснак",
        //         "email": "timofey21@gmail.com"
        //     },
        //     {
        //         "username": "anna",
        //         "first_name": "Анна",
        //         "last_name": "Расторгуева",
        //         "email": "anna1971@hotmail.com"
        //     }
        // ]
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
                {
                    'users':response.data
                }
            )}).catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <Menu/>
                < UsersList users={this.state.users}/>
                <Footer/>
            </div>
        );
    }
}

export default App;