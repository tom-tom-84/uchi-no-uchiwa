import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendOrderStatusEmail } from '@/lib/mail';

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

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: '注文が見つかりません' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('注文の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '注文の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { status } = await request.json();

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    // メール送信
    try {
      await sendOrderStatusEmail(
        order.user.email,
        order.id,
        order.status,
        order.total
      );
    } catch (error) {
      console.error('メール送信に失敗しました:', error);
      // メール送信の失敗は注文の更新を妨げない
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('注文の更新に失敗しました:', error);
    return NextResponse.json(
      { error: '注文の更新に失敗しました' },
      { status: 500 }
    );
  }
} 