'use server'

import { generateText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

export interface BlogAutofillData {
  title: string
  excerpt: string
  content: string
  metaTitle: string
  metaDescription: string
  category: string
}

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions'

async function researchWithPerplexity(seoKeyword: string): Promise<string | null> {
  const apiKey = process.env.PERPLEXITY_API_KEY

  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY is not configured')
  }

  const prompt = `Research the topic "${seoKeyword}" in the context of weddings in Queensland, Australia.

Provide comprehensive, factual information including:
- Key facts and statistics
- Common questions couples have about this topic
- Best practices and expert tips
- Relevant local information for Queensland/Brisbane area
- Any recent trends or updates

Focus on information that would be valuable for couples planning their wedding.
Be thorough and factual - this research will be used to write an SEO-optimized blog post.`

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Perplexity API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || null
}

async function writeBlogWithClaude(
  seoKeyword: string,
  title: string | null,
  research: string
): Promise<BlogAutofillData> {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  })

  const prompt = `You are an expert SEO copywriter for Flare Films, a premium wedding videography company in Brisbane, Queensland, Australia.

Based on the following research, write a highly SEO-optimized blog post about "${seoKeyword}".

${title ? `Use this exact title: "${title}"` : `Create an engaging, SEO-optimized title that includes the keyword "${seoKeyword}".`}

RESEARCH DATA:
${research}

REQUIREMENTS:
1. The blog post should be comprehensive (1500-2500 words)
2. Naturally incorporate the SEO keyword "${seoKeyword}" throughout the content
3. Include the keyword in:
   - The title (if creating one)
   - The first paragraph
   - At least 2-3 H2 headings
   - Naturally throughout the body (aim for 1-2% keyword density)
4. Structure with clear H2 and H3 headings for scannability
5. Include practical tips and actionable advice
6. Write in a warm, professional tone that connects with couples planning their wedding
7. Include internal linking opportunities (mention "Brisbane wedding videographer", "Gold Coast wedding films", etc.)
8. End with a call-to-action related to wedding videography

FORMAT YOUR RESPONSE AS JSON:
{
  "title": "SEO-optimized title with keyword",
  "excerpt": "A compelling 2-3 sentence summary (150-160 characters) that includes the keyword and entices readers to click",
  "content": "Full HTML blog content with <h2>, <h3>, <p>, <ul>, <li>, <strong> tags. Do NOT include <html>, <head>, <body> tags.",
  "metaTitle": "SEO meta title (50-60 characters) with keyword at the start",
  "metaDescription": "SEO meta description (150-160 characters) with keyword and call-to-action",
  "category": "Choose the most appropriate: Wedding Tips, Venues, Wedding Films, Behind the Scenes, Real Weddings, or Planning"
}

Return ONLY valid JSON, no markdown code blocks or other text.`

  const { text } = await generateText({
    model: openrouter('anthropic/claude-sonnet-4.5'),
    prompt,
  })

  // Clean up and parse the response
  let jsonContent = text.trim()
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim()

  // Try to find JSON object in the response
  const jsonMatch = jsonContent.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonContent = jsonMatch[0]
  }

  return JSON.parse(jsonContent) as BlogAutofillData
}

export async function autofillBlogPost(
  seoKeyword: string,
  title?: string
): Promise<{
  success: boolean
  data?: BlogAutofillData
  error?: string
}> {
  try {
    if (!seoKeyword || seoKeyword.trim().length === 0) {
      return {
        success: false,
        error: 'Please enter an SEO keyword',
      }
    }

    if (!process.env.PERPLEXITY_API_KEY) {
      return {
        success: false,
        error: 'PERPLEXITY_API_KEY is not configured',
      }
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return {
        success: false,
        error: 'OPENROUTER_API_KEY is not configured',
      }
    }

    // Step 1: Research the topic with Perplexity
    console.log('Researching topic with Perplexity...')
    const research = await researchWithPerplexity(seoKeyword)

    if (!research) {
      return {
        success: false,
        error: 'Failed to research topic - no data returned',
      }
    }

    // Step 2: Write the blog post with Claude Sonnet 4.5
    console.log('Writing blog post with Claude Sonnet 4.5...')
    const blogData = await writeBlogWithClaude(seoKeyword, title || null, research)

    return {
      success: true,
      data: blogData,
    }
  } catch (error) {
    console.error('Error autofilling blog post:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate blog post',
    }
  }
}
