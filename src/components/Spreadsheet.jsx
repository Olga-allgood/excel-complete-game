function Spreadsheet({
  headers,
  values,
  className,
}) {
  return (
    <div
      className={`spreadsheet-background ${className}`}
    >
      <div className="column-labels">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </div>

      <div className="sheet-row">
        {headers.map((item) => (
          <span key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="sheet-row">
        {values.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Spreadsheet;