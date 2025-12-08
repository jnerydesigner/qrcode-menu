// components/sections/HeroSection.tsx
export default function HeroSection() {
    return (
        <section className="bg-indigo-700 text-white py-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-xl">
                    <h1 className="text-4xl font-bold leading-tight">
                        Leve seu restaurante ao próximo nível!
                    </h1>
                    <p className="text-lg mt-4 opacity-90">
                        Cardápio digital com QRCode + pedidos via WhatsApp.
                    </p>
                    <button className="mt-6 bg-orange-500 px-6 py-3 rounded-lg font-medium">
                        Criar meu cardápio grátis
                    </button>
                </div>

                <div className="mt-10 md:mt-0">
                    {/* Imagem futura */}
                    <div className="w-72 h-96 bg-gray-300 rounded-xl"></div>
                </div>
            </div>
        </section>
    );
}
