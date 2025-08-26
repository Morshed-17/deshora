import { cn } from '@/lib/utils'
import React from 'react'
interface Props {
    children: React.ReactNode,
    className?:string
   
}

function PageTitle({children, className}: Props) {
  return (
    <h2 className={cn('text-xl md:text-2xl', className)}>{children}</h2>
  )
}

export default PageTitle