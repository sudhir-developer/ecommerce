import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return decoded.role;  // token se role nikalta hai
  } catch {
    return null;
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      await connectDB();
      const product = await Product.findById(id);
      return NextResponse.json({ product });
    } catch (err) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }

  export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const role = await getRole();
      if (role !== "admin") {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
      const { id } = await params;
      await connectDB();
      const body = await req.json();
      const updated = await Product.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ message: "Product updated", product: updated });
    } catch (err) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }

  export async function DELETE(req: Request, {params}:{params : Promise<{id:string}>}) {
    try{
        const role = await getRole();
        if (role !== "admin") {
          return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }
        const {id} = await params;
        await connectDB();
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" })

    }catch(err){
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
  }