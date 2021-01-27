import React from 'react';
import styled from "styled-components";
import BurgerMenuIcon from '../atom/BurgerMenuIcon';
import { device } from '../../constants/mediaQueries/device';


const styles = {
    logoImgLink: {
        maxWidth: "200px",
        position: "absolute",
        top: "0.5rem",
        left: "50%",
        transform: "translate(-50%,0)",
        [device.laptop]: {
            maxWidth: "240px",
            left: "1.5rem",
            top: "1rem",
            transform: "none"
        }
    },
    logo: {
        width: "100%",
    },
    nav: {
        backgroundColor: "#fa2117",
        color: "white",
        position: "relative",
        padding: '2.5rem',
        
    },
    link: {
        color: "white",
        padding: "0 0.5rem",
        "&:hover": {
            color: "rgb(255 255 255 / 74%)"
        }
    },
    button: {
        zIndex: 500,
        position: "absolute",
        right: "1rem",
        top: "1rem",
    },
    navItemWrapper: {
        marginTop: "1rem",
        [device.laptop]: {
            marginTop: "0rem",
        }
    }
}
const LogoImg = styled("img")(styles.logo);
const LogoImgLink = styled("a")(styles.logoImgLink);
const StyledNavbar = styled('nav')(styles.nav)
const StyledLink = styled('a')(styles.link);
const StyledBurger = styled('button')(styles.button);
const StyledNavItemWrapper = styled('div')(styles.navItemWrapper);

const Navbar = (props) => {
    return (
        <StyledNavbar className="navbar navbar-expand-lg ">
            <LogoImgLink className="navbar-brand" href="#"><LogoImg  src={require("../../assets/images/SMARTMART.png")} /></LogoImgLink>
            <StyledBurger  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <BurgerMenuIcon  className="navbar-toggler-icon"></BurgerMenuIcon>
            </StyledBurger>

            <StyledNavItemWrapper className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav mr-auto" style={{margin: "auto"}}>

                    
                    <li className="nav-item dropdown" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link dropdown-toggle"  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Impact
                        </StyledLink>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="https://www.iloveimpact.com/impact-success/">Home</a>
                            <a className="dropdown-item" href="https://www.iloveimpact.com/hindi/">Hindi Website</a>
                            {/* <div className="dropdown-divider"></div> */}
                            <a className="dropdown-item" href="https://www.iloveimpact.com/about-us/">About Us</a>
                            <a className="dropdown-item" href="https://www.iloveimpact.com/real-spirit-of-impact/">What is Impact???</a>
                        </div>
                    </li>

                    <li className="nav-item dropdown" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Join
                        </StyledLink>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" target="_blank" href="https://www.iloveimpact.com/join-impact/86467827/power">Join Impact</a>
                            <a className="dropdown-item" href="https://www.iloveimpact.com/business-plan-videos/">Plan Videos</a>
                            <a className="dropdown-item" href="https://www.iloveimpact.com/income-plan/">Business Plan</a>
                            <a className="dropdown-item" href="https://www.iloveimpact.com/repurchase-packages/">Repurchase</a>
                            <a className="dropdown-item" target="_blank" href="http://iloveimpact.com/presentation/#/impact">Income Plan</a>
                        </div>
                    </li>





                    <li className="nav-item active" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link" href="#">Products <span className="sr-only">(current)</span></StyledLink>
                    </li>

                    <li className="nav-item" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link" href="https://www.iloveimpact.com/shop/">Shop</StyledLink>
                    </li>
                    <li className="nav-item" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link" href="https://www.iloveimpact.com/business-builders/">Blog</StyledLink>
                    </li>
                   
                    <li className="nav-item" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link" href="https://www.iloveimpact.com/contact-us/">Contact Us</StyledLink>
                    </li>
                    
                    <li className="nav-item" style={{padding: "0 0.5rem"}}>
                        <StyledLink className="nav-link" target="_blank"  href={window.ADP_DASHBOARD_URL}>ADP Login</StyledLink>
                    </li>
                </ul>
                
            </StyledNavItemWrapper>
        </StyledNavbar>
    )
}


export default Navbar;