import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import './styles.css'

export const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className="search-wrapper d-flex">
      <input
        placeholder="Search Item"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <div className="close-icon flex-centered" onClick={() => setSearchValue('')}>
          <CloseOutlined style={{ color: '#726a616b', fontSize: '10px' }} />
        </div>
      )}
    </div>
  )
}
