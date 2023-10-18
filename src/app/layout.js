import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['300','400','500'],
    variable: '--poppins'
})

export const metadata = {
    title: 'Daily Run Rate',
    description: 'Enhance lead tracking precision with our DRR Report. Elevate functionality and user experience today!',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <section className='container'>
                    {children}
                </section>
            </body>
        </html>
    )
}
