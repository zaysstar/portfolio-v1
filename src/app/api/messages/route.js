import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Connect to the Database
    await dbConnect();

    // 2. Get the data from the form
    const body = await req.json();

    // 3. Create a new Message in MongoDB
    const newMessage = await Message.create(body);

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}