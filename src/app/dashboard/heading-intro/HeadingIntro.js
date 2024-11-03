// import { ethers } from 'ethers'
// import { useEffect, useState } from 'react'
// import Swap from '../../swap/Swap'
// import { motion } from 'framer-motion'
// import styled, { css } from 'styled-components'
// import { handleError, letter, sentence } from '../../helper/helpers'
// import { useSDK } from '@metamask/sdk-react'

// const HeadingContainer = styled.div`
//   display: flex;
//   padding: 100px 0px;
//   justify-content: center;
//   align-items: center !important;

//   ${(props) =>
//     props.addGap &&
//     css`
//       gap: 48px;
//     `}
// `

// const IntroContentContainer = styled.div`
//   flex: 0 0 50%;
//   max-width: 50%;
//   padding: 10px 0px;
// `

// const IntroContent = styled.h1`
//   color: #a1a0a7;
//   font-size: 48px;
//   line-height: 1.5;
//   font-weight: 400;
//   text-align: left;
//   word-break: break-word;
//   font-family: 'Oxanium', sans-serif;
// `

// const StyledButton = styled.button`
//   border: 0;
//   padding: 16px;
//   font-size: 18px;
//   cursor: pointer;
//   border-radius: 24px;
//   font-family: 'Oxanium';
// `

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `

// const line1 = 'Empowering Your Crypto Journey'
// const line2 = 'Trade, Buy, and Sell with Confidence'

// const HeadingIntro = () => {
//   const { account, sdk } = useSDK()

//   const [network, setNetwork] = useState()
//   const [connected, setConnected] = useState(false)
//   const [balances, setBalances] = useState({
//     ethBalance: 0,
//     nexoBalance: 0,
//   })

//   const disconnect = async () => {
//     await sdk?.terminate()

//     setBalances({ ethBalance: 0, nexoBalance: 0 })
//     setNetwork('')
//     setConnected(false)
//   }

//   const connect = async () => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

//       await provider.send('eth_requestAccounts', [])

//       const _network = (await provider.getNetwork()).name
//       const signer = provider.getSigner()
//       const address = await signer.getAddress()
//       const balance = await provider.getBalance(address)

//       setBalances({
//         ethBalance: ethers.utils.formatEther(balance),
//         nexoBalance: 5,
//       })

//       setNetwork(_network)
//       setConnected(true)
//     } catch (error) {
//       setConnected(false)
//       handleError(error.message)
//     }
//   }

//   useEffect(() => {
//     const handleAccountsChanged = (accounts) => {
//       if (accounts.length === 0) {
//         disconnect()
//       } else {
//         connect()
//       }
//     }

//     const handleChainChanged = () => {
//       connect()
//     }

//     window.ethereum.on('accountsChanged', handleAccountsChanged)
//     window.ethereum.on('chainChanged', handleChainChanged)

//     return () => {
//       window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
//       window.ethereum.removeListener('chainChanged', handleChainChanged)
//     }
//   }, [])

//   return (
//     <HeadingContainer addGap={connected}>
//       <motion.IntroContentContainer variants={sentence} initial="hidden" animate="visible">
//         <IntroContent>
//           {line1.split('').map((char, index) => {
//             return (
//               <motion.IntroContent key={char + '-' + index} variants={letter}>
//                 {char}
//               </motion.IntroContent>
//             )
//           })}
//           <br />
//           {line2.split('').map((char, index) => {
//             return (
//               <motion.IntroContent key={char + '-' + index} variants={letter}>
//                 <strong style={{ color: 'purple' }}>{char}</strong>
//               </motion.IntroContent>
//             )
//           })}
//         </IntroContent>
//         <ButtonContainer>
//           <StyledButton onClick={connect}>
//             {connected && account ? `${account.substring(0, 7)}...${account.substring(account.length - 5)}` : 'Connect wallet'}
//           </StyledButton>
//           {connected && (
//             <StyledButton style={{ marginLeft: '8px' }} onClick={disconnect}>
//               Disconnect
//             </StyledButton>
//           )}
//         </ButtonContainer>
//       </motion.IntroContentContainer>
//       <div style={{ maxWidth: '50%' }}>
//         <Swap isWalletConnected={connected} network={network} />
//       </div>
//     </HeadingContainer>
//   )
// }

// export default HeadingIntro
