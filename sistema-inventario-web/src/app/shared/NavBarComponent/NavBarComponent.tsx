import { Link } from 'react-router-dom';
import './NavBarComponent.css';
import {RUTAS} from "@src/utilities/routes.ts";

const NavBarComponent = () => {
    return (
        <nav className="navbar">
            <div className="title-small">SISTEMA INVENTARIO</div>
            <ul className="nav-list">
                <li>
                    <Link to={RUTAS.PRODUCT} className="nav-link">Productos</Link>
                </li>
                <li>
                    <Link to={RUTAS.MOVEMENT} className="nav-link">Movimientos</Link>
                </li>
                <li>
                    <Link to={RUTAS.REPORT} className="nav-link">Reportes</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBarComponent;