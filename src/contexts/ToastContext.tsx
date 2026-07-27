import { createContext, useCallback, useState } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = crypto.randomUUID();

      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove o toast automaticamente após 3 segundos.
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  const toastStyles: Record<ToastType, string> = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Renderiza os toasts no canto inferior direito */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium
              animate-[fadeInUp_0.2s_ease-out] ${toastStyles[toast.type]}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
