import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "Email not found" }, { status: 404 });

    // Token generate karo
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
    await user.save();

    // Reset link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    // Resend se email bhejo
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>Aapne password reset request ki hai.</p>
        <p>Neeche diye link pe click karo:</p>
        <a href="${resetLink}" style="background:black;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
          Reset Password
        </a>
        <p>Yeh link 1 hour mein expire ho jayega.</p>
        <p>Agar aapne request nahi ki toh ignore karo.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent to your email" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}