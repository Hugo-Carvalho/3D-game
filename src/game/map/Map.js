import React, { Component } from 'react';
import map from './json/map.json';

class Map extends Component {

    constructor(props) {
        super(props);
    }

    generateMap() {
        return map;
    }
}

export default Map