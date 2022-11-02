import React from 'react'
import MailIcon from '@mui/icons-material/Mail'
import WhatsappIcon from '@mui/icons-material/WhatsApp'
import Github from '@mui/icons-material/GitHub'
import './Footer.css'

function Footer() {
  return (
    <div className='Footer'>
         <a href='https://github.com/athul20022' target='_blank' rel="noreferrer">
         <Github/>   
         </a>
        <a href='mailto:athulkrishna080@gmail.com' target='_blank' rel="noreferrer">
        <MailIcon/>
        </a>   
        <a href='https://wa.me/9947107295' target='_blank' rel="noreferrer">
         <WhatsappIcon/>   
         </a>
    </div>
  )
}

export default Footer;