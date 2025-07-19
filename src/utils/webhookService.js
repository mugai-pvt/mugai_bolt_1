const WEBHOOK_URL = 'https://kishovarmam.app.n8n.cloud/webhook-test/Credentials';

export const sendToWebhook = async (data) => {
  try {
    // Skip webhook in development if URL is not accessible
    if (import.meta.env.DEV) {
      console.log('Development mode: Webhook data would be sent:', data);
      return true;
    }

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
    // Log the error but don't throw it to prevent breaking the application
    console.warn('Webhook service unavailable:', error instanceof Error ? error.message : 'Unknown error');
    console.log('Application will continue without webhook integration');
    return false;
  }
};

export const sendLoginData = async (email, provider, name) => {
  return sendToWebhook({
    type: 'login',
    email,
    provider,
    name,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
};

export const sendSignupData = async (name, email, provider) => {
  return sendToWebhook({
    type: 'signup',
    name,
    email,
    provider,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
};