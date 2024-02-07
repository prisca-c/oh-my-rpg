import { Html, PropsWithChildren, viteAssets } from 'adonisjsx'

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {viteAssets(['./src/domain/resources/app.tsx'])}
        <title>API-RPG</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
