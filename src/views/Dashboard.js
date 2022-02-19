import axios from 'axios';
import React, { useEffect, useState, Fragment, useContext } from 'react';
import authContext from '../context/auth/authContext';
import { CoinContainer, CoinMain, CoinMainInner, GridITem, Main, TableTitles, CoinImage, Symbol, ChangeNeg, ChangePos } from '../styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { formatUSD, formatUSDWhole } from '../utils';
import Loading from "./Loading"


function Dashboard(props) {
  // state for saving coins data
  const [coinList, setCoinList] = useState([])
  const [loadingCoins, setLoadingCoins] = useState(true)

  const { loadUser, token } = useContext(authContext)

  useEffect(() => {
    if (token) {
      loadUser();
    }

    // get coin data from api
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h%2C7d')
      .then(res => {
        setCoinList(res.data)
        setLoadingCoins(false)
      })
  }, [])

  return (
    <Main>
      {loadingCoins === false ? (
        <Fragment>
          <TableTitles>
            <GridITem val={"rank"}>Rank</GridITem>
            <GridITem>Name</GridITem>
            <GridITem>Price</GridITem>
            <GridITem>24h %</GridITem>
            <GridITem val={"7d"}>7d %</GridITem>
            <GridITem val={"mcap"}>Market Cap</GridITem>
          </TableTitles>
          {coinList.map(coin => (
            <CoinContainer to={`/coins/${coin.id}`} key={coin.id}>
              <GridITem val={"rank"}>{coin.market_cap_rank}</GridITem>
              <CoinMain>
                <CoinImage src={coin.image} />
                <CoinMainInner>
                  <span>{coin.name}</span>
                  <Symbol>{coin.symbol.toUpperCase()}</Symbol>
                </CoinMainInner>
              </CoinMain>
              <GridITem>{formatUSD.format(coin.current_price)}</GridITem>
              <GridITem>
                {coin.price_change_percentage_24h < 0 ? (
                  <ChangeNeg><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "3px" }} />{(Math.abs(coin.price_change_percentage_24h)).toFixed(2)}%</ChangeNeg>
                ) : (
                  <ChangePos><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "3px" }} />{(coin.price_change_percentage_24h).toFixed(2)}%</ChangePos>
                )}
              </GridITem>
              <GridITem val={"7d"}>
                {coin.price_change_percentage_7d_in_currency < 0 ? (
                  <ChangeNeg><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: "3px" }} />{(Math.abs(coin.price_change_percentage_7d_in_currency)).toFixed(2)}%</ChangeNeg>
                ) : (
                  <ChangePos><FontAwesomeIcon icon={faAngleUp} style={{ marginRight: "3px" }} />{(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</ChangePos>
                )}
              </GridITem>
              <GridITem val={"mcap"}>{formatUSDWhole.format(coin.market_cap)}</GridITem>
            </CoinContainer>
          ))}
        </Fragment>
      ) : (
        <Loading />
      )}
    </Main>
  );
}

export default Dashboard;