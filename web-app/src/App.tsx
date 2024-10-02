import './App.css'
import AttendancePercentage from './components/AttendancePercentage';
import SignatureList from './components/SignatureLIst';
import TabComponent from './components/Tab';

function App() {
  const tabs = [
    {
      label: 'Lista de Assinaturas',
      content: <SignatureList/>
    },
    {
      label: 'Resumo de Presença',
      content: <AttendancePercentage />
    },
  ];

  return (
    <div>
      <h1>Painel</h1>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default App
