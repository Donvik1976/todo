import React from "react";
import {useParams} from "react-router-dom";
import project from "./Project";


const OneProjectItem = ({project}) => {
    return(
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_url}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const OneListProject = ({projects}) => {
    let{id} = useParams();
    const filter_item = projects.filter((project) => project.id === parseInt(id));
    return(
        <table>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
            <th>
                Repo_url
            </th>
            <th>
                Users
            </th>
            {filter_item.map((project) => <OneProjectItem project={project} />)}
        </table>
    )
}

export default OneListProject
