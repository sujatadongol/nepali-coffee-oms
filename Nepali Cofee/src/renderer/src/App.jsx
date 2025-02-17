import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableList from './components/TableList'
import 'bootstrap/dist/css/bootstrap.min.css'
import SalesReport from './components/SalesReport'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<TableList />} />
      <Route path="/salesreport" element={<SalesReport />} />
      {/* Add other routes here */}
    </Routes>
  </Router>
  )
}

export default App
