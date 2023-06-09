import React from "react";
import "./Layout.css";
import "./reset.css";
import Header from "../Header";

const Layout = ({ children, props }) => {
    const {showHeaderPaths} = props;
    const path = window.location.pathname;
    const isShowHeader = showHeaderPaths.find(i => path.includes(i));
    
    return (
      <> 
        { isShowHeader ? (
          <div className='container'>
            <Header />
            <main className='card-content-page'>{children}</main>
          </div>
          ) : (
          <main>{children}</main>
        )}
      </>
    );
}

export default Layout;