import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const stockHistory = await prisma.stockHistory.findMany({
      where: {
        productId: params.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(stockHistory);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    return NextResponse.json(
      { error: '在庫履歴の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { quantity, type, note } = await request.json();

    // トランザクションで在庫更新と履歴作成を行う
    const result = await prisma.$transaction(async (tx) => {
      // 在庫履歴を作成
      const history = await tx.stockHistory.create({
        data: {
          productId: params.id,
          quantity,
          type,
          note,
        },
      });

      // 商品の在庫数を更新
      const product = await tx.product.update({
        where: { id: params.id },
        data: {
          stock: {
            increment: type === 'IN' ? quantity : -quantity,
          },
        },
      });

      return { history, product };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json(
      { error: '在庫の更新に失敗しました' },
      { status: 500 }
    );
  }
} 