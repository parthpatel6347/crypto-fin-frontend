import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Chart } from 'react-chartjs-2'
import 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



import authContext from '../context/auth/authContext';
import {
    BalanceContainer,
    ChartContainer,
    ChartInner,
    CoinBalance,
    CoinContainer,
    ContentContainer,
    HeaderTitle,
    InfoContainer,
    InfoContent,
    InfoGreen,
    InfoHeader,
    InfoRed,
    Main,
    PLContainer,
    PLPctgGreen,
    PLPctgRed,
    PLUsdGreen,
    PLUsdRed,
    UsdBalance,
    ValuationContainer,
    WalletCoinTitle
} from '../styles/PortfolioStyles';
import { WalletCoinImg, WalletCoinSymbol } from '../styles/CoinStyles';
import Loading from './Loading';
import { formatUSD } from '../utils';


let colors = ["#ADADAD", "#5663BC", "#00ABE5", "#51B994", "#8DB35A", "#F56303", "#D21E24", "#00D194", "#E6007A", "#328332", "#FF9900"]


function Portfolio(props) {
    // state for getting coins data
    const [coinList, setCoinList] = useState([]);
    const [loadingCoinData, setLoadingCoinData] = useState(true);

    const { loadUser, isAuthenticated, loading, user, walletLoading, wallet, getWallet } = useContext(authContext);

    useEffect(() => {
        loadUser();

        // Get coins data
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
            .then(res => {
                setCoinList(res.data)
                setLoadingCoinData(false)
            })

    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            getWallet(user.id)
        }
    }, [user])

    // Calculate current value of investments of the user
    const currentValuation = () => {
        if (loading === false && loadingCoinData === false) {
            let currentHolding = wallet.reduce((sum, current) => {
                let curCoin = coinList.filter(coin => coin.id === current.symbol)[0]
                return sum + (curCoin.current_price * current.holding_qty)
            }, user.cash)

            return currentHolding
        }
    }


    // Calculate initial investment amount for the user
    const investmentAmount = () => {
        if (loading === false && loadingCoinData === false) {
            let initial = wallet.reduce((sum, current) => {
                return sum + (current.avg_cost * current.holding_qty)
            }, user.cash)

            return initial
        }
    }

    // Calculate profit/loss percentage
    const percentPL = () => {
        return (currentValuation() / investmentAmount() * 100) - 100
    }

    // generate chart data
    const genChartData = () => {
        let chartData = {
            labels: ["Cash"],
            datasets: [
                {
                    label: "USD",
                    data: [user.cash],
                    backgroundColor: colors.map(color => color),
                    borderColor: "#191E20",
                    borderWidth: 5,
                    hoverOffset: 5,
                    borderRadius: 5,
                    cutout: "70%"
                }
            ]
        }

        if (loading === false && loadingCoinData === false && walletLoading === false) {

            wallet.forEach(current => {
                let curCoin = coinList.filter(coin => coin.id === current.symbol)[0]
                chartData.labels.push(curCoin.name)
                chartData.datasets[0].data.push(current.holding_qty * curCoin.current_price)
            });
        }
        return chartData
    }

    return (<Main>
        {loading === false && loadingCoinData === false && walletLoading === false ? (
            <ContentContainer>
                <HeaderTitle>Profit & Loss Summary</HeaderTitle>
                <ValuationContainer>
                    <InfoContainer>
                        <InfoHeader>Initial Investment</InfoHeader>
                        <InfoContent>{formatUSD.format(investmentAmount())}</InfoContent>
                    </InfoContainer>
                    <InfoContainer>
                        <InfoHeader>Current Valuation</InfoHeader>
                        <InfoContent>{formatUSD.format(currentValuation())}</InfoContent>
                    </InfoContainer>
                    <InfoContainer>
                        <InfoHeader>Profit/Loss</InfoHeader>
                        {currentValuation() - investmentAmount() < 0 ? (
                            <InfoRed>
                                {formatUSD.format(currentValuation() - investmentAmount())}
                                <span style={{ marginLeft: "5px" }}>({percentPL().toFixed(2)}%)</span>
                            </InfoRed>
                        ) : (
                            <InfoGreen>
                                {formatUSD.format(currentValuation() - investmentAmount())}
                                <span style={{ marginLeft: "5px" }}>({percentPL().toFixed(2)}%)</span>
                            </InfoGreen>)}
                    </InfoContainer>
                </ValuationContainer>
                <HeaderTitle>Portfolio Allocation</HeaderTitle>
                <ChartContainer>
                    <ChartInner>
                        <Chart
                            type='doughnut'
                            data={genChartData()}
                        />
                    </ChartInner>
                </ChartContainer>
                <HeaderTitle>{wallet.length ? "Wallet" : ""}</HeaderTitle>
                {wallet.map(userCoin => (
                    coinList.map(coin => coin.id === userCoin.symbol && (
                        <CoinContainer as={Link} to={`/coins/${coin.id}`} key={coin.id}>
                            <WalletCoinTitle>
                                <WalletCoinImg src={coin.image} />
                                <WalletCoinSymbol>{coin.name}</WalletCoinSymbol>
                            </WalletCoinTitle>
                            <BalanceContainer>
                                <InfoHeader>Balance</InfoHeader>
                                <CoinBalance>
                                    {userCoin.holding_qty.toFixed(6)} {(coin.symbol).toUpperCase()}
                                </CoinBalance>
                                <UsdBalance>
                                    {formatUSD.format(coin.current_price * userCoin.holding_qty)}
                                </UsdBalance>
                            </BalanceContainer>
                            {coin.current_price - userCoin.avg_cost < 0 ? (
                                <PLContainer>
                                    <InfoHeader>Profit/Loss</InfoHeader>
                                    <PLUsdRed>{formatUSD.format(userCoin.holding_qty * (coin.current_price - userCoin.avg_cost))}</PLUsdRed>
                                    <PLPctgRed><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "3px" }} />{Math.abs(((coin.current_price / userCoin.avg_cost * 100) - 100).toFixed(2))}%</PLPctgRed>
                                </PLContainer>
                            ) : (
                                <PLContainer>
                                    <InfoHeader>Profit/Loss</InfoHeader>
                                    <PLUsdGreen>{formatUSD.format(userCoin.holding_qty * (coin.current_price - userCoin.avg_cost))}</PLUsdGreen>
                                    <PLPctgGreen><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "3px" }} />{((coin.current_price / userCoin.avg_cost * 100) - 100).toFixed(2)}%</PLPctgGreen>
                                </PLContainer>
                            )}
                        </CoinContainer>
                    ))
                ))}
            </ContentContainer>
        ) : (
            <Loading />
        )}
    </Main>
    );
}

export default Portfolio;