import { useState } from 'react'
import type { SquashEvent } from '../types'
import EventCard from './EventCard'
import { type Locale } from '../i18n'

const MONTH_NAMES_ZH = ['', '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月']
const MONTH_NAMES_EN = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

interface Props {
  month: number
  events: SquashEvent[]
  defaultOpen?: boolean
  lang: Locale
}

export default function MonthSection({ month, events, defaultOpen = false, lang }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const names = lang === 'zh' ? MONTH_NAMES_ZH : MONTH_NAMES_EN

  if (events.length === 0) return null

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Month header */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 0', background: 'none', border: 'none',
          borderBottom: '1px solid #F3F4F6', cursor: 'pointer',
          textAlign: 'left', marginBottom: open ? 12 : 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', letterSpacing: '0.02em' }}>
          {lang === 'zh' ? '2026年 ' : '2026 '}{names[month]}
        </span>
        <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400, marginLeft: 4 }}>
          {events.length}{lang === 'zh' ? '场' : ' events'}
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: 11, color: '#D1D5DB',
          transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        }}>›</span>
      </button>

      {/* Events */}
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {events.map(event => (
            <div key={event.id} style={{
              background: '#FFFFFF', borderRadius: 8,
              border: '1px solid #F3F4F6',
            }}>
              <EventCard event={event} lang={lang} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
