/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://dlp-admin.netlify.app/, https://dlp-admin.netlify.app/libro, https://dlp-admin.netlify.app/prestamo, https://dlp-admin-dlp.vercel.app, https://dlp-admin-dlp.vercel.app/API/prestamo, https://dlp-admin-dlp.vercel.app/API/libro, https://dlp-prestamo.vercel.app, https://dlp-donacion.vercel.app, https://dlp-dashboard.vercel.app, http://localhost:3000/, https://localhost:3000/, http://localhost:3001/, https://localhost:3000/" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    { key: "Cache-Control", value: "no-store" }
                ]
            }
        ]
    }
}

export default nextConfig;
