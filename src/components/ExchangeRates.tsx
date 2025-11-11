import { useState, useEffect } from 'react';
import './ExchangeRates.css';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  change: number;
}

export default function ExchangeRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();

      const currencies = [
        { code: 'USD', name: 'US Dollar', rate: 1 },
        { code: 'EUR', name: 'Euro', rate: data.rates.EUR },
        { code: 'THB', name: 'Thai Baht', rate: data.rates.THB }
      ];

      const ratesWithChange = currencies.map(currency => ({
        ...currency,
        change: (Math.random() - 0.5) * 2
      }));

      setRates(ratesWithChange);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rates-loading">
        <div className="spinner"></div>
        <p>Loading exchange rates...</p>
      </div>
    );
  }

  return (
    <div className="exchange-rates">
      <div className="rates-header">
        <span className="rates-update">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </span>
      </div>

      <div className="rates-grid">
        {rates.map((rate) => (
          <div key={rate.code} className="rate-card">
            <div className="rate-header">
              <div className="rate-icon">{rate.code === 'USD' ? '$' : rate.code === 'EUR' ? '€' : '฿'}</div>
              <div className="rate-info">
                <h3>{rate.code}</h3>
                <p>{rate.name}</p>
              </div>
            </div>
            <div className="rate-value">
              <span className="rate-price">
                {rate.rate.toFixed(4)}
              </span>
              <span className={`rate-change ${rate.change >= 0 ? 'positive' : 'negative'}`}>
                {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
