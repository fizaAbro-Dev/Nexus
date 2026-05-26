import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export default function DocumentChamber() {
  const sigRef = useRef<SignatureCanvas>(null)
  const [docs] = useState([
    { name: 'Contract_001.pdf', status: 'Draft' },
    { name: 'Deal_Agreement.pdf', status: 'In Review' },
    { name: 'NDA_Signed.pdf', status: 'Signed' }
  ])

  const statusColor = (status: string) => {
    if (status === 'Draft') return '#888'
    if (status === 'In Review') return '#f57c00'
    if (status === 'Signed') return '#2e7d32'
    return '#000'
  }

  const clearSignature = () => {
    sigRef.current?.clear()
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📁 Document Chamber</h2>

      {docs.map((doc, i) => (
        <div key={i} style={{
          padding: '15px', margin: '10px 0',
          border: '1px solid #ddd', borderRadius: '8px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>📄 {doc.name}</span>
          <span style={{
            color: statusColor(doc.status),
            fontWeight: 'bold',
            padding: '4px 10px',
            border: `1px solid ${statusColor(doc.status)}`,
            borderRadius: '12px'
          }}>
            {doc.status}
          </span>
        </div>
      ))}

      <h3 style={{ marginTop: '20px' }}>✍️ E-Signature</h3>
      <div style={{ border: '2px solid #ddd', borderRadius: '8px', display: 'inline-block' }}>
        <SignatureCanvas
          ref={sigRef}
          penColor='black'
          canvasProps={{
            width: 500,
            height: 150,
            style: { display: 'block' }
          }}
        />
      </div>
      <br />
      <button
        onClick={clearSignature}
        style={{
          marginTop: '10px', padding: '8px 20px',
          background: '#e53935', color: '#fff',
          border: 'none', borderRadius: '6px',
          cursor: 'pointer', fontWeight: 'bold'
        }}>
        🗑️ Clear Signature
      </button>
    </div>
  )
}