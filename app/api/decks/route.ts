import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isClerkServerConfigured } from "@/lib/clerk";
import { supabaseServer } from "@/lib/supabase-server";

/* ===========================
   GET -> Fetch User Decks
=========================== */

export async function GET() {
  try {
    if (!isClerkServerConfigured()) {
      return NextResponse.json(
        { error: "Authentication is not configured" },
        { status: 503 }
      );
    }

    if (!supabaseServer) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 503 }
      );
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseServer
      .from("flash_decks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ===========================
   POST -> Save Deck
=========================== */

export async function POST(req: Request) {
  try {
    if (!isClerkServerConfigured()) {
      return NextResponse.json(
        { error: "Authentication is not configured" },
        { status: 503 }
      );
    }

    if (!supabaseServer) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 503 }
      );
    }

    // Clerk Authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Frontend se data lena
    const body = await req.json();

    const { title, topic, flashcards } = body;

    // Validation
    if (!title || !topic || !flashcards) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Database Insert
    const { data, error } = await supabaseServer
      .from("flash_decks")
      .insert([
        {
          user_id: userId,
          title,
          topic,
          flashcards,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deck: data,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}