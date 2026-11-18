function FilterDropdown({ filters, setFilters }) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value
    });

  };

  return (

    <div className="filter-container">

      <select
        name="department"
        aria-label="Filter by department"
        value={filters.department}
        onChange={handleChange}
      >
        <option value="">All Departments</option>
        <option value="CSE">CSE</option>
        <option value="AIML">AIML</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
      </select>

      <select
        name="year"
        aria-label="Filter by academic year"
        value={filters.year}
        onChange={handleChange}
      >
        <option value="">All Years</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
      </select>

      <select
        name="status"
        aria-label="Filter by status"
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

    </div>

  );
}

export default FilterDropdown;