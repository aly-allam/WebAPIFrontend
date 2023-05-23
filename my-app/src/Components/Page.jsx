import React from 'react'
import '../app.css';
import Home from './Home/Home';
import Main from './Main/Main';
import Footer from './Footer/Footer';
  
const Page = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Home/>
      <Main/>
      <Footer/>
    </div>
  );
};
  
export default Page;
