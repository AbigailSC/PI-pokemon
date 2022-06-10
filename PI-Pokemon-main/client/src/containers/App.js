import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing.jsx'
import Home from '../components/Home/Home.jsx'
import DetailPokemon from '../components/DetailPokemon/DetailP.jsx'
import Form from '../components/Form/Form.jsx'

function App() {
    return (
        <div>
            <Route exact path = '/'>
                <Landing/>
            </Route>
            <Route path= '/home'>
                <Home/>
            </Route>
            <Route path= '/detail/:id'>
                <DetailPokemon/>
            </Route>
            <Route path= '/create'>
                <Form/>
            </Route>
        </div>
    );
}

export default App;
