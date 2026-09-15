import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ModalCliente({ isOpen, onClose, clienteEditando, onSave }) {
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    status: 'Ativo' // Valor padrão
  });
  
  const [erro, setErro] = useState('');

  // Toda vez que o modal abrir ou fechar, ou o clienteEditando mudar, atualizamos os campos
  useEffect(() => {
    if (clienteEditando) {
      setFormData(clienteEditando); // Se for edição, preenche com os dados do cliente
    } else {
      // Se for novo cadastro, limpa os campos
      setFormData({
        nome: '',
        empresa: '',
        email: '',
        telefone: '',
        status: 'Ativo'
      });
    }
    setErro(''); // Limpa mensagens de erro ao abrir
  }, [clienteEditando, isOpen]);

  // Se o modal não estiver aberto (isOpen for false), não desenha nada
  if (!isOpen) return null;

  // Função que atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função chamada ao clicar em Salvar
  const handleSave = () => {
    // Validação exigida pelo cliente: Todos os campos são obrigatórios
    if (!formData.nome || !formData.empresa || !formData.email || !formData.telefone || !formData.status) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    onSave(formData); // Envia os dados de volta para a tela de Clientes
  };

  return (
    // Fundo escuro do Modal (Overlay)
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      
      {/* Janela Branca do Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {clienteEditando ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Corpo (Formulário) */}
        <div className="p-5 space-y-4">
          
          {/* Mensagem de Erro */}
          {erro && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input type="text" name="empresa" value={formData.empresa} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue bg-white">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* Rodapé (Botões) */}
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">
            Cancelar
          </button>
          <button onClick={handleSave}
            className="px-4 py-2 bg-brand-blue text-white font-medium hover:bg-blue-800 rounded-lg transition shadow-sm">
            {clienteEditando ? 'Salvar alterações' : 'Salvar cliente'}
          </button>
        </div>

      </div>
    </div>
  );
}