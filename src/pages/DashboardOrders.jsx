import React, { useEffect, useState } from 'react'
import "../assets/styles/dashboardOrder.scss"
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Link } from 'react-router-dom';

const DashboardOrders = () => {
  const [scanResult, setscanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox:{
        width: 250,
        height: 250
      },
      fps: 4
    })
    const success = (result) => {
      scanner.clear()
      setscanResult(result)
    }

    const error = (err) => {
      console.warn(err)
    }
    scanner.render(success, error)

    
  }, [])

  
  
  return (
    <>
      {
        scanResult ? <Link to={`${scanResult}`}>{scanResult}</Link> 
        : <div id='reader'></div>
      }
    </>
  )
}

export default DashboardOrders