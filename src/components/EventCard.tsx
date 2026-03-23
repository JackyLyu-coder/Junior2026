import type { SquashEvent, EventStatus } from '../types'
import type { Locale } from '../i18n'

const LEVEL_CONFIG = {
  national: { label: { zh: '国家级', en: 'National' }, color: '#DC2626' },
  asian:    { label: { zh: '亚洲级', en: 'Asian' },    color: '#D97706' },
  international: { label: { zh: '其他国', en: 'International' }, color: '#2563EB' },
  club:     { label: { zh: '俱乐部', en: 'Club' },     color: '#6B7280' },
} as const

function getEventStatus(event: SquashEvent): EventStatus {
  if (event.startDate === null) return 'tbd'
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const start = new Date(event.startDate)
  const end = event.endDate ? new Date(event.endDate) : start
  if (today < start) return 'upcoming'
  if (today >= start && today <= end) return 'ongoing'
  return 'past'
}

function fmtDate(start: string | null, end: string | null, lang: Locale): string {
  if (!start) return lang === 'zh' ? '日期待定' : 'TBD'
  if (!end || start === end) {
    const d = lang === 'zh'
      ? `${start.slice(5, 7)}月${start.slice(8, 10)}日`
      : `${start.slice(5, 7)}/${start.slice(8, 10)}`
    return d
  }
  const s = lang === 'zh'
    ? `${start.slice(5, 7)}/${start.slice(8, 10)}`
    : `${start.slice(5, 7)}/${start.slice(8, 10)}`
  const e = lang === 'zh'
    ? `${end.slice(5, 7)}/${end.slice(8, 10)}`
    : `${end.slice(5, 7)}/${end.slice(8, 10)}`
  return lang === 'zh' ? `${s} – ${e}` : `${s} – ${e}`
}

interface Props {
  event: SquashEvent
  lang: Locale
}

export default function EventCard({ event, lang }: Props) {
  const status = getEventStatus(event)
  const lv = LEVEL_CONFIG[event.level]
  const isPast = status === 'past'
  const isTbd = status === 'tbd'
  const isOngoing = status === 'ongoing'

  const borderColor = isPast ? '#E5E7EB' : isOngoing ? '#F97316' : lv.color

  return (
    <div style={{
      paddingLeft: 12, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
      opacity: isPast ? 0.45 : 1,
      borderLeft: `3px solid ${borderColor}`,
      background: isPast ? '#F9FAFB' : isOngoing ? '#FFF7ED' : '#FFFFFF',
      borderRadius: 8,
      borderTop: '1px solid #F3F4F6',
      borderBottom: '1px solid #F3F4F6',
      borderRight: '1px solid #F3F4F6',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
        <span style={{
          fontSize: 10, color: isOngoing ? '#22C55E' : status === 'upcoming' ? '#3B82F6' : status === 'tbd' ? '#EAB308' : '#9CA3AF',
          lineHeight: 1, flexShrink: 0,
        }}>●</span>

        <span style={{ fontSize: 11, fontWeight: 600, color: isPast ? '#9CA3AF' : lv.color }}>
          {lv.label[lang]}
        </span>

        {isTbd && (
          <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 20, background: '#FEF9C3', color: '#A16207', fontWeight: 500 }}>
            {lang === 'zh' ? '日期待定' : 'TBD'}
          </span>
        )}
        {isOngoing && (
          <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 20, background: '#FFF7ED', color: '#EA580C', fontWeight: 500, border: '1px solid #FED7AA' }}>
            {lang === 'zh' ? '进行中' : 'Ongoing'}
          </span>
        )}
        {isPast && (
          <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 20, background: '#F3F4F6', color: '#6B7280' }}>
            {lang === 'zh' ? '已结束' : 'Ended'}
          </span>
        )}

        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#D1D5DB', flexShrink: 0 }}>
          {event.organizer}
        </span>
      </div>

      {/* Event name */}
      <p style={{
        fontSize: 14, fontWeight: 600,
        color: isPast ? '#D1D5DB' : '#111827',
        margin: 0, marginBottom: 1, lineHeight: 1.4,
        textDecoration: isPast ? 'line-through' : 'none',
      }}>
        {lang === 'zh' ? event.name : event.nameEn}
      </p>

      {/* English name (show when in zh mode, smaller) */}
      {lang === 'zh' && (
        <p style={{
          fontSize: 11, color: isPast ? '#D1D5DB' : '#9CA3AF',
          margin: 0, marginBottom: 6, lineHeight: 1.3,
          textDecoration: isPast ? 'line-through' : 'none',
        }}>
          {event.nameEn}
        </p>
      )}

      {/* Bottom meta */}
      <div style={{ display: 'flex', gap: 14, fontSize: 12, color: isPast ? '#D1D5DB' : '#6B7280' }}>
        <span>📍 {event.location}</span>
        <span>📅 {fmtDate(event.startDate, event.endDate, lang)}</span>
      </div>
    </div>
  )
}
