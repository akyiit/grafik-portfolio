# Grafik Portfolio

Profesyonel grafik tasarım portfolio sitesi. Next.js, Prisma ve Supabase ile geliştirilmiştir.

## Teknolojiler

- **Framework:** Next.js 16
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Styling:** TailwindCSS
- **Animations:** Framer Motion

## Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install
```

### 2. Environment Variables

`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun:

```bash
cp .env.example .env
```

Gerekli değişkenler:
- `DATABASE_URL` - Supabase connection pooling URL
- `DIRECT_URL` - Supabase direct connection URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Site URL (local: http://localhost:3000)

### 3. Veritabanı kurulumu

```bash
# Migration'ları çalıştır
npx prisma migrate dev

# Admin kullanıcısı oluştur (opsiyonel)
npx prisma db seed
```

### 4. Geliştirme sunucusunu başlat

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde açılır.

## Vercel'e Deploy

### 1. Vercel'de yeni proje oluştur

GitHub repo'nuzu Vercel'e bağlayın.

### 2. Environment Variables ekle

Vercel dashboard'da şu değişkenleri ekleyin:

| Variable | Değer |
|----------|-------|
| `DATABASE_URL` | Supabase pooling URL |
| `DIRECT_URL` | Supabase direct URL |
| `NEXTAUTH_SECRET` | Güçlü bir secret key |
| `NEXTAUTH_URL` | https://your-domain.vercel.app |

### 3. Deploy

Vercel otomatik olarak `vercel-build` script'ini çalıştıracaktır.

## Admin Paneli

Admin paneline `/admin` adresinden erişebilirsiniz.

Varsayılan giriş bilgileri (seed çalıştırıldıysa):
- **Email:** admin@grafik-portfolio.com
- **Şifre:** .env dosyasındaki ADMIN_PASSWORD değeri

## Scripts

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build (local)
npm run start        # Production sunucusu
npm run lint         # ESLint
npm run seed         # Veritabanı seed
```
