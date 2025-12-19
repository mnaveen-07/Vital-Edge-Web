import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, password, email } = body; // Assuming signup still asks for email

    await connectDB();

    // Check if user already exists (by email to prevent duplicates)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // CHANGE: Generate a random Medical ID (e.g., VE-123456)
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const medicalId = `VE-${randomId}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with the new Medical ID
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      medicalId, // Saving the ID
    });

    await newUser.save();

    return new NextResponse(JSON.stringify({ 
      message: "User created successfully", 
      medicalId: medicalId // Send this back so you can show it to the user!
    }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
  }
};