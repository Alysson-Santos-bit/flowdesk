import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import ModalCliente from '../components/ModalCliente'; // <-- 1. Importamos o Modal aqui

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  
  // 2. Criamos os estados que controlam o Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Carrega os clientes do localStorage ao abrir a tela
  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('flowdesk_clientes')) || [];
    setClientes(clientesSalvos);
  }, []);

  // Filtro de busca (Nome ou Empresa)
  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  // Função de Excluir 
  const handleDelete = (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmar) {
      const novaLista = clientes.filter(c => c.id !== id);
      setClientes(novaLista);
      localStorage.setItem('flowdesk_clientes', JSON.stringify(novaLista));
    }
  };

  // 3. A Função Mágica que Salva (Novo ou Editado)
  const handleSaveCliente = (dadosDoFormulario) => {
    let novaLista;
    
    if (dadosDoFormulario.id) {
      // É EDIÇÃO: Atualiza o cliente na lista
      novaLista = clientes.map(c => c.id === dadosDoFormulario.id ? dadosDoFormulario : c);
    } else {
      // É CADASTRO NOVO: Cria um ID e adiciona no topo da lista
      const novoCliente = { ...dadosDoFormulario, id: Date.now() };
      novaLista = [novoCliente, ...clientes];
    }

    setClientes(novaLista); // Atualiza a tela
    localStorage.setItem('flowdesk_clientes', JSON.stringify(novaLista)); // Salva no banco local
    setModalAberto(false); // Fecha o modal
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        
        {/* 4. O Botão NOVO CLIENTE configurado */}
        <button 
          onClick={() => { 
            setClienteEditando(null); // Avisa o modal que é cadastro novo (vazio)
            setModalAberto(true);     // Abre a janela
          }} 
          className="bg-brand-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm font-medium"
        >
          <Plus size={20} />
          Novo cliente
        </button>
      </div>

      {/* BARRA DE BUSCA */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Buscar por nome ou empresa"
          className="w-full outline-none text-gray-700"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* TABELA DE CLIENTES */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Empresa</th>
                <th className="p-4 font-semibold">E-mail</th>
                <th className="p-4 font-semibold">Telefone</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-800">{cliente.nome}</td>
                    <td className="p-4 text-gray-600">{cliente.empresa}</td>
                    <td className="p-4 text-gray-600">{cliente.email}</td>
                    <td className="p-4 text-gray-600">{cliente.telefone}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        cliente.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      
                      {/* 5. O Botão EDITAR configurado */}
                      <button 
                        onClick={() => { 
                          setClienteEditando(cliente); // Avisa o modal para preencher com os dados deste cliente
                          setModalAberto(true);        // Abre a janela
                        }} 
                        className="text-blue-600 hover:text-blue-800 transition" 
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>

                      <button 
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-500 hover:text-red-700 transition" 
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 6. A tag do Modal fica aqui no final. O React desenha ela por cima de tudo quando "modalAberto" vira true */}
      <ModalCliente 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        clienteEditando={clienteEditando}
        onSave={handleSaveCliente}
      />

    </div>
  );
}