import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Soft sage paper ribbons: pale mist by day, deep forest by night.
const { theme, problems } = makeColors({
  label: 'Sage ribbons',
  roles: { accent: '#2f6338', danger: '#a63c30', success: '#3d7030', warning: '#a77a1c', pro: '#5f6f9a' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#d3dccc',
        'surface-1': '#dde5d6',
        'surface-2': '#e8eee2',
        'text-primary': '#1c2b1f',
        'text-secondary': '#3a4d3d',
        'text-muted': '#4f6352',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#141d16',
        'surface-1': '#1a251c',
        'surface-2': '#202d22',
        'surface-3': '#263428',
        'text-primary': '#e6efe1',
        'text-secondary': '#c2d1bd',
        'text-muted': '#9fb39b',
      },
    },
  },
})

// Layered ribbons curling in from two corners, swaying very slowly.
const ribbon = (cls: string, d: string) => `<path class="${cls}" d="${d}"/>`

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .bg { fill: #c9d3c2; }
  .r1 { fill: #b9d4a2; } .r2 { fill: #9cc58a; } .r3 { fill: #7aa970; }
  .r4 { fill: #568a55; } .r5 { fill: #33603a; } .r6 { fill: #1f3d25; }
  .edge { fill: none; stroke: #e4f0d6; stroke-width: 2; opacity: 0.55; }
  .a { transform-origin: 1600px 1000px; animation: sway 38s ease-in-out infinite alternate; }
  .b { transform-origin: 0px 0px; animation: sway2 46s ease-in-out infinite alternate; }
  .a .l2, .b .l2 { animation: drift 29s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
  @keyframes sway { from { transform: rotate(-1.5deg) scale(1); } to { transform: rotate(2deg) scale(1.03); } }
  @keyframes sway2 { from { transform: rotate(1.5deg); } to { transform: rotate(-2deg) scale(1.02); } }
  @keyframes drift { from { transform: translate(0px, 0px); } to { transform: translate(-14px, 10px); } }
  @media (prefers-color-scheme: dark) {
    .bg { fill: #101812; }
    .r1 { fill: #2b4a30; } .r2 { fill: #24402a; } .r3 { fill: #1e3623; }
    .r4 { fill: #182d1d; } .r5 { fill: #132418; } .r6 { fill: #0c1910; }
    .edge { stroke: #6f9a68; opacity: 0.35; }
  }
</style>
<rect class="bg" width="1600" height="1000"/>
<g class="a">
  ${ribbon('r1', 'M1600 380 C1380 360 1150 520 1120 760 C1100 900 1180 1000 1180 1000 L1600 1000 Z')}
  ${ribbon('r2', 'M1600 450 C1420 440 1230 570 1210 780 C1195 910 1260 1000 1260 1000 L1600 1000 Z')}
  <g class="l2">
  ${ribbon('r3', 'M1600 520 C1460 520 1310 620 1300 800 C1292 920 1340 1000 1340 1000 L1600 1000 Z')}
  ${ribbon('r4', 'M1600 600 C1500 600 1390 680 1385 830 C1380 930 1420 1000 1420 1000 L1600 1000 Z')}
  </g>
  ${ribbon('r5', 'M1600 690 C1540 690 1470 740 1468 860 C1466 940 1495 1000 1495 1000 L1600 1000 Z')}
  ${ribbon('r6', 'M1600 790 C1570 790 1540 830 1540 900 C1540 960 1555 1000 1555 1000 L1600 1000 Z')}
  <path class="edge" d="M1600 380 C1380 360 1150 520 1120 760 C1100 900 1180 1000 1180 1000"/>
  <path class="edge" d="M1600 520 C1460 520 1310 620 1300 800 C1292 920 1340 1000 1340 1000"/>
  <path class="edge" d="M1600 690 C1540 690 1470 740 1468 860 C1466 940 1495 1000 1495 1000"/>
</g>
<g class="b">
  ${ribbon('r1', 'M0 520 C180 540 360 420 400 220 C425 90 360 0 360 0 L0 0 Z')}
  ${ribbon('r2', 'M0 440 C150 450 290 360 315 200 C330 90 280 0 280 0 L0 0 Z')}
  <g class="l2">
  ${ribbon('r3', 'M0 360 C120 360 220 290 235 170 C245 80 205 0 205 0 L0 0 Z')}
  </g>
  ${ribbon('r4', 'M0 280 C90 280 160 230 168 140 C174 70 145 0 145 0 L0 0 Z')}
  ${ribbon('r5', 'M0 200 C60 200 105 165 110 105 C114 55 92 0 92 0 L0 0 Z')}
  <path class="edge" d="M0 520 C180 540 360 420 400 220 C425 90 360 0 360 0"/>
  <path class="edge" d="M0 360 C120 360 220 290 235 170 C245 80 205 0 205 0"/>
</g>
</svg>`

const BASE: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'sage-ribbons', glass: false },
}

const LOOK: ThemeSetArgs = {
  ...BASE,
  style: {
    UserMessage: { backgroundColor: 'surface-2', radius: 18, paddingX: 14, paddingY: 10 },
    AssistantMessage: { backgroundColor: 'surface-1', radius: 18, padding: 14 },
    ToolUse: { backgroundColor: 'surface-1', radius: 10, paddingX: 8 },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    let set
    try {
      set = await $.theme.set(LOOK)
    } catch (error) {
      $.ui.log(String(error))
      set = await $.theme.set(BASE)
    }
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Soft sage paper ribbons curling slowly in from two corners" />
  })
}
