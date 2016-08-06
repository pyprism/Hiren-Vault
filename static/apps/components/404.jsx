import React from 'react';
import Helmet from "react-helmet";

export function notFound() {
    return (
        <div>
            <Helmet
                title="Vault::404"
            />
            <div className="center-block">
                <img src="/static/404.gif" className="img-responsive" alt="Responsive image"/>
            </div>

        </div>
    )
}