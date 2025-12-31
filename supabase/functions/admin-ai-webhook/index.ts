import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Define tools for AI to call
const tools = [
  {
    type: "function",
    function: {
      name: "list_items",
      description: "List items from a database table. Use this to show existing content.",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            enum: ["blog_posts", "categories", "testimonials", "faq_items", "services", "portfolio_projects", "homepage_content", "value_propositions", "site_settings"],
            description: "The table to list items from"
          },
          limit: {
            type: "number",
            description: "Maximum number of items to return (default 10)"
          }
        },
        required: ["table"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_item",
      description: "Create a new item in a database table.",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            enum: ["blog_posts", "categories", "testimonials", "faq_items", "services", "portfolio_projects", "value_propositions"],
            description: "The table to create item in"
          },
          data: {
            type: "object",
            description: "The data to insert. Fields depend on table: blog_posts (title, content, status), categories (name, description, slug), testimonials (client_name, quote, rating), faq_items (question, answer, category), services (title, description, price_usd), portfolio_projects (title, description, category, image_url), value_propositions (title, description, icon)"
          }
        },
        required: ["table", "data"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "update_item",
      description: "Update an existing item in a database table.",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            enum: ["blog_posts", "categories", "testimonials", "faq_items", "services", "portfolio_projects", "homepage_content", "value_propositions", "site_settings"],
            description: "The table containing the item"
          },
          id: {
            type: "string",
            description: "The UUID of the item to update (or use title_match for finding by title)"
          },
          title_match: {
            type: "string",
            description: "Find item by matching title/name (case insensitive partial match)"
          },
          data: {
            type: "object",
            description: "The fields to update"
          }
        },
        required: ["table", "data"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_item",
      description: "Delete an item from a database table.",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            enum: ["blog_posts", "categories", "testimonials", "faq_items", "services", "portfolio_projects", "value_propositions"],
            description: "The table to delete from"
          },
          id: {
            type: "string",
            description: "The UUID of the item to delete"
          },
          title_match: {
            type: "string",
            description: "Find item by matching title/name (case insensitive partial match)"
          }
        },
        required: ["table"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "update_homepage",
      description: "Update homepage content like hero title, subtitle, CTA text.",
      parameters: {
        type: "object",
        properties: {
          hero_title: { type: "string", description: "The main hero title" },
          hero_subtitle: { type: "string", description: "The hero subtitle text" },
          hero_cta_text: { type: "string", description: "The call-to-action button text" },
          hero_cta_link: { type: "string", description: "The CTA button link URL" },
          meta_title: { type: "string", description: "SEO meta title" },
          meta_description: { type: "string", description: "SEO meta description" }
        }
      }
    }
  }
];

// Execute database operations
async function executeAction(supabase: any, functionName: string, args: any): Promise<string> {
  console.log(`Executing action: ${functionName}`, args);
  
  try {
    switch (functionName) {
      case 'list_items': {
        const { table, limit = 10 } = args;
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(limit)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          return `📋 No items found in ${table}.`;
        }
        
        // Format response based on table
        let response = `📋 <b>${table.replace('_', ' ').toUpperCase()}</b> (${data.length} items)\n\n`;
        
        data.forEach((item: any, index: number) => {
          const title = item.title || item.name || item.question || item.client_name || `Item ${index + 1}`;
          const status = item.status || (item.is_active ? '✅ Active' : '❌ Inactive');
          response += `${index + 1}. <b>${title}</b>\n   Status: ${status}\n`;
          if (item.id) response += `   ID: <code>${item.id.slice(0, 8)}...</code>\n`;
          response += '\n';
        });
        
        return response;
      }
      
      case 'create_item': {
        const { table, data } = args;
        
        // Generate slug for categories if not provided
        if (table === 'categories' && data.name && !data.slug) {
          data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        
        // Set default status for blog posts
        if (table === 'blog_posts' && !data.status) {
          data.status = 'draft';
        }
        
        const { data: created, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        
        if (error) throw error;
        
        const title = created.title || created.name || created.question || 'Item';
        return `✅ Created new ${table.replace('_', ' ')}: <b>${title}</b>\n\nID: <code>${created.id}</code>`;
      }
      
      case 'update_item': {
        const { table, id, title_match, data } = args;
        
        let query = supabase.from(table);
        
        // Find by ID or title match
        if (id) {
          query = query.update(data).eq('id', id);
        } else if (title_match) {
          // Find the item first
          const titleField = table === 'faq_items' ? 'question' : 
                            table === 'testimonials' ? 'client_name' : 
                            table === 'categories' ? 'name' : 'title';
          
          const { data: items } = await supabase
            .from(table)
            .select('id')
            .ilike(titleField, `%${title_match}%`)
            .limit(1);
          
          if (!items || items.length === 0) {
            return `❌ No ${table.replace('_', ' ')} found matching "${title_match}"`;
          }
          
          query = supabase.from(table).update(data).eq('id', items[0].id);
        } else {
          return '❌ Please specify an ID or title to match.';
        }
        
        const { data: updated, error } = await query.select().single();
        
        if (error) throw error;
        
        const title = updated.title || updated.name || updated.question || 'Item';
        return `✅ Updated ${table.replace('_', ' ')}: <b>${title}</b>`;
      }
      
      case 'delete_item': {
        const { table, id, title_match } = args;
        
        let itemId = id;
        
        if (!id && title_match) {
          const titleField = table === 'faq_items' ? 'question' : 
                            table === 'testimonials' ? 'client_name' : 
                            table === 'categories' ? 'name' : 'title';
          
          const { data: items } = await supabase
            .from(table)
            .select('id, ' + titleField)
            .ilike(titleField, `%${title_match}%`)
            .limit(1);
          
          if (!items || items.length === 0) {
            return `❌ No ${table.replace('_', ' ')} found matching "${title_match}"`;
          }
          
          itemId = items[0].id;
        }
        
        if (!itemId) {
          return '❌ Please specify an ID or title to match.';
        }
        
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', itemId);
        
        if (error) throw error;
        
        return `🗑️ Deleted item from ${table.replace('_', ' ')}`;
      }
      
      case 'update_homepage': {
        const updateData: any = {};
        if (args.hero_title) updateData.hero_title = args.hero_title;
        if (args.hero_subtitle) updateData.hero_subtitle = args.hero_subtitle;
        if (args.hero_cta_text) updateData.hero_cta_text = args.hero_cta_text;
        if (args.hero_cta_link) updateData.hero_cta_link = args.hero_cta_link;
        if (args.meta_title) updateData.meta_title = args.meta_title;
        if (args.meta_description) updateData.meta_description = args.meta_description;
        
        // Get existing homepage content or create new
        const { data: existing } = await supabase
          .from('homepage_content')
          .select('id')
          .limit(1);
        
        if (existing && existing.length > 0) {
          const { error } = await supabase
            .from('homepage_content')
            .update(updateData)
            .eq('id', existing[0].id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('homepage_content')
            .insert(updateData);
          
          if (error) throw error;
        }
        
        const updatedFields = Object.keys(updateData).join(', ').replace(/_/g, ' ');
        return `✅ Homepage updated: ${updatedFields}`;
      }
      
      default:
        return `❌ Unknown action: ${functionName}`;
    }
  } catch (error) {
    console.error('Database error:', error);
    return `❌ Error: ${error.message}`;
  }
}

// Log activity
async function logActivity(supabase: any, action: string, itemType: string, itemId?: string) {
  try {
    await supabase.from('activity_log').insert({
      action,
      item_type: itemType,
      item_id: itemId,
      user_email: 'telegram_bot',
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command, source, userId, chatId } = await req.json();
    
    console.log('Received command:', { command, source, userId, chatId });
    
    if (!command) {
      return new Response(JSON.stringify({ error: 'No command provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Send command to AI for processing
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an admin assistant for the Alvaio website. You help manage website content through natural language commands.

Available tables and their key fields:
- blog_posts: title, content, status (draft/published), excerpt, featured_image_url
- categories: name, description, slug, is_active, show_in_header, image_url
- testimonials: client_name, quote, rating (1-5), is_active
- faq_items: question, answer, category, is_active
- services: title, description, price_usd, is_active, image_url
- portfolio_projects: title, description, category, image_url
- homepage_content: hero_title, hero_subtitle, hero_cta_text, hero_cta_link, meta_title, meta_description
- value_propositions: title, description, icon (CheckCircle, Star, Clock, Shield, etc.), display_order

Parse the user's natural language command and call the appropriate function. Be helpful and confirm actions clearly.`
          },
          {
            role: "user",
            content: command
          }
        ],
        tools: tools,
        tool_choice: "auto",
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ 
          message: '⚠️ Rate limit reached. Please try again in a moment.' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ 
        error: 'AI service error',
        message: '❌ Sorry, I encountered an error processing your command. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResult = await aiResponse.json();
    console.log('AI response:', JSON.stringify(aiResult, null, 2));

    const choice = aiResult.choices?.[0];
    
    // Check if AI wants to call a function
    if (choice?.message?.tool_calls && choice.message.tool_calls.length > 0) {
      const toolCall = choice.message.tool_calls[0];
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log('Executing function:', functionName, args);
      
      const result = await executeAction(supabase, functionName, args);
      
      // Log the activity
      await logActivity(supabase, `${functionName} via Telegram`, args.table || 'homepage', args.id);
      
      return new Response(JSON.stringify({ message: result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // If no function call, return the AI's text response
    const textResponse = choice?.message?.content || "I understood your request but I'm not sure what action to take. Try being more specific, like 'list all blog posts' or 'add a new testimonial from John saying Great service!'";
    
    return new Response(JSON.stringify({ message: textResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in admin-ai-webhook:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: '❌ An error occurred. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
