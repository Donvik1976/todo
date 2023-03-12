import React from "react";


const TODOItem = ({todo}) => {
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
        </tr>
    )
}


const TODOList = ({todos}) => {
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
            {todos.map((todo) => <TODOItem todo={todo} />)}

        </table>
    )
}
export default TODOList
