//El simulador consiste en un sistema para cargar notas y promediarlas a alumnos.

const alumnos = [];

function MostrarLista(){
    if(alumnos.length == 0){
        console.log("===================")
        console.log("La lista de alumnos está vacía.");
    }else{
        console.log("===================")
        alumnos.forEach( (alumno) => {
            if(alumno.nota1 != undefined && alumno.nota2 != undefined){
                console.table(alumno);
            }else{
                console.log(alumno.nombre + ", notas no cargadas." + "\n");
            }
        });
    }
    console.log("===================")
}

function AgregarAlumno(){
    const datos = {
        nombre: prompt("Ingrese nombre y apellido del alumno."),
        nota1: undefined,
        nota2: undefined,
        promedio: undefined
    }
    alumnos.push(datos);
    console.log("===================")
    console.log("Alumno " + datos.nombre + " incorporado con exito a la lista.");
    console.log("===================")
}

function EliminarAlumno(){
    const alumno = prompt("Ingrese el nombre del alumno que se deasea eliminar de la lista.");
    console.log("===================")
    const existe = alumnos.some( (a) => a.nombre === alumno);
    if(existe == true){
        const index = alumnos.findIndex( (i) => i.nombre == alumno);
        alumnos.splice(index, 1);
        console.log("El alumno " + alumno + " fue eliminado de la lista.")
        console.log("===================")
    }else{
        console.log("El alumno " + alumno + " no existe en la lista.")
        console.log("===================")
    }
}

function CargarNotas(){
    const alumno = prompt("Ingrese el nombre del alumno que se deasea cargar notas.");
    const existe = alumnos.some( (a) => a.nombre === alumno);
    if(existe == true){
        const index = alumnos.findIndex( (i) => i.nombre == alumno);
        alumnos[index].nota1 = Number(prompt("Ingrese la primer nota."));
        alumnos[index].nota2 = Number(prompt("Ingrese la segunda nota."));

        const promedio = CalcularPromedio(alumnos[index].nota1, alumnos[index].nota2);

        alumnos[index].promedio = promedio;
        console.log("===================")
        console.log("Notas cargadas con éxito...");
        console.log("===================")
    }
}

function CalcularPromedio(a, b){
    return ((a + b) / 2);
}

let cancelar = 0
while(cancelar == 0){
    
    const respuesta = prompt("Ingrese un número de acuerdo a las opciones que quiera realizar.");
    switch (respuesta) {
        case "1":
            MostrarLista();
            break;
    
        case "2":
            AgregarAlumno();
            break;
        
        case "3":
            MostrarLista();
            CargarNotas();
            break;
    
        case "4":
            EliminarAlumno();
            break;
    
        default:
            console.log("===================")
            console.log("Saliendo del simulador...");
            console.log("===================")
            cancelar = 1;
            break;
    }
}