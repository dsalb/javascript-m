export class Todo {

    static fromJson ({tarea, id, completado,creado}) {

        const tempTodo = new Todo (tarea);

        tempTodo.completado = completado;
        tempTodo.id = id;
        tempTodo.creado = creado;

        return tempTodo;

    }

    constructor (tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();

    }

}