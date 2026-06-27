import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST() {
  try {
    // 1. Logged in user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Clerk user details
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3. Check if profile already exists
    const { data: existingProfile } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("clerk_id", userId)
      .single();

    if (existingProfile) {
      return NextResponse.json({
        success: true,
        message: "Profile already exists",
      });
    }

    // 4. Create profile
    const { error } = await supabaseServer
      .from("profiles")
      .insert({
        clerk_id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile created successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}