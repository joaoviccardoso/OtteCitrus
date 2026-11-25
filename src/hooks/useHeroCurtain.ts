import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Efeito cortina da Home.
 * O Hero fica fixo por CSS (position: sticky) e a seção seguinte (.intro-section) sobe por cima.
 * Aqui o ScrollTrigger só anima o Hero enquanto ele é coberto:
 * a imagem sobe devagar com zoom, o conteúdo sobe mais rápido e o conjunto escurece.
 */
export function useHeroCurtain(active: boolean) {
  useEffect(() => {
    if (!active) return

    const hero = document.querySelector<HTMLElement>('.hero')
    const curtain = document.querySelector<HTMLElement>('.intro-section')
    if (!hero || !curtain) return

    const image = hero.querySelector<HTMLElement>(':scope > img')
    const content = hero.querySelector<HTMLElement>('.hero-content')

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: curtain,
          start: 'top bottom', // a cortina começa a entrar na tela
          end: 'top top', //      a cortina cobriu o Hero por completo
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      if (image) tl.fromTo(image, { yPercent: 0, scale: 1.035 }, { yPercent: -6, scale: 1.12 }, 0)
      if (content) tl.fromTo(content, { yPercent: 0 }, { yPercent: -12 }, 0)
      tl.fromTo(hero, { '--hero-dim': 0 }, { '--hero-dim': 0.7 }, 0)
    })

    // Fontes web alteram a altura das seções: recalcula os gatilhos
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => mm.revert()
  }, [active])
}
