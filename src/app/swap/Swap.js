import { ethers } from 'ethers'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { handleError, switchNetwork, WETH_ABI } from '../helper/helpers'

const SwapperContainer = styled.div`
  padding: 40px;
  background: #131722;
  border-radius: 40px;
  box-shadow: 0 20px 25px rgba(22, 28, 45, 0.05);
`

const SwapperTitle = styled.label`
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  border-color: #363c4e;
  font-family: 'Oxanium';
`

const Balances = styled.div`
  gap: 20px;
  display: flex;
  padding: 8px 0px;
  justify-content: center;
`

const BalanceSpan = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-family: 'Oxanium';
`

const StyledButton = styled.button`
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  font-family: 'Oxanium';

  color: #ffffff;
  background: transparent;
  border: 2px solid rgba(165, 141, 190, 1);

  &:hover {
    box-shadow: 5px 5px 5px 5px rgba(165, 141, 190, 1);
  }
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 0px 16px 0px;
`

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 4px solid rgba(165, 141, 190, 1);

  &::placeholder {
    font-family: 'Oxanium';
  }

  &:active {
    font-size: 13px;
    font-family: 'Oxanium';
  }
  &:focus {
    outline: none;
  }
`

export const Swap = ({ isWalletConnected, network }) => {
  const [amount, setAmount] = useState('')
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [ethBalance, setEthBalance] = useState('0')
  const [wethBalance, setWethBalance] = useState('0')
  const [wethContract, setWethContract] = useState(null)

  useEffect(() => {
    if (isWalletConnected) {
      const initProvider = async () => {
        const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

        const _signer = _provider.getSigner()
        const _wethContract = new ethers.Contract(process.env.REACT_APP_WETH_ADDRESS, WETH_ABI, _signer)

        setProvider(_provider)
        setSigner(_signer)
        setWethContract(_wethContract)
      }

      initProvider()
    }
  }, [isWalletConnected])

  const fetchBalances = async () => {
    if (network === process.env.REACT_APP_MAIN_ETHEREUM_NETWORK) {
      const ethBalance = await provider.getBalance(await signer.getAddress())
      const wethBalance = await wethContract.balanceOf(await signer.getAddress())

      setEthBalance(ethers.utils.formatEther(ethBalance))
      setWethBalance(ethers.utils.formatEther(wethBalance))
    }
  }

  useEffect(() => {
    if (provider && wethContract) fetchBalances()
  }, [provider, wethContract])

  const wrapETH = async () => {
    try {
      if (network !== process.env.REACT_APP_MAIN_ETHEREUM_NETWORK) {
        switchNetwork()
      } else {
        const tx = await wethContract.deposit({ value: ethers.utils.parseEther(amount) })
        await tx.wait()

        fetchBalances()
      }
    } catch (error) {
      handleError(error)
    }
  }

  const unwrapWETH = async () => {
    try {
      if (network !== process.env.REACT_APP_MAIN_ETHEREUM_NETWORK) {
        switchNetwork()
      } else {
        const tx = await wethContract.withdraw(ethers.utils.parseEther(amount))
        await tx.wait()

        fetchBalances()
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <>
      {isWalletConnected && (
        <SwapperContainer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SwapperTitle>Swap your ETH tokens</SwapperTitle>
          </div>
          <Balances>
            <BalanceSpan>
              ETH Balance: <br /> <BalanceSpan style={{ display: 'flex', justifyContent: 'center' }}>{ethBalance}</BalanceSpan>
            </BalanceSpan>
            <BalanceSpan>
              WETH Balance: <br /> <BalanceSpan style={{ display: 'flex', justifyContent: 'center' }}> {wethBalance}</BalanceSpan>
            </BalanceSpan>
          </Balances>
          <InputContainer>
            <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </InputContainer>
          {network !== process.env.REACT_APP_MAIN_ETHEREUM_NETWORK ? (
            <div style={{ display: 'grid', justifyContent: 'center', gap: '8px' }}>
              <BalanceSpan style={{ display: 'flex', textAlign: 'center' }}>Please change to Ethereum network</BalanceSpan>
              <StyledButton onClick={switchNetwork}>Change network</StyledButton>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <StyledButton onClick={wrapETH}>Wrap ETH to WETH</StyledButton>
              <StyledButton onClick={unwrapWETH}>Unwrap WETH to ETH</StyledButton>
            </div>
          )}
        </SwapperContainer>
      )}
    </>
  )
}

export default Swap
