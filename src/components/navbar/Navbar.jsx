import { Link } from "react-router-dom"
import logo from "../../images/Icon.svg" 
import darkmode from "../../images/DarkMode.svg"
import avatar from "../../images/Avatar.svg"
import "./navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
      <Link className="logo_link" to="/"><img src={logo} alt="site-logo" width="103px" height="103px"/></Link>
      <div className="avatar_mainDiv">
      <button className="mode_btn"><img className="mode_icon" src={darkmode} alt="" /></button>
          <hr className="navbar_hr"/>
          <Link className="navbar_ava_wrapper">
               <img className="navbar_ava" src={avatar} alt="" />
          </Link>
      </div>
    </div>
  )
}

export default Navbar
