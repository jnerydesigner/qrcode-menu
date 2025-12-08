export default function FeaturesSection() {
    const features = [
        "Cardápio digital com QRCode",
        "Pedidos enviados por WhatsApp",
        "Modo delivery",
        "Customização de layout",
        "Atualização em tempo real",
        "Gestão de produtos",
    ];

    return (
        <section className="py-24 px-6">
            <h2 className="text-3xl font-semibold text-center">Funcionalidades</h2>

            <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                <ul className="space-y-4 text-lg">
                    {features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                            <span className="w-5 h-5 bg-orange-500 rounded-full"></span>
                            {f}
                        </li>
                    ))}
                </ul>

                <div className="w-80 h-96 bg-gray-300 rounded-xl mx-auto"></div>
            </div>
        </section>
    );
}
