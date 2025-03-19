import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { CartItem } from '@/contexts/CartContext';

export async function POST(request: Request) {
  try {
    const { items } = await request.json() as { items: CartItem[] };
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    if (!items?.length) {
      return NextResponse.json(
        { error: 'カートが空です。' },
        { status: 400 }
      );
    }

    // Stripeのラインアイテムを作成
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
          images: [
            // 相対パスを絶対パスに変換
            item.image.startsWith('http') 
              ? item.image 
              : `${origin}${item.image}`
          ],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // チェックアウトセッションを作成
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'jpy',
            },
            display_name: '通常配送',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: '決済処理中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 