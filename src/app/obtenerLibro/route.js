import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const { books } = await sql`
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
        `

        return Response.json(books[0].libros);
    } catch (e) {
        console.log(e);
        return Response.json({ error: "Error al obtener libros." });
    }
}
