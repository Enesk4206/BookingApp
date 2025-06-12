import React from 'react'
import {CreditCard, Headset, ShieldCheck} from "lucide-react"
const TrustIndicators = () => {
    const features = [
        {
            icon: <ShieldCheck className='size-6 text-blue-600'/>,
            title: 'Güvenilir Rezervasyonlar.',
            desc: 'Tüm Bilgileri BookingWUS güvencesi ile korunur.'
        },
        {
            icon: <CreditCard className='size-6 text-blue-600'/>,
            title: 'Kolay Ödeme.',
            desc: 'Kredi kartı ve havale gibi esnek ödeme seçenekleri.'
        },
        {
            icon: <Headset className='size-6 text-blue-600'/>,
            title: '7/24 Destek.',
            desc: 'Her zaman ulaşabileceğiniz müşteri hizmetleri.'
        },
    ]
  return (
    <div className='py-15 mt-8 border border-blue-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
            {features.map((feauture, index)=>(
                <div key={index} className='flex flex-col items-center space-y-3'>
                    <div className='bg-blue-100 p-3 rounded-full'>{feauture.icon}</div>
                    <h3 className='text-lg font-semibold text-gray-800'>{feauture.title}</h3>
                    <p className='text-gray-500 text-sm'>{feauture.desc}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TrustIndicators