import React from 'react';
import {Link} from "react-router-dom";


function Menu(props) {
	return(
        <nav>
            <ul>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/project'>Projects</Link></li>
                <li><Link to='/todo'>ToDo</Link></li>
                <li>
                    {props.isAuth ? (
                        <span>
                            <button onClick={()=>props.logout()}>Logout</button>
                            Добро пожаловать: {props.username}!
                        </span>
                    ) : (
                        <Link to='/login'>Login</Link>)}
                </li>
            </ul>

        </nav>
	)
}

export default Menu;