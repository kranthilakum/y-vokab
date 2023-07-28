import { Container } from '@mui/material'
import App from './App'

export default function Home() {
  return (
    <main>
      <Container maxWidth="md" sx={{ my: '1rem', padding: '1rem' }}>
      <App />
      </Container>
    </main>
  )
}
