import { LayoutDashboard, Users, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ telaAtiva, setTelaAtiva }) {
  const [menuAberto, setMenuAberto] = useState(false);

  // Lista de botões do menu para não repetirmos código
  const itensMenu = [
    { id: 'dashboard', label: 'Dashboard', icone: LayoutDashboard },
    { id: 'clientes', label: 'Clientes', icone: Users },
    { id: 'oportunidades', label: 'Oportunidades', icone: Briefcase },
  ];

  return (
    <>
      {/* Botão Hambúrguer (Aparece só no Celular) */}
      <button 
        onClick={() => setMenuAberto(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-brand-blue text-white rounded shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Menu Lateral (Sidebar) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 
        w-64 bg-brand-blue text-white shadow-xl 
        transform transition-transform duration-300 ease-in-out
        ${menuAberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Cabeçalho do Menu com botão de fechar no mobile */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-blue-800/50">
          <h2 className="text-2xl font-bold tracking-wider text-white">
            Flow<span className="text-blue-300">Desk</span>
          </h2>
          <button onClick={() => setMenuAberto(false)} className="md:hidden text-blue-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="p-4 space-y-2 mt-4">
          {itensMenu.map((item) => {
            const Icone = item.icone;
            const estaAtivo = telaAtiva === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTelaAtiva(item.id);
                  setMenuAberto(false); // Fecha o menu no celular ao clicar
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-lg 
                  transition-all duration-200 font-medium text-left
                  ${estaAtivo 
                    ? 'bg-blue-800/50 text-white shadow-inner border-l-4 border-blue-400' 
                    : 'text-blue-100 hover:bg-blue-800/30 hover:text-white'}
                `}
              >
                <Icone size={20} className={estaAtivo ? 'text-blue-400' : 'text-blue-200'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Fundo escuro atrás do menu quando aberto no celular */}
      {menuAberto && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setMenuAberto(false)} 
        />
      )}
    </>
  );
}