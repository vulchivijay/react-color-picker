import React from 'react';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="rcp-field">
    <div className="rcp-field-label">{label}</div>
    {children}
  </label>
);

export const NumberField: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number }> = ({ value, onChange, min = 0, max = 255 }) => (
  <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max} />
);

export const SavedItem: React.FC<{
  // accept a minimal shape so tests can pass simple objects
  c: { Id?: string; id?: string; Name?: string; name?: string; Value?: string; value?: string; IsCustom?: boolean } | any;
  onSelect: (v: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; close?: () => void;
  active?: boolean;
}> = ({ c, onSelect, onEdit, onDelete, close, active = false }) => {
  const id = c.Id ?? c.id;
  const name = c.Name ?? c.name ?? '';
  const value = c.Value ?? c.value ?? '';
  const isCustom = c.IsCustom ?? c.isCustom ?? false;
  return (
    <li className={`rcp-item ${active ? 'rcp-active' : ''}`}>
      <button className={`rcp-swatch-btn ${active ? 'rcp-active' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { onSelect(value); close?.(); }}>
        <span className="rcp-swatch" style={{ background: value }} aria-hidden />
        <span className="rcp-item-name">{name}</span>
      </button>
      { isCustom && (<div className="rcp-item-actions">
        <button aria-label={`edit-${id}`} className="rcp-icon" onMouseDown={(e) => e.preventDefault()} onClick={() => { onEdit(id); close?.(); }}>✎</button>
        <button aria-label={`delete-${id}`} className="rcp-icon" onMouseDown={(e) => e.preventDefault()} onClick={() => { onDelete(id); close?.(); }}>🗑</button>
      </div>) }
    </li>
  );
};

// default export removed; use named exports
