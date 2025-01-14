import { sql } from '@vercel/postgres';

export async function POST(request) {
    const info = await request.json();
    const accion = info.accion.toUpperCase();

    switch (accion) {
        case "PRESTAMO":
            try {
                prestamo(info.id_libro, info.usuario);

                return new Response(null, { status: 204 });
            } catch (e) {
                console.log(e);
                return new Response(JSON.stringify({ error: "Error al crear el préstamo." }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        case "DEVOLUCION":
            try {
                devolucion(info.id_libro, info.usuario);

                return new Response(null, {
                    status: 204
                });
            } catch (e) {
                console.log(e);
                return new Response(JSON.stringify({ error: "Error al realizar devolución." }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        default:
            return new Response(JSON.stringify({ error: "No se especificó una acción válida (PRESTAMO/DEVOLUCION)." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
    }
}

async function prestamo(idLibro, usuario) {
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
            COALESCE(${usuario}, 'Desconocido'), 
            NOW()::timestamp,
            (NOW()::timestamp + INTERVAL '2 weeks')
            );
    `;

    await sql`
        UPDATE libro
        SET prestado = true
        WHERE id = ${idLibro};
    `;
}

async function devolucion(idLibro, usuario) {
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
                COALESCE(${usuario}, 'Desconocido'), 
                NOW()::timestamp,
                NOW()::timestamp,
                NOW()::timestamp
                );
        `;
    }

    await sql`
        UPDATE prestamo 
        SET fecha_devuelto = NOW()::timestamp
        WHERE id_libro = ${idLibro} AND borrado = FALSE;
    `;
}
