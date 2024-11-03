export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function name() view returns (string)',
  'function decimals() view returns (uint8)',
]

export const WETH_ABI = [
  'function deposit() public payable',
  'function withdraw(uint wad) public',
  'function balanceOf(address account) external view returns (uint256)',
]

export const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
}

export const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }], // chainId must be in HEX with 0x in front
    })
  } catch (e) {
    handleError(e)
  }
}

export const handleError = (error) => {
  const message = error.message.toLowerCase()

  if (message.includes('insufficient funds')) {
    alert('Error: Insufficient funds for this transaction.')
  } else if (message.includes('user denied transaction')) {
    alert('Transaction cancelled by the user.')
  } else if (message.includes('network')) {
    alert('Please connect to the correct network and try again.')
  } else if (message.includes('account authorization')) {
    alert('Authorization required. Please allow wallet access.')
  } else if (message.includes('invalid decimal')) {
    alert('Please enter correct decimal amount.')
  } else if (message.includes('user rejected')) {
    alert('Transaction was rejected by the user.')
  } else if (message.includes('gas.')) {
    alert('Insufficient amount of gas.')
  } else {
    console.error('Unhandled error:', error)
    alert('An unexpected error occurred. Please try again later.')
  }
}
