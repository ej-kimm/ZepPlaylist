import chartBarVertical from '@/assets/images/chartBarVertical.svg'
import chats from '@/assets/images/chats.svg'
import headphone from '@/assets/images/headphone.svg'
import home from '@/assets/images/home.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsSpotify } from 'react-icons/bs'

const LINKS = [
  {
    to: '/',
    text: '홈',
    icon: <Image src={home} width={24} height={24} alt="album" />,
  },
  {
    to: '/koreaTopChart',
    text: '국내 TOP 100',
    icon: <Image src={chartBarVertical} width={24} height={24} alt="album" />,
  },
  {
    to: '/billboardTopChart',
    text: '빌보드 TOP 100',
    icon: <Image src={chartBarVertical} width={24} height={24} alt="album" />,
  },
  {
    to: '/playlist',
    text: '플레이리스트',
    icon: <Image src={headphone} width={24} height={24} alt="album" />,
  },
  {
    to: '/community',
    text: '커뮤니티',
    icon: <Image src={chats} width={24} height={24} alt="album" />,
  },
  {
    to: 'https://open.spotify.com/',
    text: '스포티파이 바로가기',
    icon: <BsSpotify fontSize={24} fill="#4CAF50" />,
    external: true,
  },
]

const SidebarMenu = () => {
  return (
    <ul className="flex flex-col items-start justify-center gap-2">
      {LINKS.map((link) => (
        <li key={link.text}>
          <Link
            href={link.to}
            className="flex h-10 items-center justify-start gap-1"
            target={link.external ? '_blank' : '_self'}
          >
            {link.icon}
            <span className="body-1">{link.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarMenu
