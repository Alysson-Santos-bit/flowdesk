import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ModalOportunidade({ isOpen, onClose, oportunidadeEditando, onSave, clientes }) {
  const [formData, setFormData] = useState({
    nome: '',
    clienteId: '',
    valor: '',
    status: 'Novo',
    data: ''
  });
  
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (oportunidadeEditando) {
      setFormData(oportunidadeEditando);
    } else {
      setFormData({
        nome: '',
        clienteId: clientes.length > 0 ? clientes[0].id : '', // Puxa o primeiro cliente por padrão
        valor: '',
        status: 'Novo',
        data: new Date().toISOString().split('T')[0] // Data de hoje por padrão
      });
    }
    setErro('');
  }, [oportunidadeEditando, isOpen, clientes]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nome || !formData.clienteId || !formData.valor || !formData.status || !formData.data) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    // Garante que o ID do cliente e o valor sejam números, não textos
    const dadosTratados = {
      ...formData,
      clienteId: Number(formData.clienteId),
      valor: Number(formData.valor)
    };

    onSave(dadosTratados);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {oportunidadeEditando ? 'Editar Oportunidade' : 'Nova Oportunidade'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {erro && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da oportunidade</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex: Criação de Website"
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select name="clienteId" value={formData.clienteId} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue bg-white">
              {clientes.length === 0 && <option value="">Nenhum cliente cadastrado</option>}
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome} ({c.empresa})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input type="number" name="valor" value={formData.valor} onChange={handleChange} placeholder="Ex: 2500"
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue bg-white">
              <option value="Novo">Novo</option>
              <option value="Em negociação">Em negociação</option>
              <option value="Proposta enviada">Proposta enviada</option>
              <option value="Ganha">Ganha</option>
              <option value="Perdida">Perdida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input type="date" name="data" value={formData.data} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-blue" />
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-brand-blue text-white font-medium hover:bg-blue-800 rounded-lg transition shadow-sm">
            {oportunidadeEditando ? 'Salvar alterações' : 'Salvar oportunidade'}
          </button>
        </div>
      </div>
    </div>
  );
}