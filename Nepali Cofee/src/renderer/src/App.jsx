import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import TableList from './components/TableList'
import 'bootstrap/dist/css/bootstrap.min.css'
import SalesReport from './components/Report/SalesReport'
import MenuManager from './components/Menu/MenuManager'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableList />} />
        <Route path="/salesreport" element={<SalesReport />} />
        <Route path='/test' element={<div>Test route works!</div>} />
        <Route path='/menuManager' element={<MenuManager/>} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}

export default App
