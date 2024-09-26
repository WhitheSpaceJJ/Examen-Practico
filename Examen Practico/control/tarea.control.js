class Control {
    #tareas = [];

    #idTarea
    #descripcionTarea
    #estatusTarea


    #tareaSeleccionada
    #tablaTareas

    #buttonAgregar
    #buttonEliminar
    #buttonEditar
    #buttonLimpiar

    constructor() {
    }

    handleDOMContentLoaded = () => {
        this.getElementAndAddEventsButton();
    }

    getElementAndAddEventsButton = () => {
        this.#idTarea = document.getElementById("id_tarea")
        this.#descripcionTarea = document.getElementById("descripcion_tarea")
        this.#estatusTarea = document.getElementById("estatus_tarea")

        this.#tablaTareas = document.getElementById("tabla_tareas")
        this.#buttonAgregar = document.getElementById("button_agregar")
        this.#buttonEliminar = document.getElementById("button_eliminar")
        this.#buttonEditar = document.getElementById("button_actualizar")
        this.#buttonLimpiar = document.getElementById("button_limpiar")
        this.#buttonAgregar.addEventListener("click", this.agregarTarea)
        this.#buttonEliminar.addEventListener("click", this.eliminarTarea)
        this.#buttonEditar.addEventListener("click", this.actualizarTarea)
        this.#buttonLimpiar.addEventListener("click", this.limpiadorBotonesCampos)
    }

    limpiadorBotonesCampos = () => {
        this.limpiarCampos()
        this.#buttonAgregar.classList.remove("hidden")
        this.#buttonEditar.classList.add("hidden")
        this.#buttonEliminar.classList.add("hidden")
        this.#buttonLimpiar.classList.add("hidden")
    }

    limpiarCampos = () => {
        this.#idTarea.innerHTML = "ID:"
        this.#descripcionTarea.value = ""
        this.#estatusTarea.value = ""
        this.#tareaSeleccionada = null
    }

    agregarTarea = () => {
        if (this.#descripcionTarea.value.length === 0) {
            alert("No puedes agregar una tarea vacía")
        } else {
            if (this.#descripcionTarea.value.length > 250) {
                alert("No puedes agregar una descripcion a un mayor de 250 caracteres")
            } else {
                if (this.#estatusTarea.value === "") {
                    alert("Debes seleccionar un estatus")
                }
                else {
                    let id = this.generarID()
                    while (this.verificarIDDoble(id)) {
                        id = this.generarID()
                    }
                    let tarea = {
                        "id_tarea": id,
                        "descripcion_tarea": this.#descripcionTarea.value,
                        "estatus_tarea": this.#estatusTarea.value
                    }
                    this.#tareas.push(tarea)
                    this.limpiarCampos()
                    this.actualizarTabla()
                }
            }
        }
    }

    eliminarTarea = () => {
        if (this.#tareaSeleccionada === null) {
            alert("No ha seleccionado una tarea para eliminar")
        } else {
            this.#tareas = this.#tareas.filter(({ id_tarea }) => id_tarea !== this.#tareaSeleccionada.id_tarea)
            this.limpiadorBotonesCampos()
            this.actualizarTabla()
        }
    }

    actualizarTarea = () => {
        if (this.#descripcionTarea.value.length === 0) {
            alert("No puedes actualizar una tarea vacía")
        } else {
            if (this.#descripcionTarea.value.length > 250) {
                alert("No puedes actualizar la descripcion a un mayor de 250 caracteres")
            } else {
                if (this.#estatusTarea.value === "") {
                    alert("Debes seleccionar un estatus")
                }
                else {
                    let tarea = {
                        "id_tarea": this.#tareaSeleccionada.id_tarea,
                        "descripcion_tarea": this.#descripcionTarea.value,
                        "estatus_tarea": this.#estatusTarea.value
                    }
                    let indiceTarea = this.#tareas.findIndex(({ id_tarea }) => id_tarea === this.#tareaSeleccionada.id_tarea)
                    this.#tareas[indiceTarea] = tarea
                    this.limpiadorBotonesCampos()
                    this.actualizarTabla()
                }
            }
        }
    }

    actualizarTabla = () => {
        this.#tablaTareas.innerHTML = ""
        if (this.#tareas.length === 0) {
        } else {
            this.#tareas.forEach(
                tarea_lista => {
                    let row = document.createElement("tr")
                    const id = document.createElement("td")
                    id.classList.add("hidden")
                    id.innerHTML = tarea_lista.id_tarea
                    const descripcion = document.createElement("td")
                    descripcion.classList.add("paddingColumnas")
                    let descripcionFinal=""
                    for(let i=0; i <tarea_lista.descripcion_tarea.length; i+=50){
                        descripcionFinal+=tarea_lista.descripcion_tarea.slice(i,i+50)+"<br>"
                    }
                    descripcion.innerHTML = descripcionFinal
                    const estatus = document.createElement("td")
                    estatus.classList.add("paddingColumnas")
                    estatus.innerHTML = tarea_lista.estatus_tarea
                    const button = document.createElement("button")
                    button.innerHTML = "Seleccionar"
                    button.value = tarea_lista.id_tarea
                    button.addEventListener('click', () => {
                        this.selecionadorTarea(button.value)
                    })
                    row.appendChild(id)
                    row.appendChild(descripcion)
                    row.appendChild(estatus)
                    row.appendChild(button)
                    this.#tablaTareas.appendChild(row)
                }
            )
        }
    }

    selecionadorTarea = async (tareaID) => {
        const tarea = this.#tareas.find(({ id_tarea }) => id_tarea === tareaID)
        this.#tareaSeleccionada = tarea
        this.#idTarea.innerHTML = this.#tareaSeleccionada.id_tarea
        this.#descripcionTarea.value = this.#tareaSeleccionada.descripcion_tarea
        this.#estatusTarea.value = this.#tareaSeleccionada.estatus_tarea
        this.#buttonAgregar.classList.add("hidden")
        this.#buttonEditar.classList.remove("hidden")
        this.#buttonEliminar.classList.remove("hidden")
        this.#buttonLimpiar.classList.remove("hidden")
    }


    generarID = () => {
        let id = Math.floor(Math.random() * 1000)
        let abecedario = "abcdefghijklmnopqrstuvwxyz"
        let letra = abecedario[Math.floor(Math.random() * abecedario.length)].toUpperCase()
        return `${id}${letra}`
    }

    verificarIDDoble = (ID) => {
        let idToCheck = this.#tareas.find(({ id_tarea }) => id_tarea === ID)
        if (idToCheck) {
            return true
        } else {
            return false
        }
    }
}
export { Control }

