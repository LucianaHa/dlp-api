import { sql } from '@vercel/postgres';

export async function GET(request) {
    const url = new URL(request.url);
    const cantidad = parseInt(url.searchParams.get('cantidad')) || 50;
    const limite = Math.min(cantidad, 50);

    try {
        const { rows } = await  sql`
            WITH libros_ultimos_12_meses AS (
                SELECT
                    id_libro,
                    COUNT(*) AS veces_prestado 
                FROM prestamo
                WHERE fecha_prestamo >= NOW() - INTERVAL '12 months'
                GROUP BY id_libro
            )
            SELECT  
                l.titulo,
                l.autores,
                l.caratula,
                l.tags,
                lu.veces_prestado
            FROM libros_ultimos_12_meses lu
            JOIN libro l
            ON l.id = lu.id_libro
            ORDER BY lu.veces_prestado DESC
            LIMIT ${limite};
        `;
        if (rows.length === 0) { 
            return new Response(JSON.stringify({ error: 'No hay libros prestados en los últimos 12 meses'}), {
                status:404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ data: rows }), {
            status: 200,
            headers: { 'Content-Type' : 'application/json' },
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al obtener los libros más solicitados" }), {
            status: 500,
            headers: { 'Content-Type' : 'application/json' },
        });
    }
}