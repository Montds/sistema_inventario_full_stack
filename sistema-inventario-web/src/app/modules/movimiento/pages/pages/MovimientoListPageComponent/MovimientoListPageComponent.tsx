
import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent.tsx";
import ProductListComponent from "@src/app/modules/producto/components/ProductoListComponent/ProductoListComponent.tsx";
import MenuOpcionesComponent from "@src/app/shared/MenuOpcionesComponent/MenuOpcionesComponent.tsx";
import MovimientoListComponent
    from "@src/app/modules/movimiento/components/MovimientoListComponent/MovimientoListComponent.tsx";

//esta muestra la pagina de lista de lista de elementos
function MovimientoListPageComponent()
{
  return (

    <>
          <NavBarComponent />
          <MovimientoListComponent />
        <MenuOpcionesComponent mostrarRegistrarEntrada={true} mostrarRegistrarSalida={true}  />

    </>
  )
}

export default MovimientoListPageComponent
