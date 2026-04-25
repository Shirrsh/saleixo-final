import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const TELEGRAM_ADMIN_CHAT_ID = Deno.env.get('TELEGRAM_ADMIN_CHAT_ID');

async function sendTelegramMessage(chatId: string, text: string, parseMode: string = 'HTML') {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
    }),
  });
  
  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const update = await req.json();
    console.log('Telegram update received:', JSON.stringify(update, null, 2));

    // Handle message updates
    const message = update.message;
    if (!message || !message.text) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const chatId = message.chat.id.toString();
    const userId = message.from.id.toString();
    const text = message.text;

    // Security: Only allow messages from authorized admin chat ID
    if (TELEGRAM_ADMIN_CHAT_ID && chatId !== TELEGRAM_ADMIN_CHAT_ID) {
      console.log(`Unauthorized access attempt from chat ID: ${chatId}`);
      await sendTelegramMessage(chatId, '⛔ You are not authorized to use this bot.');
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle /start command
    if (text === '/start') {
      await sendTelegramMessage(chatId, `🤖 <b>Saleixo Admin Bot</b>\n\nI can help you manage your website. Just send me commands in natural language like:\n\n• "Add a new blog post about summer trends"\n• "Show all testimonials"\n• "Update the hero title to Welcome to Saleixo"\n• "Add a new FAQ about shipping"\n• "List all categories"\n• "Delete the blog post titled Old Article"\n\nYour Chat ID: <code>${chatId}</code>`);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle /help command
    if (text === '/help') {
      await sendTelegramMessage(chatId, `📚 <b>Available Commands</b>\n\n<b>Blog Posts:</b>\n• Add/create a blog post\n• List/show all blog posts\n• Update/edit a blog post\n• Delete a blog post\n\n<b>Categories:</b>\n• Add/create a category\n• List/show categories\n• Update a category\n• Toggle category visibility\n\n<b>Testimonials:</b>\n• Add a testimonial\n• List testimonials\n• Delete a testimonial\n\n<b>FAQ:</b>\n• Add a FAQ item\n• List FAQ items\n• Delete a FAQ\n\n<b>Homepage:</b>\n• Update hero title/subtitle\n• Update CTA text\n\n<b>Services:</b>\n• List services\n• Add/update services\n\n<b>Portfolio:</b>\n• Add portfolio project\n• List portfolio items`);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send "typing" indicator
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });

    // Forward command to AI webhook for processing
    const aiWebhookUrl = `https://syoungrummuurrptckbt.supabase.co/functions/v1/admin-ai-webhook`;
    
    const aiResponse = await fetch(aiWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: text,
        source: 'telegram',
        userId: userId,
        chatId: chatId,
      }),
    });

    const aiResult = await aiResponse.json();
    console.log('AI webhook response:', JSON.stringify(aiResult, null, 2));

    // Send response back to user
    const responseText = aiResult.message || aiResult.error || 'Command processed.';
    await sendTelegramMessage(chatId, responseText);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing telegram update:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
