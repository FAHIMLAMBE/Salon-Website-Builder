import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  CircleArrowOutUpRight,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const instagramUrl =
  'https://www.instagram.com/nebularedesign?igsh=d2pxNzFqdnh1bnBw&utm_source=qr';
const fullAddress =
  'Shop No 6, Platinum Liviano, Plot No-58, next to Anna Dhosa, Sector 35, Kamothe, Panvel, Maharashtra 410209';
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    number: '01',
    title: 'Haircuts & Styling',
    description: 'Thoughtful shapes, polished finishes, and a look that feels like you.',
    detail: 'Everyday ease to occasion-ready.',
  },
  {
    number: '02',
    title: 'Hair Colour',
    description: 'Colour work with dimension and intention, made to complement your rhythm.',
    detail: 'Soft, expressive, unmistakably yours.',
  },
  {
    number: '03',
    title: 'Treatments',
    description: 'A considered pause for hair that looks and feels beautifully cared for.',
    detail: 'Ask us what suits your hair.',
  },
  {
    number: '04',
    title: 'Beauty Services',
    description: 'The finishing touches that bring the whole feeling together.',
    detail: 'Contact us for service details and pricing.',
  },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Nebula home"
      data-testid="link-brand-home"
      className={`focus-ring group inline-flex items-center gap-3 ${light ? 'text-[#f3eee7]' : 'text-[#24243a]'}`}
    >
      <span
        aria-hidden="true"
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border ${light ? 'border-[#aaa8ca]' : 'border-[#4b4b78]'}`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${light ? 'bg-[#d79682]' : 'bg-[#bd7964]'}`} />
        <span className={`absolute -right-1 top-1 h-1.5 w-1.5 rounded-full ${light ? 'bg-[#aaa8ca]' : 'bg-[#4b4b78]'}`} />
      </span>
      <span className="font-display text-[27px] leading-none tracking-[-0.03em]">Nebula</span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-mono-ui text-[10px] font-medium uppercase tracking-[0.2em] ${
        light ? 'text-[#bdbbd4]' : 'text-[#8a877d]'
      }`}
    >
      {children}
    </p>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="nebula-grain overflow-hidden bg-[#f3eee7] text-[#24243a]">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 md:px-10 md:py-8 lg:px-16">
          <BrandMark />
          <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className="focus-ring text-[12px] font-medium tracking-[0.08em] text-[#4c4b5d] transition-colors hover:text-[#bd7964]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:07304642107"
              data-testid="link-nav-call"
              className="focus-ring inline-flex items-center gap-2 border-b border-[#4c4b5d] pb-1 text-[12px] font-medium tracking-[0.08em] text-[#24243a] transition-colors hover:border-[#bd7964] hover:text-[#bd7964]"
            >
              Call to book <ArrowUpRight size={14} strokeWidth={1.7} />
            </a>
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[#c4bfb5] text-[#24243a] md:hidden"
          >
            {menuOpen ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-4 rounded-2xl border border-[#cfc7bd] bg-[#f3eee7]/95 p-5 shadow-[0_18px_50px_rgba(36,36,58,0.12)] backdrop-blur md:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  onClick={closeMenu}
                  className="focus-ring flex items-center justify-between border-b border-[#d8d0c5] py-4 text-[14px] font-medium tracking-[0.05em]"
                >
                  {item.label}
                  <ChevronRight size={17} strokeWidth={1.5} />
                </a>
              ))}
              <a
                href="tel:07304642107"
                data-testid="link-mobile-call"
                onClick={closeMenu}
                className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#303157] px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-[#f3eee7]"
              >
                <Phone size={14} strokeWidth={1.7} /> Call to book
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[760px] bg-[#ddd7d0] pt-28 lg:min-h-[840px] lg:pt-36" aria-labelledby="hero-heading">
          <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-5 pb-12 md:px-10 md:pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16 lg:pb-20">
            <div className="relative z-10 max-w-[560px]">
              <div className="animate-rise" style={{ animationDelay: '100ms' }}>
                <Eyebrow>Hair & beauty / Kamothe, Panvel</Eyebrow>
                <h1 id="hero-heading" className="mt-7 max-w-[570px] font-display text-[clamp(4.6rem,12vw,10.5rem)] leading-[0.81] tracking-[-0.065em] text-[#28273e]">
                  Find your
                  <br />
                  <span className="pl-[0.48em] italic text-[#4b4b78]">favourite</span>
                  <br />
                  self.
                </h1>
              </div>
              <p
                className="animate-rise mt-9 max-w-[370px] text-[15px] leading-[1.7] text-[#555363]"
                style={{ animationDelay: '260ms' }}
              >
                A calm, considered space for hair and beauty in Kamothe. Come as you are; leave feeling a little more yourself.
              </p>
              <div className="animate-rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: '390ms' }}>
                <a
                  href="tel:07304642107"
                  data-testid="link-hero-call"
                  className="focus-ring inline-flex items-center gap-3 rounded-full bg-[#303157] px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.13em] text-[#f3eee7] transition-transform hover:-translate-y-0.5"
                >
                  <Phone size={15} strokeWidth={1.7} /> Call to book
                </a>
                <a
                  href="#services"
                  data-testid="link-hero-services"
                  className="focus-ring inline-flex items-center gap-2 px-2 py-3 text-[12px] font-medium uppercase tracking-[0.13em] text-[#303157] transition-colors hover:text-[#bd7964]"
                >
                  Explore services <ArrowDownRight size={16} strokeWidth={1.5} />
                </a>
              </div>
              <div className="animate-rise mt-12 flex items-center gap-3 text-[#5a5862]" style={{ animationDelay: '520ms' }}>
                <span className="flex gap-0.5 text-[#bd7964]" aria-label="4.7 out of 5 stars">
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="font-mono-ui text-[11px] tracking-[0.04em]">4.7 ★ average rating · 332 reviews</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[630px] lg:mb-0">
              <div className="absolute -right-6 -top-11 h-32 w-32 rounded-full border border-[#69698f]/35 md:-right-12 md:-top-16 md:h-48 md:w-48" />
              <div className="absolute -right-1 -top-7 h-2.5 w-2.5 rounded-full bg-[#bd7964] md:-right-5 md:-top-10" />
              <div className="relative aspect-[0.91] overflow-hidden rounded-t-[48%] rounded-b-[2%] bg-[#c5b9b0] shadow-[0_28px_50px_rgba(60,54,59,0.16)] md:aspect-[0.98]">
                <img
                  src="/nebula-hero.jpg"
                  alt="Editorial portrait of a woman with a softly shaped bob haircut"
                  data-testid="img-hero-portrait"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#303157]/20 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[#f3eee7]">
                  <span className="h-px w-8 bg-[#f3eee7]/75" />
                  <span className="font-mono-ui text-[9px] uppercase tracking-[0.18em]">A softer kind of statement</span>
                </div>
              </div>
              <div className="animate-drift absolute -bottom-5 -left-5 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#4b4b78] bg-[#ddd7d0] md:-bottom-9 md:-left-10 md:h-[122px] md:w-[122px]">
                <div className="animate-spin-slow absolute inset-2 rounded-full border border-dashed border-[#4b4b78]/45" />
                <Sparkles size={22} strokeWidth={1.1} className="text-[#4b4b78]" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-4 text-[#8c8987] lg:flex">
            <span className="h-px w-20 bg-[#bcb5ad]" />
            <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em]">Scroll to explore</span>
            <span className="h-px w-20 bg-[#bcb5ad]" />
          </div>
        </section>

        <section id="services" className="scroll-mt-10 bg-[#f3eee7] px-5 py-24 md:px-10 md:py-32 lg:px-16" aria-labelledby="services-heading">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <Eyebrow>01 / Our services</Eyebrow>
                <h2 id="services-heading" className="mt-5 max-w-[340px] font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.87] tracking-[-0.055em] text-[#303157]">
                  Good hair is a feeling.
                </h2>
                <p className="mt-7 max-w-[300px] text-[14px] leading-[1.75] text-[#69666d]">
                  Start with what you need, or let us help you find the right direction. We keep the experience personal, easy, and entirely yours.
                </p>
                <a href="tel:07304642107" data-testid="link-services-call" className="focus-ring mt-9 inline-flex items-center gap-2 border-b border-[#99939a] pb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#303157] hover:border-[#bd7964] hover:text-[#bd7964]">
                  Talk through your visit <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
              <div className="border-t border-[#cfc7bd]">
                {services.map((service) => (
                  <article key={service.number} className="group grid gap-5 border-b border-[#cfc7bd] py-7 transition-colors hover:bg-[#eee7dd] md:grid-cols-[60px_1fr_1fr] md:items-start md:gap-8 md:py-9">
                    <span className="font-mono-ui text-[10px] tracking-[0.12em] text-[#9b9690]">{service.number}</span>
                    <div>
                      <h3 className="font-display text-[32px] leading-none tracking-[-0.02em] text-[#303157] md:text-[38px]">{service.title}</h3>
                      <p className="mt-3 max-w-[360px] text-[13px] leading-[1.65] text-[#69666d]">{service.description}</p>
                    </div>
                    <div className="flex items-end justify-between gap-3 md:justify-end">
                      <span className="font-mono-ui text-[10px] uppercase tracking-[0.11em] text-[#9b9690] md:mt-2">{service.detail}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b8b1ac] text-[#303157] transition-colors group-hover:border-[#bd7964] group-hover:bg-[#bd7964] group-hover:text-[#f3eee7]">
                        <ArrowUpRight size={15} strokeWidth={1.5} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-10 bg-[#303157] text-[#f3eee7]" aria-labelledby="about-heading">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:px-16">
            <div className="relative order-2 mx-auto w-full max-w-[540px] lg:order-1">
              <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-[#aaa8ca]/60 md:-left-8 md:-top-8 md:h-36 md:w-36" />
              <div className="relative aspect-[0.9] overflow-hidden rounded-[2px] bg-[#545477]">
                <img src="/nebula-detail.jpg" alt="Close-up of glossy hair being shaped by a stylist" data-testid="img-about-detail" className="h-full w-full object-cover object-center opacity-90 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-[#303157]/15" />
              </div>
              <div className="absolute -bottom-6 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#bd7964] text-center text-[#f3eee7] md:-bottom-10 md:-right-8 md:h-32 md:w-32">
                <span className="font-display text-[21px] leading-[0.9]">A little<br />more you</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow light>02 / About Nebula</Eyebrow>
              <h2 id="about-heading" className="mt-6 max-w-[570px] font-display text-[clamp(3.6rem,7vw,7rem)] leading-[0.84] tracking-[-0.06em]">
                Your best<br /><span className="italic text-[#bdbbd4]">self,</span> in focus.
              </h2>
              <div className="mt-9 max-w-[480px] space-y-5 text-[15px] leading-[1.8] text-[#c8c6d2]">
                <p>Nebula is a modern salon in Kamothe, made for the moment you want to feel looked after — and leave feeling more confident in your own reflection.</p>
                <p>We believe great style starts with listening. With a thoughtful eye, a calm atmosphere, and space for your preferences to lead, every visit is about finding what feels right for you.</p>
              </div>
              <a href="#contact" data-testid="link-about-contact" className="focus-ring mt-10 inline-flex items-center gap-3 rounded-full border border-[#aaa8ca]/60 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors hover:border-[#bd7964] hover:bg-[#bd7964]">
                Plan your visit <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-10 bg-[#e6ded5] px-5 py-24 md:px-10 md:py-32 lg:px-16" aria-labelledby="reviews-heading">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <Eyebrow>03 / A good sign</Eyebrow>
                <h2 id="reviews-heading" className="mt-5 max-w-[600px] font-display text-[clamp(3.4rem,7vw,6.3rem)] leading-[0.86] tracking-[-0.055em] text-[#303157]">A place to<br /><span className="italic text-[#bd7964]">come back to.</span></h2>
              </div>
              <a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-reviews-instagram-top" className="focus-ring inline-flex items-center gap-2 self-start border-b border-[#9d958c] pb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#303157] transition-colors hover:border-[#bd7964] hover:text-[#bd7964] md:self-end">
                See us on Instagram <Instagram size={15} strokeWidth={1.5} />
              </a>
            </div>
            <div className="mt-16 grid gap-12 border-t border-[#c7bdb2] pt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <div className="flex items-start gap-5">
                <span className="font-display text-[94px] leading-[0.72] tracking-[-0.07em] text-[#303157]">4.7</span>
                <div className="pt-2">
                  <div className="flex gap-1 text-[#bd7964]" aria-label="4.7 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="mt-3 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[#77716e]">Average rating</p>
                  <p className="mt-1 text-[13px] text-[#77716e]">332 reviews</p>
                </div>
              </div>
              <div className="max-w-[630px]">
                <p className="font-display text-[clamp(2rem,4vw,3.3rem)] leading-[1.02] tracking-[-0.03em] text-[#303157]">“The best kind of salon visit is the one where you feel heard, understood, and completely yourself.”</p>
                <p className="mt-7 max-w-[420px] text-[13px] leading-[1.7] text-[#77716e]">Our 4.7-star average from 332 reviews is a reflection of the trust our clients place in Nebula. We’re grateful to be part of their routines and their big moments.</p>
                <a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-reviews-instagram" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[#303157] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#f3eee7] transition-transform hover:-translate-y-0.5">
                  <Instagram size={15} strokeWidth={1.5} /> Follow Nebula
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-10 bg-[#f3eee7] px-5 py-24 md:px-10 md:py-32 lg:px-16" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
              <div>
                <Eyebrow>04 / Find us</Eyebrow>
                <h2 id="contact-heading" className="mt-6 max-w-[540px] font-display text-[clamp(4rem,8vw,8.2rem)] leading-[0.8] tracking-[-0.07em] text-[#303157]">
                  Let’s make<br /><span className="italic text-[#bd7964]">a plan.</span>
                </h2>
                <p className="mt-8 max-w-[380px] text-[14px] leading-[1.75] text-[#69666d]">Ready when you are. Call us to talk through your visit, or find your way to Nebula in Kamothe.</p>
                <a href="tel:07304642107" data-testid="link-contact-phone" className="focus-ring mt-8 inline-flex items-center gap-3 text-[19px] font-medium tracking-[-0.02em] text-[#303157] transition-colors hover:text-[#bd7964]">
                  <Phone size={18} strokeWidth={1.5} /> 07304642107
                </a>
              </div>
              <div className="flex flex-col justify-end">
                <div className="border-t border-[#cfc7bd]">
                  <div className="grid grid-cols-[28px_1fr] gap-5 border-b border-[#cfc7bd] py-6">
                    <MapPin size={18} strokeWidth={1.5} className="mt-1 text-[#bd7964]" />
                    <address className="not-italic text-[14px] leading-[1.75] text-[#555363]">{fullAddress}</address>
                  </div>
                  <div className="grid grid-cols-[28px_1fr] gap-5 border-b border-[#cfc7bd] py-6">
                    <CircleArrowOutUpRight size={18} strokeWidth={1.5} className="mt-1 text-[#bd7964]" />
                    <a href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-google-maps" className="focus-ring inline-flex w-fit items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#303157] hover:text-[#bd7964]">Get directions <ArrowUpRight size={14} strokeWidth={1.5} /></a>
                  </div>
                  <div className="grid grid-cols-[28px_1fr] gap-5 border-b border-[#cfc7bd] py-6">
                    <Instagram size={18} strokeWidth={1.5} className="mt-1 text-[#bd7964]" />
                    <a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-contact-instagram" className="focus-ring inline-flex w-fit items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#303157] hover:text-[#bd7964]">@nebularedesign <ArrowUpRight size={14} strokeWidth={1.5} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#24243a] px-5 py-12 text-[#f3eee7] md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <BrandMark light />
              <p className="mt-5 max-w-[270px] text-[12px] leading-[1.65] text-[#a9a7ba]">A modern salon for considered hair and beauty in Kamothe, Panvel.</p>
            </div>
            <div className="grid gap-6 text-[12px] text-[#c4c2cf] sm:grid-cols-2 sm:gap-14">
              <div>
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[#8d8ba6]">Call to book</p>
                <a href="tel:07304642107" data-testid="link-footer-phone" className="focus-ring mt-2 block hover:text-[#d79682]">07304642107</a>
              </div>
              <div>
                <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-[#8d8ba6]">Find us</p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-footer-address" className="focus-ring mt-2 block max-w-[220px] leading-[1.55] hover:text-[#d79682]">Shop No 6, Platinum Liviano, Sector 35, Kamothe, Panvel</a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#44445c] pt-6 text-[10px] text-[#8d8ba6] sm:flex-row sm:items-center">
            <span data-testid="text-footer-copyright">© {new Date().getFullYear()} Nebula. All rights reserved.</span>
            <a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="link-footer-instagram" className="focus-ring inline-flex items-center gap-2 uppercase tracking-[0.14em] hover:text-[#d79682]"><Instagram size={14} strokeWidth={1.5} /> Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;