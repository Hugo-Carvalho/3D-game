
import React, { Component } from 'react';
import './styles/Block.css';

class Block extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 64,
            lastMouseX: null,
            lastMouseY: null
        }
    }

    createCoordinatesFrom(side, x, y, z) {
        if (side === "side-top") {
            z += 1;
        }

        if (side === "side-1") {
            y += 1;
        }

        if (side === "side-2") {
            x += 1;
        }

        if (side === "side-3") {
            y -= 1;
        }

        if (side === "side-4") {
            x -= 1;
        }

        return [x, y, z];
    }

    mouseDownSide = event => {
        this.setState({
            lastMouseX: event.clientX / 10,
            lastMouseY: event.clientY / 10
        });
    }

    mouseUpSide = (previous, side) => event => {
        if (!this.state.lastMouseX) {
            return;
        }

        if (event.button === 0) {
            const coordinates = this.createCoordinatesFrom(
                side,
                previous.props.posX / this.state.size,
                previous.props.posY / this.state.size,
                previous.props.posZ / this.state.size
            );

            this.props.createBlock(coordinates[0] * this.state.size, coordinates[1] * this.state.size, coordinates[2] * this.state.size)
        } else {
            this.props.removeBlock(previous.props.posX, previous.props.posY, previous.props.posZ)
        }
        this.setState({
            lastMouseX: null,
            lastMouseY: null
        });
    }

    mouseEnterSide(previous, side) {
        const coordinates = this.createCoordinatesFrom(
            side,
            previous.props.coordinateScreenX / this.state.size,
            previous.props.coordinateScreenY / this.state.size,
            previous.props.posZ / this.state.size
        );

        this.props.createGhost(coordinates[0] * this.state.size, coordinates[1] * this.state.size, coordinates[2] * this.state.size)

    }

    mouseLeaveSide() {
        this.props.removeGhost()
    }

    render() {
        const { coordinateScreenX, coordinateScreenY, posZ } = this.props;
        // dynamic styles
        const styles = {
            block: {
                transform: "translateX(" + coordinateScreenX + "px)" +
                    "translateY(" + coordinateScreenY + "px)" +
                    "translateZ(" + posZ + "px)"
            }
        };

        return (
            <div className="block" style={styles.block}>
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

export default Block