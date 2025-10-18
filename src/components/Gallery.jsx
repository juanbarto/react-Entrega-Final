// ==================
// Componente Gallery
// ==================

function Gallery(){
    const images=[
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Juan",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Maria",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
        "https://api.dicebear.com/7.x/adventurer/svg?seed=Ana"
    ];

    return(
        <section style={{display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px"}}>
            {images.map((src,index)=>(
                <img 
                    key={index} //React necesita un identificador único por c/elem cuando renderiza listas. index (la pos en array), pero si fueran datos reales sería mejor id.
                    src={src} // src es atributo de imágenes en HTML. Se pasa el val de c/elem del array images (c/URL).
                    alt={`Imagen ${index+1}`} // Texto alternativo. Se construye dinámicamente con template strings de JS (comillas invertidas `)
                    style={{width: "150px", height: "150px"}} // Es inline style en React. Se pasa un objeto JS con pares propiedad: valor. Como width y height.
                />
                ))
            }
        </section>
    );
}

export default Gallery;