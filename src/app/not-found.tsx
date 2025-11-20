import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-crypto-warning bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
          <svg 
            className="w-12 h-12 text-crypto-warning" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-dark-text">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-dark-text">
          Página no encontrada
        </h2>
        
        <p className="text-dark-textMuted">
          La página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-crypto text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Ir al inicio
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-dark-card border border-dark-border text-dark-text rounded-lg font-semibold hover:bg-dark-cardHover transition-colors"
          >
            Ir al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

