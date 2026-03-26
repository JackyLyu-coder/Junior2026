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

      {/* 参考站点 */}
      <footer style={{ borderTop: '1px solid #F3F4F6', padding: '24px', textAlign: 'center', background: '#FAFAFA' }}>
        <details style={{ textAlign: 'left', maxWidth: 640, margin: '0 auto' }}>
          <summary style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', cursor: 'pointer', userSelect: 'none', padding: '4px 0' }}>
            🌍 {lang === 'zh' ? '参考站点 Reference Sites' : 'Reference Sites'}
          </summary>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginTop: 12 }}>
            {[
              // 🌍 世界 & 亚洲
              { cat: '🌏 亚洲', name: '世界壁球联合会 WSF', url: 'https://www.worldsquash.org' },
              { cat: '🌏 亚洲', name: '亚洲壁球联合会 ASF', url: 'https://www.asiansquash.org' },
              { cat: '🌏 亚洲', name: '中国壁球协会 CSA', url: 'https://www.squash.org.cn' },
              { cat: '🌏 亚洲', name: '香港壁球总会 HKSA', url: 'https://www.hksquash.org.hk' },
              { cat: '🌏 亚洲', name: '新加坡壁球协会', url: 'https://www.squashsingapore.com' },
              { cat: '🌏 亚洲', name: '马来西亚壁球协会', url: 'https://www.myss.com.my' },
              { cat: '🌏 亚洲', name: '澳门壁球总会', url: 'https://www.macsq.org' },
              { cat: '🌏 亚洲', name: '卡塔尔壁球协会', url: 'https://www.qatarsquash.com' },
              { cat: '🌏 亚洲', name: '巴基斯坦壁球协会', url: 'https://www.pfsf.com.pk' },
              { cat: '🌏 亚洲', name: '印度壁球协会', url: 'https://www.squashindia.com' },
              { cat: '🌏 亚洲', name: '日本壁球联盟', url: 'https://www.jsquash.or.jp' },
              { cat: '🌏 亚洲', name: '韩国壁球协会', url: 'https://www.koreasquash.org' },
              { cat: '🌏 亚洲', name: '阿联酋壁球协会', url: 'https://www.emiratesquash.com' },
              { cat: '🌏 亚洲', name: '沙特壁球联合会', url: 'https://www.sauquash.com' },
              // 🏝️ 大洋洲
              { cat: '🏝️ 大洋洲', name: '澳大利亚壁球协会', url: 'https://www.squash.org.au' },
              { cat: '🏝️ 大洋洲', name: '新西兰壁球协会', url: 'https://www.squashnz.co.nz' },
              // 🇪🇺 欧洲
              { cat: '🇪🇺 欧洲', name: '欧洲壁球联合会 ESF', url: 'https://www.europeansquash.com' },
              { cat: '🇪🇺 欧洲', name: '英国壁球协会', url: 'https://www.englandsquash.org' },
              { cat: '🇪🇺 欧洲', name: '法国壁球联合会', url: 'https://www.ffsquash.fr' },
              { cat: '🇪🇺 欧洲', name: '德国壁球协会', url: 'https://www.squash-verband.de' },
              { cat: '🇪🇺 欧洲', name: '荷兰壁球协会 NSF', url: 'https://squash.nl' },
              { cat: '🇪🇺 欧洲', name: '波兰壁球协会 PZF', url: 'https://polskisquash.pl' },
              // 🌍 非洲
              { cat: '🌍 非洲', name: '埃及壁球协会', url: 'https://www.egyptiansquash.com' },
              // 🌎 美洲
              { cat: '🌎 美洲', name: '美国壁球协会 US Squash', url: 'https://www.ussquash.org' },
            ].map(site => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11,
                  color: '#3B82F6',
                  textDecoration: 'none',
                  padding: '4px 8px',
                  borderRadius: 6,
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  display: 'block',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#3B82F6')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
              >
                {site.name}
              </a>
            ))}
          </div>
        </details>
        <p style={{ fontSize: 11, color: '#D1D5DB', margin: '16px 0 0', lineHeight: 1.8 }}>
          {t.sourceNote}
          <br />
          {t.sourceHint}
        </p>
      </footer>
    </div>
  )
}
