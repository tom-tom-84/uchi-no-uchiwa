import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderStatusEmail(
  to: string,
  orderId: string,
  status: string,
  total: number
) {
  const statusText = {
    pending: '保留中',
    paid: '支払い済み',
    shipped: '発送済み',
    delivered: '配送完了',
    cancelled: 'キャンセル',
  }[status];

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: `注文ステータスが更新されました - 注文番号: ${orderId}`,
    text: `
注文ステータスが更新されました。

注文番号: ${orderId}
ステータス: ${statusText}
合計金額: ¥${total.toLocaleString()}

ご利用ありがとうございます。
    `.trim(),
    html: `
<h2>注文ステータスが更新されました</h2>

<p>注文番号: ${orderId}</p>
<p>ステータス: ${statusText}</p>
<p>合計金額: ¥${total.toLocaleString()}</p>

<p>ご利用ありがとうございます。</p>
    `.trim(),
  };

  await transporter.sendMail(mailOptions);
} 