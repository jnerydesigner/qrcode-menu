export default function ClientsSection() {
    return (
        <section className="py-24 px-6 bg-white text-center">
            <h2 className="text-3xl font-semibold">Alguns clientes</h2>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-40 h-20 bg-gray-200 rounded-lg mx-auto"></div>
                ))}
            </div>
        </section>
    );
}
