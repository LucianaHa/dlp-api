import { sql } from '@vercel/postgres';

export async function POST(request) {
    const libro = await request.json();

    try {
        const { rows } = await sql`
        INSERT INTO libro 
                (
                titulo, 
                autores,
                caratula,
                isbn,
                tags, 
                fecha_donacion, 
                donante
                )
            VALUES 
                (
                ${libro.titulo}, 
                ${libro.autores},
                ${libro.caratula},
                ${libro.isbn},
                ${libro.tags}, 
                NOW()::timestamp, 
                ${libro.donante}
                ) 
        RETURNING id;
        `;

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al insertar libro." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}