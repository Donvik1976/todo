import React from "react";
import {Link} from "react-router-dom";


const TODOItem = ({todo, deleteTODO}) => {
    return(
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_date}
            </td>
            <td>
                {todo.updated_date}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.is_active ? 'True' : 'False'}
            </td>
            <td>
                <button onClick={() => deleteTODO(todo.id)} type="button">Delete</button>
            </td>
        </tr>
    )
}


const TODOList = ({todos, deleteTODO}) => {
    return(
        <table>
            <th>
                ID
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Created_date
            </th>
            <th>
                Updated_date
            </th>
            <th>
                User
            </th>
            <th>
                Is_active
            </th>
            <th></th>
            {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO} />)}

            <Link to='/todo/create'>Create</Link>

        </table>
    )
}
export default TODOList
