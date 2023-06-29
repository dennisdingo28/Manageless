import Navbar from '@/components/Navbar'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title:"Manageless",
  description:"Free Lightweight Text content management system for better management",
  keywords:['Content Management','Content','Text','Free Content Management','Managaless'],
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
        <AuthProvider>
          <div className="bg-darkBlack">
            <Navbar/>
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
