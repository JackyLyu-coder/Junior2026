import { useState, useMemo } from 'react'
import { events } from './data/events'
import type { EventLevel } from './types'
import FilterBar from './components/FilterBar'
import MonthSection from './components/MonthSection'
import { zh, en, type Locale, locales } from './i18n'

const T = { zh, en }

type Filter = 'all' | EventLevel

function getEventMonth(event: { startDate: string | null; endDate: string | null }): number {
  if (event.startDate) return parseInt(event.startDate.slice(5, 7), 10)
  if (event.endDate) return parseInt(event.endDate.slice(5, 7), 10)
  return 13
}

export default function App() {
  const saved = (localStorage.getItem('squash-locale') as Locale) || 'zh'
  const [lang, setLang] = useState<Locale>(saved)
  const [filter, setFilter] = useState<Filter>('all')
  const currentMonth = new Date().getMonth() + 1
  const t = T[lang]

  const handleLang = (l: Locale) => {
    localStorage.setItem('squash-locale', l)
    setLang(l)
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return events
    return events.filter(e => e.level === filter)
  }, [filter])

  const grouped = useMemo(() => {
    const g: Record<number, typeof filtered> = {}
    for (let m = 1; m <= 13; m++) {
      const ms = filtered.filter(e => getEventMonth(e) === m)
      if (ms.length > 0) g[m] = ms
    }
    return g
  }, [filtered])

  const months = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => (a === 13 ? 1 : b === 13 ? -1 : a - b))

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      fontFamily: "'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #E5E7EB',
        padding: '28px 0 20px',
        background: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255,255,255,0.95)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>🎯</span>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.01em' }}>
                {t.siteTitle}
              </h1>
            </div>
            {/* Language switcher */}
            <div style={{ display: 'flex', gap: 4 }}>
              {locales.map(l => (
                <button
                  key={l.value}
                  onClick={() => handleLang(l.value)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    border: '1.5px solid',
                    borderColor: lang === l.value ? '#111827' : '#E5E7EB',
                    background: lang === l.value ? '#111827' : '#FFFFFF',
                    color: lang === l.value ? '#FFFFFF' : '#6B7280',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, paddingLeft: 32 }}>
            {t.siteSubtitle}
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 24px 80px' }}>
        {/* Legend */}
        <div style={{
          display: 'flex', gap: 20, padding: '12px 16px',
          background: '#FAFAFA', borderRadius: 10, marginBottom: 20, flexWrap: 'wrap',
        }}>
          {[
            { color: '#9CA3AF', label: t.legendPast },
            { color: '#F97316', label: t.legendOngoing },
            { color: '#3B82F6', label: t.legendUpcoming },
            { color: '#EAB308', label: t.legendTbd },
          ].map(({ color, label }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
              <span style={{ color, fontSize: 10 }}>●</span>
              {label}
            </span>
          ))}
        </div>

        {/* Filter */}
        <FilterBar active={filter} onChange={setFilter} lang={lang} />

        {/* Count */}
        <p style={{ fontSize: 12, color: '#D1D5DB', margin: '12px 0 0' }}>
          {t.eventCount.replace('{n}', String(filtered.length))}
        </p>

        {/* Month list */}
        <div style={{ marginTop: 20 }}>
          {months.map(month => (
            <MonthSection
              key={month}
              month={month === 13 ? 0 : month}
              events={grouped[month]}
              defaultOpen={month === currentMonth}
              lang={lang}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#D1D5DB' }}>
            <p style={{ fontSize: 32, margin: '0 0 8px' }}>{t.noEventsEmoji}</p>
            <p style={{ fontSize: 14 }}>{t.noEvents}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #F3F4F6', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#D1D5DB', margin: 0, lineHeight: 1.8 }}>
          {t.sourceNote}
          <br />
          {t.sourceHint}
        </p>
      </footer>
    </div>
  )
}
