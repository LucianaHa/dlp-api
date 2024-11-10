import { sql } from '@vercel/postgres';

export async function POST(request) {
    const info = await request.json();
    const accion = info.accion.toUpperCase();

    switch (accion) {
        case "PRESTAMO":
            prestamo(info.id_libro, info.usuario);
            break;
        case "DEVOLUCION":
            devolucion(info.id_libro, info.usuario);
            break;
        default:
            return new Response(JSON.stringify({ error: "No se especificó una acción válida (PRESTAMO/DEVOLUCION)." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

function prestamo(idLibro, usuario) {
    
}

function devolucion(idLibro, usuario) {
    
}
