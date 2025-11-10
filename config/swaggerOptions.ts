import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Financial Management API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Financial Management application, providing endpoints for managing accounts, transactions, and budgets.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
    },
    // Path to the API docs and schemas
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts", "./src/api/v1/models/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};