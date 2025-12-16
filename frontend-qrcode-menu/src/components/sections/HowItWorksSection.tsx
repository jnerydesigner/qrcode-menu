import { BiUserPin } from "react-icons/bi";
import { AiOutlineDesktop } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";


export default function HowItWorksSection() {
    const steps = [
        { title: "1. Crie sua conta", description: "Cadastre-se em poucos segundos.", icon: <BiUserPin className="w-12 h-12" /> },
        { title: "2. Acesse o painel", description: "Gerencie produtos, categorias e horários.", icon: <AiOutlineDesktop className="w-12 h-12" /> },
        { title: "3. Compartilhe o cardápio", description: "Mostre o QRCode aos clientes.", icon: <HiOutlineShare className="w-12 h-12" /> },
    ];

    return (
        <section className="py-20 px-6 text-center">
            <h2 className="text-3xl font-semibold">Como funciona?</h2>

            <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {steps.map((step) => (
                    <div key={step.title}>
                        <div className="w-20 h-20 mx-auto bg-orange-500 rounded-full flex justify-center items-center">
                            {step.icon}
                        </div>
                        <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                        <p className="opacity-70 mt-2">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
