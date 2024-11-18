import { sql } from '@vercel/postgres';

export async function GET() {
    const now = new Date(); // Fecha actual
    const mesActual = now.getMonth() + 1; // Obtiene el mes actual (0 = Enero, 11 = Diciembre, sumamos 1)
    const anioActual = now.getFullYear(); // Año actual

    const ultimosMeses= [];
    for(let i = 0; i<12; i++){
        const date= new Date(anioActual, mesActual - 1 - i, 1); //Resta meses
        ultimosMeses.push({
            mes: date.getMonth()+1, // Mes (1 = Enero, 12 = Diciembre)
            anio: date.getFullYear(),
        });
    }

    try{
        // Consulta SQL para préstamos
        const prestamosQuery = await sql`
            SELECT 
                EXTRACT(MONTH FROM fecha_prestamo) AS mes,
                EXTRACT(YEAR FROM fecha_prestamo) AS anio,
                COUNT(*) AS total_prestamos
            FROM prestamo
            WHERE fecha_prestamo >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '12 months'
            GROUP BY anio, mes
            ORDER BY anio, mes;
        `;

        // Consulta SQL para donaciones
        const donacionesQuery = await sql`
            SELECT 
                EXTRACT(MONTH FROM fecha_donacion) AS mes,
                EXTRACT(YEAR FROM fecha_donacion) AS anio,
                COUNT(*) AS total_donaciones
            FROM libro
            WHERE fecha_donacion >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '12 months'
            GROUP BY anio, mes
            ORDER BY anio, mes;
        `;

        // Inicializa el resumen con valores en cero
        const data = Array(12).fill({ total_prestados: 0, total_donados: 0 });

        console.log(ultimosMeses)
        // Asignar datos de préstamos al resumen
        prestamosQuery.rows.forEach(({ mes, anio, total_prestamos }) => {
            console.log(mes)
            console.log(anio)
            const index = ultimosMeses.findIndex(
                (item) => item.mes == mes && item.anio == anio
            );
            console.log(index);
            if (index !== -1) {
                data[index] = {
                    ...data[index],
                    total_prestados: parseInt(total_prestamos, 10),
                };
            }
        });

        // Asignar datos de donaciones al resumen
        donacionesQuery.rows.forEach(({ mes, anio, total_donaciones }) => {
            const index = ultimosMeses.findIndex(
                (item) => item.mes == mes && item.anio == anio
            );
            console.log(index);
            if (index !== -1) {
                data[index] = {
                    ...data[index],
                    total_donados: parseInt(total_donaciones, 10),
                };
            }
        });

        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error al obtener resumen anual." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
