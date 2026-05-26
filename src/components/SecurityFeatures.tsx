import { useState } from 'react'

export default function SecurityFeatures() {
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const getStrength = (pass: string) => {
    if (pass.length === 0) return { text: '', color: '#ccc', width: '0%' }
    if (pass.length < 4) return { text: 'Weak', color: '#e53935', width: '25%' }
    if (pass.length < 8) return { text: 'Medium', color: '#f57c00', width: '60%' }
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass))
      return { text: 'Strong', color: '#2e7d32', width: '100%' }
    return { text: 'Good', color: '#1565c0', width: '80%' }
  }

  const strength = getStrength(password)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const handleSendOtp = () => {
    setOtpSent(true)
    setOtpVerified(false)
    setOtp(['', '', '', '', '', ''])
    alert('OTP sent! (Demo: use 1 2 3 4 5 6)')
  }

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('')
    if (enteredOtp === '123456') {
      setOtpVerified(true)
    } else {
      alert('Wrong OTP! Try 123456')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔐 Security & Access Control</h2>

      {/* Password Strength */}
      <div style={{
        padding: '20px', border: '1px solid #ddd',
        borderRadius: '12px', marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>🔑 Password Strength Meter</h3>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Type a password..."
          style={{
            padding: '10px', width: '100%',
            borderRadius: '6px', border: '1px solid #ddd',
            fontSize: '16px', boxSizing: 'border-box'
          }}
        />

        {/* Strength Bar */}
        <div style={{
          marginTop: '10px', height: '8px',
          background: '#eee', borderRadius: '4px'
        }}>
          <div style={{
            height: '100%', width: strength.width,
            background: strength.color, borderRadius: '4px',
            transition: 'all 0.3s ease'
          }} />
        </div>
        {strength.text && (
          <p style={{ color: strength.color, fontWeight: 'bold', margin: '5px 0' }}>
            {strength.text}
          </p>
        )}
      </div>

      {/* OTP 2FA */}
      <div style={{
        padding: '20px', border: '1px solid #ddd',
        borderRadius: '12px'
      }}>
        <h3 style={{ marginTop: 0 }}>📱 Two-Factor Authentication (2FA)</h3>

        <button
          onClick={handleSendOtp}
          style={{
            padding: '10px 20px', background: '#1565c0',
            color: '#fff', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px'
          }}>
          📤 Send OTP
        </button>

        {otpSent && (
          <div>
            <p style={{ margin: '0 0 10px' }}>Enter 6-digit OTP:</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  style={{
                    width: '45px', height: '45px',
                    textAlign: 'center', fontSize: '20px',
                    border: '2px solid #ddd', borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              style={{
                padding: '10px 20px', background: '#2e7d32',
                color: '#fff', border: 'none', borderRadius: '6px',
                cursor: 'pointer', fontWeight: 'bold'
              }}>
              ✅ Verify OTP
            </button>

            {otpVerified && (
              <p style={{ color: '#2e7d32', fontWeight: 'bold', marginTop: '10px' }}>
                ✅ OTP Verified Successfully!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}