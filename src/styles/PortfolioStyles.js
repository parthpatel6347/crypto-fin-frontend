import styled from "styled-components";
import { maxWidth } from "./size";


export const Main = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
`

export const ContentContainer = styled.div`
    width: 90%;
    display: flex;
    max-width: 800px;
    flex-direction: column;
    align-items: center;
`

export const ValuationContainer = styled.div`
    background-color: ${(props) => props.theme.colors.bgLight};
    border: 1px solid rgba(128, 128, 128, 0.1);
    display: flex;
    border-radius: 15px;
    padding:20px;
    width: 100%;
    justify-content: space-between;
    @media ${maxWidth.XS}{
        flex-direction: column;
        justify-content: unset;
        align-items: center;
    }
`
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${maxWidth.XS}{
        margin:11px 0;
    }
`
export const InfoHeader = styled.div`
    color: gray;
    font-size: 15px;
    font-weight: 500;
`
export const InfoContent = styled.div`
    color:white;
    font-size: 18px;
    font-weight: 500;
`


export const HeaderTitle = styled.div`
    font-size: 20px;
    color: white;
    margin-top: 35px;
    margin-bottom:5px;
    align-self: flex-start;
    color: #BCBCBC;
    margin-left:15px;
`
export const ChartContainer = styled.div`
    background-color: ${(props) => props.theme.colors.bgLight};
    border: 1px solid rgba(128, 128, 128, 0.1);
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding:20px 0;
`
export const ChartInner = styled.div`
    max-width: 500px;
    width: 100%;
`

export const CoinContainer = styled.div`
    background-color: ${(props) => props.theme.colors.bgLight};
    color:white;
    border: 1px solid rgba(128, 128, 128, 0.1);
    display: grid;
    width: 100%;
    border-radius:15px;
    box-sizing: border-box;
    padding: 15px 25px;
    margin-bottom: 15px;
    grid-template-columns:repeat(4, 1fr);
    max-width: 800px;
    text-decoration: none;
    &:hover{
        text-decoration: none;
        color: white;
        background-color: ${(props) => props.theme.colors.bgHover};
    }
    @media ${maxWidth.XS}{
        grid-template-columns:repeat(2, 1fr);
    }

`
export const WalletCoinTitle = styled.div`
    align-items: center;
    display: flex;
    grid-column: span 2;
    @media ${maxWidth.XS}{
        justify-self: center;
        margin-bottom:20px;
    }
`

export const BalanceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: end;
    @media ${maxWidth.XS}{
        justify-self: center;
    }
`

export const CoinBalance = styled.div`
    font-size:15px;
    font-weight: 500;
`

export const UsdBalance = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #BBBBBB;
`

export const PLContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: end;
    @media ${maxWidth.XS}{
        justify-self: center;
    }
`

export const PLUsd = styled.div`
    font-size:15px;
    font-weight: 500;
`

export const PLPctg = styled.div`
    font-size: 14px;
    font-weight: 500;
`

export const InfoRed = styled(InfoContent)`
    color:${props => props.theme.colors.red}
`
export const InfoGreen = styled(InfoContent)`
    color:${props => props.theme.colors.green}
`

export const PLUsdGreen = styled(PLUsd)`
    color:${props => props.theme.colors.green}
`

export const PLUsdRed = styled(PLUsd)`
    color:${props => props.theme.colors.red}
`

export const PLPctgGreen = styled(PLPctg)`
    color:${props => props.theme.colors.green}
`

export const PLPctgRed = styled(PLPctg)`
    color:${props => props.theme.colors.red}
`