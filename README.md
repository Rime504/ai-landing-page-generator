# 🚀 AI Landing Page Generator

**Enterprise-grade landing page copy generation powered by Groq AI**

Transform your product ideas into high-converting landing pages in seconds. Built for marketers, founders, and agencies who demand professional results at scale.

---

## ✨ Features

### Core Capabilities
- ⚡ **Lightning Fast Generation** - Complete landing page copy in 2-3 seconds
- 🎯 **Conversion-Optimized** - Headlines, subheadlines, features, CTAs, social proof, and urgency elements
- 🎨 **Live Preview** - See your landing page rendered before export
- 📋 **One-Click Export** - Copy production-ready HTML with Tailwind CSS
- 🎭 **5 Tone Options** - Professional, Casual, Urgent, Luxury, Friendly
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🔒 **Secure API Integration** - Server-side Groq AI integration
- ✅ **Error Handling** - Comprehensive validation and user feedback

### What You Get
Each generation includes:
- **Hero Headline** - Attention-grabbing, benefit-driven
- **Subheadline** - Elaborates on the main benefit
- **3 Feature Blocks** - With titles and benefit-focused descriptions
- **Call-to-Action** - Clear, action-oriented button text
- **Social Proof** - Testimonial or credibility statement
- **Urgency Element** - Scarcity or time-sensitive messaging

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI components and state management |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | High-quality component library |
| **Groq SDK** | AI inference with Llama 3.3 70B |
| **Lucide React** | Beautiful icon system |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Groq API key ([Get one free here](https://console.groq.com))

### Installation

```bash
# 1. Create Next.js application
npx create-next-app@latest ai-landing-page-generator --no-typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# 2. Navigate to project
cd ai-landing-page-generator

# 3. Install dependencies
npm install groq-sdk lucide-react

# 4. Initialize shadcn/ui
npx shadcn@latest init -d

# 5. Add UI components
npx shadcn@latest add button card input label textarea select

# 6. Create environment file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# 7. Copy the project files into your project

# 8. Run the development server
npm run dev
```

Your app will be running at **http://localhost:3000**

---

## 📖 Usage Guide

### Basic Workflow

1. **Enter Product Details**
   - Product/Service Name (e.g., "FunderPro Trading Platform")
   - Target Audience (e.g., "Aspiring forex traders aged 25-45")
   - Main Benefit (e.g., "Trade with up to $200k in funded capital")

2. **Select Tone**
   - Professional: Business-appropriate, trustworthy
   - Casual: Friendly, conversational
   - Urgent: Creates FOMO, action-oriented
   - Luxury: Premium, exclusive
   - Friendly: Warm, approachable

3. **Generate**
   - Click "Generate Landing Page"
   - Wait 2-3 seconds for AI processing
   - Review live preview

4. **Export**
   - Click "Copy HTML"
   - Paste into your website, page builder, or HTML file
   - Deploy anywhere

### Quick Examples

Try these pre-filled examples:
- **SaaS Product** - CRM platform for small businesses
- **E-commerce** - Luxury watch e-commerce store
- **Online Course** - Coding bootcamp for career changers

---

## 🏗️ Project Structure

```
ai-landing-page-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js          # API endpoint for AI generation
│   ├── globals.css                # Global styles + animations
│   ├── layout.js                  # Root layout
│   └── page.js                    # Main application UI
├── components/
│   └── ui/                        # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── select.jsx
│       └── ...
├── lib/
│   └── utils.js                   # Utility functions
├── .env.local                     # Environment variables
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env.local` file in your project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

**Getting a Groq API Key:**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys
4. Create a new key
5. Copy and paste into `.env.local`

---

## 🎨 Customization

### Modify Tone Options
Edit `app/page.js` to add custom tones:

```javascript
<SelectContent>
  <SelectItem value="professional">💼 Professional</SelectItem>
  <SelectItem value="custom">🎯 Your Custom Tone</SelectItem>
</SelectContent>
```

### Adjust AI Prompt
Edit `app/api/generate/route.js` to fine-tune the AI's output:

```javascript
content: `Create world-class, conversion-optimized landing page copy for:
Product/Service: ${product}
// Add your custom instructions here
`
```

### Change Color Scheme
Modify Tailwind classes in `app/page.js`:

```javascript
// Change from indigo/purple to your brand colors
className="bg-gradient-to-r from-blue-600 to-cyan-600"
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard
# Settings → Environment Variables → Add GROQ_API_KEY
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Other Platforms
This Next.js app can be deployed to any platform that supports Node.js:
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

---

## 🎯 Use Cases

- **Startups** - Quick landing pages for product validation
- **Marketing Agencies** - Generate client landing page copy at scale
- **Product Launches** - Rapid copy creation for new products
- **A/B Testing** - Create multiple variations quickly
- **Freelancers** - Offer landing page copywriting services
- **E-commerce** - Product launch pages
- **SaaS Companies** - Feature pages and conversion funnels

---

## 🔧 Troubleshooting

### API Key Issues
```bash
# Verify your .env.local file
cat .env.local

# Restart dev server after adding API key
npm run dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Component Errors
```bash
# Reinstall shadcn components
npx shadcn@latest add button card input label select
```

---

## 📈 Performance

- **Generation Time**: 2-3 seconds average
- **Model**: Llama 3.3 70B (state-of-the-art)
- **API**: Groq (fastest LLM inference)
- **Bundle Size**: ~500KB (production build)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

---

## 🤝 Contributing

This is a solo project built for portfolio purposes. However, if you'd like to:
- Report bugs: Open an issue
- Suggest features: Open an issue
- Fork and modify: Go ahead! (MIT License)

---

## 👤 Author

**[Your Name]**
- 🎓 3rd Year Computer Science Student
- 🏫 University of London
- 💼 Interested in: AI automation, fintech, and growth marketing
- 🔗 GitHub: [@Rime504](https://github.com/Rime504)

### Why I Built This

As a CS student passionate about AI and marketing technology, I wanted to create a tool that:

1. **Solves a Real Problem** - Professional copywriting is expensive ($500-2000 per page)
2. **Demonstrates Technical Skills** - Full-stack development with modern tools
3. **Shows Business Acumen** - Understanding of conversion optimization
4. **Provides Immediate Value** - Entrepreneurs can use this today
5. **Showcases AI Engineering** - Effective prompt engineering and API integration

Perfect for anyone who needs high-quality landing page copy without the high price tag.

---

## 📄 License

MIT License - feel free to use this for commercial or personal projects.

---

## 🙏 Acknowledgments

- **Groq** - For providing blazing-fast AI inference
- **Anthropic** - For AI inspiration and best practices
- **Vercel** - For Next.js and deployment platform
- **shadcn** - For beautiful, accessible UI components

---

## 📞 Support

Need help? Have questions?

- 📧 Email: rimerizha@gmail.com

---

<div align="center">

**Built with ❤️ using Next.js and Groq AI**

⭐ Star this repo if you find it useful!

*Last updated: January 2025*

</div>