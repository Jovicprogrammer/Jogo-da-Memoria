'use client'
import { useState } from "react"
import Image from "next/image"

  interface Carta {
    id: number,
    src: string,
    par: number,
    virado: boolean
  }

export default function Home() {


  const cartasiniciais: Carta[] = [
    {
      id: 1,
      src: '/cartas/addison1.jpg',
      par: 1,
      virado: false

    },

    {
      id: 2,
      src: '/cartas/addison2.jpg',
      par: 1,
      virado: false

    },

    {
      id: 3, 
      src: '/cartas/carolinepolachek1.jpg',
      par: 2,
      virado: false

    },

    {
      id: 4,
      src: '/cartas/carolinepolachek2.jpg',
      par: 2,
      virado: false

    },

    {
      id: 5,
      src: '/cartas/joji1.jpg',
      par: 3,
      virado: false

    },

    {
      id: 6,
      src: '/cartas/joji2.jpg',
      par: 3,
      virado: false

    },

    {
      id: 7, 
      src: '/cartas/jvb1.jpg',
      par: 4,
      virado: false

    },

    {
      id: 8,
      src: '/cartas/jvb2.jpg',
      par: 4,
      virado: false

    },

    {
      id: 9,
      src: '/cartas/pinkpantheress1.jpg',
      par: 5,
      virado: false

    },

    {
      id: 10,
      src: '/cartas/pinkpantheress2.jpg',
      par: 5,
      virado: false

    },

    {
      id: 11,
      src: '/cartas/quadeca1.jpg',
      par: 6,
      virado: false

    },

    {
      id: 12,
      src: '/cartas/quadeca2.jpg',
      par: 6,
      virado: false

    },

    {
      id: 13,
      src: '/cartas/rosalia1.jpg',
      par: 7,
      virado: false

    },

    {
      id: 14,
      src: '/cartas/rosalia2.jpg',
      par: 7,
      virado: false

    },

    {
      id: 15,
      src: '/cartas/segabodega1.jpg',
      par: 8,
      virado: false

    },

    {
      id: 16,
      src: '/cartas/segabodega2.jpg',
      par: 8,
      virado: false

    },

  ]

  const [cartas, setCartas] = useState<Carta[]>(cartasiniciais)
  // const [virado, setVirado] = useState(false)

  function VireaCarta(index: number) {
    const listaAtualizada = cartas.map((item, i)=>{
      
        if(i == index) {
            item.virado = !item.virado
        }
        return item
    })

    setCartas(listaAtualizada)
  }


return (
    <div className="grid grid-cols-4 grid-rows-4 bg-green-800 ">

    {cartas.map((carta, index) => (
    <div className={`cursor-pointer`}

    key={index} onClick={() => VireaCarta(index)}
    >
    <Image src={carta.virado ? carta.src : '/cartas/backgrouuuuund.jpg'} alt='image' height={400} width={400} ></Image>
    </div>
    )
    
    )}


    </div>  
    
  );
}
