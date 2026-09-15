function ExcelRangeVisual({
  columns,
  footer,
}) {
  return (
    <div className="challenge-excel">
      <div
        className="challenge-excel-grid"
        style={{
          gridTemplateColumns: `42px repeat(${columns.length}, minmax(150px, 1fr))`,
        }}
      >
        <div className="excel-corner" />

        {columns.map((column) => (
          <div
            key={column.letter}
            className="excel-column-letter"
          >
            {column.letter}
          </div>
        ))}

        <div className="excel-row-number">
          1
        </div>

        {columns.map((column) => (
          <div
            key={`${column.letter}-header`}
            className="excel-header-cell"
          >
            {column.heading}
          </div>
        ))}

        {columns[0].cells.map((cell, index) => (
          <div
            key={`range-row-${cell.row}`}
            className="excel-range-row"
          >
            <div className="excel-row-number">
              {cell.row}
            </div>

            {columns.map((column) => (
              <div
                key={`${column.letter}-${cell.row}`}
                className="excel-data-cell excel-highlight-cell"
              >
                {column.cells[index].value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="excel-visual-hint">
        {footer}
      </div>
    </div>
  );
}

export default ExcelRangeVisual;