/**
 * Marvel Wikia Character Image Downloader
 * Fetches character artwork from Marvel Fandom API and saves directly to frontend/public.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'frontend/public');

const characters = [
  { file: 'silk.png', queries: ['Cindy Moon (Earth-616)', 'Silk'] },
  { file: 'spider-ham.png', queries: ['Peter Porker (Earth-8311)', 'Spider-Ham'] },
  { file: 'peni-parker.png', queries: ['Peni Parker (Earth-14512)', 'SP//dr (Suit)'] },
  { file: 'the-spot.png', queries: ['Jonathan Ohnn (Earth-616)', 'The Spot'] },
  { file: 'spider-woman.png', queries: ['Jessica Drew (Earth-616)', 'Spider-Woman'] },
  { file: 'madame-web.png', queries: ['Cassandra Webb (Earth-616)', 'Madame Web'] },
  { file: 'ben-reilly.png', queries: ['Benjamin Reilly (Earth-616)', 'Scarlet Spider'] },
  { file: 'kaine-parker.png', queries: ['Kaine Parker (Earth-616)', 'Scarlet Spider (Kaine)'] },
  { file: 'superior-spiderman.png', queries: ['Otto Octavius (Earth-616)', 'Superior Spider-Man'] },
  { file: 'agent-venom.png', queries: ['Eugene Thompson (Earth-616)', 'Agent Venom'] },
  { file: 'toxin.png', queries: ['Patrick Mulligan (Earth-616)', 'Toxin (Symbiote)'] },
  { file: 'anti-venom.png', queries: ['Edward Brock (Earth-616)', 'Anti-Venom (Symbiote)'] },
  { file: 'shocker.png', queries: ['Herman Schultz (Earth-616)', 'Shocker'] },
  { file: 'tombstone.png', queries: ['Lonnie Lincoln (Earth-616)', 'Tombstone'] },
  { file: 'hydro-man.png', queries: ['Morris Bench (Earth-616)', 'Hydro-Man'] },
  { file: 'apocalypse.png', queries: ['En Sabah Nur (Earth-616)', 'Apocalypse'] },
  { file: 'mister-sinister.png', queries: ['Nathaniel Essex (Earth-616)', 'Mister Sinister'] },
  { file: 'emma-frost.png', queries: ['Emma Frost (Earth-616)', 'Emma Frost'] },
  { file: 'magik.png', queries: ['Illyana Rasputina (Earth-616)', 'Magik'] },
  { file: 'jubilee.png', queries: ['Jubilation Lee (Earth-616)', 'Jubilee'] },
  { file: 'sunspot.png', queries: ['Roberto da Costa (Earth-616)', 'Sunspot'] },
  { file: 'cannonball.png', queries: ['Samuel Guthrie (Earth-616)', 'Cannonball'] },
  { file: 'mirage.png', queries: ['Danielle Moonstar (Earth-616)', 'Mirage (Danielle Moonstar)'] },
  { file: 'wolfsbane.png', queries: ['Rahne Sinclair (Earth-616)', 'Wolfsbane'] },
  { file: 'warlock-mutant.png', queries: ['Warlock (Technarchy) (Earth-616)', 'Warlock (Technarchy)'] },
  { file: 'forge.png', queries: ['Forge (Earth-616)', 'Forge'] },
  { file: 'dazzler.png', queries: ['Alison Blaire (Earth-616)', 'Dazzler'] },
  { file: 'longshot.png', queries: ['Longshot (Mojoverse) (Earth-616)', 'Longshot'] },
  { file: 'legion.png', queries: ['David Haller (Earth-616)', 'Legion'] },
  { file: 'hope-summers.png', queries: ['Hope Summers (Earth-616)', 'Hope Summers'] },
  { file: 'x-man.png', queries: ['Nate Grey (Earth-295)', 'X-Man'] },
  { file: 'omega-red.png', queries: ['Arkady Rossovich (Earth-616)', 'Omega Red'] },
  { file: 'sebastian-shaw.png', queries: ['Sebastian Shaw (Earth-616)', 'Sebastian Shaw'] },
  { file: 'blob.png', queries: ['Frederick Dukes (Earth-616)', 'Blob'] },
  { file: 'avalanche.png', queries: ['Dominicos Petrakis (Earth-616)', 'Avalanche'] },
  { file: 'destiny.png', queries: ['Irene Adler (Earth-616)', 'Destiny'] },
  { file: 'callisto.png', queries: ['Callisto (Earth-616)', 'Callisto'] },
  { file: 'warpath.png', queries: ['James Proudstar (Earth-616)', 'Warpath'] },
  { file: 'sunfire.png', queries: ['Shiro Yoshida (Earth-616)', 'Sunfire'] },
  { file: 'armor.png', queries: ['Hisako Ichiki (Earth-616)', 'Armor'] },
  { file: 'living-tribunal.png', queries: ['Living Tribunal (Multiverse)', 'Living Tribunal'] },
  { file: 'eternity.png', queries: ['Eternity (Abstract Entity)', 'Eternity'] },
  { file: 'infinity-entity.png', queries: ['Infinity (Abstract Entity)', 'Infinity'] },
  { file: 'beyonder.png', queries: ['Beyonder (Realms Beyond)', 'Beyonder'] },
  { file: 'arishem.png', queries: ['Arishem (Earth-616)', 'Arishem the Judge'] },
  { file: 'eson.png', queries: ['Eson (Earth-616)', 'Eson the Searcher'] },
  { file: 'lady-death.png', queries: ['Death (Abstract Entity)', 'Death (Cosmic Entity)'] },
  { file: 'knull.png', queries: ['Knull (Earth-616)', 'Knull'] },
  { file: 'annihilus.png', queries: ['Annihilus (Negative Zone)', 'Annihilus'] },
  { file: 'gladiator.png', queries: ['Kallark (Earth-616)', 'Gladiator (Kallark)'] },
  { file: 'super-skrull.png', queries: ['Kl\'rt (Earth-616)', 'Super-Skrull'] },
  { file: 'mar-vell.png', queries: ['Mar-Vell (Earth-616)', 'Captain Marvel (Mar-Vell)'] },
  { file: 'quasar.png', queries: ['Wendell Vaughn (Earth-616)', 'Quasar'] },
  { file: 'phyla-vell.png', queries: ['Phyla-Vell (Earth-616)', 'Phyla-Vell'] },
  { file: 'moondragon.png', queries: ['Heather Douglas (Earth-616)', 'Moondragon'] },
  { file: 'bug.png', queries: ['Bug (Microverse) (Earth-616)', 'Bug'] },
  { file: 'genis-vell.png', queries: ['Genis-Vell (Earth-616)', 'Genis-Vell'] },
  { file: 'love.png', queries: ['Love (Earth-199999)', 'Love (Thor)'] },
  { file: 'wiccan.png', queries: ['William Kaplan (Earth-616)', 'Wiccan'] },
  { file: 'speed.png', queries: ['Thomas Shepherd (Earth-616)', 'Speed'] },
  { file: 'hulkling.png', queries: ['Dorrek VIII (Earth-616)', 'Hulkling'] },
  { file: 'iron-lad.png', queries: ['Nathaniel Richards (Iron Lad) (Earth-6311)', 'Iron Lad'] },
  { file: 'amadeus-cho.png', queries: ['Amadeus Cho (Earth-616)', 'Brawn'] },
  { file: 'skaar.png', queries: ['Skaar (Earth-616)', 'Skaar'] },
  { file: 'nico-minoru.png', queries: ['Nico Minoru (Earth-616)', 'Nico Minoru'] },
  { file: 'karolina-dean.png', queries: ['Karolina Dean (Earth-616)', 'Karolina Dean'] },
  { file: 'chase-stein.png', queries: ['Chase Stein (Earth-616)', 'Chase Stein'] },
  { file: 'molly-hayes.png', queries: ['Molly Hayes (Earth-616)', 'Molly Hayes'] },
  { file: 'blue-marvel.png', queries: ['Adam Brashear (Earth-616)', 'Blue Marvel'] },
  { file: 'captain-britain.png', queries: ['Brian Braddock (Earth-616)', 'Captain Britain'] },
  { file: 'tigra.png', queries: ['Greer Grant (Earth-616)', 'Tigra'] },
  { file: 'white-tiger.png', queries: ['Ava Ayala (Earth-616)', 'White Tiger'] },
  { file: 'swordsman.png', queries: ['Jacques Duquesne (Earth-616)', 'Swordsman'] },
  { file: 'mockingbird.png', queries: ['Barbara Morse (Earth-616)', 'Mockingbird'] },
  { file: 'hellcat.png', queries: ['Patricia Walker (Earth-616)', 'Hellcat'] },
  { file: 'colleen-wing.png', queries: ['Colleen Wing (Earth-616)', 'Colleen Wing'] },
  { file: 'misty-knight.png', queries: ['Mercedes Knight (Earth-616)', 'Misty Knight'] },
  { file: 'stick.png', queries: ['Stick (Earth-616)', 'Stick'] },
  { file: 'hit-monkey.png', queries: ['Hit-Monkey (Earth-616)', 'Hit-Monkey'] },
  { file: 'jack-of-hearts.png', queries: ['Jack Hart (Earth-616)', 'Jack of Hearts'] },
  { file: 'rick-jones.png', queries: ['Richard Jones (Earth-616)', 'A-Bomb'] },
  { file: 'doc-samson.png', queries: ['Leonard Samson (Earth-616)', 'Doc Samson'] },
  { file: 'betty-ross.png', queries: ['Elizabeth Ross (Earth-616)', 'Red She-Hulk'] },
  { file: 'union-jack.png', queries: ['Joseph Chapman (Earth-616)', 'Union Jack'] },
  { file: 'spitfire.png', queries: ['Jacqueline Falsworth (Earth-616)', 'Spitfire'] },
  { file: 'danny-ketch.png', queries: ['Daniel Ketch (Earth-616)', 'Ghost Rider (Daniel Ketch)'] },
  { file: 'daimon-hellstrom.png', queries: ['Daimon Hellstrom (Earth-616)', 'Hellstorm'] },
  { file: 'satana.png', queries: ['Satana Hellstrom (Earth-616)', 'Satana'] },
  { file: 'jennifer-kale.png', queries: ['Jennifer Kale (Earth-616)', 'Jennifer Kale'] },
  { file: 'lilia-calderu.png', queries: ['Lilia Calderu (Earth-616)', 'Lilia Calderu (Earth-199999)'] },
  { file: 'alice-wu.png', queries: ['Alice Wu-Gulliver (Earth-616)', 'Alice Gulliver (Earth-199999)'] },
  { file: 'dracula.png', queries: ['Vlad Dracula (Earth-616)', 'Dracula'] },
  { file: 'deacon-frost.png', queries: ['Deacon Frost (Earth-616)', 'Deacon Frost'] },
  { file: 'the-leader.png', queries: ['Samuel Sterns (Earth-616)', 'Leader (Samuel Sterns)'] },
  { file: 'baron-strucker.png', queries: ['Wolfgang von Strucker (Earth-616)', 'Baron Strucker'] },
  { file: 'madame-hydra.png', queries: ['Ophelia Sarkissian (Earth-616)', 'Viper (Ophelia Sarkissian)'] },
  { file: 'songbird.png', queries: ['Melissa Gold (Earth-616)', 'Songbird'] },
  { file: 'moonstone.png', queries: ['Karla Sofen (Earth-616)', 'Moonstone'] },
  { file: 'crimson-dynamo.png', queries: ['Dimitri Bukharin (Earth-616)', 'Crimson Dynamo'] },
  { file: 'typhoid-mary.png', queries: ['Mary Walker (Earth-616)', 'Typhoid Mary'] }
];

async function getImage(title) {
  try {
    const url = 'https://marvel.fandom.com/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=1000';
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    return pages[pageId]?.thumbnail?.source;
  } catch (e) {
    return null;
  }
}

async function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  console.log(`Starting download of ${characters.length} characters to ${PUBLIC_DIR}...`);
  let successCount = 0;
  for (let i = 0; i < characters.length; i++) {
    const c = characters[i];
    const targetFile = path.join(PUBLIC_DIR, c.file);
    if (fs.existsSync(targetFile)) {
      console.log(`[${i + 1}/${characters.length}] Exists: ${c.file}`);
      successCount++;
      continue;
    }

    let found = null;
    for (const q of c.queries) {
      found = await getImage(q);
      if (found) break;
    }
    if (!found) {
      try {
        const searchWord = c.queries[0].split(' ')[0].replace(/[^a-zA-Z]/g, '');
        const searchUrl = 'https://marvel.fandom.com/api.php?action=opensearch&search=' + encodeURIComponent(searchWord) + '&limit=5&format=json';
        const sRes = await fetch(searchUrl);
        const sData = await sRes.json();
        if (sData[1] && sData[1].length > 0) {
          for (const cand of sData[1]) {
            found = await getImage(cand);
            if (found) break;
          }
        }
      } catch (e) {}
    }

    if (found) {
      try {
        const imgRes = await fetch(found);
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(targetFile, Buffer.from(buffer));
        successCount++;
        console.log(`[${i + 1}/${characters.length}] Saved ${c.file} (${buffer.byteLength} bytes)`);
      } catch (e) {
        console.error(`Error saving ${c.file}:`, e);
      }
    } else {
      console.log(`[${i + 1}/${characters.length}] NOT FOUND: ${c.file}`);
    }
  }
  console.log(`\nFinished: ${successCount}/${characters.length} images saved.`);
}

run();
