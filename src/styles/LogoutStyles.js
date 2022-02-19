import styled from "styled-components";
import { CustomButton } from "./CoinStyles";

export const Main = styled.div`
    padding:25px;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const StyledText = styled.span`
    font-size: 16px
`
export const LogoutButton = styled(CustomButton)`
    width:90px;
    padding:7px 10px;
    margin-top: 15px;
`