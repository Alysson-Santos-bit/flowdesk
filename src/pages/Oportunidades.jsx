import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import ModalOportunidade from '../components/ModalOportunidade';

export default function Oportunidades() {
  const [oportunidades, setOportunidades] = useState([]);
  const [clientes, setClientes] = useState([]);
  
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [oportunidadeEditando, setOportunidadeEditando] = useState(null);

  useEffect(() => {
    const oppsSalvas = JSON.parse(localStorage.getItem('flowdesk_oportunidades')) || [];
    const clientesSalvos = JSON.parse(localStorage.getItem('flowdesk_clientes')) || [];
    setOportunidades(oppsSalvas);
    setClientes(clientesSalvos);
  }, []);

  const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  const formatarData = (dataIso) => dataIso.split('-').reverse().join('/');

  const oportunidadesFiltradas = filtroStatus === 'Todos' 
    ? oportunidades 
    : oportunidades.filter(opp => opp.status === filtroStatus);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta oportunidade?")) {
      const novaLista = oportunidades.filter(o => o.id !== id);
      setOportunidades(novaLista);
      localStorage.setItem('flowdesk_oportunidades', JSON.stringify(novaLista));
    }
  };

  const handleSave = (dadosDoFormulario) => {
    let novaLista;
    if (dadosDoFormulario.id) {
      novaLista = oportunidades.map(o => o.id === dadosDoFormulario.id ? dadosDoFormulario : o);
    } else {
      const novaOpp = { ...dadosDoFormulario, id: Date.now() };
      novaLista = [novaOpp, ...oportunidades];
    }
    setOportunidades(novaLista);
    localStorage.setItem('flowdesk_oportunidades', JSON.stringify(novaLista));
    setModalAberto(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Oportunidades</h1>
        <button onClick={() => { setOportunidadeEditando(null); setModalAberto(true); }} 
          className="bg-brand-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm font-medium">
          <Plus size={20} /> Nova oportunidade
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
        <Filter className="text-gray-400" size={20} />
        <select 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="w-full md:w-auto outline-none text-gray-700 bg-transparent font-medium"
        >
          <option value="Todos">Todos os Status</option>
          <option value="Novo">Novo</option>
          <option value="Em negociação">Em negociação</option>
          <option value="Proposta enviada">Proposta enviada</option>
          <option value="Ganha">Ganha</option>
          <option value="Perdida">Perdida</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">Oportunidade</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Valor</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {oportunidadesFiltradas.length > 0 ? (
                oportunidadesFiltradas.map((opp) => {
                  const clienteDaOpp = clientes.find(c => c.id === opp.clienteId);
                  return (
                    <tr key={opp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-800">{opp.nome}</td>
                      <td className="p-4 text-gray-600">{clienteDaOpp ? clienteDaOpp.nome : 'Excluído'}</td>
                      <td className="p-4 font-bold text-gray-800">{formatarMoeda(opp.valor)}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                          ${opp.status === 'Ganha' ? 'bg-green-100 text-green-700' : 
                            opp.status === 'Perdida' ? 'bg-red-100 text-red-700' : 
                            opp.status === 'Em negociação' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'}`}>
                          {opp.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{formatarData(opp.data)}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <button onClick={() => { setOportunidadeEditando(opp); setModalAberto(true); }} className="text-blue-600 hover:text-blue-800 transition" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(opp.id)} className="text-red-500 hover:text-red-700 transition" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Nenhuma oportunidade encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <ModalOportunidade isOpen={modalAberto} onClose={() => setModalAberto(false)} oportunidadeEditando={oportunidadeEditando} onSave={handleSave} clientes={clientes} />
    </div>
  );
}