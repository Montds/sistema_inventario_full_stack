import NavBarComponent from "@src/app/shared/NavBarComponent/NavBarComponent.tsx";
import MovimientoDetailFormComponent
    from "@src/app/modules/movimiento/components/MovimientoDetailFormComponent/MovimientoDetailFormComponent.tsx";

function MovimientoDetailPageComponent() {
    return (
      <>
      <NavBarComponent />
      <MovimientoDetailFormComponent />
      </>
    );
}

export default MovimientoDetailPageComponent;