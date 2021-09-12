const jokeUrl = 'https://api.chucknorris.io/jokes/random';
const urlUsuarios = 'https://reqres.in/api/users?page=2'

const obtenerChiste = async () => {

    try {
        const resp = await fetch (jokeUrl);
    
        if (!resp.ok) throw 'No se pudo realizar la petición';

        const { id, value, icon_url } = await resp.json();
    
        return { id, value, icon_url };
        
    } catch (err) {

        throw err;

    }

}

const obtenerUsuarios = async () => {

    const resp = await fetch(urlUsuarios);
    const {data:usuarios} = await resp.json();

    return usuarios;

}


export {
    obtenerChiste,
    obtenerUsuarios
}