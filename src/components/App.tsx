import React from 'react';
import { sensor } from '../lib/Sensor';
import Header from './Header';
import Climate from './Climate';
import Footer from './Footer';

const App = () => <>
    <Header />
    <Climate sensor={sensor}/>
    <Footer />
</>

export default App;