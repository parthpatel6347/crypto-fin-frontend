import styled from "styled-components";
import { Link } from "react-router-dom";
import { maxWidth } from "./size";

export const Main = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`

export const CoinContainer = styled(Link)`
    width: 80%;
    background-color: ${(props) => props.theme.colors.bgLight};
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    border: 1px solid rgba(128, 128, 128, 0.1);
    margin:0px 0;
    text-decoration: none;
    color: white;
    align-items:center;
    justify-items: center;
    box-sizing: border-box;
    padding: 14px 10px;
    &:last-child {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    &:hover{
        color:white;
        background-color:${(props) => props.theme.colors.bgHover};

    }
    @media ${maxWidth.M}{
        width: 90%;
    }
    @media ${maxWidth.S}{
        grid-template-columns: repeat(9, 1fr);
    }
    @media ${maxWidth.XS}{
        grid-template-columns: repeat(8, 1fr);
    }
    @media ${maxWidth.XXS}{
        grid-template-columns: repeat(6, 1fr);
    }
    `

export const TableTitles = styled.div`
    width: 80%;
    background-color:black;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    border: 1px solid rgba(128, 128, 128, 0.25);
    /* margin:15px 0; */
    padding: 14px 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: #8D8D8D;
    align-items:center;
    justify-items: center;
    @media ${maxWidth.M}{
        width: 90%;
    }
    @media ${maxWidth.S}{
        grid-template-columns: repeat(9, 1fr);
    }
    @media ${maxWidth.XS}{
        grid-template-columns: repeat(8, 1fr);
    }
    @media ${maxWidth.XXS}{
        grid-template-columns: repeat(6, 1fr);
    }
`

export const CoinMain = styled.div`
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-self: start;
`
export const CoinMainInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const GridITem = styled.div`
    grid-column: ${props => props.val === "rank" ? "span 1" : "span 2"};
    @media ${maxWidth.S}{
        display: ${props => props.val === "7d" ? "none" : ""};
    }
    @media ${maxWidth.XS}{
        display: ${props => props.val === "rank" ? "none" : ""};
    }
    @media ${maxWidth.XXS}{
        display: ${props => props.val === "mcap" ? "none" : ""};
    }
`

export const CoinImage = styled.img`
    height: 25px;
    width: 25px;
    border-radius: 15px;
    margin-left: 20px;
    margin-right: 10px;
    @media ${maxWidth.XS}{
        margin-left: 7px;
    }
`

export const Symbol = styled.span`
    color: #BEC0C0;
    font-size: 13px;
`
export const ChangePos = styled.span`
    color:${(props) => props.theme.colors.green};
`

export const ChangeNeg = styled.span`
    color:${(props) => props.theme.colors.red};
`