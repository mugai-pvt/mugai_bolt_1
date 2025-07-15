interface WebhookData {
  type: 'login' | 'signup' | 'farm_registration';
  name?: string;
  email: string;
  provider: 'email' | 'google';
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  farmData?: any;
}

const WEBHOOK_URL = 'https://kishovarmam.app.n8n.cloud/webhook-test/Credentials';

export const sendToWebhook = async (data: WebhookData): Promise<boolean> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'mugAI_website',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status, response.statusText);
      return false;
    }

    console.log('Data successfully sent to webhook');
    return true;
  } catch (error) {
    console.error('Error sending data to webhook:', error);
    return false;
  }
};

export const sendLoginData = async (email: string, provider: 'email' | 'google', name?: string) => {
  return sendToWebhook({
    type: 'login',
    email,
    provider,
    name,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
};

export const sendSignupData = async (name: string, email: string, provider: 'email' | 'google') => {
  return sendToWebhook({
    type: 'signup',
    name,
    email,
    provider,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
};