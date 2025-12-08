import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { createCompany } from '@/api/companies.fetch';

// Schema validation
const createCompanySchema = z.object({
  name: z.string().min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido'), // Basic length check
  image: z.any()
    .refine((files) => files?.length === 1, "A imagem é obrigatória")
    .refine((files) => files?.[0]?.size <= 5000000, `O tamanho máximo é 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml'
      ].includes(files?.[0]?.type),
      "Formato não suportado. Use PNG, JPG, JPEG, WEBP ou SVG."
    ),
});

type CreateCompanyFormData = z.infer<typeof createCompanySchema>;

export default function CreateCompany() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      cnpj: '',
    }
  });

  // Simulated mutation
  const { mutate: createCompanyMutation, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      // Simulate API delay
      await createCompany(data);


      return { success: true };
    },
    onSuccess: () => {
      alert('Empresa criada com sucesso! (Simulação)');
    },
    onError: (error) => {
      alert('Erro ao criar empresa.');
      console.error(error);
    }
  });

  const onSubmit = (data: CreateCompanyFormData) => {

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("cnpj", data.cnpj);
    formData.append("image", data.image[0]);


    for (const pair of formData.entries()) {
      console.log(pair);
    }


    createCompanyMutation(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", e.target.files, { shouldValidate: true });

    if (file.type === "image/svg+xml") {
      // Preview específico para SVG
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return;
    }

    // Outros formatos usam FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCnpj(e.target.value);
    setValue('cnpj', formatted, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Criar Nova Empresa
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nome da Empresa */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              placeholder="Ex: Hamburgueria da Vila"
              className={`text-gray-800 w-full px-4 py-2 border rounded-md outline-none transition ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent focus:ring-2'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
          </div>

          {/* CNPJ */}
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              {...register('cnpj')}
              onChange={handleCnpjChange}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              className={`text-gray-800 w-full px-4 py-2 border rounded-md outline-none transition ${errors.cnpj ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent focus:ring-2'}`}
            />
            {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj.message as string}</p>}
          </div>

          {/* Upload da Imagem */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Logo da Empresa
            </label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
              onChange={handleFileChange}
              className={`w-full px-4 py-2 border rounded-md outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? "border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent focus:ring-2"
                }`}
            />
            <p className="text-xs text-gray-500 mt-1">Formatos aceitos: PNG, JPG, JPEG, WEBP (Max 5MB)</p>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message as string}</p>}
          </div>

          {/* Preview da Imagem */}
          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Preview do logo"
                className="h-20 w-20 object-contain rounded-lg border border-gray-200"
              />
            </div>
          )}


          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando...
              </>
            ) : (
              'Criar Empresa'
            )}
          </button>
        </form>

        {/* Link de Voltar */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            ← Voltar para o login
          </a>
        </div>
      </div>
    </div>
  );
}