import { sql } from '@vercel/postgres';

export async function GET(request) {
    const url = new URL(request.url);

    try {
        const { rows } = await sql`
            SELECT 
                prestamo.id AS prestamo_id,
                prestamo.id_libro,
                prestamo.fecha_limite,
                prestamo.fecha_devuelto,
                libro.id AS libro_id,
                libro.prestado,
                libro.borrado
            FROM prestamo
            INNER JOIN libro ON prestamo.id_libro = libro.id
            WHERE prestamo.fecha_limite < NOW() 
              AND prestamo.fecha_devuelto IS NULL
              AND libro.prestado = TRUE
              AND libro.borrado = FALSE;
        `;

        const librosPendientes = JSON.stringify({libros: rows})

        return new Response( librosPendientes , {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al obtener libros pendientes." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
