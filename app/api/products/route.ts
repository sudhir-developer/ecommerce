import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, category, images, thumbnail, description } = await req.json();
    await connectDB();
    const product = await Product.create({ name, price, category, images, thumbnail, description });
    return NextResponse.json({ message: "Product added successfully", product });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}