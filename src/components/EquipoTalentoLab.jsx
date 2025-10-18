function EquipoTalentoLab({nombre,rol,imagen}){
    return(
        <div style={{border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
            <h2>{nombre}</h2>
            <h3>{rol}</h3>
            <img 
                src={imagen} 
                alt={nombre} 
                style={{width: "150px", height:"150px"}}
            />
        </div>
    );
}

export default EquipoTalentoLab;