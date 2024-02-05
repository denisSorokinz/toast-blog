import knex, { Knex } from 'knex';

class DatabaseService {
  private static _instance: DatabaseService;
  private _knex: Knex;

  private constructor() {
    this._knex = knex({
      client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL!,
      },
      searchPath: ['knex', 'public'],
    });
  }

  static getInstance() {
    if (!DatabaseService._instance) DatabaseService._instance = new DatabaseService();

    return DatabaseService._instance._knex;
  }
}

export default DatabaseService;
