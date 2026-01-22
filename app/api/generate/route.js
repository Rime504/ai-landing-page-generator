import Groq from 'groq-sdk';

/**
 * POST /api/generate
 * Generates high-converting landing page copy using Groq AI
 * Input: { product, audience, benefit, tone }
 * Output: { hero, subheadline, features, cta, socialProof, urgency }
 */
export async function POST(request) {
  try {
    const { product, audience, benefit, tone } = await request.json();
    
    // Validation
    if (!product || !audience || !benefit) {
      return Response.json(
        { error: 'Product, audience, and benefit are required fields' }, 
        { status: 400 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Generate landing page copy
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an elite copywriter with 20+ years of experience in direct response marketing and conversion optimization. You've written copy for billion-dollar companies and generated millions in revenue. You specialize in creating landing pages that convert at 10%+ rates. You ONLY respond with valid JSON - no markdown, no explanations, just pure JSON."
        },
        {
          role: "user",
          content: `Create world-class, conversion-optimized landing page copy for:

Product/Service: ${product}
Target Audience: ${audience}
Main Benefit: ${benefit}
Tone: ${tone || 'professional'}

Apply these proven conversion principles:
- Use benefit-driven language that speaks to emotional triggers
- Create urgency and FOMO (fear of missing out)
- Address pain points directly
- Use power words and sensory language
- Make the CTA irresistible and clear
- Include social proof that builds trust
- Use the AIDA framework (Attention, Interest, Desire, Action)

Return ONLY a valid JSON object with this EXACT structure (no markdown, no backticks):
{
  "hero": "Powerful headline using benefit-driven language (6-12 words max)",
  "subheadline": "Compelling subheadline that elaborates benefit and creates desire (20-30 words)",
  "features": [
    {
      "title": "Feature 1 Title (3-5 words)",
      "description": "Benefit-focused description with emotional appeal (25-35 words)"
    },
    {
      "title": "Feature 2 Title (3-5 words)",
      "description": "Benefit-focused description with emotional appeal (25-35 words)"
    },
    {
      "title": "Feature 3 Title (3-5 words)",
      "description": "Benefit-focused description with emotional appeal (25-35 words)"
    }
  ],
  "cta": "Clear, action-oriented CTA button text (2-5 words)",
  "socialProof": "Compelling testimonial or social proof with specific results (40-60 words)",
  "urgency": "Scarcity or time-sensitive urgency statement (15-25 words)"
}

Use the ${tone} tone throughout. Make every word count. Focus on benefits, not features. Make it impossible to ignore.`
        }
      ],
      temperature: 0.9,
      max_tokens: 2000,
      top_p: 1,
    });

    const responseText = completion.choices[0].message.content;
    
    // Extract JSON (handle cases where AI adds markdown or explanations)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('AI response did not contain valid JSON');
    }
    
    const landingData = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!landingData.hero || !landingData.features || !landingData.cta) {
      throw new Error('Invalid response structure from AI - missing required fields');
    }

    if (!Array.isArray(landingData.features) || landingData.features.length < 3) {
      throw new Error('Invalid features array - must contain at least 3 features');
    }

    return Response.json(landingData);
    
  } catch (error) {
    console.error('Generation error:', error);
    
    // Return detailed error for debugging
    return Response.json(
      { 
        error: error.message || 'Failed to generate landing page',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}