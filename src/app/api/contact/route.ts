import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: send an email here using a provider like Resend, SendGrid, or
    // Nodemailer + SMTP. Example with Resend (npm install resend):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "portfolio@your-domain.com",
    //   to: "you@example.com",
    //   subject: `New message from ${name}`,
    //   text: message,
    // });

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
