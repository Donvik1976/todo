import React from "react";


const TODOItem = ({todo}) => {
    return(
        <tr>
            <td>
                {todo.id}
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
                {todo.is_active}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
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
                Text
            </th>
            <th>
                Created_date
            </th>
            <th>
                Updated_date
            </th>
            <th>
                Is_active
            </th>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            {todos.map((todo) => <TODOItem todo={todo} />)}

        </table>
    )
}
export default TODOList
