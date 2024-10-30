import { sql } from '@vercel/postgres';

export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        try {
            const { rows } = await sql`
            SELECT 
                id, 
                titulo, 
                autores,
                caratula,
                isbn,
                tags, 
                donante, 
                fecha_donacion, 
                prestado, 
                borrado
            FROM libro
            WHERE borrado = FALSE;
        `;

        return new Response(JSON.stringify({ libros: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        } catch (e) {
            console.log(e);
            return new Response(JSON.stringify({ error: "Error al obtener libros." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    try {
        const { rows } = await sql`
            SELECT 
                id, 
                titulo, 
                autores,
                caratula,
                isbn,
                tags, 
                donante, 
                fecha_donacion, 
                prestado, 
                borrado
            FROM libro
            WHERE id = ${id} AND borrado = FALSE;
        `;

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "Libro no encontrado." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ libros: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al obtener el libro." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
