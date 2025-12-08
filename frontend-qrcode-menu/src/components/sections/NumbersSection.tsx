export default function NumbersSection() {
    const items = [
        { label: "Empresas cadastradas", value: "14.161" },
        { label: "Pedidos enviados", value: "277.245" },
        { label: "Produtos cadastrados", value: "189.730" },
        { label: "Visualizações", value: "6.700.564" },
    ];

    return (
        <section className="py-24 px-6 text-center">
            <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {items.map((item) => (
                    <div key={item.label}>
                        <p className="text-3xl font-bold">{item.value}</p>
                        <p className="opacity-70 mt-1">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
