'use client'
import { useState } from "react"
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


export default function Home() {

  


  const cartasiniciais: Carta[] = [
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

  ]

  const [cartas, setCartas] = useState<Carta[]>(() => shuffleArray(cartasiniciais))
  const [pontuacao, setPontuacao] = useState(0)

  
  // const [virado, setVirado] = useState(false)


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



return (
    <div className="">

    <div className="absolute left-1 flex flex-col items-center -z-0 text-amber-950 bg-[#aba37b] m-5 p-6 rounded-2xl font-bold">
      
      <h2 className="font-extrabold text-[#ffff] ">Pontuação</h2>

      {pontuacao === 8 ? pontuacao + ' parabens bb!' : pontuacao}
    </div>

    <div className="h-fit w-fit absolute top-3 left-90 -z-1 bg-amber-950 grid grid-cols-4 grid-rows-4 gap-0 p-0 m-0 ">
      {cartas.map((carta, index) => (
      <div className={`cursor-pointer p-0 m-0 overflow-hidden `}
      key={index} onClick={() => VireaCarta(index)}
      >
      <Image id="cartaimagem" src={carta.virado ? carta.src : '/cartas/backgrouuuuund.jpg'} alt='image' height={145} width={145} className={` ${carta.acertada ? 'filter grayscale' : ''}`}></Image>
      </div>
      )
      
      )}
    </div>


    </div>  
    
  );
}

