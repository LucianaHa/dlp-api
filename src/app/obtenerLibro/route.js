import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const { rows } = await sql`
            SELECT json_agg(json_build_object(
                'id', id,
                'titulo', titulo,
                'autores', autores,
                'tags', tags,
                'donante', donante,
                'fecha_donacion', fecha_donacion,
                'prestado', prestado,
                'borrado', borrado
            )) as libros
            FROM libro
            WHERE borrado = FALSE;
        `;
        
        return new Response(JSON.stringify(rows[0]), {
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
