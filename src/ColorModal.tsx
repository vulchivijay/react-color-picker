import { useMemo } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, tintHex } from './colorUtils';
import { Field, NumberField } from './ui/Primitives';

export type ColorModalProps = {
  openEditId: string | null;
  editingFormat: 'hex' | 'rgb' | 'hsl' | 'tint';
  editingName: string;
  // accept either a Color object or a plain hex string
  editingValue: { Name: string; Value: string } | string;
  tintPreviewPct: number | null;
  onChangeName: (s: string) => void;
  onChangeValue: (s: { Name: string, Value: string } | string) => void;
  onChangeFormat: (f: 'hex' | 'rgb' | 'hsl' | 'tint') => void;
  onChangeTintPct: (p: number | null) => void;
  onRgbChange: (k: 'r' | 'g' | 'b', v: number) => void;
  onSave: () => void;
  onClose: () => void;
};

// Field and NumberField imported from shared primitives
export default function ColorModal(props: ColorModalProps) {
  const { openEditId, editingFormat, editingName, editingValue, tintPreviewPct, onChangeName, onChangeValue, onChangeFormat, onChangeTintPct, onRgbChange, onSave, onClose } = props;
  const ev = typeof editingValue === 'string' ? { Name: editingName || editingValue, Value: editingValue } : editingValue;
  const currentRgb = useMemo(() => hexToRgb(ev.Value), [ev]);
  if (!openEditId) return null;
  return (
    <div className="rcp-modal">
      <div className="rcp-modal-backdrop" onClick={onClose} />
      <div className="rcp-modal-panel" role="dialog" aria-modal="true">
        <h3>{openEditId === 'new' ? 'Add color' : 'Edit color'}</h3>
        <Field label="Name">
          <input value={editingName} onChange={(e) => onChangeName(e.target.value)} />
        </Field>

        <Field label="Format">
          <select value={editingFormat} onChange={(e) => onChangeFormat(e.target.value as any)}>
            <option value="hex">hex</option>
            <option value="rgb">rgb</option>
            <option value="hsl">hsl</option>
            <option value="tint">tint</option>
          </select>
        </Field>

        {editingFormat === 'hex' && (
          <Field label="Hex">
            <input value={ev.Value} onChange={(e) => onChangeValue(e.target.value)} />
          </Field>
        )}

        {editingFormat === 'rgb' && (
          <div className="rcp-rgb">
            <Field label="R"><NumberField value={currentRgb.r} onChange={(v) => onRgbChange('r', v)} /></Field>
            <Field label="G"><NumberField value={currentRgb.g} onChange={(v) => onRgbChange('g', v)} /></Field>
            <Field label="B"><NumberField value={currentRgb.b} onChange={(v) => onRgbChange('b', v)} /></Field>
            <div className="rcp-preview" style={{ background: ev.Value }} aria-hidden />
          </div>
        )}

        {editingFormat === 'hsl' && (() => {
          const hsl = rgbToHsl(currentRgb.r, currentRgb.g, currentRgb.b);
          return (
            <div className="rcp-hsl">
              <Field label="H"><NumberField value={hsl.h} onChange={(v) => { const { r, g, b } = hslToRgb(v, hsl.s, hsl.l); onChangeValue(rgbToHex(r, g, b)); }} min={0} max={360} /></Field>
              <Field label="S"><NumberField value={hsl.s} onChange={(v) => { const { r, g, b } = hslToRgb(hsl.h, v, hsl.l); onChangeValue(rgbToHex(r, g, b)); }} min={0} max={100} /></Field>
              <Field label="L"><NumberField value={hsl.l} onChange={(v) => { const { r, g, b } = hslToRgb(hsl.h, hsl.s, v); onChangeValue(rgbToHex(r, g, b)); }} min={0} max={100} /></Field>
              <div className="rcp-preview" style={{ background: ev.Value }} aria-hidden />
            </div>
          );
        })()}

        {editingFormat === 'tint' && (
          <div className="rcp-tint">
            <Field label="Tint">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="range" min={0} max={100} value={tintPreviewPct ?? 0} onChange={(e) => onChangeTintPct(Number(e.target.value))} />
                <input type="number" min={0} max={100} value={tintPreviewPct ?? 0} onChange={(e) => onChangeTintPct(Number(e.target.value))} style={{ width: 64 }} />
              </div>
            </Field>
            <div className="rcp-preview" style={{ background: tintPreviewPct != null ? tintHex(ev.Value, tintPreviewPct) : ev.Value }} aria-hidden />
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}