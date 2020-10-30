import React from 'react'
import Link from 'next/link'
import Logo from '../assets/logo.png'
import Globe from '../assets/icons/globe.svg'

function HeaderLink({ href, children }) {
  return (
    <Link href={href}>
      <a className="text-white text-lg">{children}</a>
    </Link>
  )
}

export default function Header() {
  return (
    <header className="flex justify-between p-4 px-10  border-b border-white">
      <img src={Logo} />
      <div className="grid grid-flow-col gap-10 items-center">
        <HeaderLink href="/projects">Projects</HeaderLink>
        <HeaderLink href="/about">About</HeaderLink>
        <HeaderLink href="#">
          <Globe />
        </HeaderLink>
      </div>
    </header>
  )
}
