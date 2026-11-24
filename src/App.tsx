import { useEffect, useState } from 'react'

type Lang = 'pt' | 'en'
type Page = 'home' | 'company' | 'citrus' | 'operations' | 'contact' | 'privacy' | 'terms'

const pathToPage: Record<string, Page> = {
  '/': 'home',
  '/a-empresa': 'company',
  '/citrus': 'citrus',
  '/nossa-atuacao': 'operations',
  '/contato': 'contact',
  '/politica-de-privacidade': 'privacy',
  '/termos-de-uso': 'terms',
}

const pageToPath = Object.fromEntries(Object.entries(pathToPage).map(([path, page]) => [page, path])) as Record<Page, string>

const content = {
  pt: {
    nav: [
      ['home', 'Início'],
      ['company', 'A empresa'],
      ['citrus', 'Citrus'],
      ['operations', 'Nossa atuação'],
      ['contact', 'Contato'],
    ] as [Page, string][],
    contact: 'Fale conosco',
    eyebrow: 'Intermediação comercial de citrus',
    heroTitle: 'Nosso mundo?',
    heroAccent: 'É Citrus!',
    heroText: 'Conectamos produtores, barracões e indústrias com proximidade, inteligência comercial e profundo conhecimento do campo.',
    discover: 'Conheça a OTTE',
    national: 'Atuação nacional',
    homeIntroTitle: 'Negócios que começam no campo e chegam mais longe.',
    homeIntroText: 'A OTTE CITRUS atua na intermediação de frutas cítricas para o mercado in natura e a indústria. Cuidamos de cada negociação com transparência, agilidade e presença em todas as etapas.',
    since: 'De Conchal para o Brasil',
    sinceText: 'No coração de uma das regiões citrícolas mais relevantes do país, construímos pontes comerciais sólidas para toda a cadeia.',
    strengths: [
      ['01', 'Proximidade', 'Relações diretas, escuta ativa e acompanhamento próximo de cada operação.'],
      ['02', 'Conhecimento', 'Leitura de mercado e experiência prática na cadeia citrícola.'],
      ['03', 'Confiança', 'Negociações claras, responsáveis e orientadas a relações duradouras.'],
    ],
    marketsTitle: 'Do pomar a cada mercado',
    marketsText: 'Estratégias comerciais específicas para diferentes destinos da fruta.',
    fresh: 'Mercado in natura',
    freshText: 'Conectamos produtores a barracões e compradores que valorizam padrão, variedade e regularidade.',
    industry: 'Indústria',
    industryText: 'Organizamos operações para processamento, alinhando colheita, qualidade e logística contratada pela OTTE.',
    learn: 'Saiba mais',
    ctaTitle: 'Seu próximo negócio em citrus começa aqui.',
    ctaText: 'Converse com quem entende o campo, o mercado e o valor de uma boa parceria.',
    companyEyebrow: 'A empresa',
    companyTitle: 'Uma história construída entre pomares e boas relações.',
    companyLead: 'A OTTE CITRUS nasceu da vivência do seu fundador no agronegócio e da convicção de que uma negociação bem conduzida gera valor para todos os lados.',
    companyStoryTitle: 'Experiência que virou propósito',
    companyStory: 'Próxima da realidade dos produtores e atenta às demandas do mercado, a empresa foi criada em Conchal-SP para oferecer uma intermediação mais humana, organizada e estratégica. O que começou com relações de confiança no campo evoluiu para uma atuação conectada a compradores em diferentes regiões do Brasil.',
    nameTitle: 'A origem do nome',
    nameText: 'OTTE é a assinatura de uma origem familiar e de um compromisso pessoal com cada negociação. CITRUS declara, de forma direta, o universo ao qual a empresa dedica seu conhecimento, sua energia e seu futuro.',
    pillars: [
      ['Missão', 'Conectar produtores e compradores, conduzindo negociações eficientes, transparentes e sustentáveis para a cadeia citrícola.'],
      ['Visão', 'Ser referência nacional em intermediação de citrus, reconhecida pela confiança e excelência em cada operação.'],
      ['Valores', 'Ética, proximidade, transparência, compromisso, conhecimento e respeito pelo campo.'],
    ],
    citrusEyebrow: 'Nosso portfólio',
    citrusTitle: 'Citrus em toda a sua diversidade.',
    citrusLead: 'Conhecemos as características, a sazonalidade e os destinos de cada fruta para construir negociações mais assertivas.',
    categories: [
      ['Laranjas', 'oranges.png', ['Pera Rio', 'Natal', 'Valência', 'Lima', 'Folha Murcha', 'Bahia', 'Baianinha', 'Murcott']],
      ['Limões', 'lemons.png', ['Tahiti', 'Siciliano']],
      ['Tangerinas', 'tangerines.png', ['Ponkan']],
    ] as [string, string, string[]][],
    fruitNote: 'Disponibilidade sujeita à safra, região e padrão comercial.',
    operationsEyebrow: 'Nossa atuação',
    operationsTitle: 'Coordenação precisa. Negócios mais fluidos.',
    operationsLead: 'Atuamos como elo comercial e operacional, coordenando as etapas necessárias para que cada negociação aconteça com clareza e eficiência.',
    packingTitle: 'Atendimento aos barracões',
    packingSteps: [
      ['Intermediação', 'Aproximamos produtores e compradores, alinhando variedade, volume, padrão e condições comerciais.'],
      ['Organização da colheita', 'Coordenamos o planejamento e o ritmo da colheita junto às partes envolvidas.'],
      ['Carregamento pelo comprador', 'O comprador é responsável pela retirada e pelo carregamento da fruta na propriedade.'],
    ],
    industryTitle: 'Atendimento à indústria',
    industrySteps: [
      ['Intermediação', 'Conectamos a oferta dos pomares às demandas de processamento industrial.'],
      ['Organização da colheita', 'Planejamos a operação para atender volumes e janelas acordadas.'],
      ['Contratação do transporte', 'A OTTE contrata e coordena o transporte com parceiros especializados até a indústria.'],
    ],
    operationNote: 'A OTTE CITRUS não atua como transportadora. Coordenamos a contratação de prestadores especializados para operações destinadas à indústria.',
    contactEyebrow: 'Contato',
    contactTitle: 'Vamos falar de citrus?',
    contactLead: 'Estamos em Conchal-SP, conectados às principais regiões produtoras e aos mercados de todo o Brasil.',
    whatsapp: 'WhatsApp',
    email: 'E-mail',
    instagram: 'Instagram',
    location: 'Localização',
    locationText: 'Conchal — São Paulo, Brasil',
    openMap: 'Abrir no Google Maps',
    footerText: 'Intermediação de Citrus para o mercado in natura e a indústria.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    rights: 'Todos os direitos reservados.',
    legalUpdated: 'Última atualização: maio de 2025',
    privacyTitle: 'Política de Privacidade',
    privacyBody: [
      ['1. Compromisso com a privacidade', 'A OTTE CITRUS respeita a sua privacidade e trata dados pessoais de acordo com a legislação brasileira aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD).'],
      ['2. Dados e finalidade', 'Podemos receber dados fornecidos voluntariamente em contatos por e-mail, WhatsApp ou redes sociais. Essas informações são usadas exclusivamente para responder solicitações, conduzir tratativas comerciais e manter o relacionamento profissional.'],
      ['3. Compartilhamento e segurança', 'Não comercializamos dados pessoais. Informações poderão ser compartilhadas somente quando necessário para cumprir obrigações legais ou viabilizar uma operação solicitada, com medidas razoáveis de segurança.'],
      ['4. Seus direitos', 'Você pode solicitar confirmação, acesso, correção ou exclusão de seus dados pelos canais de contato indicados neste site.'],
    ],
    termsTitle: 'Termos de Uso',
    termsBody: [
      ['1. Uso do site', 'Este site apresenta informações institucionais da OTTE CITRUS. Ao acessá-lo, você concorda em utilizá-lo de forma lícita e responsável.'],
      ['2. Conteúdo', 'Os conteúdos têm caráter informativo e podem ser atualizados sem aviso prévio. Disponibilidade de frutas, condições e operações são definidas em cada negociação.'],
      ['3. Propriedade intelectual', 'Textos, elementos visuais, marca e demais conteúdos pertencem à OTTE CITRUS ou são utilizados sob licença e não podem ser reproduzidos sem autorização.'],
      ['4. Responsabilidade', 'A OTTE CITRUS busca manter informações corretas, mas não garante disponibilidade ininterrupta do site nem se responsabiliza por links e serviços de terceiros.'],
    ],
  },
  en: {
    nav: [
      ['home', 'Home'],
      ['company', 'Our company'],
      ['citrus', 'Citrus'],
      ['operations', 'What we do'],
      ['contact', 'Contact'],
    ] as [Page, string][],
    contact: 'Talk to us',
    eyebrow: 'Citrus commercial brokerage',
    heroTitle: 'Our world?',
    heroAccent: 'It’s Citrus!',
    heroText: 'We connect growers, packing houses and industries through close relationships, commercial intelligence and a deep understanding of the field.',
    discover: 'Discover OTTE',
    national: 'Nationwide reach',
    homeIntroTitle: 'Business that starts in the field and goes further.',
    homeIntroText: 'OTTE CITRUS brokers citrus fruit for the fresh market and industry. We handle every negotiation with transparency, agility and a close presence throughout the process.',
    since: 'From Conchal to Brazil',
    sinceText: 'At the heart of one of Brazil’s most important citrus-growing regions, we build strong commercial bridges across the entire chain.',
    strengths: [
      ['01', 'Proximity', 'Direct relationships, active listening and close support in every operation.'],
      ['02', 'Expertise', 'Market intelligence and hands-on experience across the citrus chain.'],
      ['03', 'Trust', 'Clear, responsible negotiations focused on long-term relationships.'],
    ],
    marketsTitle: 'From the orchard to every market',
    marketsText: 'Dedicated commercial strategies for each fruit destination.',
    fresh: 'Fresh market',
    freshText: 'We connect growers to packing houses and buyers who value quality, variety and consistency.',
    industry: 'Industry',
    industryText: 'We organize processing operations by aligning harvesting, quality and transportation contracted by OTTE.',
    learn: 'Learn more',
    ctaTitle: 'Your next citrus deal starts here.',
    ctaText: 'Talk to people who understand the field, the market and the value of a strong partnership.',
    companyEyebrow: 'Our company',
    companyTitle: 'A story built among orchards and trusted relationships.',
    companyLead: 'OTTE CITRUS was born from its founder’s experience in agribusiness and the belief that a well-led negotiation creates value for everyone.',
    companyStoryTitle: 'Experience turned into purpose',
    companyStory: 'Close to growers’ reality and attentive to market needs, the company was founded in Conchal, São Paulo, to offer a more personal, organized and strategic brokerage service. What began with relationships of trust in the field evolved into a nationwide network of buyers.',
    nameTitle: 'The origin of our name',
    nameText: 'OTTE is the signature of a family origin and a personal commitment to every negotiation. CITRUS directly expresses the world to which the company dedicates its expertise, energy and future.',
    pillars: [
      ['Mission', 'Connect growers and buyers through efficient, transparent and sustainable negotiations for the citrus chain.'],
      ['Vision', 'Become a nationwide reference in citrus brokerage, recognized for trust and excellence in every operation.'],
      ['Values', 'Ethics, proximity, transparency, commitment, expertise and respect for the field.'],
    ],
    citrusEyebrow: 'Our portfolio',
    citrusTitle: 'Citrus in all its diversity.',
    citrusLead: 'We understand the characteristics, seasonality and destinations of each fruit to build better negotiations.',
    categories: [
      ['Oranges', 'oranges.png', ['Pera Rio', 'Natal', 'Valencia', 'Lima', 'Folha Murcha', 'Bahia', 'Baianinha', 'Murcott']],
      ['Lemons & limes', 'lemons.png', ['Tahiti lime', 'Sicilian lemon']],
      ['Tangerines', 'tangerines.png', ['Ponkan']],
    ] as [string, string, string[]][],
    fruitNote: 'Availability is subject to season, region and commercial grade.',
    operationsEyebrow: 'What we do',
    operationsTitle: 'Precise coordination. Smoother business.',
    operationsLead: 'We act as a commercial and operational link, coordinating the stages required for each negotiation to happen clearly and efficiently.',
    packingTitle: 'Packing house service',
    packingSteps: [
      ['Brokerage', 'We connect growers and buyers, aligning variety, volume, grade and commercial terms.'],
      ['Harvest organization', 'We coordinate harvest planning and pace with all parties involved.'],
      ['Buyer pickup', 'The buyer is responsible for fruit pickup and loading at the farm.'],
    ],
    industryTitle: 'Industry service',
    industrySteps: [
      ['Brokerage', 'We connect orchard supply with industrial processing demand.'],
      ['Harvest organization', 'We plan the operation according to agreed volumes and delivery windows.'],
      ['Transportation contracting', 'OTTE hires and coordinates specialized transportation partners to the industry.'],
    ],
    operationNote: 'OTTE CITRUS is not a transportation company. We coordinate the hiring of specialized service providers for operations serving the industry.',
    contactEyebrow: 'Contact',
    contactTitle: 'Let’s talk citrus?',
    contactLead: 'We are based in Conchal, São Paulo, connected to key growing regions and markets throughout Brazil.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    instagram: 'Instagram',
    location: 'Location',
    locationText: 'Conchal — São Paulo, Brazil',
    openMap: 'Open in Google Maps',
    footerText: 'Citrus brokerage for the fresh market and industry.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    rights: 'All rights reserved.',
    legalUpdated: 'Last updated: May 2025',
    privacyTitle: 'Privacy Policy',
    privacyBody: [
      ['1. Privacy commitment', 'OTTE CITRUS respects your privacy and processes personal data in accordance with applicable Brazilian legislation, including the General Data Protection Law (LGPD).'],
      ['2. Data and purpose', 'We may receive data voluntarily provided through email, WhatsApp or social media. This information is used solely to answer requests, conduct commercial discussions and maintain professional relationships.'],
      ['3. Sharing and security', 'We do not sell personal data. Information may only be shared when required by law or necessary to deliver a requested operation, with reasonable security measures.'],
      ['4. Your rights', 'You may request confirmation, access, correction or deletion of your data through the contact channels shown on this website.'],
    ],
    termsTitle: 'Terms of Use',
    termsBody: [
      ['1. Website use', 'This website provides institutional information about OTTE CITRUS. By accessing it, you agree to use it lawfully and responsibly.'],
      ['2. Content', 'Content is informational and may be updated without notice. Fruit availability, terms and operations are defined in each negotiation.'],
      ['3. Intellectual property', 'Texts, visual elements, brand and other content belong to OTTE CITRUS or are used under license and may not be reproduced without authorization.'],
      ['4. Liability', 'OTTE CITRUS strives to maintain accurate information but does not guarantee uninterrupted website availability and is not responsible for third-party links or services.'],
    ],
  },
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.2 7.8c.3-.6.7-.6 1-.1l.8 1.8c.2.4 0 .7-.3 1l-.5.5c.8 1.7 2 2.9 3.8 3.7l.6-.7c.3-.3.6-.4 1-.2l1.7.8c.5.2.5.7.3 1.1-.5.9-1.4 1.4-2.4 1.3-3.5-.4-7.4-4-7.8-7.5-.1-.7.8-1.5 1.8-1.7Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    leaf: <><path d="M19 4C11 4 5 8 5 15c0 2 1 4 3 5 1-6 4-10 9-13-4 4-6 8-7 13 7 0 10-7 9-16Z" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={`logo ${inverted ? 'logo-inverted' : ''}`} aria-label="OTTE CITRUS">
      <span className="logo-fruit"><i /><i /></span>
      <span className="logo-name">OTTE</span>
      <span className="logo-citrus">CITRUS</span>
    </div>
  )
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-intro reveal ${light ? 'light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

export default function App() {
  const [lang, setLang] = useState<Lang>('pt')
  const [page, setPage] = useState<Page>(() => pathToPage[window.location.pathname] || 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[lang]

  const navigate = (next: Page) => {
    window.history.pushState({}, '', pageToPath[next])
    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const pop = () => setPage(pathToPage[window.location.pathname] || 'home')
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }), { threshold: 0.12 })
    const timer = window.setTimeout(() => document.querySelectorAll('.reveal').forEach((el) => observer.observe(el)), 30)
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [page, lang])

  const LinkButton = ({ to, children, className = '' }: { to: Page; children: React.ReactNode; className?: string }) =>
    <button className={className} onClick={() => navigate(to)}>{children}</button>

  const Home = () => (
    <>
      <section className="hero">
        <img src="/images/orchard-hero.png" alt={lang === 'pt' ? 'Pomar de laranjas ao amanhecer' : 'Orange orchard at sunrise'} />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">{t.eyebrow}</span>
            <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
            <p>{t.heroText}</p>
            <div className="hero-actions">
              <LinkButton to="company" className="btn btn-orange">{t.discover}<Icon name="arrow" /></LinkButton>
              <LinkButton to="operations" className="text-link text-link-light">{t.national}<Icon name="arrow" /></LinkButton>
            </div>
          </div>
          <div className="hero-stamp"><Icon name="leaf" size={26} /><span>OTTE<br />CITRUS</span><small>CONCHAL · SP</small></div>
        </div>
        <div className="scroll-hint"><span />SCROLL</div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <SectionIntro eyebrow="OTTE CITRUS" title={t.homeIntroTitle} text={t.homeIntroText} />
          <div className="origin-card reveal">
            <div className="origin-number">BR</div>
            <div><h3>{t.since}</h3><p>{t.sinceText}</p></div>
          </div>
        </div>
        <div className="container strengths">
          {t.strengths.map(([number, title, text]) => <article className="strength reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section markets">
        <div className="container">
          <SectionIntro eyebrow={t.national} title={t.marketsTitle} text={t.marketsText} />
          <div className="market-grid">
            <article className="market-card reveal"><img src="/images/packing-house.png" alt="" /><div className="market-overlay" /><div className="market-copy"><span>01</span><h3>{t.fresh}</h3><p>{t.freshText}</p><LinkButton to="operations" className="text-link text-link-light">{t.learn}<Icon name="arrow" /></LinkButton></div></article>
            <article className="market-card reveal"><img src="/images/industry.png" alt="" /><div className="market-overlay" /><div className="market-copy"><span>02</span><h3>{t.industry}</h3><p>{t.industryText}</p><LinkButton to="operations" className="text-link text-link-light">{t.learn}<Icon name="arrow" /></LinkButton></div></article>
          </div>
        </div>
      </section>
      <Cta />
    </>
  )

  const Company = () => (
    <>
      <PageHero eyebrow={t.companyEyebrow} title={t.companyTitle} text={t.companyLead} image="/images/orchard-hero.png" />
      <section className="section"><div className="container story-grid">
        <div className="story-image reveal"><img src="/images/packing-house.png" alt="" /><span>CONCHAL<br />SÃO PAULO</span></div>
        <div className="story-copy reveal"><span className="eyebrow">01 — {t.companyStoryTitle}</span><h2>{t.companyStoryTitle}</h2><p>{t.companyStory}</p><div className="name-block"><span className="eyebrow">02 — OTTE CITRUS</span><h3>{t.nameTitle}</h3><p>{t.nameText}</p></div></div>
      </div></section>
      <section className="section pillars-section"><div className="container"><div className="pillars">{t.pillars.map(([title, text], i) => <article className="pillar reveal" key={title}><span>0{i + 1}</span><Icon name="leaf" size={28} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <Cta />
    </>
  )

  const Citrus = () => (
    <>
      <PageHero eyebrow={t.citrusEyebrow} title={t.citrusTitle} text={t.citrusLead} image="/images/oranges.png" />
      <section className="section citrus-section"><div className="container">
        <div className="fruit-list">{t.categories.map(([name, image, fruits], i) => <article className="fruit-row reveal" key={name}>
          <div className="fruit-image"><img src={`/images/${image}`} alt={name} /><span>0{i + 1}</span></div>
          <div className="fruit-copy"><span className="eyebrow">CITRUS / 0{i + 1}</span><h2>{name}</h2><div className="fruit-tags">{fruits.map((fruit) => <span key={fruit}>{fruit}</span>)}</div><p>{t.fruitNote}</p></div>
        </article>)}</div>
      </div></section>
      <Cta />
    </>
  )

  const Operations = () => (
    <>
      <PageHero eyebrow={t.operationsEyebrow} title={t.operationsTitle} text={t.operationsLead} image="/images/industry.png" />
      <section className="section operations-section"><div className="container">
        <OperationBlock number="01" title={t.packingTitle} image="/images/packing-house.png" steps={t.packingSteps} />
        <OperationBlock number="02" title={t.industryTitle} image="/images/industry.png" steps={t.industrySteps} reverse />
        <div className="operation-note reveal"><Icon name="leaf" size={30} /><p>{t.operationNote}</p></div>
      </div></section>
      <Cta />
    </>
  )

  const Contact = () => (
    <>
      <section className="contact-hero"><div className="container contact-head"><SectionIntro eyebrow={t.contactEyebrow} title={t.contactTitle} text={t.contactLead} light /></div></section>
      <section className="contact-section"><div className="container contact-grid">
        <div className="contact-list">
          <a className="contact-item reveal" href="https://wa.me/?text=Olá%2C%20OTTE%20CITRUS!" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={25} /><div><span>{t.whatsapp}</span><strong>{t.contact}</strong></div><Icon name="arrow" /></a>
          <a className="contact-item reveal" href="mailto:contato@ottecitrus.com.br"><Icon name="mail" size={25} /><div><span>{t.email}</span><strong>contato@ottecitrus.com.br</strong></div><Icon name="arrow" /></a>
          <a className="contact-item reveal" href="https://instagram.com/otte_citrus" target="_blank" rel="noreferrer"><Icon name="insta" size={25} /><div><span>{t.instagram}</span><strong>@otte_citrus</strong></div><Icon name="arrow" /></a>
          <div className="contact-location reveal"><Icon name="pin" size={25} /><div><span>{t.location}</span><strong>{t.locationText}</strong></div></div>
        </div>
        <div className="map-wrap reveal"><iframe title="Conchal - SP" src="https://www.google.com/maps?q=Conchal%20SP%20Brasil&z=12&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href="https://maps.google.com/?q=Conchal+SP+Brasil" target="_blank" rel="noreferrer">{t.openMap}<Icon name="arrow" /></a></div>
      </div></section>
    </>
  )

  const Legal = ({ type }: { type: 'privacy' | 'terms' }) => {
    const title = type === 'privacy' ? t.privacyTitle : t.termsTitle
    const body = type === 'privacy' ? t.privacyBody : t.termsBody
    return <><section className="legal-hero"><div className="container"><span className="eyebrow">OTTE CITRUS</span><h1>{title}</h1><p>{t.legalUpdated}</p></div></section><section className="legal-content"><div className="container legal-inner">{body.map(([heading, text]) => <article key={heading}><h2>{heading}</h2><p>{text}</p></article>)}</div></section></>
  }

  function Cta() {
    return <section className="cta"><div className="cta-fruit" /><div className="container cta-inner"><div><span className="eyebrow">OTTE CITRUS</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><LinkButton to="contact" className="btn btn-orange">{t.contact}<Icon name="arrow" /></LinkButton></div></section>
  }

  function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
    return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-shade" /><div className="container page-hero-content"><span className="hero-kicker">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>
  }

  function OperationBlock({ number, title, image, steps, reverse = false }: { number: string; title: string; image: string; steps: string[][]; reverse?: boolean }) {
    return <article className={`operation-block ${reverse ? 'reverse' : ''}`}>
      <div className="operation-image reveal"><img src={image} alt="" /><span>{number}</span></div>
      <div className="operation-copy reveal"><span className="eyebrow">{t.operationsEyebrow} / {number}</span><h2>{title}</h2><div>{steps.map(([heading, text], i) => <div className="step" key={heading}><span>{i + 1}</span><div><h3>{heading}</h3><p>{text}</p></div></div>)}</div></div>
    </article>
  }

  const pages: Record<Page, React.ReactNode> = { home: <Home />, company: <Company />, citrus: <Citrus />, operations: <Operations />, contact: <Contact />, privacy: <Legal type="privacy" />, terms: <Legal type="terms" /> }

  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <button className="logo-button" onClick={() => navigate('home')}><Logo /></button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {t.nav.map(([key, label]) => <button key={key} className={page === key ? 'active' : ''} onClick={() => navigate(key)}>{label}</button>)}
            <div className="mobile-contact"><LinkButton to="contact" className="btn btn-green">{t.contact}<Icon name="arrow" /></LinkButton></div>
          </nav>
          <div className="header-actions">
            <div className="lang-switch"><button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button><i /><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button></div>
            <LinkButton to="contact" className="btn btn-green desktop-contact">{t.contact}<Icon name="arrow" /></LinkButton>
            <button className="menu-button" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={25} /></button>
          </div>
        </div>
      </header>
      <main>{pages[page]}</main>
      <footer className="footer"><div className="container footer-main"><Logo inverted /><p>{t.footerText}</p><div className="footer-nav">{t.nav.map(([key, label]) => <button key={key} onClick={() => navigate(key)}>{label}</button>)}</div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} OTTE CITRUS. {t.rights}</span><div><button onClick={() => navigate('privacy')}>{t.privacy}</button><button onClick={() => navigate('terms')}>{t.terms}</button></div></div></footer>
      <a className="whatsapp-float" href="https://wa.me/?text=Olá%2C%20OTTE%20CITRUS!" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={27} /></a>
    </div>
  )
}
