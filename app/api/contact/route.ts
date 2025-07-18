import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to portfolio owner (you)
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
  <div style="font-family: 'Helvetica Neue', sans-serif; background-color: #f3f4f6; padding: 30px;">
    <table style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
      <thead style="background-color: #1f2937;">
        <tr>
          <th style="padding: 20px; color: #ffffff; text-align: left; font-size: 20px;">
            📩 New Contact Submission
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 24px; color: #111827;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="margin-top: 16px;"><strong>Message:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; font-style: italic;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f5f9; padding: 20px; font-size: 12px; color: #6b7280; text-align: center;">
            You received this email from your portfolio's contact form.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`,
    };

    // Confirmation email to the sender
    const userMailOptions = {
      from: `"Mahmud Hasan Sabbir" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for contacting me, ${name}!`,
      html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; background-color: #f9fafb; padding: 30px;">
        <table style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
          <thead style="background-color: #3b82f6;">
            <tr>
              <th style="padding: 20px; color: #ffffff; text-align: left; font-size: 20px;">
                Thanks for reaching out! 🙌
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 24px; color: #111827;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for getting in touch. I’ve received your message and will reply as soon as possible.</p>
                
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
    
                <p><strong>Your message:</strong></p>
                <div style="background-color: #f1f5f9; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px; font-style: italic;">
                  ${message.replace(/\n/g, "<br/>")}
                </div>
    
                <p style="margin-top: 24px;">Looking forward to connecting! 👋</p>
                <p>Warm regards,<br/><strong>Mahmud Hasan Sabbir</strong></p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f3f4f6; padding: 16px; font-size: 12px; text-align: center; color: #9ca3af;">
                This is an automated confirmation email.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    };

    transporter.sendMail(ownerMailOptions);
    transporter.sendMail(userMailOptions);

    // console.log("Admin email sent:", info1.messageId);
    // console.log("Confirmation email sent:", info2.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        showModal: true,
        modalContent: {
          title: "Message Sent Successfully! 🎉",
          description:
            "Thank you for reaching out. I'll respond to your message as soon as possible.",
          // messageId: info1.messageId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      {
        success: false,
        showModal: true,
        modalContent: {
          title: "Oops! Something went wrong 😕",
          description:
            "Sorry, we couldn't send your message. Please try again later.",
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      },
      { status: 500 }
    );
  }
}
