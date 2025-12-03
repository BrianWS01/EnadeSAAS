"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn, Mail, Lock, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lado Esquerdo - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 pr-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <BarChart3 className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-primary">ENADE Analytics</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Inteligência acadêmica para instituições de ensino superior
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Análises em Tempo Real</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe o desempenho dos seus cursos com dashboards interativos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Diagnósticos Automáticos</h3>
                <p className="text-sm text-muted-foreground">
                  IA identifica pontos fortes e fracos automaticamente
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Comparativos Detalhados</h3>
                <p className="text-sm text-muted-foreground">
                  Compare seu desempenho com outras instituições
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário de Login */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center lg:hidden mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <BarChart3 className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center lg:text-left">
                Bem-vindo de volta
              </CardTitle>
              <CardDescription className="text-center lg:text-left">
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border bg-background pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Lembrar-me / Esqueci senha */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">Lembrar-me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                {/* Botão de Login */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Entrar
                    </div>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou continue com
                    </span>
                  </div>
                </div>

                {/* Login Social */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </form>

              {/* Link para registro */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer com crédito */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Desenvolvido por{" "}
          <a
            href="https://brianws01.github.io/WoodCompany/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            WoodCompany
          </a>
        </p>
      </div>
    </div>
  );
}

