const IconGradientDefs = ({ id, from, to }: any) => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
  </svg>
);

export default IconGradientDefs;
