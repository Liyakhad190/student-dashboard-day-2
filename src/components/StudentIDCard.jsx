import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import StudentCardPreview from "./StudentCardPreview";
import StudentQRCode from "./StudentQRCode";
import { DEFAULT_CARD_VALID_THROUGH, getStudentId } from "../data/studentIdCards";

export default function StudentIDCard({ student, cardActive = true }) {
  const cardRef = useRef(null);
  const [downloadError, setDownloadError] = useState("");
  const [exporting, setExporting] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === cardRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!student) return null;

  const downloadCard = async (format) => {
    setDownloadError("");
    setExporting(format);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: "#FFFFFF"
      });
      const fileName = `${getStudentId(student)}-id-card`;
      if (format === "pdf") {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [86, 54] });
        pdf.addImage(dataUrl, "PNG", 0, 0, 86, 54);
        pdf.save(`${fileName}.pdf`);
      } else {
        const anchor = document.createElement("a");
        anchor.download = `${fileName}.png`;
        anchor.href = dataUrl;
        anchor.click();
      }
    } catch (error) {
      console.error(`Unable to export student ID card as ${format.toUpperCase()}.`, error);
      setDownloadError(`${format.toUpperCase()} export failed. Try Print ID Card instead.`);
    } finally {
      setExporting("");
    }
  };

  const toggleFullscreen = async () => {
    setDownloadError("");
    try {
      if (document.fullscreenElement === cardRef.current) {
        await document.exitFullscreen();
      } else {
        await cardRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Unable to open the student ID card in fullscreen.", error);
      setDownloadError("Fullscreen preview is unavailable in this browser.");
    }
  };

  const printCard = () => {
    const printClass = "printing-student-id";
    cardRef.current.classList.add("print-target");
    document.body.classList.add(printClass);
    window.addEventListener(
      "afterprint",
      () => {
        document.body.classList.remove(printClass);
        cardRef.current?.classList.remove("print-target");
      },
      { once: true }
    );
    window.print();
  };

  const uniqueStudentId = getStudentId(student);
  const validThrough = student.idCardValidThrough || DEFAULT_CARD_VALID_THROUGH;
  const validityLabel = new Date(`${validThrough}T00:00:00`).toLocaleDateString(
    "en",
    { month: "short", year: "numeric" }
  );

  return (
    <div className="student-id-card-wrap">
      <StudentCardPreview student={student} cardRef={cardRef}>
        <header className="id-card-header">
          <div className="college-logo" aria-hidden="true">MS</div>
          <div className="id-card-college">
            <strong>Mohamed Sathak A.J. College of Engineering</strong>
            <span>OMR, Egattur, Chennai, Tamil Nadu</span>
            <span className="id-card-heading">OFFICIAL STUDENT IDENTITY CARD</span>
          </div>
          <div className="id-card-year">{student.year}</div>
        </header>

        <div className="id-card-main">
          <img
            src={student.image}
            alt={`${student.name} student photograph`}
            className="id-card-photo"
          />
          <div className="id-card-details">
            <h2>{student.name}</h2>
            <div className="id-card-fields">
              <p><span>Register No.</span><strong>{student.registerNo}</strong></p>
              <p><span>Student ID</span><strong>{uniqueStudentId}</strong></p>
              <p><span>Department</span><strong>{student.department}</strong></p>
              <p><span>Academic Year</span><strong>{student.year}</strong></p>
              {student.dateOfBirth && <p><span>Date of Birth</span><strong>{student.dateOfBirth}</strong></p>}
              {student.bloodGroup && <p><span>Blood Group</span><strong>{student.bloodGroup}</strong></p>}
              <p><span>Card Valid Through</span><strong>{validityLabel}</strong></p>
              <p><span>Card Status</span><strong className={`id-card-status ${cardActive && student.status === "Active" ? "active" : "inactive"}`}>{cardActive && student.status === "Active" ? "Active" : "Inactive"}</strong></p>
            </div>
          </div>
          <div className="id-card-qr-column">
            <StudentQRCode studentId={student.id} size={104} />
          </div>
        </div>

        <footer className="id-card-footer">
          <div><strong>MOHAMED SATHAK TRUST</strong><span>Official College Identification</span><span>If found, please return to the college office.</span></div>
          <div className="id-card-signature"><span>Authorized Signature</span><strong>__________________</strong></div>
          <div className="id-card-validity"><span>VALID THROUGH</span><strong>{validityLabel}</strong></div>
        </footer>
        {!cardActive && <div className="id-card-revoked">ID CARD INACTIVE</div>}
      </StudentCardPreview>

      <div className="id-card-actions">
        <Button onClick={() => downloadCard("png")} disabled={Boolean(exporting)}>
          {exporting === "png" ? "Generating PNG…" : "Download PNG"}
        </Button>
        <Button variant="secondary" onClick={() => downloadCard("pdf")} disabled={Boolean(exporting)}>
          {exporting === "pdf" ? "Generating PDF…" : "Download PDF"}
        </Button>
        <Button variant="secondary" onClick={printCard}>Print ID Card</Button>
        <Button variant="secondary" onClick={toggleFullscreen}>
          {fullscreen ? "Exit Fullscreen" : "View Fullscreen"}
        </Button>
        <a
          className="id-card-verification-link"
          href={`/verify/${encodeURIComponent(student.id)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open verification page
        </a>
      </div>
      {exporting && <p className="id-card-export-status" role="status">Preparing your high-resolution {exporting.toUpperCase()}…</p>}
      {downloadError && <p className="id-card-error" role="alert">{downloadError}</p>}
    </div>
  );
}
