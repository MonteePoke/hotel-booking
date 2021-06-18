module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',

    logging: true,

    entities: ['./src/database/entities/*.entity.ts'],
    seeds: ['./src/database/seeders/*.seeder.ts'],
    factories: ['./src/database/factories/*.factory.ts'],
};
