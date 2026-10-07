import { MatchData } from './types';

export const SAMPLE_MATCHES: Record<string, MatchData> = {
  closeThriller: {
    score: {
      teamA: {
        name: 'Auckland Aces',
        shortName: 'ACES',
        score: '214/4',
        overs: '20.0 ov',
      },
      teamB: {
        name: 'Canterbury Kings',
        shortName: 'KINGS',
        score: '211/9',
        overs: '20.0 ov',
      },
      resultSummary: 'Auckland Aces won by 3 runs (Last Over Thriller)',
      tournament: 'Super Smash T20 Championship 2026',
      venue: 'Eden Park, Auckland',
      date: 'OCT 07, 2026',
      matchStage: 'FINAL',
    },
    mvp: {
      name: 'LIAM RUTHERFORD',
      role: 'PLAYER OF THE MATCH',
      primaryStat: '104* (48b)',
      secondaryStat: '7x SIXES | 11x FOURS | SR 216.6',
      badge: 'CENTURY MASTERCLASS',
    },
    keyHighlights: [
      '104* off 48 balls by Rutherford',
      'Defended 9 runs in 20th Over',
      'Aces lift the 2026 Super Trophy',
    ],
    customBadge: 'INSTANT CLASSIC',
  },

  blowoutVictory: {
    score: {
      teamA: {
        name: 'Yorkshire Vikings',
        shortName: 'YOR',
        score: '242/3',
        overs: '20.0 ov',
      },
      teamB: {
        name: 'Lancashire Lightning',
        shortName: 'LAN',
        score: '138/10',
        overs: '16.2 ov',
      },
      resultSummary: 'Yorkshire won by 104 runs',
      tournament: 'Vitality Blast Roses Derby 2026',
      venue: 'Headingley, Leeds',
      date: 'SEP 19, 2026',
      matchStage: 'SEMI-FINAL',
    },
    mvp: {
      name: 'HARRY BROOK',
      role: 'CAPTAIN & RECORD BREAKER',
      primaryStat: '118 (52b)',
      secondaryStat: 'Tournament High Score',
      badge: 'RECORD BREAKER',
    },
    keyHighlights: [
      'Record 242 T20 total at Headingley',
      'Fastest hundred in Blast finals',
      'Bowled out opponents in 16.2 overs',
    ],
    customBadge: 'RECORD BREAKER',
  },

  lowScoringBattle: {
    score: {
      teamA: {
        name: 'Chennai Super Kings',
        shortName: 'CSK',
        score: '124/9',
        overs: '20.0 ov',
      },
      teamB: {
        name: 'Sunrisers Hyderabad',
        shortName: 'SRH',
        score: '118/10',
        overs: '19.4 ov',
      },
      resultSummary: 'Chennai won by 6 runs (Defensive Masterclass)',
      tournament: 'Premier League T20 2026',
      venue: 'Chepauk Stadium, Chennai',
      date: 'MAY 14, 2026',
      matchStage: 'PLAYOFFS',
    },
    mvp: {
      name: 'RAVINDRA JADEJA',
      role: 'PLAYER OF THE MATCH',
      primaryStat: '4/16 (4.0 ov)',
      secondaryStat: '16 Dot Balls | 2 Maidens',
      badge: 'DEFENSIVE MASTERCLASS',
    },
    keyHighlights: [
      'Chepauk turning pitch clinic',
      'Defended lowest total in 5 years',
      '16 dots bowled in middle overs',
    ],
    customBadge: 'DEFENSIVE MASTERCLASS',
  },
};
