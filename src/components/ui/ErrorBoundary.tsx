// ============================================================
// СБОРКА — Error Boundary
// Catches runtime errors and shows a user-friendly fallback.
// ============================================================

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
          <p className="text-4xl mb-4" aria-hidden="true">Что-то пошло не так</p>
          <h2 className="heading-lg mb-4">Ошибка загрузки</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Попробуйте обновить страницу. Если ошибка повторяется — напишите нам.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Попробовать снова
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full border border-border text-sm hover:bg-muted transition-colors"
            >
              На главную
            </Link>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-6 text-left text-xs text-destructive bg-destructive/5 rounded-xl p-4 max-w-2xl overflow-auto">
              {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
