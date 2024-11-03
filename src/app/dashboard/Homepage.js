import axios from 'axios'
import { useEffect, useState } from 'react'
import CoinInformationCard from './cards/CoinInformationCard'
import styled from 'styled-components'

const CardContainer = styled.div`
  gap: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LatestPricesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  font-size: 36px;
  color: #ffffff;
  font-family: 'Oxanium';
`

const Homepage = () => {
  const [coins, setCoins] = useState({
    btc: { image: '', lastPrice: 0, token: '', tradeUrl: '' },
    eth: { image: '', lastPrice: 0, token: '', tradeUrl: '' },
    weth: { image: '', lastPrice: 0, token: '', tradeUrl: '' },
    nexo: { image: '', lastPrice: 0, token: '', tradeUrl: '' },
  })

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.REACT_APP_COIN_GECKO_API_KEY },
      }

      const [btc, eth, weth, nexo] = await Promise.all([
        axios.get(`${options.url}/bitcoin`, {
          headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.REACT_APP_COIN_GECKO_API_KEY },
        }),
        axios.get(`${options.url}/ethereum`, {
          headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.REACT_APP_COIN_GECKO_API_KEY },
        }),
        axios.get(`${options.url}/weth`, { headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.REACT_APP_COIN_GECKO_API_KEY } }),
        axios.get(`${options.url}/nexo`, { headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.REACT_APP_COIN_GECKO_API_KEY } }),
      ])

      setCoins({
        btc: {
          image: btc.data.image.small,
          lastPrice: btc.data.market_data.current_price.usd,
          token: 'Bitcoin',
          tradeUrl: btc.data.tickers[0].trade_url,
        },
        eth: {
          image: eth.data.image.small,
          lastPrice: eth.data.market_data.current_price.usd,
          token: 'Ethereum',
          tradeUrl: eth.data.tickers[0].trade_url,
        },
        weth: {
          image: weth.data.image.small,
          lastPrice: weth.data.market_data.current_price.usd,
          token: 'Wrapped Ethereum',
          tradeUrl: weth.data.tickers[0].trade_url,
        },
        nexo: {
          image: nexo.data.image.small,
          lastPrice: nexo.data.market_data.current_price.usd,
          token: 'Nexo',
          tradeUrl: nexo.data.tickers[0].trade_url,
        },
      })
    }

    fetchData()
    // return () => {
    //   fetchData()
    // }
  }, [])

  return (
    <div>
      <LatestPricesContainer>
        <Title>Latest prices</Title>
      </LatestPricesContainer>
      <CardContainer>
        <CoinInformationCard coin={coins.btc} />
        <CoinInformationCard coin={coins.weth} />
        <CoinInformationCard coin={coins.eth} />
        <CoinInformationCard coin={coins.nexo} />
      </CardContainer>
    </div>
  )
}

export default Homepage
