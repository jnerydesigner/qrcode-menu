export default function EasyAdministerSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-semibold">É fácil de administrar?</h2>
                    <p className="mt-4 opacity-80">
                        Você gerencia tudo por um painel simples e intuitivo. Atualize produtos,
                        altere preços, organize categorias e veja relatórios.
                    </p>
                    <button className="mt-6 bg-orange-500 px-6 py-3 text-white rounded-lg">
                        Criar meu cardápio grátis
                    </button>
                </div>

                <div className="w-full h-72 bg-gray-300 rounded-xl"></div>
            </div>
        </section>
    );
}
