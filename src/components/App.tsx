import React from 'react';
import { sensor } from '../lib/Sensor';
import Header from './Header';
import Climate from './Climate';
import Footer from './Footer';

const App = () => <>
    <Header title="The Weather Station" />
    <main>
        <Climate sensor={sensor}/>
    </main>
    <Footer>Powered by React!</Footer>
</>

export default App;