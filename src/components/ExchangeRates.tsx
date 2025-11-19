import { useState, useEffect } from 'react';
import './ExchangeRates.css';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  change: number;
  history: number[];
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

  const generateHistory = (baseRate: number, change: number) => {
    const points = 20;
    const history: number[] = [];
    const volatility = Math.abs(change) / 100;

    for (let i = 0; i < points; i++) {
      const progress = i / points;
      const trend = baseRate * (1 - change / 100 * (1 - progress));
      const noise = (Math.random() - 0.5) * baseRate * volatility * 0.5;
      history.push(trend + noise);
    }

    return history;
  };

  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();

      const currencies = [
        { code: 'USD', name: 'US Dollar', rate: 1 },
        { code: 'EUR', name: 'Euro', rate: data.rates.EUR },
        { code: 'THB', name: 'Thai Baht', rate: data.rates.THB }
      ];

      const ratesWithChange = currencies.map(currency => {
        const change = (Math.random() - 0.5) * 2;
        return {
          ...currency,
          change,
          history: generateHistory(currency.rate, change)
        };
      });

      setRates(ratesWithChange);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      setLoading(false);
    }
  };

  const renderSparkline = (history: number[], isPositive: boolean) => {
    if (history.length < 2) return null;

    const width = 120;
    const height = 40;
    const padding = 2;

    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;

    const points = history.map((value, index) => {
      const x = (index / (history.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    });

    const pathD = `M ${points.join(' L ')}`;

    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <svg width={width} height={height} className="sparkline">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? '#34d399' : '#f87171'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? '#34d399' : '#f87171'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${pathD} L ${width},${height} L 0,${height} Z`}
          fill={`url(#${gradientId})`}
        />
        <path
          d={pathD}
          fill="none"
          stroke={isPositive ? '#34d399' : '#f87171'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
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

            <div className="rate-chart">
              {renderSparkline(rate.history, rate.change >= 0)}
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
