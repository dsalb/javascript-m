// import { init } from "./js/chistes-page";
// import { init } from "./js/usuarios-page";

import * as CRUD from "./js/crud-provider"

CRUD.getUsuario(1).then(console.log);

CRUD.crearUsuario({
    name: 'Diego',
    job: 'Proyectista CAD'
}).then(console.log);

CRUD.actualizarUsuario({
    name: 'Diego',
    job: 'Proyectista CAD'
}, 1).then(console.log);

CRUD.borrarUsuario(1).then(console.log);


