import React from 'react'
interface Props {
    children: React.ReactNode,
   
}

function PageTitle({children}: Props) {
  return (
    <h2 className='text-xl md:text-2xl'>{children}</h2>
  )
}

export default PageTitle