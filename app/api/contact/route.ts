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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
              <div style="background-color: #1e293b; color: #ffffff; padding: 20px;">
                <h2 style="margin: 0;">📩 New Contact Form Submission</h2>
              </div>
              <div style="padding: 20px; color: #1e293b;">
                <p style="margin-bottom: 10px;">
                  <strong>Name:</strong> ${name}
                </p>
                <p style="margin-bottom: 10px;">
                  <strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </p>
                <p style="margin-bottom: 10px;">
                  <strong>Subject:</strong> ${subject}
                </p>
                <p style="margin-top: 20px; white-space: pre-line;">
                  <strong>Message:</strong><br>${message}
                </p>
              </div>
              <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
                This email was sent from your website contact form.
              </div>
            </div>
          </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent successfully:", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        showModal: true,
        modalContent: {
          title: "Message Sent Successfully! 🎉",
          description:
            "Thank you for reaching out. I'll respond to your message as soon as possible.",
          messageId: info.messageId,
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
