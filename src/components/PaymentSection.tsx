import { useState } from 'react'

export default function PaymentSection() {
  const [balance, setBalance] = useState(5000)
  const [amount, setAmount] = useState('')
  const [transactions, setTransactions] = useState([
    { id: 1, sender: 'Investor A', receiver: 'You', amount: 1000, status: 'Completed' },
    { id: 2, sender: 'You', receiver: 'Entrepreneur B', amount: 500, status: 'Pending' },
  ])

  const handleDeposit = () => {
    const num = parseFloat(amount)
    if (!num || num <= 0) return
    setBalance(prev => prev + num)
    setTransactions(prev => [...prev, {
      id: prev.length + 1,
      sender: 'External',
      receiver: 'You',
      amount: num,
      status: 'Completed'
    }])
    setAmount('')
  }

  const handleWithdraw = () => {
    const num = parseFloat(amount)
    if (!num || num <= 0 || num > balance) return
    setBalance(prev => prev - num)
    setTransactions(prev => [...prev, {
      id: prev.length + 1,
      sender: 'You',
      receiver: 'External',
      amount: num,
      status: 'Completed'
    }])
    setAmount('')
  }

  const handleTransfer = () => {
    const num = parseFloat(amount)
    if (!num || num <= 0 || num > balance) return
    setBalance(prev => prev - num)
    setTransactions(prev => [...prev, {
      id: prev.length + 1,
      sender: 'You',
      receiver: 'Entrepreneur',
      amount: num,
      status: 'Pending'
    }])
    setAmount('')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>💰 Wallet & Payments</h2>

      {/* Balance Card */}
      <div style={{
        padding: '24px', background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
        color: '#fff', borderRadius: '12px', marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Total Balance</p>
        <h3 style={{ margin: '8px 0', fontSize: '32px' }}>${balance.toFixed(2)}</h3>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount..."
          style={{
            padding: '8px 12px', borderRadius: '6px',
            border: 'none', marginRight: '10px',
            width: '150px', fontSize: '14px'
          }}
        />

        <div style={{ display: 'inline-flex', gap: '8px', marginTop: '10px' }}>
          <button onClick={handleDeposit} style={{
            padding: '8px 16px', background: '#fff',
            color: '#1565c0', borderRadius: '6px',
            border: 'none', cursor: 'pointer', fontWeight: 'bold'
          }}>⬆️ Deposit</button>

          <button onClick={handleWithdraw} style={{
            padding: '8px 16px', background: '#fff',
            color: '#e53935', borderRadius: '6px',
            border: 'none', cursor: 'pointer', fontWeight: 'bold'
          }}>⬇️ Withdraw</button>

          <button onClick={handleTransfer} style={{
            padding: '8px 16px', background: '#fff',
            color: '#2e7d32', borderRadius: '6px',
            border: 'none', cursor: 'pointer', fontWeight: 'bold'
          }}>🔄 Transfer</button>
        </div>
      </div>

      {/* Transaction History */}
      <h3>📊 Transaction History</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>#</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Sender</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Receiver</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t.sender}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{t.receiver}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>${t.amount}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd',
                color: t.status === 'Completed' ? '#2e7d32' : '#f57c00',
                fontWeight: 'bold'
              }}>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}