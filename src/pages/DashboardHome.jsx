import React from 'react'
import '../assets/styles/dashboardHome.scss'
import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  return (
    <section className='dashboardhome'>
        <h1 className='dashboardhome__heading'>Hello there, Godrice</h1>
        <div className='dashboardhome__cardContainer'>
            <div className='dashboardhome__card'>
                <MdOutlineEdit color='#630897' size={25}/>
                <h3>Start from scratch</h3>
                <p>Add all your event details, create new tickets, and set up recurring events</p>
                <Link to={'/manage/events/create'}>Create Event</Link>
            </div>
            <div className='dashboardhome__card'>
                <MdOutlineEdit color='#630897' size={25}/>
                <h3>Setup your organizer profile</h3>
                <p>Highlight your brand by adding your organizer name, image, and bio</p>
                <Link to={'/organizations/info/profile'}>Add Organizer Profile</Link>
            </div>
            
        </div>
    </section>
  )
}

export default DashboardHome