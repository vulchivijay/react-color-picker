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
  c: {
    Id: string,
    Name: string,
    ColorBrush: null,
    IsCustom: boolean,
    ColorType: number,
    Alpha: number,
    R: number,
    G: number,
    B: number,
    C: number,
    M: number,
    Y: number,
    K: number,
    Tint: number,
    Value: string,
    IsBlack: boolean,
    IsWhite: boolean
  }; onSelect: (v: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; close?: () => void
}> = ({ c, onSelect, onEdit, onDelete, close }) => (
  <li className="rcp-item">
    <button className="rcp-swatch-btn" onMouseDown={(e) => e.preventDefault()} onClick={() => { onSelect(c.Value); close?.(); }}>
      <span className="rcp-swatch" style={{ background: c.Value }} aria-hidden />
      <span className="rcp-item-name">{c.Name}</span>
    </button>
    <div className="rcp-item-actions">
      <button aria-label={`edit-${c.Id}`} className="rcp-icon" onMouseDown={(e) => e.preventDefault()} onClick={() => { onEdit(c.Id); close?.(); }}>✎</button>
      <button aria-label={`delete-${c.Id}`} className="rcp-icon" onMouseDown={(e) => e.preventDefault()} onClick={() => { onDelete(c.Id); close?.(); }}>🗑</button>
    </div>
  </li>
);

// default export removed; use named exports
