import React from 'react'
import SidebarUser from '../components/Userprofile/SidebarUser.jsx'
import SubNavbar from '../components/SubNavbar.jsx'
import SubFooter from '../components/SubFooter.jsx'
import Footer from '../components/Footer.jsx'



const UserProfile = () => {
  
  return (
    <div>
      <SubNavbar />
        

        <div className="md:p-20">
            <SidebarUser />
        </div>
      <SubFooter />
      <Footer />
    </div>
    
  )
}

export default UserProfile