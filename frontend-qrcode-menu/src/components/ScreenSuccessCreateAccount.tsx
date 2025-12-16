'use client'

import { Check } from 'lucide-react';

type ScreenSuccessCreateAccountProps = {
    email: string;
    onReset: () => void;
    onBackHome: () => void;
};

export function ScreenSuccessCreateAccount({
    email,
    onReset,
    onBackHome
}: ScreenSuccessCreateAccountProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'linear-gradient(135deg, #5B4FD3 0%, #3D34A5 100%)' }}
        >
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Email enviado com sucesso!
                </h2>

                <p className="text-gray-600 mb-6">
                    Enviamos um link de ativação para <strong>{email}</strong>.
                    Verifique sua caixa de entrada e spam para continuar o processo de criação da sua conta.
                </p>

                <div className="w-full flex justify-center gap-4 flex-col">
                    <button
                        onClick={onReset}
                        className="text-sm font-medium hover:underline cursor-pointer"
                        style={{ color: '#5B4FD3' }}
                    >
                        Enviar para outro email
                    </button>

                    <button
                        onClick={onBackHome}
                        className="text-sm font-medium hover:underline cursor-pointer"
                        style={{ color: '#5B4FD3' }}
                    >
                        Retornar para a Tela Principal
                    </button>
                </div>
            </div>
        </div>
    );
}
