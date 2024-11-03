import styled from 'styled-components'

const Container = styled.div`
  min-width: 200px;
  max-width: 200px;
  padding: 6px 12px;
  border-radius: 12px;
  border: 2px solid #363c4e;
`

const CardHeader = styled.div`
  width: 100%;
  padding: 12px 0px;
  justify-content: center;
`

const CoinInfoContainer = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
`

const CoinImage = styled.img`
  max-width: 32px;
  max-height: 32px;
  object-fit: contain;
`

const LastPriceContainer = styled.div`
  margin-top: 12px;
`

const LastPriceSpan = styled.span`
  color: #ffffff;
  font-size: 28px;
  font-family: 'Oxanium';
`

const Trade = styled.a`
  display: flex;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Oxanium';
  justify-content: center;
`

const CoinInformationCard = ({ coin }) => {
  const { image, lastPrice, token, tradeUrl } = coin

  return (
    <Container>
      <CardHeader>
        <CoinInfoContainer>
          <CoinImage src={image} />
          <span style={{ color: '#ffffff' }}>{token}</span>
        </CoinInfoContainer>
        <LastPriceContainer>
          <LastPriceSpan> ${lastPrice}</LastPriceSpan>
        </LastPriceContainer>
      </CardHeader>
      <Trade href={tradeUrl} target="_blank" rel="noopener noreferrer">
        Trade
      </Trade>
    </Container>
  )
}

export default CoinInformationCard
