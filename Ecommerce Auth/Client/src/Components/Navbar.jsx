import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsCart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/Navbar.css'
import { removeAuthToken } from '../Features/authSlice';

const Navbar = () => {

  const dispatch = useDispatch();
  const userName = useSelector(state => state.authentication.profile?.name);
  const userToken = useSelector(state => state.authentication.authToken);
  const user = userName && userName.split(" ") || ['User'];
  console.log('userName :')

  const [navToggle, setnavToggle] = useState(false);

  const handleLogout = () => {
    dispatch(removeAuthToken())
    localStorage.removeItem('rock8AuthToken')
  }

  const handleNavToggle = () => {
    setnavToggle(!navToggle)
  }

  return (
    <nav className='navbar' id='navbar'>
      <ul className="nav1">
        <li><NavLink>Help</NavLink></li>
        <li><NavLink>Order & Returns</NavLink></li>
        {
          userToken ?
            <>
              <li><NavLink>{`Hi, ${user[0]}`}</NavLink></li>
              <li onClick={handleLogout}><NavLink>Logout</NavLink></li>
            </>
            :
            <li><NavLink to='/login'>Login</NavLink></li>
        }

      </ul>

      <div className="nav2">
        <div className="navBrand">
          <h2>ECOMMERCE</h2>
        </div>

        <ul className={navToggle? "navItems showNavItems": "navItems"}>
          <li>
            <NavLink>Categories</NavLink>
          </li>
          <li>
            <NavLink>Sales</NavLink>
          </li>
          <li>
            <NavLink>Clearance</NavLink>
          </li>
          <li>
            <NavLink>New Stock</NavLink>
          </li>
          <li>
            <NavLink>Trending</NavLink>
          </li>
        </ul>

        <div className={navToggle? "dropDownMenu rotateMenu": "dropDownMenu"}>
          <h2 onClick={handleNavToggle}>{'<'}</h2>
        </div>
        <div className="navIcons">
          <BsCart />
          <CiSearch />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
