import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return NextResponse.json({ 
      user: { 
        name: decoded.name, 
        email: decoded.email, 
        role: decoded.role 
      } 
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}