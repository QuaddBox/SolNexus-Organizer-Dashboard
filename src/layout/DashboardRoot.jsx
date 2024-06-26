/* eslint-disable no-unused-vars */
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { DashboardHeader, Logo, MenuDrawer, UserButton } from '../components'
import '../assets/styles/dashboardRoot.scss'
import { MdHome } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { BsFillTicketDetailedFill } from "react-icons/bs";


const DashboardRoot = () => {

  return (
    <>
        <DashboardHeader />
        <div className='dashboard__mainContent'>
            <aside className="sidebar">
                <ul >
                    <li>
                        <NavLink to={"/organizations/home"}>
                            <MdHome size={20}/>
                            Home
                        </NavLink>
                        {/* <NavLink to={(location.pathname == "/organizations/home" || location.pathname == "/organizations/profile") ? location.pathname : "/organizations/home"}>
                            <MdHome size={20}/>
                            Home
                        </NavLink> */}
                    </li>
                    <li>
                        <NavLink to={'/organizations/events'}>
                            <FaCalendar />
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/organizations/tickets/verify'}>
                            <BsFillTicketDetailedFill />
                            Ticket Verification
                        </NavLink>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <Outlet />
            </main>
        </div>
        
    </>
  )
}

export default DashboardRoot