// src/components/ProgressBar.jsx
export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
    </div>
  );
}
