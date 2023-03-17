// Variables
const resultado     = document.querySelector('#resultado');

const marca         = document.querySelector('#marca'); 
const year          = document.querySelector('#year');
const minimo        = document.querySelector('#minimo');
const maximo        = document.querySelector('#maximo');
const puertas       = document.querySelector('#puertas');
const transmision   = document.querySelector('#transmision');
const color         = document.querySelector('#color');

const max           = new Date().getFullYear();
const min           = max - 10;

const datosBusqueda = { marca: '', year: '', minimo: '', maximo: '', puertas: '', transmision: '', color: '' };


// Eventos de búsqueda
marca.addEventListener('change',        e => { datosBusqueda.marca = e.target.value;             filtrarAuto(); });
year.addEventListener('change',         e => { datosBusqueda.year = e.target.value;              filtrarAuto(); });
minimo.addEventListener('change',       e => { datosBusqueda.minimo = e.target.value;            filtrarAuto(); });
maximo.addEventListener('change',       e => { datosBusqueda.maximo = e.target.value;            filtrarAuto(); });
puertas.addEventListener('change',      e => { datosBusqueda.puertas = e.target.value;           filtrarAuto(); });
transmision.addEventListener('change',  e => { datosBusqueda.transmision = e.target.value;       filtrarAuto(); });
color.addEventListener('change',        e => { datosBusqueda.color = e.target.value;             filtrarAuto(); });


// Funciones
const iniciarApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
        mostrarAutos(autos);
        cargarSelectYears();
    });
}

const mostrarAutos = (autos) => {
    limpiarHTML();
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, transmision, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión ${transmision} - Color: ${color} - Precio: $${precio}`;
        resultado.appendChild(autoHTML);
    });
}

const noResultado = () => {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = '¡No hay resultados! Prueba con otros términos de búsqueda.';
    resultado.appendChild(noResultado);
}

const cargarSelectYears = () => {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

const filtrarAuto = () => {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    resultado.length ? mostrarAutos(resultado) : noResultado();
}

const limpiarHTML = () => { 
    while (resultado.firstChild) { 
        resultado.removeChild(resultado.firstChild); 
    } 
}

// Filtros de búsqueda
const filtrarMarca              = auto => datosBusqueda.marca ? auto.marca === datosBusqueda.marca : auto;
const filtrarYear               = auto => datosBusqueda.year ? auto.year === parseInt(datosBusqueda.year) : auto;
const filtrarMinimo             = auto => datosBusqueda.minimo ? auto.precio >= datosBusqueda.minimo : auto;
const filtrarMaximo             = auto => datosBusqueda.maximo ? auto.precio <= datosBusqueda.maximo : auto;
const filtrarPuertas            = auto => datosBusqueda.puertas ? auto.puertas === datosBusqueda.puertas : auto;
const filtrarTransmision        = auto => datosBusqueda.transmision ? auto.transmision === datosBusqueda.transmision : auto;
const filtrarColor              = auto => datosBusqueda.color ? auto.color === datosBusqueda.color : auto;


// Inicializador
iniciarApp();