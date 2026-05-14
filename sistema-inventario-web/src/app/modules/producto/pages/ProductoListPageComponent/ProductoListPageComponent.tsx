import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent.tsx";
import ProductListComponent from "@src/app/modules/producto/components/ProductoListComponent/ProductoListComponent.tsx";
import MenuOpcionesComponent from "@src/app/shared/MenuOpcionesComponent/MenuOpcionesComponent.tsx";

//esta muestra la pagina de lista de lista de elementos
function ProductoListPageComponent()
{
  return (

    <>
          <NavBarComponent />
          <ProductListComponent />
          <MenuOpcionesComponent mostrarRegistrarProducto={true} />
    </>
  )
}

export default ProductoListPageComponent
