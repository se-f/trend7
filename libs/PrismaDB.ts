import {PrismaClient} from "@prisma/client"

declare global{
    var prisma: PrismaClient | undefined
}

// This is like a hack for hot reloading. Each time a hot reload happens a new client
// gets created. It breaks things because of too many instances

const client= globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV != 'production') globalThis.prisma=client;

export default client;