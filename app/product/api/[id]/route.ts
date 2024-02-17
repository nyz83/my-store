import { query } from '@/app/db';
import { NextResponse } from 'next/server';

export function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const sql = `DELETE FROM products WHERE id = ?`;

  try {
    const data = query(sql, [id]);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const sql = `SELECT * FROM products WHERE id = ?`;

  try {
    const result = await query(sql, [id]);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
