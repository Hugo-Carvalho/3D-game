
import React from 'react';
import Block from '../Block'
import './styles/Brick.css';

class Brick extends Block {
    render(){
        const { opacity, coordinateScreenX, coordinateScreenY, posZ } = this.props;
        // dynamic styles
        const styles = {
            block: {
                transform: "translateX(" + coordinateScreenX + "px)" +
                            "translateY(" + coordinateScreenY + "px)" +
                            "translateZ(" + posZ + "px)"
            }
        };
        
        return(
            <div className={"block brick " + opacity} style={styles.block}>
                <div className="x-axis"></div>
                <div className="y-axis"></div>
                <div className="z-axis"></div>

                <div className="side side-top" 
                    onMouseDown={this.mouseDownSide}
                    onMouseUp={this.mouseUpSide(this, "side-top")}
                    onMouseEnter={() => this.mouseEnterSide(this, "side-top")} 
                    onMouseLeave={() => this.mouseLeaveSide()}></div>
                
                <div className="side side-1" 
                    onMouseDown={this.mouseDownSide} 
                    onMouseUp={this.mouseUpSide(this, "side-1")}
                    onMouseEnter={() => this.mouseEnterSide(this, "side-1")} 
                    onMouseLeave={() => this.mouseLeaveSide()}></div>
                
                <div className="side side-2" 
                    onMouseDown={this.mouseDownSide}
                    onMouseUp={this.mouseUpSide(this, "side-2")}
                    onMouseEnter={() => this.mouseEnterSide(this, "side-2")} 
                    onMouseLeave={() => this.mouseLeaveSide()}></div>
                
                <div className="side side-3" 
                    onMouseDown={this.mouseDownSide}
                    onMouseUp={this.mouseUpSide(this, "side-3")}
                    onMouseEnter={() => this.mouseEnterSide(this, "side-3")} 
                    onMouseLeave={() => this.mouseLeaveSide()}></div>
                
                <div className="side side-4" 
                    onMouseDown={this.mouseDownSide} 
                    onMouseUp={this.mouseUpSide(this, "side-4")}
                    onMouseEnter={() => this.mouseEnterSide(this, "side-4")} 
                    onMouseLeave={() => this.mouseLeaveSide()}></div>
            </div>
        );
    }
}

export default Brick