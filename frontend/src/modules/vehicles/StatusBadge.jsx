'use client';

const statusMap = {
  'En movimiento': { class: 'badge-moving', dot: 'dot-moving' },
  'Detenido': { class: 'badge-stopped', dot: 'dot-stopped' },
  'Sin señal': { class: 'badge-no-signal', dot: 'dot-no-signal' },
};

export default function StatusBadge({ status }) {
  const config = statusMap[status] || statusMap['Sin señal'];

  return (
    <span className={`badge ${config.class}`}>
      <span className={`dot ${config.dot}`} />
      {status}
    </span>
  );
}
