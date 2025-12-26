// import React from 'react'
import OurProduct from "../home/OurProduct";
import Hero from "../home/Hero";
import Browse from "../home/Browse";
import Explore from "../home/Explore";
import Footer from  "../components/Footer"
import SidebarUser from "../components/SidebarUser";
import OrderTabs from "../components/OrderTabs";

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
