import React, { ChangeEvent } from 'react'

type SearchInputProps = {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export function SearchInput({ searchTerm, handleSearch }: SearchInputProps) {
  return (
    <div className="search-input">
      <input type="text" placeholder="search here" value={searchTerm} onChange={handleSearch} />
    </div>
  )
}
