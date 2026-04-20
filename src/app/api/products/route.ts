import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const dataPath = join(process.cwd(), "public", "data", "products.json");
    let products = JSON.parse(readFileSync(dataPath, "utf-8"));

    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const featuredParam = searchParams.get("featured");
    const limitParam = searchParams.get("limit");

    if (categorySlug) {
      products = products.filter(
        (p: any) => p.category?.slug === categorySlug
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.specifications?.toLowerCase().includes(q)
      );
    }

    if (featuredParam === "true") {
      products = products.filter((p: any) => p.featured === true);
    }

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit)) {
        products = products.slice(0, limit);
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
