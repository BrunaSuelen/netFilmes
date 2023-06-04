import React from "react";
import "./Layout.css";
import "./reset.css";
import Header from "../Header";

const Layout = ({ children, props }) => {
    const {hideHeaderPaths} = props;
    const isHideHeader = hideHeaderPaths.includes(window.location.pathname);
    return (
      <> 
        { isHideHeader ? (
          <main className='card-content-page'>{children}</main>
        ) : (
          <div className='container'>
            <Header />
            <main className='card-content-page'>{children}</main>
          </div>
        )}
      </>
    );
}

export default Layout;