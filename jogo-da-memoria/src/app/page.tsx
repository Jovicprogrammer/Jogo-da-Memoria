'use client'
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

interface Carta {
  id: number,
  src: string,
  par: number,
  virado: boolean,
  acertada: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
}

// 👉 função formatadora
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Home() {
  const cartasiniciais = useMemo((): Carta[] => [
    { id: 1, src: '/cartas/addison1.jpg', par: 1, virado: false, acertada: false },
    { id: 2, src: '/cartas/addison2.jpg', par: 1, virado: false, acertada: false },
    { id: 3, src: '/cartas/carolinepolachek1.jpg', par: 2, virado: false, acertada: false },
    { id: 4, src: '/cartas/carolinepolachek2.jpg', par: 2, virado: false, acertada: false },
    { id: 5, src: '/cartas/joji1.jpg', par: 3, virado: false, acertada: false },
    { id: 6, src: '/cartas/joji2.jpg', par: 3, virado: false, acertada: false },
    { id: 7, src: '/cartas/jvb1.jpg', par: 4, virado: false, acertada: false },
    { id: 8, src: '/cartas/jvb2.jpg', par: 4, virado: false, acertada: false },
    { id: 9, src: '/cartas/pinkpantheress1.jpg', par: 5, virado: false, acertada: false },
    { id: 10, src: '/cartas/pinkpantheress2.jpg', par: 5, virado: false, acertada: false },
    { id: 11, src: '/cartas/quadeca1.jpg', par: 6, virado: false, acertada: false },
    { id: 12, src: '/cartas/quadeca2.jpg', par: 6, virado: false, acertada: false },
    { id: 13, src: '/cartas/rosalia1.jpg', par: 7, virado: false, acertada: false },
    { id: 14, src: '/cartas/rosalia2.jpg', par: 7, virado: false, acertada: false },
    { id: 15, src: '/cartas/segabodega1.jpg', par: 8, virado: false, acertada: false },
    { id: 16, src: '/cartas/segabodega2.jpg', par: 8, virado: false, acertada: false },
  ], [])

  const [cartas, setCartas] = useState<Carta[]>(() => shuffleArray(cartasiniciais))
  const [pontuacao, setPontuacao] = useState(0)
  const [reiniciar, setReiniciar] = useState(false)

  const [tempo, setTempo] = useState(0) 
  const [rodando, setRodando] = useState(false)

  useEffect(() => {
    let intervalo: NodeJS.Timeout | null = null
    if (rodando) {
      intervalo = setInterval(() => {
        setTempo(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (intervalo) clearInterval(intervalo)
    }
  }, [rodando])

  useEffect(() => {
    if (pontuacao === 8) setRodando(false)
  }, [pontuacao])

  useEffect(() => {
    if (reiniciar) {
      setCartas(shuffleArray(cartasiniciais.map(carta => ({
        ...carta, virado: false, acertada: false,
      }))))
      setPontuacao(0)
      setTempo(0)
      setRodando(false)
      setReiniciar(false)
    }
  }, [reiniciar, cartasiniciais])

  function VireaCarta(index: number) {
    const cartaClicada = cartas[index]
    if (cartaClicada.acertada || 
      (cartas.filter(c => c.virado && !c.acertada).length >= 2 && !cartaClicada.virado)) {
      return
    }
    if (!rodando && tempo === 0) setRodando(true)

    const listaAtualizada = cartas.map((item, i) => i === index ? { ...item, virado: !item.virado } : item)
    setCartas(listaAtualizada)

    const novasViradas = listaAtualizada.filter(c => c.virado && !c.acertada)
    if (novasViradas.length === 2) {
      const [carta1, carta2] = novasViradas
      if (carta1.par === carta2.par) {
        setTimeout(() => {
          setCartas(listaAtualizada.map(carta => 
            carta.par === carta1.par ? { ...carta, acertada: true, virado: true } : carta
          ))
          setPontuacao(p => p + 1)
        }, 500)
      } else {
        setTimeout(() => {
          setCartas(listaAtualizada.map(carta => 
            carta.id === carta1.id || carta.id === carta2.id ? { ...carta, virado: false } : carta
          ))
        }, 1000)
      }
    }
  }

  const handleReiniciar = () => setReiniciar(true)

  return (
    <div className="">
      <div className="absolute left-1 flex flex-col items-center -z-0 text-amber-950 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold">
        <h2 className="font-extrabold text-[#ffff]">
          {pontuacao == 8 ? `Pontuação: ${pontuacao}!!` : `Pontuação: ${pontuacao}`}
        </h2>
        {pontuacao === 8 ? 'Parabéns, você ganhou!' : ''}
      </div>

      <div className="absolute r-1 flex flex-col items-center -z-0 text-amber-950 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold">
        <h2 className="font-extrabold text-[#ffff]">
          Tempo: {formatTime(tempo)}
        </h2>
      </div>

      <div>
        <button 
          className="cursor-pointer absolute left-1 bottom-0 flex flex-col items-center -z-0 text-amber-950 active:text-amber-900 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold" 
          onClick={handleReiniciar}
        >
          Reiniciar
        </button>
      </div>

      <div className="h-fit w-fit absolute top-3 left-90 -z-1 bg-amber-950 grid grid-cols-4 grid-rows-4 gap-0 p-0 m-0 ">
        {cartas.map((carta, index) => (
          <div 
            className="cursor-pointer p-0 m-0 overflow-hidden" 
            key={index} 
            onClick={() => VireaCarta(index)}
          >
            <Image 
              id="cartaimagem" 
              src={carta.virado ? carta.src : '/cartas/backgrouuuuund.jpg'} 
              alt='image' 
              height={145} 
              width={145} 
              className={`${carta.acertada ? 'filter grayscale' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>  
  )
}
