'use client'
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

// props presentes em cada objeto Carta
  interface Carta {
    id: number,
    src: string,
    par: number,
    virado: boolean,
    acertada: boolean
  }

// função para embaralhar as cartas no array cartasiniciais 
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

// função principal da pagina
export default function Home() {

// array com cada objeto carta diferente
  const cartasiniciais = useMemo((): Carta[] => [
    {
      id: 1,
      src: '/cartas/addison1.jpg',
      par: 1,
      virado: false,
      acertada: false 

    },

    {
      id: 2,
      src: '/cartas/addison2.jpg',
      par: 1,
      virado: false,
      acertada: false 

    },

    {
      id: 3, 
      src: '/cartas/carolinepolachek1.jpg',
      par: 2,
      virado: false,
      acertada: false 

    },

    {
      id: 4,
      src: '/cartas/carolinepolachek2.jpg',
      par: 2,
      virado: false,
      acertada: false 

    },

    {
      id: 5,
      src: '/cartas/joji1.jpg',
      par: 3,
      virado: false,
      acertada: false 

    },

    {
      id: 6,
      src: '/cartas/joji2.jpg',
      par: 3,
      virado: false,
      acertada: false 

    },

    {
      id: 7, 
      src: '/cartas/jvb1.jpg',
      par: 4,
      virado: false,
      acertada: false 

    },

    {
      id: 8,
      src: '/cartas/jvb2.jpg',
      par: 4,
      virado: false,
      acertada: false 

    },

    {
      id: 9,
      src: '/cartas/pinkpantheress1.jpg',
      par: 5,
      virado: false,
      acertada: false 

    },

    {
      id: 10,
      src: '/cartas/pinkpantheress2.jpg',
      par: 5,
      virado: false,
      acertada: false 

    },

    {
      id: 11,
      src: '/cartas/quadeca1.jpg',
      par: 6,
      virado: false,
      acertada: false 

    },

    {
      id: 12,
      src: '/cartas/quadeca2.jpg',
      par: 6,
      virado: false,
      acertada: false 

    },

    {
      id: 13,
      src: '/cartas/rosalia1.jpg',
      par: 7,
      virado: false,
      acertada: false 

    },

    {
      id: 14,
      src: '/cartas/rosalia2.jpg',
      par: 7,
      virado: false,
      acertada: false 

    },

    {
      id: 15,
      src: '/cartas/segabodega1.jpg',
      par: 8,
      virado: false,
      acertada: false 

    },

    {
      id: 16,
      src: '/cartas/segabodega2.jpg',
      par: 8,
      virado: false,
      acertada: false 

    },

  ], []) 

  // const para manipulação de cada carta, pontuação e capacidade de reiniciar, respectivamente
  const [cartas, setCartas] = useState<Carta[]>(() => shuffleArray(cartasiniciais))
  const [pontuacao, setPontuacao] = useState(0)
  const [reiniciar, setReiniciar] = useState(false)

  // useEffect para reiniciar o jogo
  useEffect(() => {
    if (reiniciar) {
      setCartas(shuffleArray(cartasiniciais.map(carta => ({
        ...carta,
        virado: false,
        acertada: false,
      }), setPontuacao(0)
    )))
      setReiniciar(false)
    }
  }, [reiniciar, cartasiniciais])

// função coração do jogo: compara se as cartas viradas são um par, impede que mais de 2 cartas sejam viradas por vez, imprime "parabens" e conta 1 para cada acerto, e continua o jogo se as cartas não forem par.
  function VireaCarta(index: number) {
    const cartaClicada = cartas[index]
  
if (cartaClicada.acertada || 
        (cartas.filter(c => c.virado && !c.acertada).length >= 2 && !cartaClicada.virado)) {
      return
    }

    const listaAtualizada = cartas.map((item, i) => {
      if (i === index) {
        return { ...item, virado: !item.virado }
      }
      return item
    })

    setCartas(listaAtualizada)

     const novasViradas = listaAtualizada.filter(c => c.virado && !c.acertada)
    if (novasViradas.length === 2) {
      const [carta1, carta2] = novasViradas
      
      if (carta1.par === carta2.par) {
        // Marca as cartas como acertadas
        setTimeout(() => {
          setCartas(listaAtualizada.map(carta => 
            carta.par === carta1.par 
              ? { ...carta, acertada: true, virado: true } 
              : carta, setPontuacao(pontuacao + 1)
          ))
        }, 500)
      } else {
        // Volta as cartas se não for par
        setTimeout(() => {
          setCartas(listaAtualizada.map(carta => 
            carta.id === carta1.id || carta.id === carta2.id 
              ? { ...carta, virado: false } 
              : carta
          ))
        }, 1000)
      }
    }
  }
// handle para garantir que a função de reiniciar seja acionada 
  const handleReiniciar = () => {
    setReiniciar(true)
  }

// pagina html
return (
    <div className="">

    <div className="absolute left-1 flex flex-col items-center -z-0 text-amber-950 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold">
      
      <h2 className="font-extrabold text-[#ffff] ">{pontuacao == 8 ? 'Pontuação: ' + pontuacao + '!!' : 'Pontuação: ' + pontuacao}</h2>
{/* pontuação é chamada e ao chegar em 8 - maximo de cartas/acertos - ele imprime um parabens */}
      {pontuacao === 8 ? 'Parabéns, você ganhou!' : ''}
    </div>
{/* botão que aciona a handle de reiniciar faz a pontuação ficar zerada e a cartas alteram de lugar */}
    <div>
      <button className="cursor-pointer absolute left-1 bottom-0 flex flex-col items-center -z-0 text-amber-950 active:text-amber-900 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold" onClick={handleReiniciar}>
        Reiniciar
      </button>
    </div>
{/* o onclick na carta aciona a função VireaCarta que irá controlar as ações entre as cartas */}
    <div className="h-fit w-fit absolute top-3 left-90 -z-1 bg-amber-950 grid grid-cols-4 grid-rows-4 gap-0 p-0 m-0 ">
      {cartas.map((carta, index) => (
      <div className={`cursor-pointer p-0 m-0 overflow-hidden `}
      key={index} onClick={() => VireaCarta(index)}
      >
{/* objeto carta é chamado e dependendo de estar virado ou não sua imagem muda */}
      <Image id="cartaimagem" src={carta.virado ? carta.src : '/cartas/backgrouuuuund.jpg'} alt='image' height={145} width={145} className={` ${carta.acertada ? 'filter grayscale' : ''}`}></Image>
      </div>
      )
      
      )}
    </div>


    </div>  
    
  );
}

