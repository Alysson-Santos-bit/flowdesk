import { useState, useEffect } from 'react';
import { Users, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import { clientesIniciais, oportunidadesIniciais } from '../data/initialData';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);

  // Quando a tela carregar, busca no localStorage ou usa os dados iniciais fictícios
  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('flowdesk_clientes'));
    const oppsSalvas = JSON.parse(localStorage.getItem('flowdesk_oportunidades'));

    if (clientesSalvos && oppsSalvas) {
      setClientes(clientesSalvos);
      setOportunidades(oppsSalvas);
    } else {
      // Primeira vez abrindo o sistema: salva os dados iniciais no navegador
      localStorage.setItem('flowdesk_clientes', JSON.stringify(clientesIniciais));
      localStorage.setItem('flowdesk_oportunidades', JSON.stringify(oportunidadesIniciais));
      setClientes(clientesIniciais);
      setOportunidades(oportunidadesIniciais);
    }
  }, []);

  // --- CÁLCULOS AUTOMÁTICOS PEDIDOS PELO CLIENTE ---
  const totalClientes = clientes.length;
  
  // Oportunidades abertas (não ganhas e não perdidas)
  const oppsAbertas = oportunidades.filter(o => o.status !== 'Ganha' && o.status !== 'Perdida');
  
  // Oportunidades ganhas
  const oppsGanhas = oportunidades.filter(o => o.status === 'Ganha');
  
  // Valor Potencial (soma das abertas)
  const valorPotencial = oppsAbertas.reduce((total, opp) => total + opp.valor, 0);

  // Formatar para Moeda (R$)
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  // Formatar Data (de YYYY-MM-DD para DD/MM/YYYY)
  const formatarData = (dataIso) => dataIso.split('-').reverse().join('/');

  // Pegar apenas as 5 mais recentes (ordenando por data)
  const oppsRecentes = [...oportunidades]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      {/* 1. CARDS SUPERIORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card titulo="Total de clientes" valor={totalClientes} icone={Users} cor="bg-blue-600" />
        <Card titulo="Oportunidades abertas" valor={oppsAbertas.length} icone={Briefcase} cor="bg-yellow-500" />
        <Card titulo="Oportunidades ganhas" valor={oppsGanhas.length} icone={TrendingUp} cor="bg-green-500" />
        <Card titulo="Valor potencial" valor={formatarMoeda(valorPotencial)} icone={DollarSign} cor="bg-brand-blue" />
      </div>

      {/* 2. TABELA DE OPORTUNIDADES RECENTES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-bold text-brand-blue">Oportunidades Recentes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">Oportunidade</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Valor</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {oppsRecentes.map((opp) => {
                const clienteDaOpp = clientes.find(c => c.id === opp.clienteId);
                
                return (
                  <tr key={opp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-800">{opp.nome}</td>
                    <td className="p-4 text-gray-600">{clienteDaOpp ? clienteDaOpp.nome : 'Excluído'}</td>
                    <td className="p-4 font-bold text-gray-800">{formatarMoeda(opp.valor)}</td>
                    <td className="p-4">
                      {/* Cores dinâmicas para cada status */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold
                        ${opp.status === 'Ganha' ? 'bg-green-100 text-green-700' : 
                          opp.status === 'Perdida' ? 'bg-red-100 text-red-700' : 
                          opp.status === 'Em negociação' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'}`}>
                        {opp.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{formatarData(opp.data)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Mini-componente para não repetirmos o código dos 4 cards
function Card({ titulo, valor, icone: Icone, cor }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition">
      <div className={`${cor} p-4 rounded-lg text-white shadow-sm`}>
        <Icone size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{titulo}</p>
        <h3 className="text-2xl font-bold text-gray-800">{valor}</h3>
      </div>
    </div>
  );
}