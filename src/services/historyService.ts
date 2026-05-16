import { Crown, Shield, Map, ScrollText } from 'lucide-react';

export interface MonarchHistory {
  id: string;
  name: string;
  ipa: string;
  title: string;
  reign: string;
  dynasty: string;
  kingdom: 'England' | 'Scotland' | 'Wales' | 'Ireland' | 'United Kingdom';
  portrait: string;
  summary: string;
  linguisticImpact: string;
}

export const MONARCHY_HISTORY: MonarchHistory[] = [
  {
    id: 'charles-iii',
    name: 'Charles III',
    ipa: '/ˈtʃɑːlz ðə θɜːd/',
    title: 'King of the United Kingdom',
    reign: '2022 – Present',
    dynasty: 'Windsor',
    kingdom: 'United Kingdom',
    portrait: 'https://www.royal.uk/sites/default/files/images/monarch/king_charles_iii_official_portrait.jpg',
    summary: 'The current monarch of the United Kingdom and 14 other Commonwealth realms.',
    linguisticImpact: 'Upholds the contemporary standard of Received Pronunciation (RP) in formal discourse.'
  },
  {
    id: 'elizabeth-ii',
    name: 'Elizabeth II',
    ipa: '/ɪˈlɪzəbəθ ðə ˈsɛkənd/',
    title: 'Queen of the United Kingdom',
    reign: '1952 – 2022',
    dynasty: 'Windsor',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Queen_Elizabeth_II_in_March_2015.jpg',
    summary: 'The longest-reigning British monarch, whose reign spanned seven decades of immense social change.',
    linguisticImpact: 'Her "Queen\'s English" evolved from a very conservative RP to a slightly more modern standard over 70 years.'
  },
  {
    id: 'george-vi',
    name: 'George VI',
    ipa: '/dʒɔːdʒ ðə sɪksθ/',
    title: 'King of the United Kingdom',
    reign: '1936 – 1952',
    dynasty: 'Windsor',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/King_George_VI_pnt.jpg/600px-King_George_VI_pnt.jpg',
    summary: 'Led Britain through World War II, famously overcoming a speech impediment.',
    linguisticImpact: 'His public speeches are a study in overcoming dysfluency while maintaining phonetic precision.'
  },
  {
    id: 'edward-viii',
    name: 'Edward VIII',
    ipa: '/ˈɛdwəd ðə eɪtθ/',
    title: 'King of the United Kingdom',
    reign: '1936',
    dynasty: 'Windsor',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Edward_VIII_official_portrait.jpg/600px-Edward_VIII_official_portrait.jpg',
    summary: 'Abdicated the throne in 1936 before his coronation to marry Wallis Simpson.',
    linguisticImpact: 'His abdication speech is a benchmark for mid-century formal British prosody.'
  },
  {
    id: 'george-v',
    name: 'George V',
    ipa: '/dʒɔːdʒ ðə fɪfθ/',
    title: 'King of the United Kingdom',
    reign: '1910 – 1936',
    dynasty: 'Windsor',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/George_V_1911.jpg/600px-George_V_1911.jpg',
    summary: 'Changed the royal house name to Windsor in 1917 during World War I.',
    linguisticImpact: 'The King’s Christmas Message (1932) established the BBC broadcast as a standard for RP.'
  },
  {
    id: 'edward-vii',
    name: 'Edward VII',
    ipa: '/ˈɛdwəd ðə ˈsɛvənθ/',
    title: 'King of the United Kingdom',
    reign: '1901 – 1910',
    dynasty: 'Saxe-Coburg and Gotha',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/King_Edward_VII.jpg/600px-King_Edward_VII.jpg',
    summary: 'The Edwardian period is named after him, characterized by elegance and social mobility.',
    linguisticImpact: 'Spanned the transition between Victorian etiquette and modern social linguistics.'
  },
  {
    id: 'victoria',
    name: 'Victoria',
    ipa: '/vɪkˈtɔːriə/',
    title: 'Queen of the United Kingdom',
    reign: '1837 – 1901',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Queen_Victoria_by_Bassano.jpg/600px-Queen_Victoria_by_Bassano.jpg',
    summary: 'Her long reign gave its name to the Victorian era, overseeing imperial expansion.',
    linguisticImpact: 'The era saw the stabilization of Received Pronunciation as a prestige marker in the British class system.'
  },
  {
    id: 'william-iv',
    name: 'William IV',
    ipa: '/ˈwɪljəm ðə fɔːθ/',
    title: 'King of the United Kingdom',
    reign: '1830 – 1837',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sir_Martin_Archer_Shee_-_King_William_IV.jpg/600px-Sir_Martin_Archer_Shee_-_King_William_IV.jpg',
    summary: 'His reign saw major reform, including the Reform Act 1832.',
    linguisticImpact: 'Mid-Hanoverian English began showing significant vowel shifts towards modern standards.'
  },
  {
    id: 'george-iv',
    name: 'George IV',
    ipa: '/dʒɔːdʒ ðə fɔːθ/',
    title: 'King of the United Kingdom',
    reign: '1820 – 1830',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/George_IV_of_the_United_Kingdom.jpg/600px-George_IV_of_the_United_Kingdom.jpg',
    summary: 'Known for his extravagant lifestyle and leading the Regency era.',
    linguisticImpact: 'The Regency era defined a specific refined idiolect among the British aristocracy.'
  },
  {
    id: 'george-iii',
    name: 'George III',
    ipa: '/dʒɔːdʒ ðə θɜːd/',
    title: 'King of Great Britain and Ireland',
    reign: '1760 – 1820',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_III_by_Allan_Ramsay.jpg/600px-George_III_by_Allan_Ramsay.jpg',
    summary: 'Reigned during the American Revolution and the Napoleonic Wars.',
    linguisticImpact: 'The first Hanoverian king to speak English as his primary language since birth.'
  },
  {
    id: 'george-ii',
    name: 'George II',
    ipa: '/dʒɔːdʒ ðə ˈsɛkənd/',
    title: 'King of Great Britain and Ireland',
    reign: '1727 – 1760',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/George_II_%28by_John_Shackleton%29.jpg/600px-George_II_%28by_John_Shackleton%29.jpg',
    summary: 'The last British monarch born outside Great Britain.',
    linguisticImpact: 'His reign oversaw the early consolidation of the London-centric prestige dialect.'
  },
  {
    id: 'george-i',
    name: 'George I',
    ipa: '/dʒɔːdʒ ðə fɜːst/',
    title: 'King of Great Britain and Ireland',
    reign: '1714 – 1727',
    dynasty: 'Hanover',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/George_I_1714.jpg/600px-George_I_1714.jpg',
    summary: 'The first Hanoverian monarch of Britain.',
    linguisticImpact: 'His arrival from Hanover influenced the court culture and the use of German alongside English.'
  },
  {
    id: 'anne',
    name: 'Anne',
    ipa: '/æn/',
    title: 'Queen of Great Britain and Ireland',
    reign: '1702 – 1714',
    dynasty: 'Stuart',
    kingdom: 'United Kingdom',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Queen_Anne_by_Michael_Dahl.jpg/600px-Queen_Anne_by_Michael_Dahl.jpg',
    summary: 'First monarch of Great Britain after the Acts of Union in 1707.',
    linguisticImpact: 'Significant for the political and linguistic unification of England and Scotland.'
  },
  {
    id: 'mary-scots',
    name: 'Mary, Queen of Scots',
    ipa: '/ˈmɛəri kwiːn əv skɒts/',
    title: 'Queen of Scotland',
    reign: '1542 – 1567',
    dynasty: 'Stuart',
    kingdom: 'Scotland',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mary_Queen_of_Scots_after_Nicholas_Hilliard.jpg/600px-Mary_Queen_of_Scots_after_Nicholas_Hilliard.jpg',
    summary: 'The only surviving legitimate child of James V, she reigned over Scotland during a period of religious turmoil.',
    linguisticImpact: 'Her speech reflected the distinct Middle Scots dialect, the prestige language of the Scottish court.'
  },
  {
    id: 'alfred-great',
    name: 'Alfred the Great',
    ipa: '/ˈælfrɪd ðə ɡreɪt/',
    title: 'King of the West Saxons',
    reign: '871 – 899',
    dynasty: 'Wessex',
    kingdom: 'England',
    portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/King_Alfred_the_Great_portrait.jpg/600px-King_Alfred_the_Great_portrait.jpg',
    summary: 'Successfully defended his kingdom against the Viking attempt at conquest.',
    linguisticImpact: 'Patron of Old English literature, preserving the West Saxon dialect.'
  }
];
