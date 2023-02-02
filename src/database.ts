import { Pool } from 'pg'

export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'jmav1234',
    database:'firstapi',
    port:5432
});