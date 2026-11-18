import { QRCodeSVG } from "qrcode.react";

export default function StudentQRCode({ studentId, size = 96 }) {
  const verificationUrl = `${window.location.origin}/verify/${encodeURIComponent(studentId)}`;

  return (
    <div className="student-qr-code">
      <QRCodeSVG
        value={verificationUrl}
        size={size}
        level="H"
        marginSize={4}
        title={`Verify student ID ${studentId}`}
        bgColor="#FFFFFF"
        fgColor="#4A2F1B"
      />
      <span>SCAN TO VERIFY</span>
    </div>
  );
}
