import { query } from '@/app/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: any) {
  const sql = 'SELECT * FROM products ORDER BY id desc';
  const result = await query(sql, '');
  try {
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const sql = `INSERT INTO products (name, buy_price, sell_price) VALUES (?, ?, ?)`;

  const values = [
    data.get('name' || ''),
    data.get('buyPrice' || ''),
    data.get('sellPrice' || ''),
  ];

  try {
    await query(sql, values);
    return NextResponse.json({
      status: 'success',
      message: 'Successfully Created',
    });
  } catch (error) {
    console.error('Error: ', error);
    return NextResponse.json({
      status: 'error',
      message: 'Error processing creation',
      error,
    });
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.formData();
  const sql = `UPDATE products SET name = ?, buy_price = ?, sell_price = ? WHERE id = ? `;
  const values = [
    data.get('name' || ''),
    data.get('buyPrice' || ''),
    data.get('sellPrice' || ''),
    data.get('id' || ''),
  ];

  try {
    await query(sql, values);
    return NextResponse.json({
      status: 'success',
      message: 'Successfully Updated',
    });
  } catch (error) {
    console.error('Error: ', error);
    return NextResponse.json({
      status: 'error',
      message: 'Error processing update',
      error,
    });
  }
}
