import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const featuredParam = searchParams.get("featured");
    const limitParam = searchParams.get("limit");

    const whereClause: Record<string, unknown> = {};

    if (categorySlug) {
      whereClause.category = { slug: categorySlug };
    }

    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
        { specifications: { contains: searchQuery } },
      ];
    }

    if (featuredParam === "true") {
      whereClause.featured = true;
    }

    const take = limitParam ? parseInt(limitParam, 10) : undefined;

    const products = await db.product.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      include: { category: true },
      orderBy: { order: "asc" },
      take,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
