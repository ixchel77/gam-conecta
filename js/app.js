document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchMessage = document.getElementById('searchMessage');
    
    const categoriesSection = document.getElementById('categoriesSection');
    const dynamicSection = document.getElementById('dynamicSection');
    const dynamicTitle = document.getElementById('dynamicTitle');
    const contenedorDinamico = document.getElementById('contenedorDinamico');
    const btnVolver = document.getElementById('btnVolver');
    const categoryCards = document.querySelectorAll('.category-card[data-category]');

    let serviciosData = [];
    let categoriaActual = null;

    // 1. Cargar la base de datos JSON
    fetch('data/servicios.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar la base de datos.');
            return response.json();
        })
        .then(data => {
            serviciosData = data;
            console.log(`Base de datos cargada: ${serviciosData.length} registros.`);
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
            if (searchMessage) searchMessage.textContent = 'Error al cargar los datos comunitarios.';
        });

    // 2. Clic en Categoría Principal -> Genera Submenú de Subcategorías
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoria = card.getAttribute('data-category');
            if (!categoria) return;

            categoriaActual = categoria;
            mostrarSubcategorias(categoria);
        });
    });

    // Función para extraer y mostrar las subcategorías
    function mostrarSubcategorias(categoria) {
        // Filtrar servicios de esa categoría
        const serviciosCategoria = serviciosData.filter(s => 
            s.categoria.toLowerCase() === categoria.toLowerCase()
        );

        // Extraer subcategorías únicas existentes en el JSON
        const subcategoriasUnicas = [...new Set(serviciosCategoria.map(s => s.subcategoria))];

        dynamicTitle.textContent = `Subcategorías de "${categoria}"`;
        contenedorDinamico.innerHTML = '';
        dynamicSection.style.display = 'block';

        subcategoriasUnicas.forEach(subcat => {
            const numServicios = serviciosCategoria.filter(s => s.subcategoria === subcat).length;
            
            const btnSubcat = document.createElement('div');
            btnSubcat.className = 'category-card';
            btnSubcat.style.backgroundColor = '#ffffff';
            btnSubcat.style.border = '2px solid #1e3d2f';
            btnSubcat.style.cursor = 'pointer';

            btnSubcat.innerHTML = `
                <h3 style="color: #1e3d2f; margin: 0 0 5px 0;">📂 ${subcat}</h3>
                <p style="margin: 0; color: #555;">${numServicios} servicio(s) disponible(s)</p>
            `;

            // Al dar clic en la subcategoría, mostramos sus servicios
            btnSubcat.addEventListener('click', () => {
                mostrarServiciosPorSubcategoria(categoria, subcat);
            });

            contenedorDinamico.appendChild(btnSubcat);
        });

        dynamicSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 3. Mostrar los servicios de la Subcategoría seleccionada
    function mostrarServiciosPorSubcategoria(categoria, subcategoria) {
        const resultados = serviciosData.filter(s => 
            s.categoria.toLowerCase() === categoria.toLowerCase() &&
            s.subcategoria.toLowerCase() === subcategoria.toLowerCase()
        );

        dynamicTitle.textContent = `${subcategoria} (${resultados.length})`;
        renderizarTarjetasServicios(resultados);
    }

    // 4. Renderizar tarjetas finales de servicios
    function renderizarTarjetasServicios(listaServicios) {
        contenedorDinamico.innerHTML = '';

        if (listaServicios.length === 0) {
            contenedorDinamico.innerHTML = '<p style="grid-column: 1/-1; color: #666;">No se encontraron servicios.</p>';
            return;
        }

        listaServicios.forEach(servicio => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'category-card';
            tarjeta.style.backgroundColor = '#ffffff';
            tarjeta.style.border = '1px solid #e2e8f0';

            tarjeta.innerHTML = `
                <h3 style="color: #1e3d2f; margin-top: 0;">${servicio.nombre}</h3>
                <p><strong>Ubicación/Colonia:</strong> ${servicio.colonia}</p>
                <p><strong>Dirección:</strong> ${servicio.direccion}</p>
                <p><strong>Horario:</strong> ${servicio.horario}</p>
                <p><strong>Teléfono:</strong> ${servicio.telefono}</p>
                <div style="margin-top: 12px; display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="${servicio.url_mapa}" target="_blank" rel="noopener noreferrer" style="color: #1e3d2f; font-weight: bold; text-decoration: underline;">📍 Ver en Mapa</a>
                    <a href="${servicio.url_oficial}" target="_blank" rel="noopener noreferrer" style="color: #1e3d2f; font-weight: bold; text-decoration: underline;">🌐 Fuente Oficial</a>
                </div>
            `;
            contenedorDinamico.appendChild(tarjeta);
        });

        dynamicSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 5. Botón Volver
    if (btnVolver) {
        btnVolver.addEventListener('click', () => {
            // Si estábamos viendo los servicios de una subcategoría, volvemos a la lista de subcategorías
            if (dynamicTitle.textContent.includes('Subcategorías de')) {
                dynamicSection.style.display = 'none';
                searchMessage.textContent = '';
            } else if (categoriaActual) {
                mostrarSubcategorias(categoriaActual);
            } else {
                dynamicSection.style.display = 'none';
                searchMessage.textContent = '';
            }
        });
    }

    // 6. Búsqueda directa por texto
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const termino = searchInput.value.trim();
            if (!termino) {
                searchMessage.textContent = 'Por favor escribe un término de búsqueda.';
                return;
            }

            const filtro = termino.toLowerCase();
            const resultados = serviciosData.filter(servicio => 
                servicio.nombre.toLowerCase().includes(filtro) ||
                servicio.descripcion.toLowerCase().includes(filtro) ||
                servicio.categoria.toLowerCase().includes(filtro) ||
                servicio.subcategoria.toLowerCase().includes(filtro) ||
                servicio.colonia.toLowerCase().includes(filtro) ||
                servicio.direccion.toLowerCase().includes(filtro)
            );

            categoriaActual = null;
            dynamicTitle.textContent = `Resultados de búsqueda para "${termino}"`;
            searchMessage.textContent = `Se encontraron ${resultados.length} resultado(s).`;
            dynamicSection.style.display = 'block';
            renderizarTarjetasServicios(resultados);
        });
    }
});