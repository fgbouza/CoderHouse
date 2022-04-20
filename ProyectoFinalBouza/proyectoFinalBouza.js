let urlConversor = "https://api.bluelytics.com.ar/v2/latest";

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;
let lastProdId = 0;
let productos = [];

let txtCotUsd = document.getElementById("txtUsd");
let txtCotEur = document.getElementById("txtEur");

async function getCotUsd(){
    const response = await fetch(urlConversor);
    const data = await response.json();
    txtCotUsd.innerText = data.blue.value_sell;
    return data.blue.value_sell;
};
async function getCotEur(){
    const response = await fetch(urlConversor);
    const data = await response.json();
    txtCotEur.innerText = data.blue_euro.value_sell;
    return data.blue_euro.value_sell;
};

const ars2Usd = async(p) => parseFloat(p / parseFloat(await getCotUsd()));
const ars2Eur = async(p) => parseFloat(p / parseFloat(await getCotEur()));

let btnEnter = document.getElementById("btnEnter");
let btnUserName = document.getElementById("btnUserName");
let header = document.getElementById("headerPage");
let container = document.getElementById("listProd");

let flagEntrada = localStorage.getItem('flagEntrada');
let arrayProds = localStorage.getItem('arrayProds');
let nombreUser = localStorage.getItem('nombreUser');


if(flagEntrada){
    header.innerText = "Bienvenido/a " + nombreUser + " a stockea.me";
    productos = JSON.parse(arrayProds);
    if(productos != null)cargarProductos(productos);
} 
else{
    nombreUser = "";
    localStorage.setItem('nombreUser', nombreUser);
    localStorage.setItem('arrayProds', JSON.stringify(productos));
    header.innerText = "Bienvenido/a " + nombreUser + " a stockea.me";
}

btnEnter.onclick = () => {
    main();
}

btnUserName.onclick = () => {
    cambiarUserName();
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
        this.precio = this.precio + this.precio * 0.21;
    }
}

async function cargarProductos(productos)
{
    for(const prod of productos)
    {
        await imprimirProducto(prod, container);
    }
}

function filtrarProductos(filtro)
{
    let errorTag = document.getElementById("errorSearch");
    
    if(filtro != "")
    {
        let obj = productos.find(o => o.nombre === filtro);
        if(obj != null)
        {
            errorTag.toggleAttribute("hidden", true);
            for(const prod of productos)
            {
                if(prod.Id != obj.Id)
                    hideProducto(prod.Id);
                else showProducto(obj.Id);
            }
            
        }else 
        {
            errorTag.toggleAttribute("hidden", false);
            for(const prod of productos)
            {
                showProducto(prod.Id);
            }
        }
         
    }else{
        errorTag.toggleAttribute("hidden", true);
        for(const prod of productos)
        {
            showProducto(prod.Id);
        }

    }
    
}

function hideProducto(Id)
{
    let productDom = document.getElementById("prod"+Id);
    productDom.toggleAttribute("hidden", true);
}

function showProducto(Id)
{
    let productDom = document.getElementById("prod"+Id);
    productDom.toggleAttribute("hidden", false);
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
    if(isNaN(parseInt(salida)) || parseInt(salida) <= 0)
    {
        errorTag.toggleAttribute("hidden", false);
        flag = false;
    }else{
        errorTag.toggleAttribute("hidden", true);
    }
    return flag;
}

async function imprimirProducto(producto, htmlId)
{
    const {Id, nombre, descripcion, precio} = producto;
    htmlId.innerHTML += "<div id = 'prod"+ Id +"' style='width:20%;flex:1 0 25%;'>"
    +"<h3>Producto ID:"+ Id +"</h3>"
    +"<p><strong>Nombre del producto: "+ nombre +"</strong></p>"
    +"<p><strong>Descripción: "+ descripcion +"</strong></p>"
    +"<p><strong>Precio final: $"+ Math.round(precio).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotización en U$D: $"+ parseFloat(await ars2Usd(precio)).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotizacion en Euro: €"+ parseFloat(await ars2Eur(precio)).toFixed(2) +"</strong></p>"
    +"<br/></div>"
    
}

function cambiarUserName()
{
    let ingresoExitoso = true;
    let userName = document.getElementById("inputUserName");

    if(!ingresoString("UserName", userName.value)) ingresoExitoso = false;

    if(ingresoExitoso)
    {
        localStorage.setItem('flagEntrada', true);
        localStorage.setItem('nombreUser', userName.value);
        header.innerText = "Bienvenido/a "+  userName.value + " a stockea.me";
        Toastify({
            text: "Nombre de usuario cambiado exitosamente a "+ userName.value+".\n Recargar la página para que sea válido",
            duration: 3000
        }).showToast();
    }
}
function main(){
    
    let resIva = document.getElementById("inputIvaProd");
    
    let productoIngresado = entrada();
    if(productoIngresado != null)
    {
        resIva.checked ? productoIngresado.setIva() : true;
        imprimirProducto(productoIngresado, container);
        productos.push(productoIngresado);
        localStorage.setItem("arrayProds", JSON.stringify(productos));
        Toastify({
            text: "Producto ingresado correctamente",
            duration: 2000
        }).showToast();
    }
}
