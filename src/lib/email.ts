import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactNotification({
  name,
  email,
  subject,
  message
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Resend'in test emaili
      to: process.env.NOTIFICATION_EMAIL || 'admin@grafik.com',
      subject: `Yeni Iletisim Mesaji: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .info-row {
                margin: 15px 0;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #667eea;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                margin-bottom: 5px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Yeni İletişim Mesajı</h1>
              </div>
              <div class="content">
                <div class="info-row">
                  <div class="label">👤 Gönderen:</div>
                  <div>${name}</div>
                </div>
                <div class="info-row">
                  <div class="label">📧 Email:</div>
                  <div><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="info-row">
                  <div class="label">📝 Konu:</div>
                  <div>${subject}</div>
                </div>
                <div class="message-box">
                  <div class="label">💬 Mesaj:</div>
                  <div>${message}</div>
                </div>
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  Bu mesaj portfolyo sitenizin iletişim formundan gönderildi.
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email gonderme hatasi:', error)
    return { success: false, error }
  }
}