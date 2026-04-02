import * as React from "react";

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-surface p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-4">Чизе хато рафт.</h1>
            <p className="text-brand-muted mb-8">Мо барои нороҳатӣ узр мехоҳем. Лутфан саҳифаро навсозӣ кунед.</p>
            <button 
              onClick={() => window.location.reload()}
              className="cta-gradient text-white font-bold px-8 py-3 rounded-full"
            >
              Навсозии саҳифа
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
