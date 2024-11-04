import localFont from 'next/font/local'
import { Anek_Latin, Manjari, Montserrat } from 'next/font/google'
const montera = localFont({
  src: [
    {
      path: '../../public/Fonts/Montera.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/Fonts/Montera.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Fonts/Montera.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const aneklatin = Anek_Latin({
    weight: ['100','200','300','400','500','600','700','800'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

const montserrat = Montserrat({
  weight: ['100','200','300','400','500','600','700','800','900'],
  style: ['normal','italic'],
  subsets: ['latin'],
  display: 'swap',
})

const manjari = Manjari({
  weight: ['100','400','700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})


export{aneklatin,montera,manjari,montserrat}