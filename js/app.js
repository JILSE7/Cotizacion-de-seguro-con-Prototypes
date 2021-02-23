//REFERENCIAS AL HTML
//FORMULARIO
const formulario = document.querySelector('#cotizar-seguro');

//CONSTRUCTOR
function Seguro(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}

//4.-REALIZA LA COTIZACION CON LOS DATOS
Seguro.prototype.cotizar = function() {

    let cantidad;
    const base = 2000;
    /*
        1 = AMERICANO 1.15
        2 = ASIATICO 1.05
        3 = EUROPEO 1.35
    */
    console.log(this.brand);
    switch (parseInt(this.brand)) {
        case 1:
            cantidad = base * 1.15;
            console.log(cantidad);
            break;
        case 2:
            cantidad = base * 1.05;
            console.log(cantidad);
            break;
        case 3:
            cantidad = base * 1.35;
            console.log(cantidad);
            break;
    }

    //RESTAR 3 PORCIENTO POR CADA 1 AÑO DE PASADO
    const diferencia = new Date().getFullYear() - this.year;
    console.log(diferencia);

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        SI EL SEGURO ES BASICO SE MULTIPLICA POR UN 30% MAS
        SI ES COMPLETO SE MULTIPLICA POR UN 50% MAS
    */
    (this.type == 'basico') ? cantidad *= 1.30: cantidad *= 1.50;
    console.log(cantidad);

    return cantidad.toFixed(1);
}





function UI() {}

//1.-LLENAR AUTOMATICAMENTE EL SELECT YEAR
UI.prototype.setYearsOptions = () => {
        const max = new Date().getFullYear();
        const min = max - 20,
            selectYear = document.querySelector('#year');

        for (let i = max; i >= min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
    }
    //3.- MOSTRAR MENSAJE SI EL FORMULARIO LE FALTAN COSAS O SI ESTA CORRECTO
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const validacion = document.createElement('div');
    validacion.classList.add('mensaje', 'mt-10');
    validacion.textContent = mensaje;
    (tipo === 'error') ? validacion.classList.add('error'): validacion.classList.add('correcto');
    formulario.insertBefore(validacion, document.querySelector('#resultado'));

    setTimeout(() => {
        validacion.remove()
    }, 2000);
}

//4.SI TODO ESTA CORRECTO, MOSTRAR EL RESULTADO
UI.prototype.mostrarResultado = (seguro, total) => {
    const { brand, year, type } = seguro;
    //CREAR EL RESULTADO
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class='header'>Tu resumen </p>
        <p class ='font-bold'>Marca: <span class='font-normal'>${(brand == '1')? 'Americano':(brand == '2')? 'Asiatico' : 'Europeo' }</span></p>
        <p class ='font-bold'>Año: <span class='font-normal'>${year}</span></p>
        <p class ='font-bold'>Tipo: <span class='font-normal'>${type}</span></p>
        <p class ='font-bold'>Total: <span class='font-normal'>$${total}</span></p>
        
        `;
    const resultadoDiv = document.querySelector('#resultado');
    // limiarHTML
    const resultados = document.querySelector('#resultado div');
    (resultados != null) ? resultados.remove(): null

    //SPINNER
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //SE BORRA EL SPINNER
        resultadoDiv.appendChild(div); //SE MUESTRA EL RESULTADO
    }, 2000);
}

//INSTANCIANDO UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.setYearsOptions(); //LENANDO EL SELECT CON LOS AÑOS


    eventListener();
});




function eventListener() {

    formulario.addEventListener('submit', validarForm)
}


//EVENTOS

//2.-VALIDAR FORMULARIO
const validarForm = (e) => {
    e.preventDefault();
    //MARCA
    const selectBrand = document.querySelector('#marca').value;
    //AÑOS
    const selectYear = document.querySelector('#year').value;
    //TIPO
    const selectType = document.querySelector('input[name="tipo"]:checked').value;

    console.log(selectType, selectYear, selectBrand);

    if ((selectBrand && selectYear && selectType) === '') {
        ui.mostrarMensaje('Faltan campos', 'error')
        return
    }

    ui.mostrarMensaje('Cotizando', 'correcto')

    //INTANCIANDO SEGURO
    const seguro = new Seguro(selectBrand, selectYear, selectType);
    console.log(seguro);
    const total = seguro.cotizar()

    //UTILIZAR EL PROTOTYPE PARA MOSTRAR TOTAL
    ui.mostrarResultado(seguro, total);
}


// //LIMPIAR HTML DE RESULTADO
// function limiarHTML(div) {
//     while (div.firstChild) {
//         div.removeChild(div.firstChild);
//     }
// }