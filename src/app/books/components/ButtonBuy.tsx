import React, { ComponentProps } from 'react'

type Props = {
    children: React.ReactNode;
} & ComponentProps<"button">

function ButtonBuy({children, ...rest}: Props) {
  return (
    <button {...rest}>{children}</button>
  )
}

export default ButtonBuy