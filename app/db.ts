import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'my_store_db',
});

export async function query(sql: any, values: any) {
  const [rows, fields] = await connection.execute(sql, values);
  return rows;
}
