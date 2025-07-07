import { Navbar, Footer } from './components/pages.js'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home, Movies, MovieDetails, Favorite, MyBookings, SeatLayout } from './pages/pages.js'
import { Layout, DashBoard, AddShows, ListBookings, ListShows } from "./pages/admin/pages.js"
import { SignIn } from '@clerk/clerk-react'
import { useAppContext } from './context/AppContext.jsx'
import Loading from './components/Loading.jsx'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  const { user } = useAppContext()

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path='/admin/*' element={user ? <Layout /> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
          <Route index element={<DashBoard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}

    </>
  )
}

export default App