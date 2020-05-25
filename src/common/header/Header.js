import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './styles/Header.css';

/**
 * Classe responsavel por renderizar o cabeçalho de acordo com as permissões
 */
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
        }
    }

    cleanSearch(){
        this.setState({
            isSearch: false,
            pesquisa: ''
        });
        document.getElementById("pesquisa").value = '';
        this.updatePage();
    }

    search(){
        if(this.state.pesquisa !== ''){
            this.setState({
                isSearch: true,
                pesquisa: ''
            });
            this.updatePage();
        }
    }

    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title"><img className="logo" src={require("../../images/logo.png")} alt="logo-kingdom" /></Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            <div className="menu justify-content-center align-items-center">
                                { this.props.authenticated ? (
                                    <div className="row">
                                        <DropdownButton id="dropdown-basic-button" variant="outline-light" title="Perfil">
                                            <Dropdown.Item href="/perfil">Visualizar perfil</Dropdown.Item>
                                            <Dropdown.Item href="/altera-senha">Alterar senha</Dropdown.Item>
                                        </DropdownButton>
                                        <DropdownButton id="dropdown-basic-button" variant="outline-light" title="Negócios">
                                            <Dropdown.Item href="/anunciar">Anunciar</Dropdown.Item>
                                            <Dropdown.Item href="/hist-anuncio">Historico de anúncios</Dropdown.Item>
                                            <Dropdown.Item href="/vendas">Vendas</Dropdown.Item>
                                            <Dropdown.Item href="/compras">Compras</Dropdown.Item>
                                        </DropdownButton>
                                        <DropdownButton id="dropdown-basic-button" variant="outline-light" title="Categorias">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                ): (
                                    <div className="row">
                                        <Button variant="outline-light" href="/login">Entrar</Button>
                                        <Button variant="outline-light" href="/registrar">Registrar</Button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;