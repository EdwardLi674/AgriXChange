import React, {useContext} from "react";
import Header from "../headers/Header";
import Helmet from "react-helmet";
import favicon from "../../public/assets/images/favicon/1.png";
import Sidebar from '../headers/seller/sidebar';
import Footer from "../footers/common/Footer";
import { AuthContext } from "../../helpers/auth/AuthContext";

const CommonLayout = ({ children, sidebar}) => {
    const authContext = useContext(AuthContext);
    const isAuth = authContext.isAuthenticated
    const user = authContext.user

    return (
        <div className={!isAuth ? "free" : user.role}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
            </Helmet>
            <div className="page-wrapper">
                <Header logoName={"logo.png"} topClass="top-header" role={!isAuth ? "free" : user.role} />
                <div className="page-body-wrapper">
                    {!isAuth ? "" : <Sidebar role={user.role} display={sidebar} />}
                    <div className="page-body">
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer footerClass={!isAuth ? "section-b-space dark-layout" : "section-b-space white-layout"} /> */}
            <Footer footerClass="section-b-space dark-layout"/>
        </div>
    );
};

export default CommonLayout;
