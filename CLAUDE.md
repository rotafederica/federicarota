# CLAUDE.md — Progetto Sito Web Dott.ssa Federica Rota

## Identità cliente e progetto

- **Cliente:** Dott.ssa Federica Rota
- **Specialità:** Allergologia e Immunologia Clinica
- **Studio:** Via Brennero 3, Roma — Zona Montesacro / Prati Fiscali (Roma Nord)
- **Obiettivo sito:** Aumentare acquisizione nuovi pazienti tramite SEO locale, conversione da form/Doctolib, contenuto educativo per pazienti.

---

## Stack tecnico

| Fase | Stack |
|------|-------|
| **Fase 1 (attuale)** | HTML/CSS/JS statico puro — nessun build tool, nessun framework |
| **Fase 2** | Eleventy SSG (`.eleventy.js`) per gestione blog da file `.md` |
| **Hosting target** | ~~Vercel~~ → **Netlify** (deploy da GitHub, branch `main`, repo pubblico `rotafederica/federicarota`) |

**Regola JS:** JS minimale. Nessun framework (no React, no Vue). Solo vanilla JS per: menu mobile hamburger, form EmailJS AJAX, lazy load immagini.

---

## Struttura cartelle (root del repository)

```
federicarota/             ← root del repo GitHub (deploy Netlify da root)
├── _includes/           ← componenti riutilizzabili (header, footer, meta, cta)
├── specializzazioni/    ← 6 landing page SEO per patologia
├── guide/               ← blog / articoli SEO (indice + articoli)
├── assets/
│   ├── css/             ← main.css · components.css · pages.css
│   ├── js/              ← main.js
│   ├── img/
│   │   ├── dottoressa/       ← hero.webp (sostituisce ritratto-01.webp — Aprile 2026)
│   │   ├── studio/           ← sala-attesa.webp
│   │   ├── diagnostica/      ← strumenti-diagnostici.webp
│   │   ├── specializzazioni/ ← prick-test-bambino · patch-test-* · prick-test-avambraccio · visita-bambina (.webp)
│   │   ├── og/               ← og-homepage.jpg · og-specializzazioni.jpg · og-guide.jpg
│   │   └── favicon/          ← favicon.ico · favicon-16x16.png · favicon-32x32.png · apple-touch-icon.png · android-chrome-*.png · site.webmanifest
│   └── fonts/           ← font self-hosted .woff2 (GDPR: no Google Fonts)
├── index.html           ← Homepage (/)
├── chi-sono.html        ← Chi sono (/chi-sono/)
├── prenota.html         ← Prenota (/prenota/)
├── privacy/index.html   ← Privacy Policy (/privacy/) — noindex, follow
├── 404.html
├── robots.txt
├── sitemap.xml
├── schema-medico.json   ← JSON-LD Schema.org Physician
├── .eleventy.js         ← Fase 2
├── CLAUDE.md
└── Docs/                ← esclusa da git (.gitignore)
```

---

## Regole SEO

- **URL semantiche:** solo minuscolo, trattini, keyword inclusa. Es: `/specializzazioni/allergie-bambini-roma/`
- **Trailing slash coerente:** sempre con slash finale
- **Meta title:** max 60 caratteri, keyword + brand
- **Meta description:** 150–160 caratteri con keyword + CTA implicita
- **H1 unico per pagina:** include keyword target
- **Alt text immagini:** descrittivo, include keyword contestuale
- **Schema.org:** JSON-LD Physician in `<head>` di ogni pagina (file `_includes/meta.html`)
- **Canonical URL:** `<link rel="canonical">` in ogni pagina
- **OG image:** formato JPG 1200×630px — MAI WebP per og:image (crawler social non supportano WebP)
- **Font:** self-hosted `.woff2` — no Google Fonts (compliance GDPR, no cookie banner)

---

## Compliance deontologica FNOMCEO

**Regola assoluta su ogni pagina, articolo, post social:**

| ❌ MAI usare | ✅ SEMPRE usare |
|-------------|----------------|
| guarisce | aiuta a gestire |
| elimina | contribuisce a migliorare |
| risolve definitivamente | supporta la diagnosi di |
| cura definitivamente | può ridurre i sintomi |

**Regola aggiuntiva:** Includere SEMPRE l'invito alla visita specialistica come unico strumento diagnostico valido. Non fare promesse su outcomes clinici. Per farmaci/terapie: specificare sempre "su prescrizione medica" o "valutato dallo specialista". Mai confronti con altri specialisti o strutture.

---

## Integrazioni chiave

### EmailJS (form contatto AJAX)
- Script CDN: `https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`
- Init: `emailjs.init({ publicKey: 'EayY0zQOVDw6GtTgv' })` ✅ configurato Aprile 2026
- Service ID: `service_834y28s` · Template ID: `template_bovgj6n` ✅
- SMTP: Libero (`federota@libero.it`) — testato e funzionante
- Piano gratuito: 200 email/mese (sufficiente per studio privato)
- Validazione lato JS: nome, telefono e privacy policy obbligatori (novalidate sul form)
- I dati NON vengono archiviati su server terzi

### Doctolib
~~Rimosso dal sito (Marzo 2026) su decisione della cliente. Tutti i riferimenti a Doctolib e `[LINK-DOCTOLIB]` sono stati eliminati dall'HTML.~~

### Google Analytics 4
- Tag: ✅ `G-WR55X0FHSX` — configurato Aprile 2026
- Snippet inserito in tutti e 17 i file HTML pubblici (homepage, chi-sono, prenota, privacy, guide/index, 5 articoli guide, 6 specializzazioni)
- Modalità **cookieless** attiva — nessun cookie scritto nel browser:
  ```js
  gtag('config', 'G-WR55X0FHSX', {
    anonymize_ip: true,
    storage: 'none',
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  ```

### Google Maps embed
- Usare embed statico (no API key, no cookie banner)
- URL embed: `https://www.google.com/maps/embed?pb=...` con pin Via Brennero 3 Roma

---

## Segnaposto da completare dalla cliente

Questi valori sono placeholder nel codice — la cliente li sostituirà prima del go-live:

| Segnaposto | Dove appare | Valore da inserire |
|------------|-------------|-------------------|
| `[NUMERO]` | header, footer, cta.html, prenota.html | Numero di telefono studio |
| `[EMAIL]` | footer | Indirizzo email studio |
| `[P.IVA]` | footer | Partita IVA |
| ~~`[PUBLIC-KEY]`~~ | cta.html (EmailJS init) | ✅ `EayY0zQOVDw6GtTgv` |
| ~~`[SERVICE-ID]`~~ | main.js (EmailJS send) | ✅ `service_834y28s` |
| ~~`[TEMPLATE-ID]`~~ | main.js (EmailJS send) | ✅ `template_bovgj6n` |
| ~~`[LINK-DOCTOLIB]`~~ | — | ❌ Rimosso (Marzo 2026) |
| ~~`[ORARI]`~~ | footer, prenota.html | ✅ `Martedì e Giovedì 14:30–19:00` |
| `[MAPS-EMBED-URL]` | prenota.html, index.html | URL embed Google Maps |

---

## Immagini

| File sorgente | Destinazione semantica v2.0 | Uso |
|---------------|---------------------------|-----|
| `Docs/img-01.webp` | ~~`assets/img/dottoressa/ritratto-01.webp`~~ → `assets/img/dottoressa/hero.webp` | Ritratto hero homepage + chi-sono |
| `Docs/img-02.webp` | `assets/img/studio/sala-attesa.webp` | Foto studio/reception |
| `Docs/img-03.webp` | `assets/img/diagnostica/strumenti-diagnostici.webp` | Strumentazione diagnostica |
| `Docs/img-04.webp` | `assets/img/specializzazioni/prick-test-avambraccio.webp` | Prick test adulto |
| `Docs/img-05.webp` | `assets/img/specializzazioni/prick-test-bambino.webp` | Visita pediatrica |
| `Docs/img-OG-01.jpg` | `assets/img/og/og-homepage.jpg` | OG: Homepage, Chi sono, Prenota, 404 |
| `Docs/img-OG-02.jpg` | `assets/img/og/og-specializzazioni.jpg` | OG: tutte le /specializzazioni/ |
| `Docs/img-OG-03.jpg` | `assets/img/og/og-guide.jpg` | OG: /guide/ e tutti gli articoli |

---

## File sorgente documentazione

| File | Scopo |
|------|-------|
| `Docs/copy_web.md` | Copy completo (sorgente di verità per ogni testo del sito) — v2.1 |
| `Docs/struttura-web.md` | Architettura cartelle, URL, note SEO tecnico — v1.2 |
| `Docs/piano-strategico.md` | Strategia marketing 3 fasi/12 mesi, compliance deontologica — v1.0 |

---

## Milestone completate

- [x] **Milestone 1** (Marzo 2026): CLAUDE.md · struttura cartelle · componenti `_includes/` · CSS base · `index.html` · `prenota.html`
- [x] **Milestone 2** (Marzo 2026): `chi-sono.html` · 5 landing page `specializzazioni/`
- [x] **Update v2.0** (Marzo 2026): core files sostituiti (Direzione B — Calore Nordico) · sistema immagini semantico · 5 landing page riscritte · `chi-sono` + `prenota` aggiornati
- [x] **Milestone 3** (Marzo 2026): `guide/index.html` · 5 articoli guide (`rinite-allergica-bambini`, `sintomi-allergia-alimentare-bambini`, `allergia-pollini-primavera-roma`, `allergia-acari-polvere`, `come-funziona-patch-test`) · CSS classi guide in `pages.css`
- [x] **Privacy Policy** (Marzo 2026): `privacy/index.html` creata da `Docs/privacy.html` — adattata allo stile del sito, noindex follow, layout 2 colonne con indice laterale sticky, dati reali inseriti (P.IVA, email, telefono)
- [x] **Fix UI** (Marzo 2026): header CTA unificato `tel:+39 339 1565344` su tutte le pagine (guide, chi-sono, privacy) · H1 guide/index ridotto a `clamp(1.6rem, 3vw, 2.4rem)` · stili tipografia privacy ottimizzati · `pages.css` `.article-body h2` margin-top portato a `3.5rem` e `h3` a `var(--space-10)` per separazione visiva tra sezioni articolo
- [x] **Aggiornamento FAQ** (Marzo 2026): `index.html` — 6 FAQ cliniche con check-list SVG (quando serve visita, durata, dolore test, antistaminici, digiuno, immunoterapia) · `specializzazioni/allergie-bambini-roma/` — 7 FAQ pediatriche con check-list SVG · `components.css` max-height FAQ da 400px a 800px · `pages.css` regole `.faq-answer .check-list__item` e `.faq-answer__inner` per layout pulito dentro accordion

- [x] **Aggiornamenti Aprile 2026:**
  - Nuova 6ª landing: `specializzazioni/orticaria-angioedema-roma/` · dropdown nav aggiornato su tutti i file
  - Foto hero sostituita: `hero.webp` su homepage e chi-sono
  - EmailJS operativo: credenziali reali, SMTP Libero testato, validazione JS campi obbligatori
  - GA4 cookieless: `storage: 'none'`, `anonymize_ip: true` — nessun cookie, nessun banner necessario
  - Hosting migrato da Vercel a **Netlify** (repo pubblico `rotafederica/federicarota`)
  - Orari studio inseriti: `Martedì e Giovedì 14:30–19:00` su tutte le pagine

## Milestone successive

- [ ] **Milestone 4:** `robots.txt` · `sitemap.xml` · `schema-medico.json` · `.eleventy.js` (Fase 2)
- [ ] **Milestone 5:** ~~EmailJS~~ ✅ · ~~GA4~~ ✅ · Google Search Console

---

*Documento riservato — uso interno · Dott.ssa Federica Rota · Marzo 2026*
