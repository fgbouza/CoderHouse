const COTUSD = 215; //La idea del proyecto es obtener estos dos valores en tiempo real por alguna API
const COTEUR = 240;


const ars2Usd = p => p / COTUSD;
const ars2Eur = p => p / COTEUR;

let nombreProducto = "";
let descripcionProducto = "";
let precio = 0;

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
        this.precio = this.precio + this.precio * 0.21;
    }
}

function entrada()
{
    nombreProducto = ingresoString("nombre del producto.");
    descripcionProducto = ingresoString("descripción del producto.");
    precio = ingresoInt("precio del producto");

    return new Producto(nombreProducto, descripcionProducto, precio);
}

function ingresoString(nombreDato)
{
    let flag = false;
    let salida;
    while(!flag)
    {
        salida = prompt("Ingrese " + nombreDato);
        
        if(salida != "" && salida != null) 
        {
            flag = true;
        }else 
        {
            alert("Ingrese una entrada válida");
            flag = false;
        }
    }
    return salida;
}
function ingresoInt(nombreDato)
{
    do 
    {
        salida = parseInt(prompt("Ingrese "+ nombreDato));
        
        if(isNaN(salida))
        {
            alert("Ingrese una entrada válida.");
        } 
        
    } while (isNaN(salida));
    return salida;
}

function imprimirProducto(producto)
{
    alert("Nombre del producto: "+ producto.nombre +
        "\nDescripción: "+ producto.descripcion +
        "\nPrecio final: $"+ Math.round(producto.precio).toFixed(2) +
        "\nCotización en U$D: $"+Math.round(ars2Usd(producto.precio)).toFixed(2)+
        "\nCotizacion en Euro: €"+Math.round(ars2Eur(producto.precio)).toFixed(2)); //redondeo de las conversiones a dos decimales
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
function main(){
    alert("Bienvenido al ingreso de productos para su nuevo E-Commerce.");
    let productos = [];
    do{
        let productoIngresado = entrada();
        if(consultarSiNo("¿Desea incluir IVA en el precio final?")) 
            productoIngresado.setIva();

        imprimirProducto(productoIngresado);
        productos.push(productoIngresado);

    }while(consultarSiNo("¿Desea continuar ingresando productos?"));

    if(consultarSiNo("¿Desea ver la lista de productos?"))
    {
        let productosAInformar = "------------\n";
        for(const producto of productos)
        {
            productosAInformar = productosAInformar 
            + "Nombre: " + producto.nombre + "\n"
            + "Descripción: " + producto.descripcion + "\n"
            + "Precio: $" + Math.round(producto.precio).toFixed(2) + "\n"
            + "Cotización en U$D: $" + Math.round(ars2Usd(producto.precio)).toFixed(2) + "\n"
            + "Cotizacion en Euro: €" + Math.round(ars2Eur(producto.precio)).toFixed(2) + "\n";

            productosAInformar = productosAInformar + "------------\n";
        }
        alert(productosAInformar);
    }
}
main();
