import type { EventLevel } from '../types'
import type { Locale } from '../i18n'

type Filter = 'all' | EventLevel

const FILTERS = (lang: Locale) => [
  { value: 'all' as Filter, label: lang === 'zh' ? '全部' : 'All' },
  { value: 'national' as Filter, label: lang === 'zh' ? '国家级' : 'National' },
  { value: 'asian' as Filter, label: lang === 'zh' ? '亚洲级' : 'Asian' },
  { value: 'international' as Filter, label: lang === 'zh' ? '其他国' : 'International' },
  { value: 'club' as Filter, label: lang === 'zh' ? '俱乐部' : 'Club' },
]

interface Props {
  active: Filter
  onChange: (f: Filter) => void
  lang: Locale
}

export default function FilterBar({ active, onChange, lang }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {FILTERS(lang).map(f => {
        const isActive = active === f.value
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            style={{
              padding: '6px 16px', borderRadius: 9999, fontSize: 13, fontWeight: 500,
              border: isActive ? '1.5px solid #111827' : '1.5px solid #E5E7EB',
              background: isActive ? '#111827' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : '#6B7280',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
