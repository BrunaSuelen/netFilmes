import React from "react";
import "./Layout.css";
import Header from "../Header";

const Layout = ({ children, props }) => {
    return (
        <>
         {! props.hideHeaderPaths.includes(window.location.pathname) && <Header/>}
            {children}
        </>
    )
}

export default Layout;