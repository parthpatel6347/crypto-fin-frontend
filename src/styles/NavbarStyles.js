import styled from "styled-components";
import { Link } from "react-router-dom";
import { maxWidth } from "./size";



export const NavbarContainer = styled.div`
    display: flex;
    height: 55px;
    align-items: center;
    width: 100%;
    background-color: black;
    justify-content: center;
`

export const NavbarInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    @media ${maxWidth.XXS}{
        width: 90%;
    }
`

export const NavLinksContainer = styled.div`
    display: flex;
`

export const Title = styled(Link)`
    text-decoration: none;
    color: #485CFF;
    font-size:20px;
    font-weight: 600;
    letter-spacing: 0.5px;
    &:hover{
        color:#485CFF;
    }
`

export const NavLink = styled(Link)`
    border-bottom: ${props => props.active === "true" ? "3px solid white" : "none"};
    border-bottom-color:#485CFF;
    padding: 13px 0;
    box-sizing: border-box;
    margin-left: 30px;
    text-decoration: none;
    color:${props => props.active === "true" ? "#CECECE" : "#7A7B7C"};
    font-weight: 500;
    transition: color 0.2s linear;
    &:hover{
        color:#CECECE;
    }
    @media ${maxWidth.XXS}{
        display: ${props => props.to === "/dashboard" ? "none" : ""};
    }
`
export const LogoutBtn = styled.div`
    padding: 13px 0;
    box-sizing: border-box;
    margin-left: 30px;
    text-decoration: none;
    color:#7A7B7C;
    font-weight: 500;
    transition: color 0.2s linear;
    &:hover{
        color:#CECECE;
        cursor: pointer;
    }
`