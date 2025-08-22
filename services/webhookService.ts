// Replace the geminiService with this webhook service

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

if (!WEBHOOK_URL) {
  throw new Error("VITE_N8N_WEBHOOK_URL environment variable not set");
}

export interface WebhookPayload {
  message: string;
  userId: number;
  userRole: string;
  model: string;
  timestamp: string;
}

export async function* runQueryStream(
  prompt: string, 
  userId: number, 
  userRole: string, 
  model: string
): AsyncGenerator<string> {
  try {
    const payload: WebhookPayload = {
      message: prompt,
      userId,
      userRole,
      model,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    // Check if the response supports streaming
    const reader = response.body?.getReader();
    if (!reader) {
      // Fallback for non-streaming response
      const text = await response.text();
      yield text;
      return;
    }

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          yield chunk;
        }
      }
    } finally {
      reader.releaseLock();
    }
    
  } catch (error) {
    console.error("Error calling n8n webhook:", error);
    yield "Sorry, I encountered an error connecting to the AI service. Please try again later.";
  }
}
