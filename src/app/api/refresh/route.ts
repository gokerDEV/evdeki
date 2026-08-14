import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  try {
    // Revalidate the ENTIRE site layout (all pages) just in case the slider is on the homepage
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: "Cache cleared successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache purge failed:", error);
    return NextResponse.json(
      { success: false, message: "Error clearing cache" },
      { status: 500 },
    );
  }
}
