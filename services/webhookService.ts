// Webhook service for connecting to n8n automation workflows

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export interface WebhookPayload {
  message: string;
  userId: number;
  userRole: string;
  model: string;
  timestamp: string;
}

// Check if webhook URL is configured
function isWebhookConfigured(): boolean {
  return Boolean(WEBHOOK_URL && WEBHOOK_URL.trim().length > 0);
}

export async function* runQueryStream(
  prompt: string, 
  userId: number, 
  userRole: string, 
  model: string
): AsyncGenerator<string> {
  // Handle missing webhook configuration gracefully
  if (!isWebhookConfigured()) {
    console.warn("VITE_N8N_WEBHOOK_URL environment variable not set");
    yield "⚠️ **Configuration Required**: The AI service is not properly configured. Please check that the webhook URL is set in the environment variables.";
    return;
  }

  try {
    const payload: WebhookPayload = {
      message: prompt,
      userId,
      userRole,
      model,
      timestamp: new Date().toISOString()
    };

    console.log("Sending request to webhook:", WEBHOOK_URL);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`Webhook request failed: ${response.status} ${response.statusText}`);
      yield `❌ **Connection Error**: Unable to connect to AI service (${response.status}). Please try again or contact support if the problem persists.`;
      return;
    }

    // Check if the response supports streaming
    const reader = response.body?.getReader();
    if (!reader) {
      // Fallback for non-streaming response
      const text = await response.text();
      if (text) {
        yield text;
      } else {
        yield "✅ Request completed successfully, but no response was received.";
      }
      return;
    }

    const decoder = new TextDecoder();
    let hasContent = false;
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          hasContent = true;
          yield chunk;
        }
      }

      // If no content was streamed, provide feedback
      if (!hasContent) {
        yield "✅ Request completed successfully, but no response content was received.";
      }
      
    } finally {
      reader.releaseLock();
    }
    
  } catch (error) {
    console.error("Error calling n8n webhook:", error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      yield "🌐 **Network Error**: Unable to reach the AI service. Please check your internet connection and try again.";
    } else {
      yield "❌ **Service Error**: An unexpected error occurred while connecting to the AI service. Please try again later.";
    }
  }
}

// Utility function to test webhook connectivity
export async function testWebhookConnection(): Promise<{ success: boolean; message: string }> {
  if (!isWebhookConfigured()) {
    return {
      success: false,
      message: "Webhook URL is not configured"
    };
  }

  try {
    // Send a simple test payload
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Connection test",
        userId: 0,
        userRole: "test",
        model: "test",
        timestamp: new Date().toISOString()
      })
    });

    return {
      success: response.ok,
      message: response.ok ? "Connection successful" : `HTTP ${response.status}: ${response.statusText}`
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
