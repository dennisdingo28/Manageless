import './globals.css'

export const metadata = {
  title:"Manageless",
  description:"Lightweight content management system for better management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
