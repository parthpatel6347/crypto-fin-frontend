import styled from "styled-components";
import { maxWidth } from "./size";


export const Main = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`
export const CoinDataCointainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 1000px;
    background-color: ${props => props.theme.colors.bgLight};
    border-radius: 15px;
    border: 1px solid rgba(128, 128, 128, 0.1);
    
`

export const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom:25px;
    width: 100%;
    padding:0 20px;
`

export const InfoMain = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    box-sizing: border-box;
    padding-bottom: 15px;
    margin-bottom:20px;
    margin-top: 20px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.1);
    @media ${maxWidth.XS}{
        flex-direction: column;
    }
`

export const InfoRight = styled.div`
    color: white;
    padding: 20px 30px 20px 15px;
    box-sizing: border-box;
    @media ${maxWidth.XS}{
        padding-left:30px;
    }
`

export const InfoLeft = styled.div`
    color: white;
    /* border: 1px solid gray;
    border-radius: 15px; */
    padding: 20px 15px 20px 30px;
    box-sizing: border-box;
`

export const CoinLogo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 18px;
    margin-right: 7px;
`

export const CoinTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const CoinTitleText = styled.span`
    font-size: 28px;
    font-weight: 600;
`

export const CoinSymbolText = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: gray;
    margin-left: 10px;
    margin-top: 9px;
`
export const Info = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`

export const LabelText = styled.span`
    font-size:15px;
    color: gray;
    font-weight: 500;
`
export const InfoText = styled.span`
    font-size: 15px;
    font-weight: 600;
    margin-left: 5px;
`
export const WebLink = styled.a`
    text-decoration: none;
    color: white;
`
export const Price = styled.div`
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
`

const ChangePercent = styled.div`
    border-radius: 5px;
    color: white;
    margin-left: 12px;
    font-size: 14px;
    padding: 2px 6px;
    box-sizing: border-box;
    margin-top: 4px;
`
export const ChangePercentNeg = styled(ChangePercent)`
    background-color: ${(props) => props.theme.colors.red};
`

export const ChangePercentPos = styled(ChangePercent)`
    background-color: ${(props) => props.theme.colors.green};
`

export const ChangePos = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.green};
    margin-top:4px;
    margin-left:5px;
`

export const ChangeNeg = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.red};
    margin-top:4px;
    margin-left:5px;
`

export const InfoTextRight = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-top:4px;
`

export const ButtonGroup = styled.div`
    display:flex;
`

const ChartButton = styled.button`
    outline: none;
    border:1px solid gray;
    color:white;
    height:35px;
    width:50px;
    font-size:14px;
    border: 1px solid rgba(128, 128, 128, 0.4);
    background-color: ${props => props.active ? "#2A37A4" : "#202841"};
    margin-top:10px;
    &:hover{
        background-color: ${props => props.active ? "#2A37A4" : "#323972"};
    }
`

export const ChartButtonLeft = styled(ChartButton)`
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: none;
`
export const ChartButtonMid = styled(ChartButton)`

`
export const ChartButtonRight = styled(ChartButton)`
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left:none;
`

export const Wallet = styled.div`
    width:90%;
    max-width:1000px;
    margin-bottom:75px;
`
export const WalletTitle = styled.div`
    font-size:26px;
    font-weight:600;
    margin: 40px 0 20px;
    color:white
`

export const WalletCoin = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    width:100%;
    color:white;
`

export const WalletInfoMain = styled.div`
    grid-column: span 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.colors.bgLight};
    border: 1px solid rgba(128, 128, 128, 0.1);
    padding:15px 5%;
    border-radius:15px;
    box-sizing:border-box;
    margin-right:10px
    
`

export const WalletCoinTitle = styled.div`
    align-items: center;
    display: flex;
`

export const WalletCoinImg = styled.img`
    width:35px;
    height:35px;
    margin-right:12px;
`
export const WalletCoinName = styled.div`
    display: flex;
    flex-direction: column;
`

export const WalletCoinSymbol = styled.div`
    font-weight: 600;
    font-size:18px;
`

export const WalletCoinNameText = styled.div`
    color:gray;
`

export const WalletCoinAmount = styled.div`
    display: flex;
    flex-direction: column;
`

export const CoinAmount = styled.div`
    font-weight: 600;
    font-size:18px;
`

export const TotalAmount = styled.div`
    color:gray;
`
export const CustomButton = styled.div`
    outline: none;
    padding:10px 30px;
    background-color: #3848CC;
    align-self: center;
    justify-self: center;
    border-radius:10px;
    text-align:center;
    &:hover{
        cursor:pointer;
        background-color: #485CFF;
    }
`
