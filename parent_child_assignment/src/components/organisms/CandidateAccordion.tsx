import InfoCard from "../molecules/InfoCard";
import { FaEnvelope, FaMapMarker, FaPhone, FaShieldAlt, FaUser } from "react-icons/fa";

const CandidateAccordion = () => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <details
        open
        style={{
          borderRadius: "10px",
          padding: "10px",
          background: "#fafafa",
        }}
      >
        <summary
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: 700,
            cursor: "pointer",
            outline: "none",
            marginBottom: "12px",
            padding: "10px 14px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <span>Candidate Information</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#555" }}>
            <span style={{ fontSize: "14px" }}>▾</span>
          </span>
        </summary>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            background: "#fff",
            marginTop: "12px",
          }}
        >

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <InfoCard
              icon={<FaUser />}
              label="Name"
              value="John Smith"
            />

            <InfoCard
              icon={<FaEnvelope />}
              label="Email"
              value="john.smith@checkr.com"
            />

            <InfoCard
              icon={<FaPhone />}
              label="Phone"
              value="(555) 555-5555"
            />

            <InfoCard
              icon={<FaMapMarker />}
              label="Zipcode"
              value="94158"
            />

            <InfoCard
              icon={<FaUser />}
              label="Driver License"
              value="FTEST1111 (CA)"
            />

            <InfoCard
              icon={<FaShieldAlt />}
              label="Social Security"
              value="XXX-XX-6789"
            />
          </div>
        </div>
      </details>
    </div>
  );
};

export default CandidateAccordion;