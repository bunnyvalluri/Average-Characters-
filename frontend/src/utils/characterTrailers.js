// src/utils/characterTrailers.js
// Universal Marvel HD Trailer Resolver for all 1,000 characters

export const TRAILER_PRESETS = {
  ENDGAME: {
    id: 'TcMBFSGVi1c',
    title: 'Marvel Studios\' Avengers: Endgame - Official Trailer',
    category: 'Avengers'
  },
  INFINITY_WAR: {
    id: '6ZfuNTqbHE8',
    title: 'Marvel Studios\' Avengers: Infinity War - Official Trailer',
    category: 'Avengers / Cosmic'
  },
  DEADPOOL_WOLVERINE: {
    id: '73_1biulkYk',
    title: 'Marvel Studios\' Deadpool & Wolverine - Official Trailer',
    category: 'Mutants / Multiverse'
  },
  XMEN_97: {
    id: 'pv3Ss8o9Au4',
    title: 'Marvel Animation\'s X-Men \'97 - Official Trailer',
    category: 'X-Men & Mutants'
  },
  SPIDER_VERSE: {
    id: 'cqGjhVJWtEg',
    title: 'Spider-Man: Across the Spider-Verse - Official Trailer',
    category: 'Spider-Verse'
  },
  SPIDERMAN_NWH: {
    id: 't06RUxP0rHY',
    title: 'Spider-Man: No Way Home - Official Trailer',
    category: 'Spider-Man'
  },
  FANTASTIC_FOUR: {
    id: '18QQWa577tA',
    title: 'Marvel Studios\' The Fantastic Four: First Steps - Official Teaser',
    category: 'Fantastic Four'
  },
  MULTIVERSE_OF_MADNESS: {
    id: 'aWzlQ2N6qqg',
    title: 'Doctor Strange in the Multiverse of Madness - Official Trailer',
    category: 'Mystic & Multiverse'
  },
  WAKANDA_FOREVER: {
    id: '_Z3QKkl1WyM',
    title: 'Marvel Studios\' Black Panther: Wakanda Forever - Official Trailer',
    category: 'Wakanda'
  },
  GUARDIANS_3: {
    id: 'u3V5KDHRQvk',
    title: 'Marvel Studios\' Guardians of the Galaxy Vol. 3 - Official Trailer',
    category: 'Guardians'
  },
  THUNDERBOLTS: {
    id: 'v-94Snw-H4o',
    title: 'Marvel Studios\' Thunderbolts* - Official Teaser Trailer',
    category: 'Thunderbolts'
  },
  BRAVE_NEW_WORLD: {
    id: '1pHDWnXmK7Y',
    title: 'Captain America: Brave New World - Official Trailer',
    category: 'Captain America / Red Hulk'
  },
  LOKI_S2: {
    id: 'dug56u8NN7g',
    title: 'Marvel Studios\' Loki Season 2 - Official Trailer',
    category: 'TVA & Multiverse'
  },
  WANDAVISION: {
    id: 'UBhlqeX48_o',
    title: 'Marvel Studios\' WandaVision - Official Trailer',
    category: 'Scarlet Witch & Vision'
  },
  AGATHA_ALL_ALONG: {
    id: 'R9P6e0V4_Mg',
    title: 'Marvel Television\'s Agatha All Along - Official Trailer',
    category: 'Coven & Magic'
  },
  DAREDEVIL_BORN_AGAIN: {
    id: 'j_XQ9qZ7YjU',
    title: 'Marvel Television\'s Daredevil: Born Again - Official Trailer',
    category: 'Street Level Heroes'
  },
  SHANG_CHI: {
    id: 'giWIr7U1deA',
    title: 'Marvel Studios\' Shang-Chi and the Legend of the Ten Rings',
    category: 'Martial Arts & Magic'
  },
  MOON_KNIGHT: {
    id: 'x7Krla_UxRg',
    title: 'Marvel Studios\' Moon Knight - Official Trailer',
    category: 'Egyptian Gods & Vigilantes'
  },
  ETERNALS: {
    id: '0WVDKZJkGlY',
    title: 'Marvel Studios\' Eternals - Final Trailer',
    category: 'Eternals & Celestials'
  },
  THE_MARVELS: {
    id: '0LHxtWgkCgy',
    title: 'Marvel Studios\' The Marvels - Official Trailer',
    category: 'Cosmic Heroes'
  },
  SHE_HULK: {
    id: 'gim2kPrCmx4',
    title: 'Marvel Studios\' She-Hulk: Attorney at Law - Official Trailer',
    category: 'Gamma & Legal'
  },
  WEREWOLF_BY_NIGHT: {
    id: 'bLEFqhS5WmI',
    title: 'Marvel Studios\' Werewolf by Night - Official Trailer',
    category: 'Midnight Sons & Horror'
  },
  IRON_MAN_1: {
    id: '8ugaeA-nMTc',
    title: 'Marvel Studios\' Iron Man - Official Trailer',
    category: 'Iron Man'
  },
  THOR_1: {
    id: 'JOddp-nlNvQ',
    title: 'Marvel Studios\' Thor - Official Trailer',
    category: 'Asgard'
  },
  CAPTAIN_AMERICA_1: {
    id: 'JerVrbLldXw',
    title: 'Captain America: The First Avenger - Official Trailer',
    category: 'Captain America'
  }
};

/**
 * Returns a high-definition, verified trailer ID and title for any Marvel character
 * @param {Object} character - Character object
 * @returns {{ id: string, title: string, category: string }}
 */
export function getCharacterTrailer(character) {
  if (!character) return TRAILER_PRESETS.ENDGAME;

  // 1. If explicit trailerId is set on character
  if (character.trailerId) {
    return {
      id: character.trailerId,
      title: character.trailerTitle || `${character.name} - Official Spotlight & Trailer`,
      category: 'Marvel Spotlight'
    };
  }

  const name = (character.name || '').toLowerCase();
  const orig = (character.originalName || '').toLowerCase();
  const desc = (character.description || '').toLowerCase();
  const powers = (character.powers || '').toLowerCase();

  // 2. Deadpoool & Wolverine / Void / Fox Mutants
  if (
    name.includes('deadpool') || name.includes('wolverine') || name.includes('logan') ||
    name.includes('cassandra nova') || name.includes('x-23') || name.includes('laura kinney') ||
    name.includes('gambit') || name.includes('blade') || name.includes('elektra') ||
    name.includes('pyro') || name.includes('sabretooth') || name.includes('lady deathstrike') ||
    name.includes('juggernaut') || name.includes('weapon h') || name.includes('clayton cortez') ||
    name.includes('broo') || name.includes('kid gladiator') || name.includes('eye-boy') ||
    name.includes('nature girl') || name.includes('shark-girl') || name.includes('solemn')
  ) {
    return {
      id: TRAILER_PRESETS.DEADPOOL_WOLVERINE.id,
      title: `${character.name} • Deadpool & Wolverine Official Trailer`,
      category: 'Mutants & Multiverse'
    };
  }

  // 3. X-Men, Mutants, Krakoa, Arakko, Excalibur, Shi'ar, Hellfire, Brotherhood, Morlocks
  if (
    name.includes('x-men') || name.includes('mutant') || name.includes('cyclops') ||
    name.includes('jean grey') || name.includes('storm') || name.includes('professor x') ||
    name.includes('magneto') || name.includes('rogue') || name.includes('beast') ||
    name.includes('iceman') || name.includes('colossus') || name.includes('nightcrawler') ||
    name.includes('angel') || name.includes('archangel') || name.includes('bishop') ||
    name.includes('cable') || name.includes('forge') || name.includes('emma frost') ||
    name.includes('magik') || name.includes('sunspot') || name.includes('cannonball') ||
    name.includes('mirage') || name.includes('jubilee') || name.includes('havok') ||
    name.includes('polaris') || name.includes('banshee') || name.includes('dazzler') ||
    name.includes('psylocke') || name.includes('domino') || name.includes('apocalypse') ||
    name.includes('sinister') || name.includes('omega red') || name.includes('shaw') ||
    name.includes('blob') || name.includes('avalanche') || name.includes('destiny') ||
    name.includes('callisto') || name.includes('sauron') || name.includes('mojo') ||
    name.includes('spiral') || name.includes('stryfe') || name.includes('nimrod') ||
    name.includes('bastion') || name.includes('sentinel') || name.includes('master mold') ||
    name.includes('isca') || name.includes('genesis') || name.includes('tarn') ||
    name.includes('bei') || name.includes('redroot') || name.includes('greycrow') ||
    name.includes('arclight') || name.includes('harpoon') || name.includes('riptide') ||
    name.includes('blockbuster') || name.includes('scrambler') || name.includes('erg') ||
    name.includes('leech') || name.includes('artie') || name.includes('gateway') ||
    name.includes('stacy x') || name.includes('indra') || name.includes('loa') ||
    name.includes('match') || name.includes('bling') || name.includes('trance') ||
    name.includes('graymalkin') || name.includes('onyxx') || name.includes('triage') ||
    name.includes('benjamin deeds') || name.includes('hijack') || name.includes('starbolt') ||
    name.includes('fang') || name.includes('nightside') || name.includes('flashfire') ||
    name.includes('mentor') || name.includes('plutonia') || name.includes('earthquake') ||
    name.includes('hussar') || name.includes('astra') || name.includes('scintilla') ||
    name.includes('meggan') || name.includes('captain britain') || name.includes('cerise') ||
    name.includes('kylun') || name.includes('micromax') || name.includes('thunderbird') ||
    name.includes('sym') || name.includes('nastirh') || desc.includes('mutant') || desc.includes('x-men')
  ) {
    return {
      id: TRAILER_PRESETS.XMEN_97.id,
      title: `${character.name} • Marvel's X-Men '97 Official Showcase`,
      category: 'X-Men & Mutants'
    };
  }

  // 4. Spider-Verse & Multiverse Web-Warriors
  if (
    name.includes('spider-man') || name.includes('spiderman') || name.includes('spider-gwen') ||
    name.includes('miles morales') || name.includes('spider-punk') || name.includes('spider-woman') ||
    name.includes('spider-ham') || name.includes('peni parker') || name.includes('silk') ||
    name.includes('the spot') || name.includes('spider-noir') || name.includes('pavitr') ||
    name.includes('miguel o\'hara') || name.includes('ben reilly') || name.includes('kaine') ||
    name.includes('madame web') || name.includes('shriek') || name.includes('doppelganger') ||
    name.includes('jackal') || name.includes('vermin') || name.includes('carrion') ||
    name.includes('jack o\'lantern') || name.includes('carnage') || name.includes('venom') ||
    name.includes('tombstone') || name.includes('shocker') || name.includes('hydro-man') ||
    name.includes('chameleon') || name.includes('mysterio') || name.includes('vulture') ||
    name.includes('electro') || name.includes('sandman') || name.includes('lizard') ||
    name.includes('rhino') || name.includes('scorpion') || name.includes('morbius')
  ) {
    return {
      id: TRAILER_PRESETS.SPIDER_VERSE.id,
      title: `${character.name} • Spider-Man Across the Spider-Verse Official Trailer`,
      category: 'Spider-Verse'
    };
  }

  // 5. Fantastic Four & Cosmic Entities
  if (
    name.includes('fantastic') || name.includes('invisible woman') || name.includes('human torch') ||
    name.includes('the thing') || name.includes('doctor doom') || name.includes('galactus') ||
    name.includes('silver surfer') || name.includes('franklin richards') || name.includes('valeria richards') ||
    name.includes('molecule man') || name.includes('super-skrull') || name.includes('annihilus') ||
    name.includes('wizard') || name.includes('trapster') || name.includes('puppet master') ||
    name.includes('diablo') || name.includes('red ghost') || name.includes('super-adaptoid')
  ) {
    return {
      id: TRAILER_PRESETS.FANTASTIC_FOUR.id,
      title: `${character.name} • The Fantastic Four: First Steps Official Teaser`,
      category: 'Fantastic Four'
    };
  }

  // 6. Thunderbolts*, Red Room & Black Ops
  if (
    name.includes('yelena') || name.includes('bucky') || name.includes('winter soldier') ||
    name.includes('red guardian') || name.includes('u.s. agent') || name.includes('ghost') ||
    name.includes('taskmaster') || name.includes('sentry') || name.includes('the void') ||
    name.includes('melina') || name.includes('songbird') || name.includes('moonstone') ||
    name.includes('the fixer') || name.includes('charcoal') || name.includes('penance') ||
    name.includes('butterball') || name.includes('cloud 9') || name.includes('hardball') ||
    name.includes('komodo') || name.includes('gauntlet') || name.includes('trauma') ||
    desc.includes('thunderbolts')
  ) {
    return {
      id: TRAILER_PRESETS.THUNDERBOLTS.id,
      title: `${character.name} • Marvel Studios' Thunderbolts* Official Trailer`,
      category: 'Thunderbolts'
    };
  }

  // 7. Captain America & Red Hulk (Brave New World)
  if (
    name.includes('captain america') || name.includes('sam wilson') || name.includes('steve rogers') ||
    name.includes('red hulk') || name.includes('thunderbolt ross') || name.includes('the leader') ||
    name.includes('joaquin torres') || name.includes('falcon') || name.includes('isaiah bradley') ||
    name.includes('harpy') || name.includes('betty ross')
  ) {
    return {
      id: TRAILER_PRESETS.BRAVE_NEW_WORLD.id,
      title: `${character.name} • Captain America: Brave New World Official Trailer`,
      category: 'Captain America & Red Hulk'
    };
  }

  // 8. Agatha All Along & Coven Magic
  if (
    name.includes('agatha') || name.includes('rio vidal') || name.includes('billy maximoff') ||
    name.includes('wiccan') || name.includes('lilia calderu') || name.includes('jennifer kale') ||
    name.includes('alice wu') || name.includes('coven') || desc.includes('witches\' road')
  ) {
    return {
      id: TRAILER_PRESETS.AGATHA_ALL_ALONG.id,
      title: `${character.name} • Marvel Television's Agatha All Along Official Trailer`,
      category: 'Marvel Magic & Covens'
    };
  }

  // 9. Doctor Strange, Multiverse & Mystics
  if (
    name.includes('doctor strange') || name.includes('dr. strange') || name.includes('clea') ||
    name.includes('ancient one') || name.includes('mordo') || name.includes('america chavez') ||
    name.includes('dormammu') || name.includes('chthon') || name.includes('agamotto') ||
    name.includes('oshtur') || name.includes('hoggoth') || name.includes('shuma-gorath') ||
    name.includes('nightmare') || name.includes('kaluu') || name.includes('black swan') ||
    name.includes('wong') || desc.includes('sorcerer supreme')
  ) {
    return {
      id: TRAILER_PRESETS.MULTIVERSE_OF_MADNESS.id,
      title: `${character.name} • Doctor Strange in the Multiverse of Madness`,
      category: 'Mystic Arts'
    };
  }

  // 10. Scarlet Witch & Vision
  if (name.includes('scarlet witch') || name.includes('wanda') || name.includes('vision') || name.includes('white vision')) {
    return {
      id: TRAILER_PRESETS.WANDAVISION.id,
      title: `${character.name} • Marvel Studios' WandaVision Official Trailer`,
      category: 'Scarlet Witch & Vision'
    };
  }

  // 11. Black Panther & Wakanda & Talokan
  if (
    name.includes('black panther') || name.includes('t\'challa') || name.includes('shuri') ||
    name.includes('okoye') || name.includes('m\'baku') || name.includes('killmonger') ||
    name.includes('namor') || name.includes('attuma') || name.includes('namora') ||
    name.includes('ironheart') || name.includes('riri williams') || name.includes('ramonda')
  ) {
    return {
      id: TRAILER_PRESETS.WAKANDA_FOREVER.id,
      title: `${character.name} • Black Panther: Wakanda Forever Official Trailer`,
      category: 'Wakanda & Talokan'
    };
  }

  // 12. Guardians of the Galaxy & Cosmic Rogues
  if (
    name.includes('star-lord') || name.includes('gamora') || name.includes('drax') ||
    name.includes('rocket') || name.includes('groot') || name.includes('mantis') ||
    name.includes('nebula') || name.includes('yondu') || name.includes('adam warlock') ||
    name.includes('high evolutionary') || name.includes('cosmo') || name.includes('kraglin') ||
    name.includes('pip the troll') || name.includes('bug')
  ) {
    return {
      id: TRAILER_PRESETS.GUARDIANS_3.id,
      title: `${character.name} • Guardians of the Galaxy Vol. 3 Official Trailer`,
      category: 'Guardians of the Galaxy'
    };
  }

  // 13. Loki, TVA, Kang & Multiverse
  if (
    name.includes('loki') || name.includes('sylvie') || name.includes('mobius') ||
    name.includes('he who remains') || name.includes('kang') || name.includes('immortus') ||
    name.includes('rama-tut') || name.includes('victor timely') || name.includes('ravonna') ||
    name.includes('hunter b-15') || name.includes('ouroboros')
  ) {
    return {
      id: TRAILER_PRESETS.LOKI_S2.id,
      title: `${character.name} • Marvel Studios' Loki Season 2 Official Trailer`,
      category: 'TVA & Timelines'
    };
  }

  // 14. Shang-Chi, Ten Rings & Agents of Atlas
  if (
    name.includes('shang-chi') || name.includes('wenwu') || name.includes('xialing') ||
    name.includes('katy') || name.includes('razor fist') || name.includes('death dealer') ||
    name.includes('dweller-in-darkness') || name.includes('great protector') || name.includes('morris') ||
    name.includes('jimmy woo') || name.includes('venus') || name.includes('m-11') ||
    name.includes('uranian') || desc.includes('agents of atlas')
  ) {
    return {
      id: TRAILER_PRESETS.SHANG_CHI.id,
      title: `${character.name} • Shang-Chi and the Legend of the Ten Rings`,
      category: 'Ten Rings & Martial Arts'
    };
  }

  // 15. Moon Knight & Egyptian Pantheons
  if (
    name.includes('moon knight') || name.includes('marc spector') || name.includes('steven grant') ||
    name.includes('jake lockley') || name.includes('khonshu') || name.includes('taweret') ||
    name.includes('ammit') || name.includes('arthur harrow') || name.includes('layla') ||
    name.includes('scarlet scarab')
  ) {
    return {
      id: TRAILER_PRESETS.MOON_KNIGHT.id,
      title: `${character.name} • Marvel Studios' Moon Knight Official Trailer`,
      category: 'Moon Knight & Egyptian Gods'
    };
  }

  // 16. Daredevil, Punisher, Kingpin & Street Heroes
  if (
    name.includes('daredevil') || name.includes('matt murdock') || name.includes('punisher') ||
    name.includes('frank castle') || name.includes('kingpin') || name.includes('wilson fisk') ||
    name.includes('bullseye') || name.includes('stick') || name.includes('echo') ||
    name.includes('luke cage') || name.includes('iron fist') || name.includes('jessica jones') ||
    name.includes('colleen wing') || name.includes('misty knight')
  ) {
    return {
      id: TRAILER_PRESETS.DAREDEVIL_BORN_AGAIN.id,
      title: `${character.name} • Daredevil: Born Again Official Trailer`,
      category: 'Street Vigilantes'
    };
  }

  // 17. Eternals & Celestials
  if (
    name.includes('ikaris') || name.includes('sersi') || name.includes('thena') ||
    name.includes('gilgamesh') || name.includes('kingo') || name.includes('makkari') ||
    name.includes('druig') || name.includes('phastos') || name.includes('sprite') ||
    name.includes('ajak') || name.includes('arishem') || name.includes('eson') ||
    name.includes('kro') || name.includes('black knight') || name.includes('dane whitman')
  ) {
    return {
      id: TRAILER_PRESETS.ETERNALS.id,
      title: `${character.name} • Marvel Studios' Eternals Official Trailer`,
      category: 'Eternals & Celestials'
    };
  }

  // 18. The Marvels & Cosmic Marvel
  if (
    name.includes('captain marvel') || name.includes('carol danvers') || name.includes('ms. marvel') ||
    name.includes('kamala khan') || name.includes('monica rambeau') || name.includes('mar-vell') ||
    name.includes('ronan') || name.includes('dar-benn') || name.includes('supreme intelligence') ||
    name.includes('korvac') || name.includes('ex nihilo') || name.includes('abyss') ||
    name.includes('pod') || name.includes('death\'s head')
  ) {
    return {
      id: TRAILER_PRESETS.THE_MARVELS.id,
      title: `${character.name} • Marvel Studios' The Marvels Official Trailer`,
      category: 'Cosmic Champions'
    };
  }

  // 19. She-Hulk & Hulk Family
  if (
    name.includes('she-hulk') || name.includes('jennifer walters') || name.includes('hulk') ||
    name.includes('bruce banner') || name.includes('abomination') || name.includes('emil blonsky') ||
    name.includes('titania') || name.includes('skaar') || name.includes('lyra') ||
    name.includes('bi-beast') || name.includes('doc samson') || name.includes('a-bomb')
  ) {
    return {
      id: TRAILER_PRESETS.SHE_HULK.id,
      title: `${character.name} • She-Hulk: Attorney at Law Official Trailer`,
      category: 'Gamma Powerhouses'
    };
  }

  // 20. Werewolf by Night, Midnight Sons & Supernatural
  if (
    name.includes('werewolf by night') || name.includes('jack russell') || name.includes('man-thing') ||
    name.includes('elsa bloodstone') || name.includes('dracula') || name.includes('deacon frost') ||
    name.includes('zarathos') || name.includes('ghost rider') || name.includes('centurious') ||
    name.includes('blackout') || desc.includes('midnight sons')
  ) {
    return {
      id: TRAILER_PRESETS.WEREWOLF_BY_NIGHT.id,
      title: `${character.name} • Werewolf by Night Official Trailer`,
      category: 'Midnight Sons & Horror'
    };
  }

  // 21. Thanos, Black Order & Cosmic Entities
  if (
    name.includes('thanos') || name.includes('corvus glaive') || name.includes('proxima midnight') ||
    name.includes('ebony maw') || name.includes('cull obsidian') || name.includes('supergiant') ||
    name.includes('living tribunal') || name.includes('eternity') || name.includes('infinity') ||
    name.includes('beyonder') || name.includes('death') || name.includes('knull')
  ) {
    return {
      id: TRAILER_PRESETS.INFINITY_WAR.id,
      title: `${character.name} • Avengers: Infinity War Official Trailer`,
      category: 'Cosmic Dominance'
    };
  }

  // 22. Iron Man & Armor Family
  if (name.includes('iron man') || name.includes('tony stark') || name.includes('war machine') || name.includes('rhodey') || name.includes('iron monger') || name.includes('whiplash')) {
    return {
      id: TRAILER_PRESETS.IRON_MAN_1.id,
      title: `${character.name} • Marvel Studios' Iron Man Official Trailer`,
      category: 'Armored Avenger'
    };
  }

  // 23. Thor & Asgardian Pantheon
  if (
    name.includes('thor') || name.includes('odin') || name.includes('hela') ||
    name.includes('heimdall') || name.includes('sif') || name.includes('valkyrie') ||
    name.includes('volstagg') || name.includes('fandral') || name.includes('hogun') ||
    name.includes('frigga') || name.includes('surtur') || name.includes('malekith') ||
    name.includes('gorr') || name.includes('zeus') || name.includes('hercules')
  ) {
    return {
      id: TRAILER_PRESETS.THOR_1.id,
      title: `${character.name} • Marvel Studios' Thor Official Trailer`,
      category: 'Asgardian Gods'
    };
  }

  // Default Universal Fallback for Any Character in the Entire 1000 Roster
  return {
    id: TRAILER_PRESETS.ENDGAME.id,
    title: `${character.name} • Avengers: Endgame Official HD Showcase`,
    category: 'Marvel Cinematic Universe'
  };
}
