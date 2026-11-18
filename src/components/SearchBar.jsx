function SearchBar({ search, setSearch, placeholder = "Search by name, register number or email..." }) {
  return (
    <label className="search-field">
      <span className="search-field-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        className="search-bar"
        aria-label="Search records"
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {search && (
        <button type="button" aria-label="Clear search" onClick={() => setSearch("")}>×</button>
      )}
    </label>
  );
}

export default SearchBar;