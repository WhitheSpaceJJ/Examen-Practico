import { Control } from '../control/tarea.control.js'

function main() {
    const control_clase = new Control();
    document.addEventListener('DOMContentLoaded', 
        ()=>{
            control_clase.handleDOMContentLoaded();
        }
    );
}

main(); 