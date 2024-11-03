import { motion } from 'framer-motion'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  padding: 12px;
  max-width: 500px;
  text-align: center;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border: 2px solid purple;
`

const StyledParagraph = styled(motion.h4)`
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Oxanium';
`

const WalletInfo = ({ account, network, ethBalance, nexoBalance }) => {
  return (
    <Container>
      <StyledParagraph onClick={() => navigator.clipboard.writeText(account)} style={{ cursor: 'copy' }}>
        Connected Address: {account}
      </StyledParagraph>
      <StyledParagraph style={{ fontSize: '12px' }}>(Click on the address for instant copy)</StyledParagraph>
      <br />
      <StyledParagraph>Connected Network: {network}</StyledParagraph>
      <br />
      <StyledParagraph>
        Your{' '}
        <strong style={{ color: 'purple' }}>
          <i>ETH</i>
        </strong>{' '}
        balance: {ethBalance}
      </StyledParagraph>
      <StyledParagraph>
        Your{' '}
        <strong style={{ color: 'purple' }}>
          <i>Nexo</i>
        </strong>{' '}
        balance: {nexoBalance}
      </StyledParagraph>
    </Container>
  )
}

export default WalletInfo
