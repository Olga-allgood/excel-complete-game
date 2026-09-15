function ReportRow({
  number,
  values,
  header = false,
}) {
  return (
    <div
      className={`report-row ${
        header ? "report-header-row" : ""
      }`}
    >
      <span className="row-number">
        {number}
      </span>

      {values.map((value, index) => (
        <span key={`${number}-${index}`}>
          {value}
        </span>
      ))}
    </div>
  );
}

export default ReportRow;