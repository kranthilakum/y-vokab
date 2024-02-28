import { Container } from '@mui/material'
import App from './App'

export default function Home() {
  return (
    <main>
      <Container maxWidth="md" sx={{ my: '1rem', padding: '1rem', backgroundColor: 'aliceblue', border: '0.5px solid #1976d2' }}>
      <App />
      </Container>
    </main>
  )
}
