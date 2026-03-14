import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "0");

    await connectDB();
    const products = limit
      ? await Product.find().sort({ createdAt: -1 }).limit(limit)
      : await Product.find().sort({ createdAt: -1 });

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