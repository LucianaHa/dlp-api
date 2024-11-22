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

export async function PUT(request) {
    const libro = await request.json();
    try {
        await sql`
                UPDATE libro
                SET titulo = COALESCE(${libro.titulo}, titulo),
                    autores = COALESCE(${libro.autores}, autores),
                    caratula = COALESCE(${libro.caratula}, caratula),
                    isbn = COALESCE(${libro.isbn}, isbn),
                    tags = COALESCE(${libro.tags}, tags),
                    donante = COALESCE(${libro.donante}, donante),
                    fecha_donacion = COALESCE(${libro.fecha_donacion}, fecha_donacion),
                    prestado = COALESCE(${libro.prestado}, prestado)
                WHERE id = ${libro.id};
        `;

        return new Response(null, { status: 204 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al modificar el libro." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
