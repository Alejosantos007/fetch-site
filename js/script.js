async function buscarCancion() {
    const query = document.getElementById("busqueda").value;
const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=5`;


    const res = await fetch(url);
    const data = await res.json();

    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

			/*SI NO HAY RESULTADOS, SE MUESTRA ESTE MENSAJE */
    if (data.results.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

			/*AÑADE AL INDEX CANCIONES QUE FUERON ENCONTRADAS CON RELACION A LO BUSCADO*/
   data.results.forEach(cancion => {
        contenedor.innerHTML += `
            <div class="resultados">
                <img src="${cancion.artworkUrl100}" alt="Cover">
                <div>
                    <strong>${cancion.trackName}</strong><br>
                    <em>${cancion.artistName}</em><br>
                    <audio controls src="${cancion.previewUrl}"></audio>
                </div>
            </div>
        `;
    });
}

			/*REALIZA LA ACCION DE BUSCAR SIN NECESIDAD DE CLICKEAR EL BOTON DE BUSCAR, SOLAMENTE APRETANDO LA TECLA ENTER*/
	document.getElementById("busqueda").addEventListener("keydown", function(e) {
  	if (e.key === "Enter") {
    	buscarCancion();
	}
});

/*LIMPIA EL CONTENIDO LA PAGINA SE REINICIA*/
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("busqueda").value = "";
    buscarCancion();
});
