import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar';
import "./mainLayout.css";

function MainLayout() {
  return (
    <div className='very_main_div'>
        <Navbar/>
      <main className='container '>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout;