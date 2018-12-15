import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/admin">Admin</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/admin">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/messages">Messages</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}