/**
 * GradientText - wraps children in the signature pink→purple→blue gradient.
 * Use for ONE accent word inside a headline. Do not apply to full sentences.
 */
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Slow animated pan (default true). Set false for static gradient. */
  animate?: boolean;
}

const GradientText = ({ children, className = '', animate = true }: GradientTextProps) => (
  <span
    className={`gradient-text ${animate ? 'animate-gradient-pan' : ''} ${className}`}
    style={{ display: 'inline' }}
  >
    {children}
  </span>
);

export default GradientText;
