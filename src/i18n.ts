export const zh = {
  siteTitle: '青少年壁球赛事',
  siteSubtitle: '2026 赛季 · 国内与国际赛事日历',
  filterAll: '全部',
  filterNational: '国家级',
  filterAsian: '亚洲级',
  filterInternational: '其他国',
  filterClub: '俱乐部',
  legendPast: '已结束',
  legendOngoing: '进行中',
  legendUpcoming: '即将开始',
  legendTbd: '日期待定',
  eventCount: '共 {n} 场赛事',
  noEvents: '暂无赛事',
  noEventsEmoji: '🏸',
  organizer: '主办',
  registerDeadline: '报名截止',
  sourceNote: '数据来源：src/data/events.ts',
  sourceHint: '如赛事日期有误或需新增赛事，请编辑数据文件后重新部署',

  // months
  monthNames: ['', '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'],
}

export const en = {
  siteTitle: 'Youth Squash Events',
  siteSubtitle: '2026 Season · National & International Calendar',
  filterAll: 'All',
  filterNational: 'National',
  filterAsian: 'Asian',
  filterInternational: 'International',
  filterClub: 'Club',
  legendPast: 'Ended',
  legendOngoing: 'Ongoing',
  legendUpcoming: 'Upcoming',
  legendTbd: 'TBD',
  eventCount: '{n} events',
  noEvents: 'No events',
  noEventsEmoji: '🏸',
  organizer: 'Organizer',
  registerDeadline: 'Reg. Deadline',
  sourceNote: 'Source: src/data/events.ts',
  sourceHint: 'To update, edit the data file and redeploy.',
  monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
}

export type Locale = 'zh' | 'en'
export const locales: { value: Locale; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'EN' },
]
