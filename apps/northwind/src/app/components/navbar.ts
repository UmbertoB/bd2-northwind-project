import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Navbar = styled.nav`
    background: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    text-align: center;
    display: flex;
    flex-flow: column;
      
    .logo-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
    }
    img {
        width: 180px;
        margin: 10px 0;
        height: auto;
    }

    .nav-links {
        margin: 15px
    }

`

export const Link = styled(NavLink)`
    font-weight: 600;
    padding: 13px;
    margin-right: 10px;
    text-decoration: none;
    color: black;
    border-bottom: 3px transparent;
    border-radius: 20px 20px 0 0;
    transition: background-color .3s, border-bottom .3s;

    &:hover {
        background-color: #e0e0e069;
        border-bottom: 3px solid #e0e0e069;
    }

    &.selected {
        color: #3D9A96;
        border-bottom: 3px solid #3D9A96;
    }


`