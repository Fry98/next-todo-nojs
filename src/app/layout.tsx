import './globals.css';

export const metadata = {
  title: 'TODO with no JS',
  description: "It's a TODO list but works even with JavaScript disabled",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='m-0'>{children}</body>
    </html>
  )
}
