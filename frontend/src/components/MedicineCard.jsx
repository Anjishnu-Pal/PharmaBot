import React, { useState } from "react";

const CONFIDENCE_STYLES = {
  high: { bg: "#dcfce7", color: "#166534", label: "High Confidence — FDA Verified" },
  medium: { bg: "#fef3c7", color: "#92400e", label: "Medium Confidence — Dataset" },
  low: { bg: "#fee2e2", color: "#991b1b", label: "Low Confidence — Consult a Doctor" },
};

/** Renders a labelled section only when content is present. */
function Section({ icon, title, children }) {
  if (!children) return null;
  return (
    <div className="medicine-section">
      <h4 className="medicine-section-title">{icon} {title}</h4>
      <div className="medicine-section-body">{children}</div>
    </div>
  );
}

/** Renders a bullet list from a string (splits on ; , or newline). */
function BulletList({ text }) {
  if (!text) return null;
  const items = text
    .split(/[;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (items.length === 1) return <p>{items[0]}</p>;
  return (
    <ul className="medicine-bullet-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function MedicineCard({ medicine }) {
  const [showAlternatives, setShowAlternatives] = useState(false);
  if (!medicine) return null;

  const confidence = medicine.confidence;
  const confStyle = confidence ? CONFIDENCE_STYLES[confidence] : null;

  return (
    <div className="medicine-card">
      {/* ── Header ── */}
      <div className="medicine-card-header">
        <h3>💊 {medicine.name || medicine.brand_name}</h3>
        {medicine.generic_name && (
          <span className="generic-name">({medicine.generic_name})</span>
        )}
        {confStyle && (
          <span
            className="confidence-badge"
            style={{ background: confStyle.bg, color: confStyle.color }}
          >
            {confStyle.label}
          </span>
        )}
      </div>

      {/* ── Core fields grid ── */}
      <div className="medicine-card-grid">
        {medicine.manufacturer && (
          <div className="medicine-field">
            <span className="field-label">Manufacturer</span>
            <span className="field-value">{medicine.manufacturer}</span>
          </div>
        )}
        {medicine.composition && (
          <div className="medicine-field">
            <span className="field-label">Composition</span>
            <span className="field-value">{medicine.composition}</span>
          </div>
        )}
        {medicine.disease_category && (
          <div className="medicine-field">
            <span className="field-label">Disease Category</span>
            <span className="field-value">{medicine.disease_category}</span>
          </div>
        )}
        {medicine.route && (
          <div className="medicine-field">
            <span className="field-label">Route</span>
            <span className="field-value">{medicine.route}</span>
          </div>
        )}
        {medicine.category && (
          <div className="medicine-field">
            <span className="field-label">Category</span>
            <span className="field-value">{medicine.category}</span>
          </div>
        )}
        {medicine.dosage_form && (
          <div className="medicine-field">
            <span className="field-label">Dosage Form</span>
            <span className="field-value">{medicine.dosage_form}</span>
          </div>
        )}
        {medicine.strength && (
          <div className="medicine-field">
            <span className="field-label">Strength</span>
            <span className="field-value">{medicine.strength}</span>
          </div>
        )}
        {medicine.price && (
          <div className="medicine-field">
            <span className="field-label">Price</span>
            <span className="field-value">₹{medicine.price}</span>
          </div>
        )}
        {medicine.prescription_required != null && (
          <div className="medicine-field">
            <span className="field-label">Prescription</span>
            <span className="field-value">
              {medicine.prescription_required === true ||
              medicine.prescription_required === "True"
                ? "Required"
                : "OTC"}
            </span>
          </div>
        )}
        {medicine.classification && (
          <div className="medicine-field">
            <span className="field-label">Classification</span>
            <span className="field-value">{medicine.classification}</span>
          </div>
        )}
        {medicine.indication && (
          <div className="medicine-field">
            <span className="field-label">Indication</span>
            <span className="field-value">{medicine.indication}</span>
          </div>
        )}
      </div>

      {/* ── Mechanism of Action ── */}
      <Section icon="⚙️" title="Mechanism of Action">
        {medicine.mechanism_of_action ? (
          <p>{medicine.mechanism_of_action}</p>
        ) : null}
      </Section>

      {/* ── How / When to Use ── */}
      <Section icon="📋" title="How / When to Use">
        {medicine.how_to_use || medicine.dosage_instructions ? (
          <BulletList text={medicine.how_to_use || medicine.dosage_instructions} />
        ) : null}
      </Section>

      {/* ── Side Effects / Warnings ── */}
      <Section icon="⚠️" title="Side Effects & Warnings">
        {(medicine.side_effects || medicine.warnings) ? (
          <>
            {medicine.side_effects && (
              <>
                <p className="medicine-subsection-label">Side Effects</p>
                <BulletList text={medicine.side_effects} />
              </>
            )}
            {medicine.warnings && (
              <>
                <p className="medicine-subsection-label">Warnings</p>
                <BulletList text={medicine.warnings} />
              </>
            )}
          </>
        ) : null}
      </Section>

      {/* ── Who Should Be Careful ── */}
      <Section icon="🩺" title="Who Should Be Careful">
        {medicine.contraindications || medicine.special_populations ? (
          <>
            {medicine.contraindications && (
              <>
                <p className="medicine-subsection-label">Contraindications</p>
                <BulletList text={medicine.contraindications} />
              </>
            )}
            {medicine.special_populations && (
              <>
                <p className="medicine-subsection-label">
                  Elderly / Pregnancy / Renal impairment
                </p>
                <BulletList text={medicine.special_populations} />
              </>
            )}
          </>
        ) : null}
      </Section>

      {/* ── Alternatives / Substitutes ── */}
      {medicine.alternatives && medicine.alternatives.length > 0 && (
        <div className="medicine-section">
          <button
            className="medicine-section-title medicine-section-toggle"
            onClick={() => setShowAlternatives((v) => !v)}
          >
            🔄 Alternatives / Substitutes
            <span className="toggle-arrow">{showAlternatives ? "▲" : "▼"}</span>
          </button>
          {showAlternatives && (
            <div className="medicine-section-body">
              <ul className="medicine-bullet-list">
                {medicine.alternatives.map((alt, i) => (
                  <li key={i}>
                    <strong>{alt.name || alt}</strong>
                    {alt.note ? ` — ${alt.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Source tag ── */}
      {medicine.source && (
        <div className="medicine-source">
          Source:{" "}
          {medicine.source === "fda"
            ? "FDA Approved Label"
            : medicine.source === "netmeds"
            ? "Netmeds Dataset"
            : medicine.source === "az_india"
            ? "India A-Z Dataset"
            : "Medicine Dataset"}
        </div>
      )}
    </div>
  );
}
