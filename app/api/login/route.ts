import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // CHANGE: Destructure medicalId instead of email
    const { medicalId, password } = body;

    await connectDB();

    // CHANGE: Find user by medicalId
    const user = await User.findOne({ medicalId });
    
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "Invalid Medical ID" }), {
        status: 400,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ message: "Invalid password" }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify({ 
      message: "Login successful", 
      user: { name: user.name, medicalId: user.medicalId } 
    }), {
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};