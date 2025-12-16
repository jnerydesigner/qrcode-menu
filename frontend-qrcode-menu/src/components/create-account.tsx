'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Mail, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { createMagicLink } from '@/api/magic-link';
import { useRouter } from 'next/navigation';
import { ScreenSuccessCreateAccount } from './ScreenSuccessCreateAccount';
import { startTransition } from 'react';
// Schema de validação com Zod
const createAccountSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido')
        .toLowerCase()
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;



export default function CreateAccountScreen() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
        mode: 'onBlur'
    });

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data: CreateAccountFormData) => createMagicLink(data.email),
        onSuccess: (data) => {
            console.log('Magic link criado:', data);
        },
        onError: (error) => {
            console.error('Erro ao criar magic link:', error);
        }
    });

    const onSubmit = (data: CreateAccountFormData) => {
        mutation.mutate(data);
    };

    const handleReset = () => {
        reset();
        mutation.reset();
    };

    const handleBackToHome = () => {

        router.push('/');

    };

    const emailValue = watch('email');

    if (mutation.isSuccess) {
        return (
            <ScreenSuccessCreateAccount
                email={emailValue}
                onReset={handleReset}
                onBackHome={handleBackToHome}
            />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #5B4FD3 0%, #3D34A5 100%)' }}>
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-52 h-52 mx-auto mb-4 rounded-full shadow-2xl overflow-hidden bg-white">
                        <Image src="/logo-cardapio-press.png" alt="Logo" width={200} height={200} className='w-full h-full object-contain' />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Criar conta</h1>
                    <p className="text-purple-200">Comece a revolucionar seu restaurante</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="mb-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF5722' }}>
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            Digite seu email
                        </h2>
                        <p className="text-sm text-gray-600 text-center">
                            Enviaremos um link de ativação para você completar o cadastro
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                placeholder="seu@email.com"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {mutation.isError && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">
                                    Erro ao enviar email. Tente novamente.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                            style={{ backgroundColor: '#FF5722' }}
                        >
                            {mutation.isPending ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Continuar
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Já tem uma conta?{' '}
                            <a href="#" className="font-semibold hover:underline" style={{ color: '#5B4FD3' }}>
                                Acessar painel
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-purple-200">
                        Ao criar uma conta, você concorda com nossos{' '}
                        <a href="#" className="underline hover:text-white">Termos de Uso</a> e{' '}
                        <a href="#" className="underline hover:text-white">Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    );
}