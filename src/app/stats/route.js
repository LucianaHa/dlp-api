import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const total_libros = await sql`SELECT COUNT(id) AS total FROM libro WHERE borrado = FALSE;`;
        const total_prestados = await sql`SELECT COUNT(id) AS total FROM libro WHERE prestado = TRUE AND borrado = FALSE;`;
        const total_donantes = await sql`SELECT COUNT(DISTINCT donante) AS total FROM libro WHERE donante IS NOT NULL;`;
        const top_lectores = await sql`
            SELECT usuario
            FROM prestamo
            GROUP BY usuario
            ORDER BY COUNT(*) DESC
            LIMIT 3;
        `;
        const top_donadores = await sql`
            SELECT donante
            FROM libro
            GROUP BY donante
            ORDER BY COUNT(*) DESC
            LIMIT 3;
        `;

        // Construcción del objeto de estadísticas
        const stats = {
            total_libros: total_libros.rows[0]?.total || 0,
            total_prestados: total_prestados.rows[0]?.total || 0,
            total_donantes: total_donantes.rows[0]?.total || 0,
            top_lectores: top_lectores.rows.map(row => row.usuario),
            top_donadores: top_donadores.rows.map(row => row.donante),
        };

        return new Response(JSON.stringify(stats), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Error al obtener estadísticas de libros." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
