export function lanzarNotificacion(product) {
    const jwt = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const url = import.meta.env.VITE_SUPABASE_NOTIFICACIONES_FUNCTION_URL;

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            product: {
                name: product.name,
                stock: product.stock,
            }
        })
    })
        .then(response => response.json())
        .then(data => console.log('Respuesta:', data))
        .catch(error => console.error('Error:', error));
}
