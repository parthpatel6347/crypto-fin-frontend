import styled from "styled-components";

export const Main = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top:50px;
    color: #CECECE;
`

export const FormContainer = styled.div`
    display: flex;
    max-width: 350px;
    width: 90%;
    background-color: ${(props) => props.theme.colors.bgLight};
    border: 1px solid rgba(128, 128, 128, 0.1);
    padding:20px 30px 30px;
    box-sizing: border-box;
    border-radius:15px;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;
    
`
export const HeaderText = styled.div`
    font-size: 28px;
    margin-bottom: 10px;
`
export const ErrorText = styled.div`
    color:${(props) => props.theme.colors.red};
    font-size: 14px;
    font-weight:500;
`
export const SubmitButton = styled.button`
    outline: none;
    padding:10px 30px;
    background-color: #3848CC;
    border:none;
    color:white;
    align-self: center;
    justify-self: center;
    border-radius:10px;
    text-align:center;
    width: 100%;
    &:hover{
        cursor:pointer;
        background-color: #485CFF;
    }
`