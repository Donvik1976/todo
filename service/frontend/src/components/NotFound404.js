import React from "react";
import {Router} from "react-router-dom";

const NotFound404=({location}) => {
     return(
        <div>
            <h1> Page not found '{location.pathname}</h1>
        </div>
    )

}

export default NotFound404