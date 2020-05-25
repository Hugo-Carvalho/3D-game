import React, { Component } from 'react';
import Game from '../game/Game'
import './styles/Home.css';


/**
 * Classe responsavel por renderizar o home
 */
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {}
            
    }

    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

export default Home