import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Home } from '@/Pages/Main'
import { ScrollToTop } from '@/Components/UI'
import { New, Login, Recover } from '@/Pages/Auth'
const App = () => {
  return (
    <>
    <Toaster richColors position="top-center"/>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
      </Routes>
    </>
  )
}

export default App