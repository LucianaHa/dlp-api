import { sql } from '@vercel/postgres';

export async function POST(request) {
    const info = await request.json();
    const accion = info.accion.toUpperCase();

    switch (accion) {
        case "PRESTAMO":
            prestamo(info.id_libro, info.usuario);
            break;
        case "DEVOLUCION":
            devolucion(info.id_libro, info.usuario);
            break;
        default:
            return new Response(JSON.stringify({ error: "No se especificó una acción válida (PRESTAMO/DEVOLUCION)." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

async function prestamo(idLibro, usuario) {
    try {
        var { rows } = await sql`
            SELECT 
                id, 
                prestado, 
                borrado
            FROM libro
            WHERE id = ${idLibro} AND borrado = FALSE;
        `;

        if (rows[0].prestado) { 
            await sql`
                UPDATE prestamo 
                SET fecha_devuelto = NOW()::timestamp
                WHERE id_libro = ${idLibro} AND borrado = FALSE;
            `;
        }

        await sql`
            INSERT INTO prestamo
                (
                id_libro, 
                usuario,
                fecha_prestamo,
                fecha_limite
                )
            VALUES 
                (
                ${idLibro}, 
                ${usuario}, 
                NOW()::timestamp,
                (NOW()::timestamp + INTERVAL '2 weeks')
                ) 
        `;
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al crear el préstamo." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

async function devolucion(idLibro, usuario) {
    try {
        var { rows } = await sql`
            SELECT 
                id, 
                prestado, 
                borrado
            FROM libro
            WHERE id = ${idLibro} AND borrado = FALSE;
        `;

        if (!rows[0].prestado) { 
            await sql`
            INSERT INTO prestamo
                (
                id_libro, 
                usuario,
                fecha_prestamo,
                fecha_limite,
                fecha_devuelto
                )
            VALUES 
                (
                ${idLibro}, 
                ${usuario}, 
                NOW()::timestamp,
                NOW()::timestamp,
                NOW()::timestamp
                ) 
            `;
        }

        await sql`
                UPDATE prestamo 
                SET fecha_devuelto = NOW()::timestamp
                WHERE id_libro = ${idLibro} AND borrado = FALSE;
        `;
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ error: "Error al crear el préstamo." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
