// src/lib/email/templates.ts
import type { ContactFormData } from '@/app/api/contact/route';

interface TemplateOptions {
  baseUrl: string;
}

/**
 * Generate a contact form confirmation email
 */
export function generateContactConfirmationEmail(
  formData: ContactFormData,
  options: TemplateOptions
): { subject: string; text: string; html: string } {
  const { baseUrl } = options;
  const logoUrl = `${baseUrl}/logo.png`;
  const currentYear = new Date().getFullYear().toString();

  // List of selected services
  const selectedServices = Object.entries(formData.services)
    .filter(([, value]) => value)
    .map(([key]) => {
      switch (key) {
        case 'customSoftware':
          return 'Custom Software';
        case 'webDevelopment':
          return 'Web Development';
        case 'mobileDevelopment':
          return 'Mobile Development';
        case 'cloudServices':
          return 'Cloud Services';
        case 'aiSolutions':
          return 'AI Solutions';
        case 'staffAugmentation':
          return 'Staff Augmentation';
        case 'other':
          return 'Other Services';
        default:
          return key;
      }
    })
    .join(', ');

  // Plain text version
  const text = `
    Thank you for contacting Solvejet!

    We have received your inquiry about ${selectedServices}. Our team will review your message and get back to you shortly.

    Here's a summary of your submission:

    Name: ${formData.name}
    Email: ${formData.email}
    ${formData.company ? `Company: ${formData.company}\n` : ''}
    ${formData.phone ? `Phone: ${formData.phone}\n` : ''}
    Message: ${formData.message}

    We typically respond within 1-2 business days.

    Best regards,
    The Solvejet Team
  `.trim();

  // HTML version with improved design
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Solvejet</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', Arial, sans-serif;
          line-height: 1.6;
          color: #2c2e35;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 0;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .header {
          background-color: #0055b8;
          padding: 30px 20px;
          text-align: center;
        }

        .header img {
          max-width: 180px;
          height: auto;
          margin: 0 auto;
        }

        .hero {
          padding: 40px 30px 20px;
          text-align: center;
          background: linear-gradient(to bottom, #e6f1ff, #ffffff);
        }

        .hero h1 {
          color: #0055b8;
          margin: 0;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .hero p {
          color: #374151;
          font-size: 16px;
          margin-top: 15px;
          margin-bottom: 0;
        }

        .content {
          padding: 20px 30px 30px;
        }

        .greeting {
          font-size: 17px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .message-note {
          margin-bottom: 25px;
          font-size: 16px;
          color: #4b5563;
        }

        .summary-title {
          color: #0055b8;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 12px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #e6f1ff;
        }

        .summary {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #0055b8;
        }

        .summary p {
          margin: 10px 0;
          font-size: 15px;
        }

        .summary strong {
          font-weight: 600;
          color: #111827;
        }

        .note {
          background-color: #fff8e6;
          padding: 15px 20px;
          border-radius: 8px;
          margin: 25px 0;
          font-size: 15px;
          color: #92400e;
          border-left: 4px solid #f59e0b;
        }

        .cta-button {
          display: inline-block;
          background-color: #0055b8;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
          box-shadow: 0 2px 4px rgba(0, 85, 184, 0.1);
          transition: all 0.2s ease;
        }

        .cta-button:hover {
          background-color: #004a9f;
          box-shadow: 0 4px 6px rgba(0, 85, 184, 0.2);
        }

        .footer {
          text-align: center;
          padding: 25px 20px;
          background-color: #f3f4f6;
          color: #6b7280;
          font-size: 14px;
        }

        .social-links {
          margin: 15px 0;
        }

        .social-links a {
          display: inline-block;
          margin: 0 8px;
          color: #0055b8;
          text-decoration: none;
        }

        .legal-links {
          margin-top: 15px;
          font-size: 13px;
        }

        .legal-links a {
          color: #6b7280;
          text-decoration: none;
          margin: 0 10px;
        }

        .address {
          margin-top: 15px;
          font-size: 13px;
          color: #9ca3af;
        }

        a {
          color: #0055b8;
          text-decoration: underline;
        }

        @media only screen and (max-width: 480px) {
          .container {
            margin: 0;
            border-radius: 0;
          }

          .hero, .content {
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero h1 {
            font-size: 22px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Solvejet Logo" />
        </div>

        <div class="hero">
          <h1>Thank You for Reaching Out!</h1>
          <p>We've received your message and we're excited to help you.</p>
        </div>

        <div class="content">
          <p class="greeting">Hello ${formData.name},</p>

          <p class="message-note">We have received your inquiry about <strong>${selectedServices}</strong>. Our team is reviewing your message and will get back to you shortly.</p>

          <h2 class="summary-title">Your Submission Details</h2>
          <div class="summary">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Services:</strong> ${selectedServices}</p>
            <p><strong>Message:</strong></p>
            <p style="padding-left: 10px; border-left: 2px solid #d1d5db;">${formData.message.replace(
              /\n/g,
              '<br>'
            )}</p>
          </div>

          <div class="note">
            <strong>Note:</strong> We typically respond within 1-2 business days. If you have any urgent questions, please call us at <a href="tel:+12345678900">+1 (234) 567-8900</a>.
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${baseUrl}/services" class="cta-button">Explore Our Services</a>
          </div>
        </div>

        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/solvejet">Twitter</a> •
            <a href="https://linkedin.com/company/solvejet">LinkedIn</a> •
            <a href="https://github.com/solvejet">GitHub</a>
          </div>

          <p>© ${currentYear} Solvejet. All rights reserved.</p>

          <div class="legal-links">
            <a href="${baseUrl}/privacy-policy">Privacy Policy</a> •
            <a href="${baseUrl}/terms-of-service">Terms of Service</a>
          </div>

          <div class="address">
            Solvejet Technologies Inc.<br>
            123 Tech Plaza, Suite 400<br>
            San Francisco, CA 94103
          </div>
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return {
    subject: 'Thank you for contacting Solvejet',
    text,
    html,
  };
}

/**
 * Generate an email to notify internal staff about a new contact form submission
 */
export function generateContactNotificationEmail(formData: ContactFormData): {
  subject: string;
  text: string;
  html: string;
} {
  // List of selected services
  const selectedServices = Object.entries(formData.services)
    .filter(([, value]) => value)
    .map(([key]) => {
      switch (key) {
        case 'customSoftware':
          return 'Custom Software';
        case 'webDevelopment':
          return 'Web Development';
        case 'mobileDevelopment':
          return 'Mobile Development';
        case 'cloudServices':
          return 'Cloud Services';
        case 'aiSolutions':
          return 'AI Solutions';
        case 'staffAugmentation':
          return 'Staff Augmentation';
        case 'other':
          return 'Other Services';
        default:
          return key;
      }
    })
    .join(', ');

  // Plain text version
  const text = `
    New Contact Form Submission

    A new contact form has been submitted with the following details:

    Name: ${formData.name}
    Email: ${formData.email}
    ${formData.company ? `Company: ${formData.company}\n` : ''}
    ${formData.phone ? `Phone: ${formData.phone}\n` : ''}
    Services: ${selectedServices}
    Source: ${formData.source}

    Message:
    ${formData.message}

    Please respond to this inquiry as soon as possible.
  `.trim();

  // HTML version with improved design for internal notifications
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', Arial, sans-serif;
          line-height: 1.6;
          color: #2c2e35;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .header {
          background-color: #0055b8;
          color: white;
          padding: 20px 30px;
          border-bottom: 4px solid #003d82;
        }

        .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .header span {
          display: inline-block;
          margin-top: 8px;
          font-size: 15px;
          opacity: 0.9;
          font-weight: 400;
        }

        .notification-badge {
          display: inline-block;
          background-color: #ef4444;
          color: white;
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 50px;
          margin-right: 10px;
          vertical-align: middle;
        }

        .content {
          padding: 25px 30px 30px;
        }

        .intro {
          font-size: 16px;
          margin-bottom: 25px;
          color: #4b5563;
        }

        .details {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #0055b8;
        }

        .details p {
          margin: 10px 0;
          font-size: 15px;
        }

        .details strong {
          font-weight: 600;
          color: #111827;
          min-width: 90px;
          display: inline-block;
        }

        .details .message-label {
          display: block;
          margin-bottom: 5px;
        }

        .message-content {
          background-color: white;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          margin-top: 8px;
          white-space: pre-line;
        }

        .services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 5px;
        }

        .service-tag {
          background-color: #e6f1ff;
          color: #0055b8;
          font-size: 13px;
          padding: 3px 10px;
          border-radius: 50px;
          font-weight: 500;
        }

        .cta-container {
          text-align: center;
          margin-top: 30px;
        }

        .cta-button {
          display: inline-block;
          background-color: #0055b8;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 15px;
          margin: 0 10px;
          box-shadow: 0 2px 4px rgba(0, 85, 184, 0.1);
        }

        .cta-button.secondary {
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
        }

        .priority-high {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 3px 10px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 13px;
          display: inline-block;
          margin-left: 10px;
        }

        .metadata {
          background-color: #f3f4f6;
          padding: 15px 20px;
          border-radius: 8px;
          margin-top: 30px;
          font-size: 13px;
          color: #6b7280;
        }

        .metadata p {
          margin: 5px 0;
        }

        .source-tag {
          background-color: #e5e7eb;
          color: #4b5563;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f3f4f6;
          color: #6b7280;
          font-size: 13px;
          border-top: 1px solid #e5e7eb;
        }

        @media only screen and (max-width: 480px) {
          .container {
            margin: 0;
            border-radius: 0;
          }

          .header, .content {
            padding-left: 20px;
            padding-right: 20px;
          }

          .cta-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .cta-button {
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>
            <span class="notification-badge">New</span>
            Contact Form Submission
          </h1>
          <span>${formData.name} is interested in ${selectedServices}</span>
        </div>

        <div class="content">
          <p class="intro">A new contact form has been submitted that requires your attention. Please review the details below and follow up appropriately.</p>

          <div class="details">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            ${
              formData.phone
                ? `<p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>`
                : ''
            }

            <p>
              <strong>Services:</strong>
              <div class="services-list">
                ${Object.entries(formData.services)
                  .filter(([, value]) => value)
                  .map(([key]) => {
                    let service = '';
                    switch (key) {
                      case 'customSoftware':
                        service = 'Custom Software';
                        break;
                      case 'webDevelopment':
                        service = 'Web Development';
                        break;
                      case 'mobileDevelopment':
                        service = 'Mobile Development';
                        break;
                      case 'cloudServices':
                        service = 'Cloud Services';
                        break;
                      case 'aiSolutions':
                        service = 'AI Solutions';
                        break;
                      case 'staffAugmentation':
                        service = 'Staff Augmentation';
                        break;
                      case 'other':
                        service = 'Other Services';
                        break;
                      default:
                        service = key;
                    }
                    return `<span class="service-tag">${service}</span>`;
                  })
                  .join('')}
              </div>
            </p>

            <p><strong class="message-label">Message:</strong></p>
            <div class="message-content">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="cta-container">
            <a href="mailto:${
              formData.email
            }?subject=RE: Your Inquiry About ${selectedServices}" class="cta-button">
              Respond Now
            </a>
            <a href="#" class="cta-button secondary">
              Mark as Assigned
            </a>
          </div>

          <div class="metadata">
            <p><strong>Source:</strong> <span class="source-tag">${formData.source}</span></p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>IP Address:</strong> [IP_ADDRESS]</p>
            <p><strong>Lead ID:</strong> #${Math.random()
              .toString(36)
              .substring(2, 10)
              .toUpperCase()}</p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated notification from the Solvejet CRM system.</p>
          <p>Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `.trim();

  return {
    subject: `New Contact Form Submission: ${formData.name} - ${selectedServices}`,
    text,
    html,
  };
}
