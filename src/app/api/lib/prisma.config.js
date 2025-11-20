import "dotenv/config";
export default {
    schema: "prisma/schema.prisma",
    datasource: {
        db: {
            provider: "postgresql",
            url: process.env.DATABASE_URL, // Neon URL
        },
    },
    output: {
        client: "src/generated/prisma",
    },
};
