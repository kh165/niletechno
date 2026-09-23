import React, { Component } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Honest logging without false claims of automatic remote alerting
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unhandled Application Error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          aria-live="assertive" 
          className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white font-sans"
        >
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h1 className="text-xl font-bold font-cairo mb-2 text-white">
              عذراً، حدث خطأ غير متوقع في العرض
            </h1>
            <p className="text-xs text-slate-300 font-cairo mb-6 leading-relaxed">
              حدث خطأ برمجي أثناء تحميل هذا الجزء. يمكنك إعادة تحميل الصفحة للمتابعة بسلاسة.
            </p>
            
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-cairo shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة تحميل الصفحة (Reload)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
