# Domain & Professional Presence Setup Guide

> Step-by-step instructions for configuring a professional domain for Marcus Daley's portfolio

**Last Updated:** 2026-01-22

---

## Domain Recommendations

Based on your name (Marcus Daley) and profession (game development engineer), here are the recommended domain options ranked by professionalism and memorability:

### Top Recommendations

| Domain | Availability* | Score | Notes |
|--------|--------------|-------|-------|
| **marcusdaley.dev** | Check | ⭐⭐⭐⭐⭐ | Best option - `.dev` signals developer identity |
| **marcusdaley.io** | Check | ⭐⭐⭐⭐⭐ | Tech-forward, commonly used in industry |
| **marcusdaley.com** | Check | ⭐⭐⭐⭐ | Classic professional choice |
| **mdaley.dev** | Check | ⭐⭐⭐⭐ | Short, clean alternative |

### Alternative Options

| Domain | Notes |
|--------|-------|
| marcusdaleygames.com | Game development specific |
| marcusd.dev | Shorter variant |
| daleydev.com | Last name + profession |
| grizzwaldhouse.dev | Matches GitHub username (less professional) |

### Recommendation: `marcusdaley.dev`

**Reasons:**
1. `.dev` is a Google-managed TLD with mandatory HTTPS
2. Immediately communicates developer identity
3. Short, memorable, and professional
4. Widely recognized in the tech industry
5. Matches resume and LinkedIn naming conventions

---

## Domain Acquisition

### Option 1: Google Domains (Now Squarespace)

1. Visit https://domains.squarespace.com/
2. Search for `marcusdaley.dev`
3. Expected price: ~$12-14/year for `.dev` domains
4. Add to cart and complete checkout
5. Verify email ownership

### Option 2: Namecheap

1. Visit https://www.namecheap.com/
2. Search for `marcusdaley.dev`
3. Often has competitive first-year pricing
4. Enable WhoisGuard (free privacy protection)
5. Complete purchase

### Option 3: Cloudflare Registrar

1. Visit https://dash.cloudflare.com/
2. Create account if needed
3. Search for domain in registrar section
4. At-cost pricing (no markup)
5. Includes free DNSSEC

**Recommended:** Cloudflare for best pricing and easy DNS management with Vercel.

---

## Vercel DNS Configuration

### Step 1: Add Domain to Vercel

```bash
# In your project directory, or via Vercel dashboard
vercel domains add marcusdaley.dev
```

Or via Dashboard:
1. Go to https://vercel.com/dashboard
2. Select `portfolio-website` project
3. Go to Settings → Domains
4. Click "Add Domain"
5. Enter `marcusdaley.dev`
6. Choose "Add" (not redirect)

### Step 2: Configure DNS Records

Vercel will provide DNS records to add. Typically:

**For apex domain (marcusdaley.dev):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |

**For www subdomain:**

| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |

### Step 3: Add Records at Registrar

**At Cloudflare:**
1. Go to DNS settings for your domain
2. Add A record:
   - Type: A
   - Name: @
   - IPv4 address: 76.76.21.21
   - Proxy status: DNS only (gray cloud)
3. Add CNAME record:
   - Type: CNAME
   - Name: www
   - Target: cname.vercel-dns.com
   - Proxy status: DNS only

**At Namecheap:**
1. Go to Domain List → Manage → Advanced DNS
2. Add A record with Host: @ and Value: 76.76.21.21
3. Add CNAME with Host: www and Value: cname.vercel-dns.com

### Step 4: Verify in Vercel

1. Return to Vercel Domains settings
2. Wait for DNS propagation (usually 1-10 minutes)
3. Vercel will show "Valid Configuration" when ready
4. SSL certificate is automatically provisioned

---

## HTTPS Configuration

### Vercel Automatic SSL

Vercel automatically provisions SSL certificates via Let's Encrypt:

1. No manual configuration required
2. Certificate auto-renews every 90 days
3. Supports HSTS out of the box
4. Forces HTTPS redirect automatically

### Security Headers Update

Update `next.config.js` to add HSTS header:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Existing headers...
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};
```

---

## Canonical URL Update

### Update Metadata

In `src/metadata.ts`, update the base URL:

```typescript
// Before
const baseUrl = 'https://portfolio-website-6y4r1pzds-marcusds-projects.vercel.app';

// After
const baseUrl = 'https://marcusdaley.dev';
```

### Update All References

Search and replace the old Vercel URL in:
- `src/metadata.ts`
- `next.config.js` (if referenced)
- Any hardcoded URLs in components

### Verify Canonical Tags

Ensure `<link rel="canonical">` uses the new domain:

```tsx
// In layout.tsx or via metadata
export const metadata = {
  metadataBase: new URL('https://marcusdaley.dev'),
  alternates: {
    canonical: '/',
  },
};
```

---

## SEO Migration Checklist

### Before Domain Switch

- [ ] Record current Google Search Console data
- [ ] Document existing indexed pages
- [ ] Set up Google Search Console for new domain in advance

### During Switch

- [ ] Update all internal links to use new domain
- [ ] Ensure canonical tags point to new domain
- [ ] Update sitemap.xml with new domain
- [ ] Update robots.txt if needed

### After Switch

- [ ] Verify SSL is working (https://www.ssllabs.com/ssltest/)
- [ ] Submit new sitemap to Google Search Console
- [ ] Request indexing for key pages
- [ ] Monitor for crawl errors
- [ ] Update external profiles (LinkedIn, GitHub, itch.io)

---

## External Profile Updates

After domain is live, update these profiles:

### LinkedIn
1. Go to your LinkedIn profile
2. Edit Contact Info section
3. Add website: `https://marcusdaley.dev`

### GitHub
1. Go to GitHub profile settings
2. Update website field to `https://marcusdaley.dev`
3. Consider adding to bio

### itch.io
1. Go to your itch.io profile settings
2. Add portfolio link

### Resume
1. Update PDF resume with new URL
2. Ensure consistent branding

---

## Redirect Configuration

### Old Vercel URL Redirect

The old `*.vercel.app` URL will continue to work, but should redirect:

1. In Vercel Dashboard → Domains
2. Select the old `portfolio-website-*.vercel.app` domain
3. Click the three dots menu
4. Select "Edit"
5. Choose "Redirect to [marcusdaley.dev]"

### www to non-www Redirect

In Vercel, configure `www.marcusdaley.dev` to redirect to `marcusdaley.dev`:

1. Both domains should be added
2. Set `marcusdaley.dev` as primary
3. `www` will auto-redirect

---

## Cost Summary

| Item | Annual Cost |
|------|-------------|
| `.dev` domain | ~$12-14/year |
| SSL certificate | Free (Vercel) |
| DNS hosting | Free (Cloudflare/Vercel) |
| **Total** | **~$12-14/year** |

---

## Verification Checklist

After setup, verify:

- [ ] `https://marcusdaley.dev` loads correctly
- [ ] `https://www.marcusdaley.dev` redirects to non-www
- [ ] `http://` redirects to `https://`
- [ ] SSL certificate is valid (check browser padlock)
- [ ] All pages load without mixed content warnings
- [ ] Social sharing shows correct URL
- [ ] Google can crawl the site (Search Console)

---

## Troubleshooting

### DNS Not Propagating

```bash
# Check DNS propagation
dig marcusdaley.dev +short
nslookup marcusdaley.dev

# Or use online tools
# https://www.whatsmydns.net/
```

### SSL Certificate Issues

1. Wait 24-48 hours for initial provisioning
2. Check Vercel dashboard for certificate status
3. Ensure DNS records are correct (no proxy)
4. Contact Vercel support if persists

### Redirect Loops

1. Disable any Cloudflare proxying (use DNS only)
2. Check for conflicting redirect rules
3. Clear browser cache
4. Test in incognito mode

---

*Domain availability should be checked at time of purchase as it may change.*
