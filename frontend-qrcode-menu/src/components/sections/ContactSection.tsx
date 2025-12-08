export default function ContactSection() {
    return (
        <section className="py-24 px-6 bg-indigo-900 text-white">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-semibold">Entre em contato</h2>
                    <p className="opacity-80 mt-4">Dúvidas? Fale com nossa equipe.</p>
                </div>

                <form className="space-y-4">
                    <input className="w-full p-3 rounded text-black" placeholder="Seu nome" />
                    <input className="w-full p-3 rounded text-black" placeholder="Seu email" />
                    <textarea className="w-full p-3 rounded text-black" placeholder="Sua mensagem" rows={4}></textarea>
                    <button className="bg-orange-500 px-6 py-3 rounded-lg">Enviar</button>
                </form>
            </div>
        </section>
    );
}
