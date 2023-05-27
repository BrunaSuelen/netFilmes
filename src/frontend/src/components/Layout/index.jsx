import React from "react";
import "./Layout.css";
import "./reset.css";
import Header from "../Header";

const Layout = ({ children, props }) => {
    const {hideHeaderPaths} = props;
    const isHideHeader =  hideHeaderPaths.includes(window.location.pathname);
    return (
        <>
            {! isHideHeader && <Header/>}
            <main className="">
                {children}
            </main>
        </>
    )
}

export default Layout;