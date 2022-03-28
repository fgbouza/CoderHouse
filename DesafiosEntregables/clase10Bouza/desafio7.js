const COTUSD = 215; //La idea del proyecto es obtener estos dos valores en tiempo real por alguna API
const COTEUR = 240;

const ars2Usd = p => p / COTUSD;
const ars2Eur = p => p / COTEUR;

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;
let prodId = 0;
let btnEnter = document.getElementById("btnEnter");
let btnUserName = document.getElementById("btnUserName");
let header = document.getElementById("headerPage");

let flagEntrada = localStorage.getItem('flagEntrada');
let nombreUser = localStorage.getItem('nombreUser');

if(flagEntrada) header.innerText = "Bienvenido/a "+ nombreUser 
else{
    nombreUser = "";
    
    localStorage.setItem('nombreUser', nombreUser);
    header.innerText = "Bienvenido/a";
}

btnEnter.onclick = () => {
    main();
}
btnUserName.onclick = () => {
    cambiarUserName();
}

class Producto
{
    constructor(nombreProducto, descripcionProducto, precio)
    {
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

    if(ingresoString("NameProd", nameProd.value)) nombreProducto = nameProd.value;
        else ingresoExitoso = false;
    if(ingresoString("DescProd", descProd.value)) descripcionProducto = descProd.value;
        else ingresoExitoso = false;    
    if(ingresoInt("PriceProd", priceProd.value)) precio = parseInt(priceProd.value);
        else ingresoExitoso = false;

    if(ingresoExitoso) return new Producto(nombreProducto, descripcionProducto, precio);
        else return null;
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

function imprimirProducto(producto, htmlId, prodId)
{
    // alert("Nombre del producto: "+ producto.nombre +
    //     "\nDescripción: "+ producto.descripcion +
    //     "\nPrecio final: $"+ Math.round(producto.precio).toFixed(2) +
    //     "\nCotización en U$D: $"+Math.round(ars2Usd(producto.precio)).toFixed(2)+
    //     "\nCotizacion en Euro: €"+Math.round(ars2Eur(producto.precio)).toFixed(2)); //redondeo de las conversiones a dos decimales

    htmlId.innerHTML += "<div id = 'prod"+ prodId +"'>"
    +"<h3>Producto ID:"+ prodId +"</h3>"
    +"<p><strong>Nombre del producto: "+ producto.nombre +"</strong></p>"
    +"<p><strong>Descripción: "+ producto.descripcion +"</strong></p>"
    +"<p><strong>Precio final: $"+ Math.round(producto.precio).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotización en U$D: $"+ Math.round(ars2Usd(producto.precio)).toFixed(2) +"</strong></p>"
    +"<p><strong>Cotizacion en Euro: €"+ Math.round(ars2Eur(producto.precio)).toFixed(2) +"</strong></p>"
    +"</div><br/>"
}
function consultarSiNo(pregunta)
{
    do 
    {
        respuesta = parseInt(prompt(pregunta+"\n1=SI\n0=NO"));
        
        if(isNaN(respuesta) || respuesta > 1 || respuesta < 0)
        {
            alert("Ingrese una entrada válida.");
        }else if(respuesta == 1) return true;
            else if(respuesta == 0) return false;
    
    } while (isNaN(respuesta) || respuesta > 1 || respuesta < 0);
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
    } 
}
function main(){
    
    let container = document.getElementById("listProd");
    let resIva = document.getElementById("inputIvaProd");

    let productoIngresado = entrada();
    if(productoIngresado != null)
    {
        if(resIva.checked) productoIngresado.setIva();
        prodId ++;
        imprimirProducto(productoIngresado, container, prodId);
        productos.push(productoIngresado);
    }
    

    // if(consultarSiNo("¿Desea ver la lista de productos?"))
    // {
    //     let productosAInformar = "------------\n";
    //     for(const producto of productos)
    //     {
    //         productosAInformar = productosAInformar 
    //         + "Nombre: " + producto.nombre + "\n"
    //         + "Descripción: " + producto.descripcion + "\n"
    //         + "Precio: $" + Math.round(producto.precio).toFixed(2) + "\n"
    //         + "Cotización en U$D: $" + Math.round(ars2Usd(producto.precio)).toFixed(2) + "\n"
    //         + "Cotizacion en Euro: €" + Math.round(ars2Eur(producto.precio)).toFixed(2) + "\n";

    //         productosAInformar = productosAInformar + "------------\n";
    //     }
    //     alert(productosAInformar);
    // }

    // while(consultarSiNo("¿Desea buscar productos por nombre?"))
    // {
    //     let param = prompt("Ingrese nombre de producto a buscar:")
    //     const filtrados = productos.filter((pr) => pr.nombre.includes(param));
    //     if(filtrados.length == 0) alert("No se encontraron productos");
    //     else {
    //         let productosAInformar = "------------\n";
    //         for(const prod of filtrados)
    //         {
    //             productosAInformar = productosAInformar 
    //             + "Nombre: " + prod.nombre + "\n"
    //             + "Descripción: " + prod.descripcion + "\n"
    //             + "Precio: $" + Math.round(prod.precio).toFixed(2) + "\n"
    //             + "Cotización en U$D: $" + Math.round(ars2Usd(prod.precio)).toFixed(2) + "\n"
    //             + "Cotizacion en Euro: €" + Math.round(ars2Eur(prod.precio)).toFixed(2) + "\n";

    //             productosAInformar = productosAInformar + "------------\n";
    //         }
    //         alert(productosAInformar);
    //     }
    // }


}