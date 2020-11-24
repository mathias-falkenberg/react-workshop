import React from 'react';
import { sensor } from '../lib/Sensor';
import Header from './Header';
import Climate from './Climate';
import Footer from './Footer';

const App = () => <>
    <Header />
    <main>
        <Climate sensor={sensor}/>
    </main>
    <Footer />
</>

export default App;