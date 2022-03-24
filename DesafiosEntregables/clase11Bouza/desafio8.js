const COTUSD = 215; //La idea del proyecto es obtener estos dos valores en tiempo real por alguna API
const COTEUR = 240;

const ars2Usd = p => p / COTUSD;
const ars2Eur = p => p / COTEUR;

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;
let lastProdId = 0;
let btnEnter = document.getElementById("btnEnter");
let header = document.getElementById("headerPage");
let container = document.getElementById("listProd");

let flagEntrada = localStorage.getItem('flagEntrada');
let arrayProd = localStorage.getItem('arrayProd');
let nombreUser = localStorage.getItem('nombreUser');
let productos = [];

if(flagEntrada){
    header.innerText = "Bienvenido/a " + nombreUser
    for (const prod in arrayProd) {
        imprimirProducto(prod, container);
    }
} 
else{
    
    nombreUser = prompt("Bienvenido/a, ingresa tu nombre");
    localStorage.setItem('flagEntrada', true);
    localStorage.setItem('nombreUser', nombreUser);
    localStorage.setItem('arrayProd', productos);
    header.innerText = "Bienvenido/a " + nombreUser;
}

btnEnter.onclick = () => {
    main();
}

class Producto
{
    constructor(Id, nombreProducto, descripcionProducto, precio)
    {
        this.Id = Id;
        this.nombre = nombreProducto;
        this.descripcion = descripcionProducto;
        this.precio = precio;
    }
    setIva()
    {
        console.log(this.precio * 0.21);
        this.precio = this.precio + this.precio * 0.21;
        console.log(this.precio);
    }
}

function entrada()
{
    let nameProd = document.getElementById("inputNameProd");
    let descProd = document.getElementById("inputDescProd");
    let priceProd = document.getElementById("inputPriceProd");
    let ingresoExitoso = true;

    ingresoString("NameProd", nameProd.value) ? nombreProducto = nameProd.value : ingresoExitoso = false;

    ingresoString("DescProd", descProd.value) ? descripcionProducto = descProd.value : ingresoExitoso = false;

    ingresoInt("PriceProd", priceProd.value) ? precio = parseInt(priceProd.value) : ingresoExitoso = false;
    lastProdId = productos.length > 0 ? productos[productos.length-1].Id : 0;
    console.log(lastProdId);
    return ingresoExitoso ? new Producto(lastProdId + 1, nombreProducto, descripcionProducto, precio) : null;
}

function ingresoString(nombreDato, salida)
{
    let flag = false;
    let errorTag = document.getElementById("error"+nombreDato);
    if(salida != "" && salida != null) 
    {
        flag = true;
        errorTag.toggleAttribute("hidden", true);
    }else 
    {
        errorTag.toggleAttribute("hidden", false);
        flag = false;
    }
    return flag;
}
function ingresoInt(nombreDato, salida)
{
    let flag = true;
    let errorTag = document.getElementById("error"+nombreDato);
    if(isNaN(parseInt(salida)))
    {
        errorTag.toggleAttribute("hidden", false);
        flag = false;
    }else{
        errorTag.toggleAttribute("hidden", true);
    }
    return flag;
}

function imprimirProducto(producto, htmlId)
{
    const {Id, nombre, descripcion, precio} = producto;
    htmlId.innerHTML += "<div id = 'prod"+ Id +"'>"
    +"<h3>Producto ID:"+ Id +"</h3>"
    +"<p><strong>Nombre del producto: "+ nombre +"</strong></p>"
    +"<p><strong>Descripción: "+ descripcion +"</strong></p>"
    +"<p><strong>Precio final: $"+ Math.round(precio).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotización en U$D: $"+ Math.round(ars2Usd(precio)).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotizacion en Euro: €"+ Math.round(ars2Eur(precio)).toFixed(2) +"</strong></p>"
    +"</div><br/>"
}

function main(){
    
    
    let resIva = document.getElementById("inputIvaProd");
    
    let productoIngresado = entrada();
    if(productoIngresado != null)
    {
        resIva.checked ? productoIngresado.setIva() : true;
        imprimirProducto(productoIngresado, container);
        productos.push(productoIngresado);
    }
}