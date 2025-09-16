import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const nameEntry = data.get('name');
    const emailEntry = data.get('email');
    const cityEntry = data.get('city');
    const messageEntry = data.get('message');

    if (
      (nameEntry !== null && typeof nameEntry !== 'string') ||
      (emailEntry !== null && typeof emailEntry !== 'string') ||
      (cityEntry !== null && typeof cityEntry !== 'string') ||
      (messageEntry !== null && typeof messageEntry !== 'string')
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid form submission' },
        { status: 400 }
      );
    }

    const name = nameEntry?.toString();
    const email = emailEntry?.toString();
    const city = cityEntry?.toString();
    const message = messageEntry?.toString();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to a database
    // 3. Send notifications to Julia
    
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', { name, email, city, message });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! Julia will get back to you within 1 hour.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
