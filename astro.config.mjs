import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://reroll.in',
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/chat': 'https://discord.gg/E9hkudX',
    '/whatsapp': 'https://chat.whatsapp.com/JoR76GJQyRsG109JPTKqDq',
    '/bgg': 'https://www.boardgamegeek.com/guild/2791',
    '/wiki': 'https://reroll-games.getoutline.com/',
    '/market': 'https://t.me/joinchat/JeVT-kohl-9tb9WaDi9Xsg',
    '/assets': 'https://drive.google.com/drive/folders/1boKzUP6SFjdLk61gymGP5qd_OrsEPZ-e',
    '/pride': 'https://forum.reroll.in/t/dungeons-dragons-a-pride-fundraiser-sunday-august-7th-indiranagar-bangalore/1292',
    '/tt': 'https://forum.reroll.in/t/tabletop-thursday-every-week-underline-center-indiranagar/1930',
    '/ittd': 'https://forum.reroll.in/t/international-tabletop-day-2024-june-1st-underline-center-indiranagar/2031',
    '/giveaway': 'https://forum.reroll.in/t/were-giving-away-a-brand-new-copy-of-azul-summer-pavilion/938',
    '/loorou': 'https://discord.gg/bZBWjMr',
    '/critter': 'https://discord.gg/E9hkudX',
    '/critters': 'https://discord.gg/E9hkudX',
    '/halloween': 'https://forum.reroll.in/t/monsters-madness-halloween-special-saturday-sunday-29-30-october-indiranagar-bangalore/1392',
    '/say': 'https://docs.google.com/forms/d/e/1FAIpQLSfwKX9YNH2F17ocii1ZFqrfv5k9EcDOl1JOlONNLjTo3oNEQw/viewform',
    '/hcw': 'https://insider.in/heavy-cardboard-wednesday-with-reroll-board-games-2020/event',
    '/ss': 'https://insider.in/dnd-keyforge-board-games-reroll-dec1-2019/event'
  }
});
