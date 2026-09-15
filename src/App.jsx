import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Oportunidades from './pages/Oportunidades';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-[#F7F8FA] overflow-hidden">
      
      {/* Menu Lateral */}
      <Sidebar telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} />

      {/* Área Central */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Renderização condicional limpa das telas */}
        {telaAtiva === 'dashboard' && <Dashboard />}
        {telaAtiva === 'clientes' && <Clientes />}
        {telaAtiva === 'oportunidades' && <Oportunidades />}

      </main>

    </div>
  );
}