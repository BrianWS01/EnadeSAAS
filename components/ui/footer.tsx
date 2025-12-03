import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} ENADE Analytics. Todos os direitos reservados.
          </div>

          {/* Crédito WoodCompany */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Desenvolvido por</span>
            <a
              href="https://brianws01.github.io/WoodCompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:underline"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
              WoodCompany
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

