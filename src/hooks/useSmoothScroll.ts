import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/** Sobe a página com Lenis (ou com o scroll nativo se o Lenis estiver desativado). */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Rolagem suave com Lenis, sincronizada com o ticker do GSAP.
 * Chamar uma única vez, no topo da aplicação.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({ lerp: 0.1 })
    lenis = instance

    // 1) Lenis avisa o ScrollTrigger a cada frame de scroll
    instance.on('scroll', ScrollTrigger.update)

    // 2) O ticker do GSAP passa a ser o único requestAnimationFrame (GSAP usa segundos, Lenis ms)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)

    // 3) Sem suavização de lag, para o Lenis e o GSAP não ficarem dessincronizados
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [])
}
