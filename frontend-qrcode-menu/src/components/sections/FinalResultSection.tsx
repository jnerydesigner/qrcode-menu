import { TabUserApplication } from "../TabUserApplication";

export default function FinalResultSection() {
    return (
        <section className="py-24 bg-gray-50 px-6 text-center">
            <h2 className="text-3xl font-semibold">Resultado Final</h2>

            <div className="mt-12 flex justify-center">
                <TabUserApplication />
            </div>
        </section>
    );
}
