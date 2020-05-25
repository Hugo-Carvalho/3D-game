import React from 'react';
import { ClipLoader } from 'react-spinners';
import './styles/LoadingIndicator.css';

export default function LoadingIndicator(props) {
    return (
        <div className="container">
            <div className="loading-container justify-content-center align-items-center">
                <div className="loading-content">
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#FFF'}
                        loading={true}
                    />
                    <div>
                        <img className="logo" src={require("../../images/logo.png")} alt="logo-kingdom" />
                    </div>
                </div>
            </div>
        </div>
    );
}