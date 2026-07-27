interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    // Overlay escuro cobrindo a tela inteira
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={onCancel} // clica fora = cancela
    >
      {/* Caixa do modal — stopPropagation evita fechar ao clicar dentro */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Confirmar exclusão
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
