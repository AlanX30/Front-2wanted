import React from "react"
import  Navbar  from "./Navbar"

function Layout (props) {
    return(
        <React.Fragment>
            <Navbar props={props} />
            {props.children}
        </React.Fragment>
    )
}

export default Layout