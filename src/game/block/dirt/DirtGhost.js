import React from 'react';
import Ghost from '../Ghost';
import './styles/Dirt.css';

class DirtGhost extends Ghost {
    render(){
        const { posX, posY, posZ } = this.props;
        // dynamic styles
        const styles = {
            block: {
                transform: "translateX(" + posX + "px)" +
                            "translateY(" + posY + "px)" +
                            "translateZ(" + posZ + "px)"
            }
        };
        
        return(
            <div className="block ghost dirt" style={styles.block}>
                <div className="x-axis"></div>
                <div className="y-axis"></div>
                <div className="z-axis"></div>

                <div className="side side-top"></div>
                <div className="side side-1"></div>
                <div className="side side-2"></div>
                <div className="side side-3"></div>
                <div className="side side-4"></div>
                <div className="side side-bottom"></div>
            </div>
        );
    }
}

export default DirtGhost