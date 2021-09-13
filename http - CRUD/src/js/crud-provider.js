const urlCRUD = 'https://reqres.in/api/users'

const getUsuario = async ( id ) => {

    const resp =  await fetch(`${urlCRUD}/${id}`);
    const {data} = await resp.json();

    return data;

}

const crearUsuario = async (usuario) => {

    const resp = await fetch(urlCRUD, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json'
        }

    });

    console.log(await resp.json());

}

const actualizarUsuario = async (usuario, id) => {

    const resp = await fetch(`${urlCRUD}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
            'Content-type': 'application/json'
        }

    });

    console.log(await resp.json());

}

const borrarUsuario = async (id) => {

    const resp = await fetch(`${urlCRUD}/${id}`, {
        method: 'DELETE',
    });

    return (resp.ok) ? 'Borrado' : 'No se pudo borrar'

}

export {
    getUsuario, 
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}