// import React from 'react'
import OurProduct from '../home/OurProduct'
import Hero from '../home/Hero'
import Browse from "../home/Browse"
import Explore from '../home/Explore';
import Footer from  "../components/Footer"
import SidebarUser from "../components/Userprofile/SidebarUser";
import OrderTabs from "../components/Userprofile/OrderTabs";
import { Navbar } from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Hero />
      <Browse />
      <OurProduct />
      <Explore />
      <Footer />
    </>
  );
};

export default Home;
