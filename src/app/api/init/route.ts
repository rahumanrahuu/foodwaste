import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Attempt to push the current schema to the connected database
    console.log("Triggering automated schema synchronization...");
    
    const output = execSync("./node_modules/.bin/prisma db push --accept-data-loss", { 
      encoding: "utf8",
      env: { ...process.env }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Database schema successfully synchronized.",
      details: output 
    });
  } catch (error: any) {
    console.error("Schema synchronization failed:", error.message);
    return NextResponse.json({ 
      success: false, 
      message: "Database synchronization failed. Ensure your DATABASE_URL is valid.",
      error: error.message 
    }, { status: 500 });
  }
}
