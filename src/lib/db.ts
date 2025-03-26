import { ColumnType, Kysely, MysqlDialect } from 'kysely';
import mysql from 'mysql2';



export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;



interface Database {
  users: {
    id: Generated<number>;
    username: string;
    password: string;
    score: number;
  };
}

const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'main_databaza',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'password',
    }),
  }),
});

export default db;
