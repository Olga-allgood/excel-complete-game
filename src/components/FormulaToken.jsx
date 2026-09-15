function FormulaToken({
  x,
  label,
  hint,
  wide = false,
}) {
  return (
    <div
      className={`formula-token ${
        wide ? "wide-token" : ""
      }`}
      style={{
        left: `${x}px`,
      }}
    >
      <span className="fx">
        fx
      </span>

      <strong>
        {label}
      </strong>

      <small>
        {hint}
      </small>
    </div>
  );
}

export default FormulaToken;