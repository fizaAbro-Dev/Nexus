import { useState } from 'react';

export default function VideoCall() {
  const [callActive, setCallActive] = useState(false)
  const [videoOn, setVideoOn] = useState(true)
  const [audioOn, setAudioOn] = useState(true)

  return (
    <div style={{ padding: '20px' }}>
      <h2>📹 Video Call</h2>

      <div style={{
        width: '100%', height: '300px',
        background: '#1a1a2e', borderRadius: '12px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: '#fff',
        fontSize: '20px', marginBottom: '20px'
      }}>
        {callActive ? '📹 Call Active...' : '📵 Call Not Started'}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setCallActive(!callActive)}
          style={{
            padding: '12px 24px',
            background: callActive ? '#e53935' : '#43a047',
            color: '#fff', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            fontWeight: 'bold', fontSize: '15px'
          }}>
          {callActive ? '📵 End Call' : '📞 Start Call'}
        </button>

        <button
          onClick={() => setVideoOn(!videoOn)}
          style={{
            padding: '12px 24px',
            background: videoOn ? '#1565c0' : '#555',
            color: '#fff', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          {videoOn ? '📹 Video On' : '🚫 Video Off'}
        </button>

        <button
          onClick={() => setAudioOn(!audioOn)}
          style={{
            padding: '12px 24px',
            background: audioOn ? '#6a1b9a' : '#555',
            color: '#fff', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          {audioOn ? '🎤 Mic On' : '🔇 Mic Off'}
        </button>
      </div>
    </div>
  )
}