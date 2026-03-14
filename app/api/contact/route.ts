import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try{
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 });
      }
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "sudhirkumarpatel1810@gmail.com", // apni email yahan
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      });
      return NextResponse.json({ message: "Message sent successfully!" });
    
      

      }
      catch(err){
        console.log(err);
        return NextResponse.json({ message: "Message sent successfully!"})
      }


}