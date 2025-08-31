import React from 'react'
import * as XLSX from 'xlsx'

const ExcelUploader = ({ onUploadComplete }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (!file) return;

    const reader = new FileReader(); // Read the file as an ArrayBuffer

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result); // Convert the file data to a Uint8Array
        const workbook = XLSX.read(data, { type: 'array' }) // Parse the Excel file
        const sheet = workbook.Sheets[workbook.SheetNames[0]] // Get the first sheet
        const parsedData = XLSX.utils.sheet_to_json(sheet) // Convert the sheet to JSON

        const formattedItems = parsedData.map((item, index) => ({
          id: `excel-${Date.now()}-${index}`,
          name: item.name?.trim() || '',
          price: parseFloat(item.price),
          category: item.category?.trim().toLowerCase() || '',
          description: item.description?.trim() || '',
          imgSrc: item.imgSrc?.trim() || '',
          isStatic: false
        }))

        const validItems = formattedItems.filter(
          (item) => item.name && !isNaN(item.price) && item.category
        )

        if (validItems.length === 0) {
          alert('❌ No valid items found. Please check your Excel format.')
          return
        }
        const existingItems = JSON.parse(localStorage.getItem('menuItems') || '[]')
        const updatedItems = [...existingItems, ...validItems]

        localStorage.setItem('menuItems', JSON.stringify(updatedItems))
        alert(`✅ Successfully added ${validItems.length} item(s) to the menu.`)

        if (onUploadComplete) onUploadComplete()
      } catch (error) {
        alert('❌ Error reading Excel file. Please check the format.')
        console.error(error)
      }
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">Upload Menu Excel File</label>
      <input
        type="file"
        accept=".xlsx, .xls"
        className="form-control"
        onChange={handleFileUpload}
      />
      {/* <small className="text-muted d-block mt-2">
        <a href="../../assets/coffee_menu_data.xlsx" download>
          📥 Download Sample Excel Template
        </a>
      </small> */}
    </div>
  )
}

export default ExcelUploader
