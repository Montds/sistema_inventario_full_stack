
import '@src/App.css'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProductoDetailPageComponent from "@src/app/modules/producto/pages/ProductoDetailsPageComponent/ProductoDetailPageComponent";
import ProductoListPageComponent from '@src/app/modules/producto/pages/ProductoListPageComponent/ProductoListPageComponent';
import MovimientoListPageComponent from "@src/app/modules/movimiento/pages/pages/MovimientoListPageComponent/MovimientoListPageComponent";
import MovimientoRegisterPageComponent from "@src/app/modules/movimiento/pages/pages/MovimientoRegisterPageComponent/MovimientoRegisterPageComponent";

import { RUTAS } from "@src/utilities/routes";
import MovimientoDetailPageComponent
    from "@src/app/modules/movimiento/pages/pages/MovimientoDetailsPageComponent/MovimientoDetailPageComponent.tsx";
import ReporteListPageComponent
    from "@src/app/modules/reporte/page/ReporteListPageComponent/ReporteListPageComponent.tsx";
import ProductoRegisterPageComponent
    from "@src/app/modules/producto/pages/ProductoRegisterPageComponent/ProductoRegisterPageComponent.tsx";
import ProductoDetailFormComponent
    from "@src/app/modules/producto/components/ProductoDetailFormComponent/ProductoDetailFormComponent.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={RUTAS.PRODUCT} element={<ProductoListPageComponent />} />
                <Route path={RUTAS.PRODUCT_DATA_REGISTER} element={<ProductoRegisterPageComponent />} />
                <Route path={RUTAS.PRODUCT_DATA_SKU} element={<ProductoDetailPageComponent />} />

                <Route path={RUTAS.MOVEMENT} element={<MovimientoListPageComponent />} />
                <Route path={RUTAS.MOVEMENT_DETAIL} element={<MovimientoDetailPageComponent />} />

                <Route path={RUTAS.MOVEMENT_ENTRY} element={<MovimientoRegisterPageComponent />} />
                <Route path={RUTAS.MOVEMENT_EXIT} element={<MovimientoRegisterPageComponent />} />

                <Route path={RUTAS.REPORT} element={<ReporteListPageComponent />} />


                <Route path="/" element={<Navigate to={RUTAS.PRODUCT} />} />
                <Route path="*" element={<Navigate to={RUTAS.PRODUCT} />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
