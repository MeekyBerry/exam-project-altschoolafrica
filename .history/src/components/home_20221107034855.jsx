
// HOME COMPONENT - This component is the home page for the app.
import React from 'react';
import { Helmet } from 'react-helmet';
// import "../assets/styles/home.css"
import Image from '../assets/img/avatar.jpeg';

const Home = () => {

 return (
  <div className='home'>
    <Helmet>
      <title>Home</title>
      <meta name='description' content='Home' />
      <link rel='canonical' href='react-helmet' />
    </Helmet>
   <h1 className='home--heading'>Welcome to my Github Portfolio repositories!</h1>
   <div className='home--wrapper'>
   <div className='home--img'>
      <img src={Image} alt='Berry' style={{borderRadius: '50%', width: '10rem', height: '10rem'}} />
    </div>
   <div className='home--paragraph'>
    <p>This is a React app that uses the Github API to display a list of repositories and some extra data about each repository.</p>
    <p>It uses the Github API to get the data and React Router to display the data.</p>
    <p>It uses React Helmet to add meta data to the page.</p>
    <p>It uses React Context to pass data between components.</p>
    <p>It uses React Hooks to manage state.</p>
    <p>It uses React Router to manage routing.</p>
    </div>
    </div>
  </div>
 );
}

export default Home;