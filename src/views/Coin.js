import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { Modal } from 'react-bootstrap'

import { useParams } from 'react-router-dom';
import Transaction from './Transaction';
import authContext from '../context/auth/authContext';
import { ChartContainer, CoinLogo, InfoLeft, InfoMain, InfoRight, Main, CoinTitle, CoinTitleText, CoinSymbolText, Info, LabelText, InfoText, WebLink, Price, ChangeNeg, ChangePos, ChangePercentNeg, ChangePercentPos, InfoTextRight, ChartButtonLeft, ChartButtonRight, ChartButtonMid, ButtonGroup, WalletCoin, Wallet, WalletInfoMain, WalletCoinTitle, WalletCoinImg, WalletCoinName, WalletCoinSymbol, WalletCoinNameText, WalletCoinAmount, CoinAmount, TotalAmount, CustomButton, WalletTitle, CoinDataCointainer } from '../styles/CoinStyles';
import { Fragment } from 'react';
import { formatUSD, formatUSDWhole } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading';
import CoinError from './CoinError';




function Coin(props) {

    // states for coin data from API, loading and error
    const [coinData, setCoinData] = useState({})
    const [coinLoading, setCoinLoading] = useState(true);
    const [coinError, setCoinError] = useState(false);

    // state for getting chartpoints from API
    const [loadingChart, setLoadingChart] = useState(true);
    const [chartPoints, setChartPoints] = useState({});

    // state for transaction modal visibility
    const [isHidden, setIsHidden] = useState(true);

    // chart state for no.of days
    const [chart, setChart] = useState(1);

    // state for coin details in users wallet
    const [userCoin, setUserCoin] = useState({});

    // Hide/Show transaction modal
    const handleClose = () => setIsHidden(true);
    const handleShow = () => setIsHidden(false);

    let { id } = useParams();

    const { loadUser, isAuthenticated, user, walletLoading, wallet, getWallet, token } = useContext(authContext)


    useEffect(() => {
        // get coin data
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
            .then(res => {
                setCoinData(res.data)
                setCoinLoading(false)
            })
            .catch(err => setCoinError(true)) //if no coin was found set coinError to true

        if (token) {
            loadUser()
        }
    }, [])

    useEffect(() => {
        // get user wallet
        if (isAuthenticated) {
            getWallet(user.id)
        }
    }, [user])

    useEffect(() => {
        // get coin data from users wallet , corresponding to the coin page.
        if (!walletLoading) {
            setUserCoin(wallet.filter(coin => coin.symbol === id)[0])
        }
    }, [wallet, walletLoading])

    useEffect(() => {
        // get chart data
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${chart}`)
            .then(res => {
                setChartPoints(res.data)
                setLoadingChart(false)
            })
    }, [chart])

    // If any error while getting coin data from API, go to CoinError page
    return coinError ? <CoinError /> : (
        <Main>
            {coinLoading === false ? (
                <Fragment>
                    <CoinDataCointainer>
                        <InfoMain>
                            <InfoLeft>
                                <CoinTitle>
                                    <CoinLogo src={coinData.image.small} />
                                    <CoinTitleText>{coinData.name}</CoinTitleText>
                                    <CoinSymbolText>{(coinData.symbol).toUpperCase()}</CoinSymbolText>
                                </CoinTitle>
                                <Info>
                                    <LabelText>Rank:</LabelText>
                                    <InfoText>#{coinData.market_cap_rank}</InfoText>
                                </Info>
                                <Info>
                                    <LabelText>Website:</LabelText>
                                    <InfoText><WebLink href={coinData.links.homepage[0]}>{coinData.links.homepage[0]}</WebLink> <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginLeft: "2px" }} /></InfoText>
                                </Info>
                                <Info>
                                    <LabelText>Circulating supply:</LabelText>
                                    <InfoText>{coinData.market_data.circulating_supply} {coinData.symbol}</InfoText>
                                </Info>
                            </InfoLeft>
                            <InfoRight>
                                <Price>
                                    {formatUSD.format(coinData.market_data.current_price.usd)}
                                    {coinData.market_data.price_change_percentage_24h < 0 ? (
                                        <ChangePercentNeg><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "3px" }} />{(Math.abs(coinData.market_data.price_change_percentage_24h)).toFixed(2)}%</ChangePercentNeg>
                                    ) : (
                                        <ChangePercentPos><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "3px" }} />{(coinData.market_data.price_change_percentage_24h).toFixed(2)}%</ChangePercentPos>
                                    )}
                                </Price>
                                {coinData.market_data.price_change_24h < 0 ? (
                                    <ChangeNeg><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "5px" }} />{formatUSD.format(Math.abs(coinData.market_data.price_change_24h))}</ChangeNeg>
                                ) : (
                                    <ChangePos><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "5px" }} />{formatUSD.format(coinData.market_data.price_change_24h)}</ChangePos>
                                )}
                                <Info>
                                    <LabelText>Market Cap</LabelText>
                                </Info>
                                <InfoTextRight>{formatUSDWhole.format(coinData.market_data.market_cap.usd)}</InfoTextRight>
                                {coinData.market_data.market_cap_change_percentage_24h < 0 ? (
                                    <ChangeNeg><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "5px" }} />{(Math.abs(coinData.market_data.market_cap_change_percentage_24h)).toFixed(2)}%</ChangeNeg>
                                ) : (
                                    <ChangePos><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "5px" }} />{(coinData.market_data.market_cap_change_percentage_24h).toFixed(2)}%</ChangePos>
                                )}
                            </InfoRight>
                        </InfoMain>
                        {loadingChart === false && (
                            <ChartContainer>
                                <Chart
                                    type='line'
                                    data={{
                                        labels: chartPoints.prices.map(datapoint => new Date(datapoint[0]).toLocaleString()),
                                        datasets: [{
                                            label: "USD",
                                            data: chartPoints.prices.map(datapoint => datapoint[1]),
                                            borderColor: 'rgb(72, 92, 255)',
                                            borderWidth: 2,
                                            fill: true,
                                            backgroundColor: 'rgba(72, 92, 255, 0.15)',
                                            tension: 0.3,
                                            pointRadius: 0,
                                            pointHitRadius: 6,
                                        }]
                                    }}
                                    options={{
                                        scales: {
                                            x: {
                                                display: false
                                            },
                                            y: {
                                                display: true
                                            }
                                        },
                                        plugins: {
                                            tooltip: {
                                                displayColors: false,
                                                callbacks: {
                                                    // title: function(){}
                                                }
                                            },
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}

                                />
                                <ButtonGroup>
                                    <ChartButtonLeft name="chart" onClick={() => setChart(1)} active={chart === 1}>24h</ChartButtonLeft>
                                    <ChartButtonMid name="chart" onClick={() => setChart(7)} active={chart === 7}>7D</ChartButtonMid>
                                    <ChartButtonRight name="chart" onClick={() => setChart(30)} active={chart === 30}>30D</ChartButtonRight>
                                </ButtonGroup>
                            </ChartContainer>

                        )}
                    </CoinDataCointainer>
                    <Wallet>
                        <WalletTitle>Wallet</WalletTitle>
                        <WalletCoin>
                            <WalletInfoMain>
                                <WalletCoinTitle>
                                    <WalletCoinImg src={coinData.image.small} />
                                    <WalletCoinName>
                                        <WalletCoinSymbol>{(coinData.symbol).toUpperCase()}</WalletCoinSymbol>
                                        <WalletCoinNameText>{coinData.name}</WalletCoinNameText>
                                    </WalletCoinName>
                                </WalletCoinTitle>
                                {userCoin && userCoin.holding_qty !== undefined ? (
                                    <WalletCoinAmount>
                                        <CoinAmount>
                                            {(userCoin.holding_qty).toFixed(6)}
                                        </CoinAmount>
                                        <TotalAmount>
                                            {(formatUSD.format(userCoin.holding_qty * coinData.market_data.current_price.usd))}
                                        </TotalAmount>
                                    </WalletCoinAmount>
                                ) : (
                                    <WalletCoinAmount>
                                        <CoinAmount>
                                            0
                                        </CoinAmount>
                                        <TotalAmount>
                                            {(formatUSD.format(0))}
                                        </TotalAmount>
                                    </WalletCoinAmount>
                                )}
                            </WalletInfoMain>
                            {isAuthenticated && (
                                <CustomButton onClick={handleShow}>Trade</CustomButton>
                            )}
                        </WalletCoin>
                    </Wallet>
                    {/* Transaction Modal */}
                    {isAuthenticated && !isHidden && (
                        <Modal show={!isHidden} onHide={handleClose} centered>

                            <Transaction user={user} coinData={coinData} userCoin={userCoin} coinId={id} />
                        </Modal>
                    )}
                </Fragment>
            ) : (
                <Loading />
            )}
        </Main>
    );
}

export default Coin;