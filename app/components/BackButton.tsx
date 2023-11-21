import Link from 'next/link'
import React from 'react'
import { SlArrowLeft } from 'react-icons/sl'

interface BackButtonProps {
  href: string;
}

const BackButton = ({href}:BackButtonProps) => {
  return (
    <div className="mb-5">
        <Link href={href}><SlArrowLeft /></Link>
      </div>
  )
}

export default BackButton