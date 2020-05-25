import React, { PureComponent } from 'react';
import Map from './map/Map';
import Dirt from './block/dirt/Dirt';
import DirtGhost from './block/dirt/DirtGhost';
import Stone from './block/stone/Stone';
import StoneGhost from './block/stone/StoneGhost';
import Grass from './block/grass/Grass';
import GrassGhost from './block/grass/GrassGhost';
import Brick from './block/brick/Brick';
import BrickGhost from './block/brick/BrickGhost';
import './styles/Game.css';
import { widthPercentageToDP, heightPercentageToDP } from '../common/responsive/Responsive';

/**
 * Classe responsavel por renderizar o Game
 */
class Game extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            components: {
                blocks: {
                    "Dirt": Dirt,
                    "Stone": Stone,
                    "Grass": Grass,
                    "Brick": Brick,
                },
            },
            attributes: {
                scene: {
                    transformX: 70,
                    transformY: 0,
                    transformZ: 40,
                    transformScale: 1.15,
                    locationLeft: widthPercentageToDP('25%'),
                    locationTop: heightPercentageToDP('25%')
                },
            },
            typeBlock: Stone,
            typeGhost: StoneGhost,
            blocks: [],
            ghost: null,
            coordinateMapX: 15936,
            coordinateMapY: 16448,
            mapScreenSize: 20,
            blockSize: 64,
            keyPressTime: null
        }
    }

    /**
     * Criar blocos
     * @param {*} posX - Posição X da renderização do bloco
     * @param {*} posY - Posição Y da renderização do bloco
     * @param {*} posZ - Posição Z da renderização do bloco
     */
    createBlock = (posX, posY, posZ) => {
        // Verifica de as posições são positivas
        if (posX >= 0 && posY >= 0) {
            // Obtem o bloco selecionado
            const CustomTag = this.state.typeBlock;
            this.setState({
                blocks: [...this.state.blocks,
                <CustomTag
                    posX={posX}
                    posY={posY}
                    posZ={posZ}
                    createBlock={this.createBlock}
                    removeBlock={this.removeBlock}
                    createGhost={this.createGhost}
                    removeGhost={this.removeGhost}
                />
                ]
            });
        }
    }

    /**
     * Remover blocos
     * @param {*} posX - Posição X da remoção do bloco
     * @param {*} posY - Posição Y da remoção do bloco
     * @param {*} posZ - Posição Z da remoção do bloco
     */
    removeBlock = (posX, posY, posZ) => {
        var array = [...this.state.blocks];
        array.map((block) => {
            if (posX === block.props.posX && posY === block.props.posY && posZ === block.props.posZ) {
                array.splice(array.indexOf(block), 1);
            }
        });
        this.setState({
            blocks: array,
            ghost: null
        });
    }

    /**
     * Função chamada pela props para criar fantasma de bloco a ser criado
     * @param {*} posX - Posição X da criação do fantasma
     * @param {*} posY - Posição Y da criação do fantasma
     * @param {*} posZ - Posição Z da criação do fantasma
     */
    createGhost = (posX, posY, posZ) => {
        // verifica coodernadas negativas
        if (posX >= 0 && posY >= 0) {
            // obtem o tipo do fantasma atual (relacionado ao bloco atual)
            const CustomTag = this.state.typeGhost;
            this.setState({
                ghost: <CustomTag
                    posX={posX}
                    posY={posY}
                    posZ={posZ}
                />
            });
        }
    }

    /**
     * Função chamada pela props para remover fantasma
     */
    removeGhost = () => {
        this.setState({
            ghost: null
        });
    }

    /**
     * Alterar o tipo do bloco e fantasma atual
     * @param {*} block - Tipo do bloco
     * @param {*} ghost - Tipo do fantasma
     */
    changeTypeBlock = (block, ghost) => {
        this.setState({
            typeBlock: block,
            typeGhost: ghost
        });
    }

    /**
     * Rotacionar a camera
     * @param {*} event - Evento de teclado
     */
    rotateCamera = event => {
        if (event.key === "q" || event.key === "e") {
            let attributes = { ...this.state.attributes };
            if (event.key === "e") {
                attributes.scene.transformZ = attributes.scene.transformZ + 10;
            } else {
                attributes.scene.transformZ = attributes.scene.transformZ - 10;
            }
            if (attributes.scene.transformZ > 360) {
                attributes.scene.transformZ -= 360;
            }
            if (attributes.scene.transformZ < 0) {
                attributes.scene.transformZ += 360;
            }
            this.setState({
                attributes
            });
        }

        if (event.key === "PageUp" || event.key === "PageDown") {
            let attributes = { ...this.state.attributes };
            if (attributes.scene.transformX - 10 > 0 && attributes.scene.transformX + 10 < 100) {
                if (event.key === "PageDown") {
                    attributes.scene.transformX = attributes.scene.transformX + 10;
                    this.setState({
                        attributes
                    });
                } else {
                    attributes.scene.transformX = attributes.scene.transformX - 10;
                    this.setState({
                        attributes
                    });
                }
            } else {
                if (attributes.scene.transformX - 10 > 0) {
                    if (event.key === "PageUp") {
                        attributes.scene.transformX = attributes.scene.transformX - 10;
                        this.setState({
                            attributes
                        });
                    }
                } else if (attributes.scene.transformX + 10 < 100) {
                    if (event.key === "PageDown") {
                        attributes.scene.transformX = attributes.scene.transformX + 10;
                        this.setState({
                            attributes
                        });
                    }
                }
            }
        }
    }

    /**
     * Almentar ou reduzir a distancia da camera
     * @param {*} event - Evento do scrow mouse
     */
    zoomCamera = event => {
        if (event.deltaY > 0) {
            if (this.state.attributes.scene.transformScale > 1) {
                let attributes = { ...this.state.attributes };
                attributes.scene.transformScale = attributes.scene.transformScale - 0.15
                this.setState({
                    attributes
                });
            }
        } else {
            if (this.state.attributes.scene.transformScale < 2.5) {
                let attributes = { ...this.state.attributes };
                attributes.scene.transformScale = attributes.scene.transformScale + 0.15
                this.setState({
                    attributes
                });
            }
        }
    }

    /**
     * Movimentação da camera
     * @param {*} event - Evento de teclado
     */
    moveCamera = event => {
        const isNearZ0 = this.state.attributes.scene.transformZ <= 45 || this.state.attributes.scene.transformZ >= 315
        const isNearZ90 = this.state.attributes.scene.transformZ <= 135 && this.state.attributes.scene.transformZ >= 45
        const isNearZ180 = this.state.attributes.scene.transformZ <= 225 && this.state.attributes.scene.transformZ >= 135
        const isNearZ270 = this.state.attributes.scene.transformZ <= 315 && this.state.attributes.scene.transformZ >= 225

        if (event.key === "w" || event.key === "s") {
            let deltaY;
            if (isNearZ0) {
                if (event.key === "s") {
                    deltaY = this.state.blockSize;
                } else {
                    deltaY = -this.state.blockSize;
                }
                let degreesCoordinateMapY = this.state.coordinateMapY + deltaY;
                this.setState({
                    coordinateMapY: degreesCoordinateMapY,
                });
            } else if (isNearZ90) {
                if (event.key === "s") {
                    deltaY = this.state.blockSize;
                } else {
                    deltaY = -this.state.blockSize;
                }
                let degreesCoordinateMapX = this.state.coordinateMapX + deltaY;
                this.setState({
                    coordinateMapX: degreesCoordinateMapX,
                });
            } else if (isNearZ180) {
                if (event.key === "s") {
                    deltaY = -this.state.blockSize;
                } else {
                    deltaY = this.state.blockSize;
                }
                let degreesCoordinateMapY = this.state.coordinateMapY + deltaY;
                this.setState({
                    coordinateMapY: degreesCoordinateMapY,
                });
            } else if (isNearZ270) {
                if (event.key === "s") {
                    deltaY = -this.state.blockSize;
                } else {
                    deltaY = this.state.blockSize;
                }
                let degreesCoordinateMapX = this.state.coordinateMapX + deltaY;
                this.setState({
                    coordinateMapX: degreesCoordinateMapX,
                });
            }
        }

        if (event.key === "a" || event.key === "d") {
            let deltaX;
            if (isNearZ0) {
                if (event.key === "d") {
                    deltaX = this.state.blockSize;
                } else {
                    deltaX = -this.state.blockSize;
                }
                let degreesCoordinateMapX = this.state.coordinateMapX + deltaX;
                this.setState({
                    coordinateMapX: degreesCoordinateMapX,
                });
            } else if (isNearZ90) {
                if (event.key === "d") {
                    deltaX = -this.state.blockSize;
                } else {
                    deltaX = this.state.blockSize;
                }
                let degreesCoordinateMapY = this.state.coordinateMapY + deltaX;
                this.setState({
                    coordinateMapY: degreesCoordinateMapY,
                });
            } else if (isNearZ180) {
                if (event.key === "d") {
                    deltaX = -this.state.blockSize;
                } else {
                    deltaX = this.state.blockSize;
                }
                let degreesCoordinateMapX = this.state.coordinateMapX + deltaX;
                this.setState({
                    coordinateMapX: degreesCoordinateMapX,
                });
            } else if (isNearZ270) {
                if (event.key === "d") {
                    deltaX = this.state.blockSize;
                } else {
                    deltaX = -this.state.blockSize;
                }
                let degreesCoordinateMapY = this.state.coordinateMapY + deltaX;
                this.setState({
                    coordinateMapY: degreesCoordinateMapY,
                });
            }
        }
    }

    renderBlocks() {
        return this.state.blocks.map((block) => {
            if ((block.props.posX >= this.state.coordinateMapX && block.props.posX <= this.state.coordinateMapX + (this.state.mapScreenSize * this.state.blockSize)) &&
                (block.props.posY >= this.state.coordinateMapY && block.props.posY <= this.state.coordinateMapY + (this.state.mapScreenSize * this.state.blockSize))) {

                let coordinateScreenX = block.props.posX - this.state.coordinateMapX;
                let coordinateScreenY = block.props.posY - this.state.coordinateMapY;

                const CustomTag = this.state.components.blocks[block.type.name];

                return (
                    <CustomTag
                        opacity={''}
                        coordinateScreenX={coordinateScreenX}
                        coordinateScreenY={coordinateScreenY}
                        posX={block.props.posX}
                        posY={block.props.posY}
                        posZ={block.props.posZ}
                        createBlock={block.props.createBlock}
                        removeBlock={block.props.removeBlock}
                        createGhost={block.props.createGhost}
                        removeGhost={block.props.removeGhost}
                    />
                );
            }
        });
    }

    controlPress(func, interval) {
        var lastTimePress = 0;
        var lastKeyPress = '';
        return function (event) {
            var now = Date.now();
            if (lastTimePress + interval < now || lastKeyPress !== event.key) {
                lastTimePress = now;
                lastKeyPress = event.key;
                return func.apply(this, arguments);
            }
        };
    }

    componentDidMount() {
        // Ouvinte do menu do botão direito => bloquear
        document.addEventListener('contextmenu', event => event.preventDefault());
        // Ouvinte de teclas precionadas => mover camera
        document.addEventListener("keydown", this.controlPress(this.moveCamera, 200));
        // Ouvinte de teclas precionadas => rotacionar camera
        document.addEventListener("keydown", this.controlPress(this.rotateCamera, 200));

        // Construção do mapa
        let map = new Map();
        let blocks = [];
        map.generateMap().map((block) => {
            const CustomTag = this.state.components.blocks[block.type];
            blocks = [...blocks,
            <CustomTag
                posX={block.x * this.state.blockSize}
                posY={block.y * this.state.blockSize}
                posZ={block.z * this.state.blockSize}
                createBlock={this.createBlock}
                removeBlock={this.removeBlock}
                createGhost={this.createGhost}
                removeGhost={this.removeGhost}
            />
            ]
        });

        this.setState({
            blocks
        });
    }

    render() {
        // dynamic styles
        const styles = {
            gameArea: {
                backgroundColor: 'rgb(' + this.state.colorSkyR + ',' + this.state.colorSkyG + ',' + this.state.colorSkyB + ')'
            },

            scene: {
                left: this.state.attributes.scene.locationLeft + "px",
                top: this.state.attributes.scene.locationTop + "px",
                width: this.state.mapScreenSize * this.state.blockSize + "px",
                height: this.state.mapScreenSize * this.state.blockSize + "px",
                transform: "rotateX(" + this.state.attributes.scene.transformX + "deg)" +
                    "rotateY(" + this.state.attributes.scene.transformY + "deg)" +
                    "rotateZ(" + this.state.attributes.scene.transformZ + "deg)" +
                    "scaleX(" + this.state.attributes.scene.transformScale + ")" +
                    "scaleY(" + this.state.attributes.scene.transformScale + ")" +
                    "scaleZ(" + this.state.attributes.scene.transformScale + ")"
            }
        };

        return (
            <div className="game-area" onWheel={this.zoomCamera} style={styles.gameArea}>
                <div className="scene" id="scene" style={styles.scene}>
                    {this.renderBlocks()}
                    {this.state.ghost !== null ? this.state.ghost : ""}
                </div>
                <button onClick={() => this.changeTypeBlock(Dirt, DirtGhost)}>Dirt</button>
                <button onClick={() => this.changeTypeBlock(Stone, StoneGhost)}>Stone</button>
                <button onClick={() => this.changeTypeBlock(Grass, GrassGhost)}>Grass</button>
                <button onClick={() => this.changeTypeBlock(Brick, BrickGhost)}>Brick</button>
            </div>
        );
    }
}

export default Game