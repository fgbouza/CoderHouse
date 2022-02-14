console.log('Ejemplo 2 condicionales');

let ingreso = prompt("Ingrese su sueldo");

let sueldo = parseInt(ingreso);

if(sueldo < 100)
{
    alert('Su ganancia neta es ' + sueldo);
}
else if(sueldo < 200)
{
    let gananciaNeta = sueldo * 0.79;
    alert('Su ganancia neta es ' + gananciaNeta);
}else
{
    let gananciaNeta = sueldo * 0.65;
    alert('Su ganancia neta es ' + gananciaNeta);
}
