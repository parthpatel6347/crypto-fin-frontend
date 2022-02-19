import axios from 'axios';
import React, { useContext, useState } from 'react';
import authContext from '../context/auth/authContext';
import { Tab, Tabs, Form, Button } from 'react-bootstrap'
import { FormContainer } from '../styles/TransactionStyles';
import { formatUSD } from '../utils';



function Transaction({ coinData, user, userCoin }) {
    // transaction form fields states
    const [buyQty, setBuyQty] = useState(0)
    const [sellQty, setSellQty] = useState(0)

    const { token } = useContext(authContext)

    const handleBuy = (e) => {
        e.preventDefault()

        // send transaction request
        axios.post("https://crypto-fin.herokuapp.com/api/transact/", {
            "user": user.id,
            "symbol": coinData.id,
            "price": coinData.market_data.current_price.usd,
            "qty": (buyQty / coinData.market_data.current_price.usd).toFixed(5),
            "type": "buy"
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .then(() => {
                // deduct cash from user acc
                axios.patch('https://crypto-fin.herokuapp.com/api/auth/users/me/', {
                    "cash": user.cash - buyQty
                }, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setBuyQty(0)
                        setSellQty(0)
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleSell = (e) => {
        e.preventDefault()

        axios.post("https://crypto-fin.herokuapp.com/api/transact/", {
            "user": user.id,
            "symbol": coinData.id,
            "price": coinData.market_data.current_price.usd,
            "qty": sellQty,
            "type": "sell"
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .then(() => {
                axios.patch('https://crypto-fin.herokuapp.com/api/auth/users/me/', {
                    "cash": parseFloat(user.cash) + parseFloat((sellQty * coinData.market_data.current_price.usd).toFixed(2))
                }, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setBuyQty(0)
                        setSellQty(0)
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <Tabs variant="pills" defaultActiveKey="buy" className="mb-3">
            <Tab eventKey="buy" title="Buy">
                <FormContainer>
                    <Form onSubmit={handleBuy}>
                        <Form.Group className="mb-3">
                            <Form.Label >Enter USD amount</Form.Label>
                            <Form.Text >{" "}Max:{formatUSD.format(user.cash)}</Form.Text>
                            <Form.Control className="mb-2" type='number' name='buyQty' value={buyQty} onChange={e => setBuyQty(e.target.value)} min={0} max={user.cash}></Form.Control>
                            <Form.Text>{(buyQty / coinData.market_data.current_price.usd).toFixed(5)} {(coinData.symbol).toUpperCase()}</Form.Text>
                        </Form.Group>
                        <Button type="submit" variant="success">Buy</Button>
                    </Form>
                </FormContainer>
            </Tab>
            <Tab eventKey="sell" title="Sell">
                <FormContainer>
                    <Form onSubmit={handleSell}>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter {(coinData.symbol).toUpperCase()} amount</Form.Label>
                            <Form.Text >{" "}Max:{(userCoin !== undefined ? userCoin.holding_qty : 0).toFixed(5)}</Form.Text>
                            <Form.Control className="mb-2" type='number' name='sellQty' value={sellQty} onChange={e => setSellQty(e.target.value)} min={0} max={userCoin !== undefined ? userCoin.holding_qty : 0} step="0.01"></Form.Control>
                            <Form.Text>{formatUSD.format(sellQty * coinData.market_data.current_price.usd)}</Form.Text>
                        </Form.Group>
                        <Button type="submit" variant="danger">Sell</Button>
                    </Form>
                </FormContainer>
            </Tab>
        </Tabs>
    );
}

export default Transaction;