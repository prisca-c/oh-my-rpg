import React from 'react'

export type HTMLAttributes = React.HTMLAttributes<HTMLElement>

export type HTMLAttributesProps = {
  [key in keyof HTMLAttributes]: HTMLAttributes[key]
}
