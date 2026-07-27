import { z } from 'zod'

// Schema de validação do formulário de vaga.
// Cada regra aqui gera automaticamente uma mensagem de erro no formulário.
export const jobSchema = z.object({
    company: z.string().min(1, 'Informe a empresa'),
    position: z.string().min(1, 'Informe o cargo'),

    // O usuário digita tecnologias separadas por vírgula (ex: "React, TypeScript").
    // Vamos transformar isso em array na hora de salvar.
    technologies: z.string().min(1, 'Informe ao menos uma tecnologia'),

    status: z.enum(['wishlist', 'applied', 'interview', 'technical', 'approved', 'rejected']),

    appliedDate: z.string().min(1, 'Informe a data'),

    // Campos opcionais: podem ficar em branco
    notes: z.string().optional(),
    link: z.string().url('Informe um link válido').optional().or(z.literal('')),
})

// Gera o tipo TypeScript a partir do schema acima.
export type JobFormData = z.infer<typeof jobSchema>