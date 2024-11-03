import styled from 'styled-components'

const Container = styled.div`
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(20, 20, 22, 1) 100%);
`

const Dashboard = () => {
  return (
    <Container>
      <div>
        <p>Welcome to the dash baby</p>
      </div>
    </Container>
  )
}

export default Dashboard
