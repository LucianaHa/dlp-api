import { sql } from '@vercel/postgres';

export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        try {
            const { rows } = await sql`
            SELECT 
                id, 
                usuario,
                fecha,
                metadatos,
                accion, 
            FROM registro;
        `;

        return new Response(JSON.stringify({ registros: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        } catch (e) {
            console.log(e);
            return new Response(JSON.stringify({ error: "Error al obtener los registros." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    try {
        const { rows } = await sql`
            SELECT 
                id, 
                usuario,
                fecha,
                metadatos,
                accion, 
            FROM registro
            WHERE id = ${id};
        `;

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "Registro no encontrado." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ registros: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al obtener el registro." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}