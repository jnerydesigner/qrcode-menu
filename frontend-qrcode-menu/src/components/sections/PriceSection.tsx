export default function PriceSection() {
    return (
        <section className="py-24 px-6 bg-gray-50 text-center">
            <h2 className="text-3xl font-semibold">Quanto custa isso tudo para você?</h2>

            <div className="mt-12 max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl">
                <h3 className="text-2xl font-bold text-orange-600">GRÁTIS</h3>
                <p className="mt-4 opacity-80">Plano 100% gratuito para restaurantes e pequenos negócios.</p>
                <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg">
                    Criar conta grátis
                </button>
            </div>
        </section>
    );
}
