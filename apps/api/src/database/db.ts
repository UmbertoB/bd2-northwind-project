import Knex from 'knex';

const database = Knex({
    client: 'mssql',
    connection: {
        user: 'sa',
        password: 'Root123$',
        server: '127.0.0.1',
        port: 1433,
        database: 'Northwind'
    }
});

export default database;