import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("Missing OPENROUTER_API_KEY in environment variables.");
      return NextResponse.json({ error: 'API Key not configured.' }, { status: 500 });
    }

    const { messages } = await req.json();

    const systemPrompt = {
      role: 'system',
      content: `You are 'Donate Now AI', a friendly, mindful, and highly concise customer support chatbot for a Food Waste Management System.
Your purpose is to assist users in donating leftover food to NGOs to reduce global waste and hunger. 
CRITICAL INSTRUCTIONS:
- Be EXTREMELY short and direct. Answers should rarely exceed 1 or 2 small sentences. 
- Cultivate a warm, mindful, and exceptionally helpful tone.
- If asked how to donate: tell them to click the 'Donate' button, fill their food details, and click 'Locate Me'.
- If asked about pickup: tell them local delivery drivers view exact coordinates via the secure Delivery Portal.
- No emojis under any circumstances.
- Never invent addresses or facts beyond what is provided.`
    };

    const payload = {
      model: 'nvidia/nemotron-3-nano-30b-a3b:free',
      messages: [systemPrompt, ...messages],
      reasoning: { enabled: true }
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-OpenRouter-Title': 'Donate Now AI',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API Error:", errorData);
      return NextResponse.json({ error: 'Failed to fetch response from AI' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
