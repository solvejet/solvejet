// src/lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: true,
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
})

transporter.set('debug', true)

// Add connection verification
async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('SMTP connection verified successfully')
  } catch (error) {
    console.error('SMTP connection verification failed:', error)
    throw error
  }
}

interface EmailData {
  name: string
  email: string
  company?: string
  subject?: string
  phone?: string
}

function generateEmailTemplate(data: EmailData): string {
  const calendlyLink =
    process.env.CALENDLY_LINK || 'https://calendly.com/karan-solvejet'
  const currentYear = new Date().getFullYear()

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>Thank You for Contacting SolveJet</title>
        <style>
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }

          /* Base Styles */
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f5f5f5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Container Styles */
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 32px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          /* Header Styles */
          .header {
            text-align: center;
            padding: 24px 0;
            border-bottom: 1px solid #eaeaea;
            margin-bottom: 32px;
          }

          .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 16px;
          }

          /* Content Styles */
          .content {
            padding: 0 16px;
          }

          h1 {
            color: #0066cc;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 24px;
            text-align: center;
          }

          p {
            margin: 16px 0;
            color: #374151;
            font-size: 16px;
          }

          /* Button Styles */
          .button-container {
            text-align: center;
            margin: 32px 0;
          }

          .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #0066cc;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            font-size: 16px;
            transition: background-color 0.2s ease;
          }

          .button:hover {
            background-color: #0052a3;
          }

          /* Summary Box Styles */
          .summary-box {
            background-color: #f8fafc;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
          }

          .summary-box h2 {
            color: #0066cc;
            font-size: 18px;
            margin: 0 0 16px 0;
          }

          .summary-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .summary-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eaeaea;
            color: #374151;
          }

          .summary-list li:last-child {
            border-bottom: none;
          }

          .summary-label {
            font-weight: 500;
            color: #1a1a1a;
          }

          /* Footer Styles */
          .footer {
            text-align: center;
            padding-top: 32px;
            margin-top: 32px;
            border-top: 1px solid #eaeaea;
          }

          .footer p {
            color: #6b7280;
            font-size: 14px;
            margin: 8px 0;
          }

          .social-links {
            margin-top: 24px;
          }

          .social-link {
            display: inline-block;
            padding: 8px 16px;
            color: #0066cc !important;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
          }

          .contact-info {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 16px;
            margin-top: 24px;
            text-align: center;
          }

          .contact-info p {
            margin: 8px 0;
            color: #6b7280;
            font-size: 14px;
          }

          /* Dark Mode Support */
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #1a1a1a;
              color: #ffffff;
            }

            .container {
              background-color: #2d2d2d;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            }

            h1 {
              color: #60a5fa;
            }

            p {
              color: #e5e7eb;
            }

            .summary-box {
              background-color: #374151;
              border-color: #4b5563;
            }

            .summary-box h2 {
              color: #60a5fa;
            }

            .summary-list li {
              border-color: #4b5563;
              color: #e5e7eb;
            }

            .summary-label {
              color: #ffffff;
            }

            .footer p {
              color: #9ca3af;
            }

            .social-link {
              color: #60a5fa !important;
            }

            .contact-info {
              background-color: #374151;
            }

            .contact-info p {
              color: #9ca3af;
            }
          }

          /* Responsive Design */
          @media screen and (max-width: 600px) {
            .container {
              margin: 0;
              padding: 20px;
              border-radius: 0;
            }

            h1 {
              font-size: 22px;
            }

            .button {
              display: block;
              text-align: center;
              padding: 16px;
            }

            .summary-box {
              padding: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://solvejet.net/solvejet.svg" alt="SolveJet" class="logo" />
          </div>

          <div class="content">
            <h1>Thank You for Contacting SolveJet!</h1>
            
            <p>Dear ${data.name},</p>
            
            <p>We are thrilled that you've reached out to us. Your inquiry has been received, and our team is excited to learn more about your needs. We'll thoroughly review your requirements and get back to you within the next 24 hours.</p>

            <div class="button-container">
              <a href="${calendlyLink}" class="button">Schedule a Quick Call →</a>
            </div>

            <div class="summary-box">
              <h2>Your Information</h2>
              <ul class="summary-list">
                <li>
                  <span class="summary-label">Name:</span> ${data.name}
                </li>
                ${
                  data.company
                    ? `
                <li>
                  <span class="summary-label">Company:</span> ${data.company}
                </li>
                `
                    : ''
                }
                <li>
                  <span class="summary-label">Email:</span> ${data.email}
                </li>
              </ul>
            </div>

            <p>Need immediate assistance? Feel free to reply to this email or reach out through any of the channels below.</p>
          </div>

          <div class="footer">
            <div class="social-links">
              <a href="https://twitter.com/solvejet" class="social-link">Twitter</a>
              <a href="https://linkedin.com/company/solvejet" class="social-link">LinkedIn</a>
              <a href="https://github.com/solvejet" class="social-link">GitHub</a>
            </div>

            <div class="contact-info">
              <p>SolveJet LLC</p>
              <p>30 N Gould ST Ste R, Sheridan, WY 82801</p>
              <p>Email: hello@solvejet.net</p>
              <p>Phone: +1 (XXX) XXX-XXXX</p>
            </div>

            <p>© ${currentYear} SolveJet LLC. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendThankYouEmail(data: EmailData): Promise<void> {
  try {
    // Verify connection before sending
    await verifyEmailConfig()

    const html = generateEmailTemplate(data)

    await transporter.sendMail({
      from: `"SolveJet" <${process.env.SMTP_FROM}>`,
      to: data.email,
      subject: 'Thank You for Contacting SolveJet',
      html,
    })

    console.log('Thank you email sent successfully to:', data.email)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export async function testEmailTemplate(data: EmailData): Promise<string> {
  return generateEmailTemplate(data)
}
