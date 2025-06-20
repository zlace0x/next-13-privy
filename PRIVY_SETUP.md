# Privy Wallet Authentication Setup Guide

This guide will help you set up Privy.io wallet authentication in your HyperApp Next.js application.

## 🚀 Quick Start

### 1. Get Your Privy App ID

1. Visit [Privy Dashboard](https://dashboard.privy.io)
2. Sign up or log in to your account
3. Create a new app or select an existing one
4. Copy your **App ID** from the dashboard

### 2. Configure Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_actual_app_id_here

# Optional: For server-side operations
PRIVY_APP_SECRET=your_app_secret_here
```

> ⚠️ **Important**: Replace `your_actual_app_id_here` with your real Privy App ID

### 3. Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## 🔧 Configuration Details

### Supported Features

Our Privy integration includes:

- **Multiple Login Methods**: Wallet, Email, SMS
- **Embedded Wallets**: Automatic wallet creation for users without wallets
- **Multi-Chain Support**: Ethereum Mainnet and Sepolia Testnet
- **Modern UI**: Custom-styled authentication modal
- **Error Handling**: Graceful fallbacks and user feedback

### Chain Configuration

The app is configured to support:

- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111) - Default for development

### Wallet Providers

Supported wallet connections:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And many more through Privy's ecosystem

## 🎨 Customization

### Appearance Settings

You can customize the Privy modal appearance in `src/components/providers/privy-provider.tsx`:

```typescript
appearance: {
  theme: 'dark', // or 'light'
  accentColor: '#0969da', // Your brand color
  logo: 'https://your-logo-url.com/logo.png', // Your logo URL
}
```

### Login Methods

Configure which login methods to enable:

```typescript
loginMethods: ["wallet", "email", "sms"];
```

Available options:

- `'wallet'` - Crypto wallet connection
- `'email'` - Email-based authentication
- `'sms'` - SMS-based authentication
- `'discord'` - Discord OAuth
- `'google'` - Google OAuth
- `'twitter'` - Twitter OAuth
- `'github'` - GitHub OAuth

## 🔐 Security Considerations

### Environment Variables

- **NEXT_PUBLIC_PRIVY_APP_ID**: Safe to expose to the client
- **PRIVY_APP_SECRET**: Keep secret, only use server-side

### Development vs Production

For development:

- Use Sepolia testnet (default configuration)
- Test with testnet funds only

For production:

- Switch to Ethereum mainnet
- Implement proper error logging
- Set up monitoring for authentication flows

## 🧩 Component Structure

### Authentication Flow

1. **Landing Page** (`src/app/page.tsx`)

   - Shows when user is not authenticated
   - Contains "Connect Wallet" buttons
   - Opens login modal when clicked

2. **Login Modal** (`src/components/auth/login-modal.tsx`)

   - Handles wallet connection
   - Shows loading states
   - Provides user feedback

3. **Dashboard** (`src/components/auth/dashboard.tsx`)
   - Shows after successful authentication
   - Displays user information
   - Provides logout functionality

### Provider Setup

The `PrivyAuthProvider` (`src/components/providers/privy-provider.tsx`) wraps the entire application and:

- Initializes Privy with configuration
- Handles invalid App ID gracefully
- Shows helpful setup instructions

## 🐛 Troubleshooting

### Common Issues

1. **"Privy Configuration Required" Screen**

   - Ensure you have a valid App ID in `.env.local`
   - Restart your development server
   - Check the Privy dashboard for your correct App ID

2. **Wallet Connection Fails**

   - Ensure you're using a supported wallet
   - Check browser console for errors
   - Try clearing browser cache and cookies

3. **Build Errors**
   - Verify all environment variables are set
   - Check for TypeScript errors in components
   - Ensure Privy package is properly installed

### Debug Mode

To enable debug logging, add to your environment:

```bash
NEXT_PUBLIC_PRIVY_DEBUG=true
```

## 📚 Additional Resources

### Privy Documentation

- [Privy Developer Docs](https://docs.privy.io)
- [React SDK Reference](https://docs.privy.io/reference/react-auth)
- [Configuration Options](https://docs.privy.io/reference/react-auth/interfaces/PrivyProviderProps)

### Next.js Integration

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🚀 Going to Production

### Checklist

- [ ] Replace development App ID with production App ID
- [ ] Configure mainnet settings if needed
- [ ] Set up proper error monitoring
- [ ] Test all authentication flows
- [ ] Configure CORS settings in Privy dashboard
- [ ] Set up webhook endpoints if needed

### Environment Setup

For production deployment, set the environment variable in your hosting platform:

**Vercel:**

```bash
vercel env add NEXT_PUBLIC_PRIVY_APP_ID
```

**Netlify:**
Add to your Netlify dashboard under Site settings > Environment variables

**Other platforms:**
Follow your hosting provider's environment variable setup guide

## 🎯 Next Steps

After setting up Privy authentication, you can:

1. **Add user profiles** - Extend the dashboard with user-specific data
2. **Implement transactions** - Add Web3 functionality using connected wallets
3. **Add role-based access** - Control features based on user authentication
4. **Integrate with databases** - Store user data and preferences
5. **Add analytics** - Track user engagement and authentication metrics

---

**Need help?** Check the [Privy Discord](https://discord.gg/privy) or [create an issue](https://github.com/your-repo/issues) in this repository.
