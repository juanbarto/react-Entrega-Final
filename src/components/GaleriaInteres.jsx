import Boton from "./boton";

// =========================
// Componente GaleriaInteres
// =========================

function GaleriaInteres({arrayTemas}){
    return(
        <div style={{ marginTop: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Galería de intereses</h2>
            <div 
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",          // separación entre tarjetas
                flexWrap: "wrap",     // para que se acomoden si no entra todo en fila
                marginTop: "10px"
            }}>
                {arrayTemas.map((tema,index)=>(
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            minWidth: "120px",  //Expansión horiz
                            textAlign: "center"
                        }}      
                    >
                        <p key={index}>{tema}</p>
                    </div>
                ))}
            </div>        
            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <Boton texto="Interactividad" color="blue"/>
            </div>
        </div>
        );
}

export default GaleriaInteres;