import { sql } from '@vercel/postgres';

export async function GET(request) {
    const url = new URL(request.url);
    const id_libro = url.searchParams.get('id_libro');

    if (!id_libro) {
        try {
            const { rows } = await sql`
                SELECT 
                    id,
                    id_libro,
                    usuario, 
                    fecha_prestamo, 
                    fecha_limite, 
                    fecha_devuelto, 
                    borrado
                FROM prestamo
                WHERE borrado = FALSE;
            `;

            return new Response(JSON.stringify({ prestamos: rows }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            console.log(e);
            return new Response(JSON.stringify({ error: "Error al obtener préstamos." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    try {
        const { rows } = await sql`
            SELECT 
                id,
                id_libro,
                usuario, 
                fecha_prestamo, 
                fecha_limite, 
                fecha_devuelto, 
                borrado
            FROM prestamo
            WHERE id_libro = ${id_libro} AND borrado = FALSE;
        `;

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "No se encontraron préstamos del libro." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ prestamos: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al obtener préstamos." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request) {
    const prestamo = await request.json();
    try {
        const { rows } = await sql`
            UPDATE prestamo 
            SET usuario = COALESCE(${prestamo.usuario}, usuario),
                fecha_prestamo = COALESCE(${prestamo.fecha_prestamo}, fecha_prestamo),
                fecha_devuelto = COALESCE(${prestamo.fecha_devuelto}, fecha_devuelto),
                fecha_limite = COALESCE(${prestamo.fecha_limite}, fecha_limite)
            WHERE id = ${prestamo.id};
        `;

        return new Response(null, { status: 204 });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al modificar prestamo." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}