import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("Variáveis de ambiente inválidas", _env.error.format())
  throw new Error("Erro ao carregar variáveis de ambiente.")
}

const env = _env.data

export { env }
