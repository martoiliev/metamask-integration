import Swap from './swap/Swap'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import Homepage from './dashboard/Homepage'
import { useSDK } from '@metamask/sdk-react'
import styled, { css } from 'styled-components'
import React, { useEffect, useState, useMemo } from 'react'
import WalletInfo from './dashboard/wallet-info/WalletInformation'
import { ERC20_ABI, handleError, letter, sentence } from './helper/helpers'

const MainContainer = styled.div`
  padding: 24px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #000000;
`

const HeadingContainer = styled.div`
  display: flex;
  padding: 100px 0;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.addGap &&
    css`
      gap: 48px;
    `}
`

const IntroContent = styled.h1`
  color: #a1a0a7;
  font-size: 48px;
  line-height: 1.5;
  font-weight: 400;
  text-align: left;
  word-break: break-word;
  font-family: 'Oxanium', sans-serif;
`

const StyledButton = styled.button`
  border: 0;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 24px;
  font-family: 'Oxanium';
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const App = () => {
  const { account, sdk } = useSDK()
  const [balances, setBalances] = useState({ ethBalance: 0, nexoBalance: 0 })
  const [network, setNetwork] = useState('')
  const [connected, setConnected] = useState(false)

  const firstHeading = useMemo(() => 'Empowering Your Crypto Journey', [])
  const secondHeading = useMemo(() => 'Trade, Buy, and Sell with Confidence', [])

  const disconnect = async () => {
    try {
      await sdk?.terminate()

      setBalances({ ethBalance: 0, nexoBalance: 0 })
      setNetwork('')
      setConnected(false)
    } catch (error) {
      handleError(error)
    }
  }

  const fetchBalances = async (provider, signer, address) => {
    try {
      const ethBalance = await provider.getBalance(address)
      const nexo = new ethers.Contract(process.env.REACT_APP_NEXO_ADDRESS, ERC20_ABI, provider)

      const nexoBalance = network === process.env.REACT_APP_MAIN_ETHEREUM_NETWORK ? await nexo.balanceOf(address) : 0

      setBalances({
        ethBalance: ethers.utils.formatEther(ethBalance),
        nexoBalance: nexoBalance ? ethers.utils.formatUnits(nexoBalance, 18) : 0,
      })
    } catch (error) {
      handleError(error)
    }
  }

  const connect = async () => {
    try {
      if (!window.ethereum) throw new Error('Ethereum provider is not available.')

      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])

      const _network = (await provider.getNetwork()).name
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      setNetwork(_network)
      setConnected(true)

      await fetchBalances(provider, signer, address)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts) => {
      accounts.length === 0 ? disconnect() : connect()
    }

    const handleChainChanged = () => connect()

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return (
    <MainContainer>
      <HeadingContainer addGap={connected}>
        <motion.div variants={sentence} initial="hidden" animate="visible">
          <IntroContent>
            {[...firstHeading].map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            {[...secondHeading].map((char, index) => (
              <motion.span key={index} variants={letter} style={{ color: 'purple' }}>
                {char}
              </motion.span>
            ))}
          </IntroContent>
          <ButtonContainer>
            <StyledButton onClick={connect}>{connected && account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect wallet'}</StyledButton>
            {connected && (
              <StyledButton onClick={disconnect} style={{ marginLeft: '8px' }}>
                Disconnect
              </StyledButton>
            )}
          </ButtonContainer>
        </motion.div>
        <div style={{ maxWidth: '50%' }}>
          <Swap isWalletConnected={connected} network={network} />
        </div>
      </HeadingContainer>

      {connected && account && <WalletInfo account={account} network={network} ethBalance={balances.ethBalance} nexoBalance={balances.nexoBalance} />}

      <Homepage />
    </MainContainer>
  )
}

export default App
