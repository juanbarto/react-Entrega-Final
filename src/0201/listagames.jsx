function ListaGames(){
    const fichines=['RDR','SimCity','HL','FIFA26','NBA2K'];
    
    return(
        <ul>
            {fichines.map(fichin=>(
                <li key={fichin}>{fichin}</li>
            ))}
        </ul>
    );
}

export default ListaGames;