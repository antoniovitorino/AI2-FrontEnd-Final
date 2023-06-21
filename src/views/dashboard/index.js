// Importações de diferentes componentes que representam páginas ou funcionalidades específicas do dashboard
import { Home } from "./Home/index";
import CriarCargos from "./Criar/criarCargos";
import CriarEquipas from "./Criar/criarEquipas";
import CriarRegras from "./Criar/criarRegras";
import CriarUsers from "./Criar/criarUsers";
import CriarCarousels from "./Criar/criarCarousels";
import EditarCargos from "./Editar/editarCargos";
import EditarEquipas from "./Editar/editarEquipas";
import EditarRegras from "./Editar/editarRegras";
import EditarUsers from "./Editar/editarUsers";
import EditarCarousels from "./Editar/editarCarousels";
import ListarCargos from "./Listar/listarCargos";
import ListarEquipas from "./Listar/listarEquipas";
import ListarRegras from "./Listar/listarRegras";
import ListarUsers from "./Listar/listarUsers";
import ListarCarousels from "./Listar/listarCarousels";

// O objeto Dashboard é criado e contém uma série de propriedades, cada uma representando um componente importado anteriormente
const Dashboard = { 
    Home, 
    CriarCargos, 
    CriarEquipas, 
    CriarRegras, 
    CriarUsers, 
    CriarCarousels,
    EditarRegras, 
    EditarCargos, 
    EditarEquipas, 
    EditarUsers,
    EditarCarousels,
    ListarCargos, 
    ListarEquipas,
    ListarRegras,
    ListarUsers,
    ListarCarousels
};

// Exporta o objeto Dashboard como padrão (default) para ser utilizado noutros módulos
export default Dashboard;


/*
Este código importa uma série de componentes que representam as diferentes páginas e 
funcionalidades do dashboard. Estes componentes são agrupados num objeto chamado 
"Dashboard", onde cada propriedade do objeto corresponde a um componente importado. 
O objeto "Dashboard" é exportado como padrão para que possa ser utilizado noutros módulos 
do código. Isto permite o uso destes componentes específicos ao navegar e renderizar diferentes 
partes do dashboard.
*/