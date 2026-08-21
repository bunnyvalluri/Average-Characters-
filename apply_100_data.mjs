import fs from 'fs';
import path from 'path';

export const newCharacters = [
  // 1. Spider-Verse & Rogues (15)
  {
    id: 224,
    name: 'Silk',
    originalName: 'Cindy Moon',
    photo: '/silk.png',
    description: 'A Korean-American student bitten by the very same radioactive spider that bit Peter Parker seconds before it died. Hidden away in a protective bunker for over a decade by Ezekiel Sims to shield her from the Inheritors, Cindy emerged as the agile, web-spinning superhero Silk.',
    powers: 'Superhuman agility and reflexes, hyper-sensitive Silk-Sense precognition surpassing Spider-Man, organic silk generation from fingertips (weaving clothes, nets, and claws), wall-crawling, and photographic memory.',
    birth: 'Queens, New York City',
    death: 'Alive (Spider-Army Champion & Protector of NYC)',
    bgColor: '#880e4f', // Silk Crimson Rose
    fontFamily: 'Spider-Man',
  },
  {
    id: 225,
    name: 'Spider-Ham',
    originalName: 'Peter Porker',
    photo: '/spider-ham.png',
    description: 'An anthropomorphic spider originally named Peter who lived in the basement lab of eccentric scientist May Porker. Bitten by May after she irradiated herself with an atomic hairdryer, Peter was transformed into an anthropomorphic swine with spider abilities.',
    powers: 'Cartoon physics and cartoon durability (surviving anvils, explosions, and flattening), superhuman strength, wall-crawling, spider-sense, dimensional hammer hammerspace retrieval, and black comedy slapstick combat.',
    birth: 'Larval Earth (Earth-8311)',
    death: 'Alive (Multiversal Web-Warrior & Cartoon Avenger)',
    bgColor: '#c2185b', // Cartoon Ham Magenta
    fontFamily: 'Spider-Man',
  },
  {
    id: 226,
    name: 'Peni Parker & SP//dr',
    originalName: 'Peni Parker',
    photo: '/peni-parker.png',
    description: 'A Japanese-American high school student living in futuristic Neo-Tokyo who inherited the neuro-genetic SP//dr mech suit from her late father. Sharing a psychic bond with a radioactive spider that co-pilots the CPU with her, Peni defends her city from cybernetic threats.',
    powers: 'Psychic synchronization with the SP//dr spider engine, piloting advanced anime-style mech armor equipped with cybernetic web-canons, high-frequency force fields, wall-scaling thrusters, and genius-level mechatronic hacking.',
    birth: 'Neo-Tokyo (Earth-14512)',
    death: 'Alive (SP//dr Pilot & Multiversal Defender)',
    bgColor: '#d32f2f', // Neo-Tokyo Mech Scarlet
    fontFamily: 'Spider-Man',
  },
  {
    id: 227,
    name: 'The Spot',
    originalName: 'Dr. Jonathan Ohnn',
    photo: '/the-spot.png',
    description: 'An Alchemax scientist working for Kingpin whose body was covered in dimensional interdimensional dark-matter portals after the collider explosion in Brooklyn. Transforming from a minor inconvenience into a multiversal cosmic menace, Spot travels across the multiverse seeking vengeance.',
    powers: 'Interdimensional portal manipulation (opening hundreds of portals in mid-air and on his own body to redirect physical strikes and laser blasts), multiversal travel across the Web of Life and Destiny, and dark-matter spatial distortion.',
    birth: 'Queens, New York City',
    death: 'Alive (Multiversal Singularity & Cosmic Threat)',
    bgColor: '#212121', // Dark Matter Portal Monochrome
    fontFamily: 'Spider-Man',
  },
  {
    id: 228,
    name: 'Spider-Woman',
    originalName: 'Jessica Miriam Drew',
    photo: '/spider-woman.png',
    description: 'The daughter of geneticists raised in Transia on Mount Wundagore whose life was saved by an experimental arachnid blood serum and an incubation accelerator. Trained by HYDRA before defecting to S.H.I.E.L.D. and the Avengers, Jessica is a private investigator and master secret agent.',
    powers: 'Bio-electric "Venom Blasts" capable of stunning or killing opponents, superhuman strength and speed, pheromone manipulation (attracting or repelling people), wall-crawling, gliding via sub-axillary web wings, and immunity to radiation and poisons.',
    birth: 'London, England (Raised on Wundagore Mountain)',
    death: 'Alive (Senior Avenger, S.H.I.E.L.D. Agent & Master Spy)',
    bgColor: '#b71c1c', // Venom Blast Crimson Red
    fontFamily: 'Spider-Man',
  },
  {
    id: 229,
    name: 'Madame Web',
    originalName: 'Cassandra Webb',
    photo: '/madame-web.png',
    description: 'A clairvoyant mutant born blind and suffering from myasthenia gravis who relies on a neurological web-like life support system designed by her husband. As the mystical medium connected to the Web of Life and Destiny, Madame Web guides all Spider-Totems through time and dimensions.',
    powers: 'Omnipresent clairvoyance and precognition, telepathy, astral projection, psychic surgery, multiversal spider-totem awareness, and mystical perception of future timelines.',
    birth: 'Salem, Oregon',
    death: 'Ascended (Guardian of the Web of Life and Destiny)',
    bgColor: '#004d40', // Mystic Web Deep Teal
    fontFamily: 'Spider-Man',
  },
  {
    id: 230,
    name: 'Scarlet Spider (Ben Reilly)',
    originalName: 'Benjamin "Ben" Reilly',
    photo: '/ben-reilly.png',
    description: 'A genetic clone of Peter Parker created by the Jackal (Professor Miles Warren) who possesses Peter\'s memories, morality, and spider powers. Donning a sleeveless blue hoodie over a scarlet suit, Ben embraced the name Ben Reilly (after Uncle Ben and Aunt May) to forge his own path as a hero.',
    powers: 'Superhuman strength and agility matching Peter Parker, precognitive spider-sense, wall-crawling, specialized "impact webbing" pellets, and paralyzing stingers.',
    birth: 'New York City (Jackal\'s Lab Clone)',
    death: 'Active across Multiverse (Scarlet Spider & Chasm)',
    bgColor: '#c62828', // Scarlet Hoodie Crimson
    fontFamily: 'Spider-Man',
  },
  {
    id: 231,
    name: 'Scarlet Spider (Kaine)',
    originalName: 'Kaine Parker',
    photo: '/kaine-parker.png',
    description: 'The first, initially deformed clone of Peter Parker who suffered from cellular degeneration before being resurrected as the fierce avatar of the mystical "Other". Taking on the Scarlet Spider mantle in Houston, Texas, Kaine fights with lethal intensity and bone-breaking stingers.',
    powers: 'Superhuman physical strength exceeding Peter Parker, organic web generation, retractable bone stingers from wrists, psychic mark of Kaine (burning epidermal touch), and immunity to spider-sense.',
    birth: 'New York City (Jackal\'s Lab Clone)',
    death: 'Alive (The Other\'s Champion & Defender of Houston)',
    bgColor: '#880e4f', // Other\'s Sting Burgundy
    fontFamily: 'Spider-Man',
  },
  {
    id: 232,
    name: 'Superior Spider-Man',
    originalName: 'Dr. Otto Octavius / Peter Parker',
    photo: '/superior-spiderman.png',
    description: 'When dying of cancer, Doctor Octopus swapped consciousnesses with Peter Parker. Experiencing Peter\'s memories and Uncle Ben\'s lesson of great responsibility, Otto resolved to become a better, more ruthless hero than Peter ever was—the Superior Spider-Man.',
    powers: 'Superhuman arachnid physical attributes combined with Otto Octavius\' 8th-level genius intellect, mechanical carbon-steel spider legs on suit, Spider-Bot surveillance network, and ruthless tactical methodology.',
    birth: 'Schenectady, New York (Consciousness Swapped in NYC)',
    death: 'Relinquished Peter\'s body (Living as Superior Octopus / Spider-Man)',
    bgColor: '#b71c1c', // Superior Crimson & Carbon Black
    fontFamily: 'Spider-Man',
  },
  {
    id: 233,
    name: 'Agent Venom',
    originalName: 'Eugene "Flash" Thompson',
    photo: '/agent-venom.png',
    description: 'Peter Parker\'s high school rival turned war hero who lost both his legs in the Iraq War. Volunteering for Project Rebirth 2.0, Flash bonded with the subdued Venom symbiote, transforming into a military black-ops commando and guardian of the cosmos with the Guardians of the Galaxy.',
    powers: 'Symbiote-generated legs and physical augmentation (Class 50+ strength, durability, healing factor, shapeshifting tendrils), wall-crawling, multi-weapon firearms mastery, and Klyntar Space Knight cosmic awareness.',
    birth: 'Forest Hills, Queens, New York',
    death: 'Alive (Anti-Venom / Agent Anti-Venom Hero)',
    bgColor: '#212121', // Tactical Spec-Ops Black
    fontFamily: 'Spider-Man',
  },
  {
    id: 234,
    name: 'Toxin',
    originalName: 'Patrick Mulligan',
    photo: '/toxin.png',
    description: 'An honest NYPD police officer who became the host of the 1,000th symbiote of Venom\'s lineage, spawned directly from Carnage. Stronger and more resilient than both Venom and Carnage combined, Pat Mulligan struggled to mentor the childlike yet ferocious symbiote toward justice.',
    powers: 'Vastly superior superhuman strength surpassing Venom and Carnage combined, cellular regeneration, acidic bite, organic camouflage, prehensile bladed tendrils, and tracking via pheromone trails.',
    birth: 'Queens, New York City',
    death: 'Alive (1000th Lineage Symbiote Hero)',
    bgColor: '#b71c1c', // Symbiote Crimson & Slate
    fontFamily: 'Spider-Man',
  },
  {
    id: 235,
    name: 'Anti-Venom',
    originalName: 'Edward Charles Allan "Eddie" Brock',
    photo: '/anti-venom.png',
    description: 'After dying of cancer and repenting his sins at F.E.A.S.T., remnant symbiote cells in Eddie Brock\'s bloodstream mutated under the healing touch of Martin Li (Mister Negative). Reborn as Anti-Venom, his pure white caustic symbiote burns other symbiotes and cures radiation, toxins, and diseases.',
    powers: 'Caustic cleansing touch (corrosive to other symbiotes and capable of burning through symbiote matter), healing antibodies that purge all biological toxins and radiation, Class 70+ strength, and spider-sense immunity.',
    birth: 'San Francisco, California',
    death: 'Alive (The Cleansing White Symbiote)',
    bgColor: '#eceff1', // Cleansing Pure White & Black
    fontFamily: 'Spider-Man',
  },
  {
    id: 236,
    name: 'Shocker',
    originalName: 'Herman Schultz',
    photo: '/shocker.png',
    description: 'A brilliant self-taught engineer and master safe-cracker who built vibro-shock gauntlets out of prison scrap metal. Wearing a quilt-padded suit to absorb the seismic recoil of his gauntlets, Shocker is a reliable professional mercenary of the Sinister Six and underworld.',
    powers: 'Dual high-frequency vibro-shock gauntlets (firing concussive seismic shockwaves, sonic blasts, and kinetic punches that shatter concrete and steel), insulated shock-absorbent vibro-suit, and master lockpicker.',
    birth: 'New York City, New York',
    death: 'Alive (Sinister Six Mercenary & Master Burglar)',
    bgColor: '#f57f17', // Vibro Quilted Amber Yellow
    fontFamily: 'Spider-Man',
  },
  {
    id: 237,
    name: 'Tombstone',
    originalName: 'Lonnie Thompson Lincoln',
    photo: '/tombstone.png',
    description: 'An albino mob boss from Harlem who sharpened his teeth into razor points and was later exposed to experimental Diox-3 gas, turning his skin into rock-hard impenetrable marble. Ruling the criminal underworld with an iron fist, Tombstone is Spider-Man and Daredevil\'s most ruthless rival.',
    powers: 'Rock-solid impenetrable skin immune to bullets, slashing weapons, and extreme temperatures, Class 15+ superhuman physical strength, razor-filed predatory teeth, and master crime lord syndicate leadership.',
    birth: 'Harlem, New York City',
    death: 'Alive (Maggia Kingpin & Underworld Overlord)',
    bgColor: '#37474f', // Marble Tombstone Slate
    fontFamily: 'Daredevil',
  },
  {
    id: 238,
    name: 'Hydro-Man',
    originalName: 'Morris "Morrie" Bench',
    photo: '/hydro-man.png',
    description: 'A cargo ship crewman who was accidentally knocked overboard into the ocean during a test of a powerful experimental deep-sea energy generator. His cellular structure was transmuted into living water, allowing him to turn into tidal waves, steam, and pressurized liquid geysers.',
    powers: 'Complete liquid transmutation and hydrokinesis (transforming into water, blending with oceans and plumbing, expanding into massive tidal waves, and firing high-pressure water cannons that slice through solid rock), and evaporation into steam.',
    birth: 'The Bronx, New York City',
    death: 'Alive (Elemental Sinister Syndicate Powerhouse)',
    bgColor: '#0277bd', // Deep Tidal Wave Blue
    fontFamily: 'Spider-Man',
  },

  // 2. X-Men, Mutants & Krakoa Champions (25)
  {
    id: 239,
    name: 'Apocalypse',
    originalName: 'En Sabah Nur',
    photo: '/apocalypse.png',
    description: 'Born five millennia ago in ancient Egypt, En Sabah Nur is the world\'s first mutant and the ruthless disciple of celestial evolution: "Only the strong shall survive." Enhanced with Celestial technology, Apocalypse commands the Four Horsemen and alters the fate of human and mutant history.',
    powers: 'Total molecular cellular control (altering shape, size, density, and physical composition), Class 100+ superhuman strength, celestial energy blasts, telepathy, telekinesis, technopathy via Celestial armor, and functional immortality.',
    birth: 'c. 3000 BC (Akkaba, Ancient Egypt)',
    death: 'Immortal (Ancient High Lord of Mutantkind & Krakoan Leader)',
    bgColor: '#311b92', // Celestial Ancient Indigo
    fontFamily: 'Avengers',
  },
  {
    id: 240,
    name: 'Mister Sinister',
    originalName: 'Dr. Nathaniel Essex',
    photo: '/mister-sinister.png',
    description: 'A Victorian-era geneticist whose obsessive pursuit of mutant DNA led him to make a pact with Apocalypse, granting him immortality and genetic engineering genius. Obsessed with the Summers and Grey bloodlines, Sinister manipulates cloning and mutant genes from his subterranean cloning vats.',
    powers: 'Cellular regeneration and immortality, telepathy, telekinesis, shape-shifting, energy projection, force field generation, and master geneticist capable of synthesizing any mutant superpower into clones.',
    birth: 'c. 1830 (London, England)',
    death: 'Immortal (Genetic Architect of Krakoa & Bar Sinister)',
    bgColor: '#880e4f', // Victorian Diamond Crimson
    fontFamily: 'Avengers',
  },
  {
    id: 241,
    name: 'Emma Frost',
    originalName: 'Emma Grace Frost / White Queen',
    photo: '/emma-frost.png',
    description: 'A wealthy Boston aristocrat and former White Queen of the Hellfire Club who became the Co-Headmistress of Xavier\'s School and a key pillar of Krakoa. Possessing Omega-class telepathic powers and a secondary mutation allowing her to transform into organic diamond, Emma is ruthless yet fiercely protective of mutant youth.',
    powers: 'Omega-level telepathy (astral projection, memory manipulation, psychic surgery, mental cloaking, illusion casting) and organic diamond form (flawless physical invulnerability, superhuman strength, and total telepathic immunity at the cost of empathy).',
    birth: 'Boston, Massachusetts',
    death: 'Alive (White Queen of the Hellfire Club & Krakoan Leader)',
    bgColor: '#37474f', // Diamond Frost Platinum
    fontFamily: 'Avengers',
  },
  {
    id: 242,
    name: 'Magik',
    originalName: 'Illyana Nikolievna Rasputina',
    photo: '/magik.png',
    description: 'The younger sister of Colossus who was kidnapped as a child into the hellish pocket dimension of Limbo by the demon Belasco. Mastering dark sorcery, she forged her own lifeforce into the giant glowing Soulsword, overthrew Belasco, and became the Supreme Sorceress and ruler of Limbo.',
    powers: 'Stepping Discs (mutant teleportation through Limbo across space, time, and alternate dimensions), Supreme Sorcery of Limbo, the Soulsword (cleaving through magical constructs, spells, and demonic entities while leaving physical bodies unharmed), and Eldritch Darkchylde armor.',
    birth: 'Ust-Ordynsky, Siberia, Russia',
    death: 'Alive (Queen of Limbo, Captain of Krakoa & New Mutant)',
    bgColor: '#f57f17', // Soulsword Blazing Gold
    fontFamily: 'Avengers',
  },
  {
    id: 243,
    name: 'Jubilee',
    originalName: 'Jubilation Lee',
    photo: '/jubilee.png',
    description: 'A witty, bubblegum-chewing mall rat from Beverly Hills who was orphaned and took refuge at Xavier\'s School, becoming Wolverine\'s loyal sidekick and unofficial daughter. Channeling multicolored plasmoid energy globes resembling fireworks, Jubilee is an enduring heart of the X-Men.',
    powers: 'Plasmoid fireworks generation (generating multi-colored sparks and explosive globes of radiant energy that blind, burn, and detonate matter at a subatomic level), immunity to telepathy, and agile acrobatics.',
    birth: 'Beverly Hills, California',
    death: 'Alive (Senior X-Man & Wolverine\'s Trusted Protégé)',
    bgColor: '#fbc02d', // Plasmoid Firework Yellow
    fontFamily: 'Avengers',
  },
  {
    id: 244,
    name: 'Sunspot',
    originalName: 'Roberto "Bobby" da Costa',
    photo: '/sunspot.png',
    description: 'The billionaire son of a Brazilian industrialist whose mutant powers manifested on the soccer field in Rio de Janeiro. Absorbing solar radiation to turn into a silhouette of blazing black solar energy, Bobby founded New Mutants, led X-Force, and even bought A.I.M. to fund the Avengers.',
    powers: 'Solar energy absorption and re-channeling (transforming into a jet-black solar form, Class 50+ superhuman strength, concussive solar thermokinetic blasts, thermal shields, and solar-powered flight), and business/tactical genius.',
    birth: 'Rio de Janeiro, Brazil',
    death: 'Alive (Avenger Leader, New Mutant & Krakoan Diplomat)',
    bgColor: '#e65100', // Solar Corona Obsidian & Orange
    fontFamily: 'Avengers',
  },
  {
    id: 245,
    name: 'Cannonball',
    originalName: 'Samuel Zachery "Sam" Guthrie',
    photo: '/cannonball.png',
    description: 'The oldest son of a Kentucky coal-mining family who unlocked his mutant abilities while saving a fellow miner from a cave-in. Releasing thermo-chemical energy from his body, Sam propels himself like a human missile while encased in an impenetrable blast field.',
    powers: 'Thermo-chemical propulsion and human missile flight (flying at supersonic speeds), and the impenetrable "Blast Field" (a kinetic energy shield that renders him virtually invulnerable to all physical and energy attacks while flying).',
    birth: 'Cumberland, Kentucky',
    death: 'Alive (Senior X-Man, X-Force Leader & Avenger)',
    bgColor: '#bf360c', // Thermo-Chemical Thrust Amber
    fontFamily: 'Avengers',
  },
  {
    id: 246,
    name: 'Mirage',
    originalName: 'Danielle "Dani" Moonstar',
    photo: '/mirage.png',
    description: 'A proud Cheyenne mutant and Valkyrie of Asgard who possesses the power to manifest three-dimensional psionic illusions of a person\'s deepest fears or greatest desires. As co-leader of the New Mutants, Dani rides her winged Asgardian steed Brightwind into battle.',
    powers: 'Empathic illusion casting (pulling fears and desires from targets\' minds to manifest solid psionic constructs), psychic arrows and bows, telepathic animal communication, and Asgardian Valkyrie death-sensing and enhanced physiology.',
    birth: 'Boulder, Colorado',
    death: 'Alive (New Mutant Co-Leader & Chooser of the Slain)',
    bgColor: '#00695c', // Cheyenne Spirit Teal
    fontFamily: 'Avengers',
  },
  {
    id: 247,
    name: 'Wolfsbane',
    originalName: 'Rahne Sinclair',
    photo: '/wolfsbane.png',
    description: 'A devout Scottish orphan raised by a strict reverend who discovered she could transform into a lupine wolf or transitional human-wolf form. Overcoming deep religious guilt about her mutation with the New Mutants and X-Factor, Rahne fights with ferocious loyalty.',
    powers: 'Lycanthropic metamorphic transformation (shifting into a full wolf or human-wolf hybrid), enhanced predatory senses, razor claws and fangs, superhuman speed and agility, and accelerated healing.',
    birth: 'Ullapool, Ross and Cromarty, Scotland',
    death: 'Alive (New Mutant, X-Factor & Krakoan Warrior)',
    bgColor: '#4e342e', // Scottish Lupine Russet
    fontFamily: 'Avengers',
  },
  {
    id: 248,
    name: 'Warlock',
    originalName: 'Warlock of the Technarchy',
    photo: '/warlock-mutant.png',
    description: 'An alien being from the techno-organic race called the Technarchy who fled his home world to escape his father, the tyrant Magus. Possessing the unique mutation to feel compassion and friendship, Warlock bonded with Cypher and the New Mutants as an indispensable ally.',
    powers: 'Techno-organic shapeshifting (altering shape into vehicles, weapons, giant beasts, or microscopic threads), Transmode Virus assimilation (draining energy from machines and organic life), energy projection, and cybernetic network scanning.',
    birth: 'Kvch (Technarchy Homeworld)',
    death: 'Alive (Techno-Organic New Mutant & Krakoan Spine)',
    bgColor: '#fbc02d', // Techno-Organic Cyber Gold
    fontFamily: 'Avengers',
  },
  {
    id: 249,
    name: 'Forge',
    originalName: 'Jonathan Silvercloud',
    photo: '/forge.png',
    description: 'A Native American Cheyenne mutant and Vietnam War veteran gifted with an innate superhuman mechanical genius that allows him to intuitively engineer and invent any technology he can conceive. Combining advanced cybernetics with mystical shamanic arts, Forge builds Krakoa\'s technological wonders.',
    powers: 'Intuitive technological engineering (subconsciously conceiving, designing, and building advanced machines, weapons, mutant-power inhibitors, and teleporters), cybernetic bionic right leg and hand, and Cheyenne shaman mysticism.',
    birth: 'Cheyenne Nation, United States',
    death: 'Alive (Chief Technologist of Krakoa & X-Force Operative)',
    bgColor: '#b0bec5', // Cybernetic Titanium Silver
    fontFamily: 'Avengers',
  },
  {
    id: 250,
    name: 'Dazzler',
    originalName: 'Alison Blaire',
    photo: '/dazzler.png',
    description: 'A disco-pop superstar and mutant who possesses the ability to transduce soundwaves into radiant light of varying intensity and colors. Initially seeking only a music career, Alison stepped up to become an iconic member of the X-Men, using lasers and light shows to defeat galactic villains.',
    powers: 'Acoustic transduction (converting any ambient sound, music, or sonic frequency into light, lasers, photon blasts, blinding strobes, and hard-light shields), and total immunity to deafening sound and blinding light.',
    birth: 'Gardendale, Long Island, New York',
    death: 'Alive (Pop Icon, Senior X-Man & Excalibur Champion)',
    bgColor: '#ec407a', // Disco Starlight Pink
    fontFamily: 'Avengers',
  },
  {
    id: 251,
    name: 'Longshot',
    originalName: 'Longshot',
    photo: '/longshot.png',
    description: 'A four-fingered genetically engineered humanoid slave created by Arize in the extradimensional Mojoverse who led a rebellion against the tyrannical television-obsessed despot Mojo. Gifted with psionic probability luck when his motives are pure, Longshot is a beloved acrobatic X-Man.',
    powers: 'Psionic probability alteration (manifesting incredible good luck when acting with pure, unselfish motives), hollow-bone superhuman agility, psychometry (reading psychic impressions from objects), and expert thrower of cleaving daggers.',
    birth: 'Mojoverse (Alternate Dimension)',
    death: 'Alive (Mojoverse Rebel & X-Factor Investigator)',
    bgColor: '#fbc02d', // Mojoverse Star Gold
    fontFamily: 'Avengers',
  },
  {
    id: 252,
    name: 'Legion',
    originalName: 'David Charles Haller',
    photo: '/legion.png',
    description: 'The son of Professor Charles Xavier and Israeli ambassador Gabrielle Haller who suffered severe trauma during a terrorist attack. Developing dissociative identity disorder, each of David\'s thousands of distinct split personalities commands a unique, godlike mutant superpower.',
    powers: 'Omega-level omni-mutant power manifest (thousands of split personalities commanding spontaneous reality alteration, time travel, pyrokinesis, telepathy, telekinesis, transmutation, absorption, and spatial warping), and psychic architect of the Astral Plane.',
    birth: 'Haifa, Israel',
    death: 'Alive (Astral Architect & Krakoan Luminary)',
    bgColor: '#d50000', // Astral Mind Fire Red
    fontFamily: 'Avengers',
  },
  {
    id: 253,
    name: 'Hope Summers',
    originalName: 'Hope Summers / The Mutant Messiah',
    photo: '/hope-summers.png',
    description: 'The first mutant born after the devastating M-Day decimation event where millions lost their powers. Raised and trained across post-apocalyptic futures by Cable to save their species, Hope returned to lead the Five on Krakoa, resurrecting millions of fallen mutants.',
    powers: 'Omega-level mutant power mimicry and manipulation (mimicking any mutant ability within range at full potential, stabilizing, jumpstarting, and synchronizing mutant powers), and master time-warrior combatant.',
    birth: 'Cooperstown, Alaska',
    death: 'Alive (Mutant Messiah & Core of The Five Resurrections)',
    bgColor: '#2e7d32', // Krakoan Resurrection Emerald
    fontFamily: 'Avengers',
  },
  {
    id: 254,
    name: 'X-Man',
    originalName: 'Nathaniel "Nate" Grey',
    photo: '/x-man.png',
    description: 'Genetically engineered by Mister Sinister in the alternate dystopian timeline of the Age of Apocalypse using DNA from Cyclops and Jean Grey without the techno-organic virus. Transported to Earth-616, Nate Grey is one of the most rawly powerful psionic entities in existence.',
    powers: 'Virtually limitless Omega-level telekinesis and telepathy, matter manipulation on a molecular level, astral plane mastery, precognition, psychokinesis, and dimension-hopping.',
    birth: 'Age of Apocalypse (Earth-295)',
    death: 'Alive (Psionic Demigod & Multiversal Champion)',
    bgColor: '#1565c0', // Age of Apocalypse Blue
    fontFamily: 'Avengers',
  },
  {
    id: 255,
    name: 'Omega Red',
    originalName: 'Arkady Gregorivich Rossovich',
    photo: '/omega-red.png',
    description: 'A lethal Soviet serial killer turned KGB super-soldier who was augmented with retractable carbonadium tentacles in his arms. Afflicted with a deadly "Death Factor" pheromone that requires him to constantly drain the lifeforce of other living beings to survive, Arkady is Wolverine\'s cold-war nemesis.',
    powers: 'Death Spores (emitting lethal biological pheromones that weaken and kill organic life in seconds), life-drain absorption, retractable carbonadium tentacles deployed from wrists, superhuman strength, and rapid healing.',
    birth: 'Moscow, Soviet Union',
    death: 'Alive (KGB Living Weapon & X-Force Operative)',
    bgColor: '#b71c1c', // Soviet Carbonadium Crimson
    fontFamily: 'Wolverine',
  },
  {
    id: 256,
    name: 'Sebastian Shaw',
    originalName: 'Sebastian Hiram Shaw / Black King',
    photo: '/sebastian-shaw.png',
    description: 'A ruthless billionaire industrialist and the longstanding Black King of the Hellfire Club. Possessing the mutant ability to absorb all incoming kinetic energy, punches, and explosions to amplify his own physical strength and durability, Shaw turns his enemies\' attacks into deadly weapons.',
    powers: 'Kinetic energy absorption (converting physical punches, impacts, bullets, and explosions into amplified physical strength, stamina, and invulnerability), slowed aging, and ruthless corporate leadership.',
    birth: 'Pittsburgh, Pennsylvania',
    death: 'Alive (Black King of the Hellfire Club & Krakoan Oligarch)',
    bgColor: '#4a148c', // Hellfire Black King Velvet
    fontFamily: 'Avengers',
  },
  {
    id: 257,
    name: 'Blob',
    originalName: 'Frederick J. "Fred" Dukes',
    photo: '/blob.png',
    description: 'A former carnival sideshow attraction recruited by Magneto into the Brotherhood of Evil Mutants. Possessing immense adipose tissue and a localized gravity anchor that renders him virtually immovable when his feet are planted on the ground, Blob is an unstoppable physical wall.',
    powers: 'Personal gravitational field anchoring (rendering him immovable to physical forces when planted), impenetrable blubber skin resistant to gunfire, artillery, and torpedoes, and Class 75+ superhuman strength.',
    birth: 'Lubbock, Texas',
    death: 'Alive (Brotherhood Powerhouse & Krakoan Bartender)',
    bgColor: '#827717', // Carnival Brawler Olive
    fontFamily: 'Avengers',
  },
  {
    id: 258,
    name: 'Avalanche',
    originalName: 'Dominicos Ioannos Petrakis',
    photo: '/avalanche.png',
    description: 'A Greek immigrant mutant and core frontline enforcer of Mystique\'s Brotherhood of Evil Mutants. By projecting seismic vibration shockwaves from his hands into inorganic matter, Avalanche shatters buildings, opens massive ground chasms, and triggers devastating earthquakes.',
    powers: 'Geokinetic and seismic wave generation (transmitting high-frequency vibration waves into earth, concrete, and rock to cause localized earthquakes, landslides, and structure collapses), and armored shock suit.',
    birth: 'Crete, Greece',
    death: 'Alive (Brotherhood Seismic Enforcer & Krakoan Council)',
    bgColor: '#5d4037', // Seismic Tectonic Brown
    fontFamily: 'Avengers',
  },
  {
    id: 259,
    name: 'Destiny',
    originalName: 'Irene Adler',
    photo: '/destiny.png',
    description: 'An Austrian mutant born in the 19th century who began recording the future of humanity and mutantkind into her famous multi-volume Diaries of Destiny. The lifelong partner of Mystique and adoptive mother of Rogue, Destiny guides mutant history with infallible precognitive sight.',
    powers: 'Absolute precognitive foresight (perceiving branching future timelines, probabilities, and impending events with near-infallible precision), expert crossbow marksman, and master political strategist.',
    birth: 'c. 1870s (Salzburg, Austria)',
    death: 'Alive (Precognitive Seer & Krakoan Quiet Council)',
    bgColor: '#fbc02d', // Golden Mask of Destiny
    fontFamily: 'Avengers',
  },
  {
    id: 260,
    name: 'Callisto',
    originalName: 'Callisto',
    photo: '/callisto.png',
    description: 'The fierce, eyepatch-wearing warrior queen and founder of the Morlocks—the underground community of deformed and outcast mutants living in the abandoned sewers beneath Manhattan. After losing leadership to Storm in a knife duel, she became Storm\'s staunchest ally.',
    powers: 'Superhuman predatory senses (night vision, tracking, acute hearing, and intuitive physical tactical assessment), peak human physical attributes and agility, master knife-fighter, and survivalist commander.',
    birth: 'United States',
    death: 'Alive (Morlock Leader & Krakoan White Sword Champion)',
    bgColor: '#37474f', // Underground Sewer Slate
    fontFamily: 'Storm',
  },
  {
    id: 261,
    name: 'Warpath',
    originalName: 'James Jonathan Proudstar',
    photo: '/warpath.png',
    description: 'An Apache mutant warrior and the younger brother of the fallen Thunderbird (John Proudstar). Towering at 7\'2\" with colossal physical strength, James sought vengeance before realizing his true calling, wielding dual vibranium bowie knives as a core powerhouse of X-Force and the X-Men.',
    powers: 'Class 90+ superhuman physical strength and durability, superhuman running speed, heightened Apache tracking senses, and expert combat mastery with dual forged vibranium bowie knives.',
    birth: 'Camp Verde, Arizona (Apache Nation)',
    death: 'Alive (Senior X-Force Powerhouse & Krakoan Champion)',
    bgColor: '#b71c1c', // Apache Vibranium Crimson
    fontFamily: 'Avengers',
  },
  {
    id: 262,
    name: 'Sunfire',
    originalName: 'Shiro Yoshida',
    photo: '/sunfire.png',
    description: 'A hot-tempered Japanese mutant whose mother suffered radiation sickness from the Hiroshima atomic bomb. Absorbing solar radiation to convert it into superheated ionized plasma fire, Sunfire is the premier protector of Japan and a founding member of the Second Genesis X-Men.',
    powers: 'Biochemical ionization (projecting solar plasma flames up to 1,000,000°F, heat blast waves, and plasma shields), thermal flight via ion propulsion, and infrared heat perception.',
    birth: 'Agarashima, Japan',
    death: 'Alive (National Champion of Japan & Senior X-Man)',
    bgColor: '#d50000', // Rising Sun Plasma Red
    fontFamily: 'Avengers',
  },
  {
    id: 263,
    name: 'Armor',
    originalName: 'Hisako Ichiki',
    photo: '/armor.png',
    description: 'A courageous Japanese mutant student at Xavier\'s School who can manifest an enormous, translucent psionic exoskeleton armor powered by the spirits of her ancestors. Overcoming the loss of her classmate Wing, Hisako stepped onto the frontline as Armor alongside Wolverine.',
    powers: 'Ancestral psionic exoskeleton armor generation (manifesting an impenetrable ruby/crimson force field armor granting Class 50+ superhuman strength, concussive energy discharges, and complete physical invulnerability).',
    birth: 'Tokyo, Japan',
    death: 'Alive (Senior X-Man & Wolverine\'s Trusted Ally)',
    bgColor: '#c62828', // Psionic Armor Ruby Red
    fontFamily: 'Avengers',
  },

  // 3. Cosmic Entities, Celestials & Galactic Champions (18)
  {
    id: 264,
    name: 'The Living Tribunal',
    originalName: 'The Living Tribunal',
    photo: '/living-tribunal.png',
    description: 'A colossal three-faced celestial entity that has existed since the dawn of the multiverse, serving as the supreme judicial arbiter of reality directly beneath the One Above All. The Tribunal maintains the cosmic balance of all alternate timelines and infinite dimensions.',
    powers: 'Omnipotent cosmic judgment and authority over all reality, omniscient multiversal awareness, effortless nullification of Infinity Stones, and absolute reality/energy manipulation.',
    birth: 'Beginning of the Multiverse',
    death: 'Immortal (Supreme Cosmic Judge of the Multiverse)',
    bgColor: '#ffd600', // Multiversal Tribunal Gold
    fontFamily: 'Avengers',
  },
  {
    id: 265,
    name: 'Eternity',
    originalName: 'Eternity (Abstract Entity)',
    photo: '/eternity.png',
    description: 'The sentient personification of the universe itself and the embodiment of all time and existence. Capable of granting the single greatest wish to the first cosmic traveler who reaches his celestial altar at the center of the cosmos, Eternity encompasses every star, galaxy, and living soul.',
    powers: 'Complete omnipresence and embodiment of all spacetime and matter, reality manipulation on a universal scale, wish-granting cosmic genesis, and immortality.',
    birth: 'Birth of the 7th/8th Cosmos',
    death: 'Immortal (The Living Embodiment of Spacetime)',
    bgColor: '#1a237e', // Cosmic Cosmos Deep Nebula Blue
    fontFamily: 'Thor',
  },
  {
    id: 266,
    name: 'Infinity',
    originalName: 'Infinity (Abstract Entity)',
    photo: '/infinity-entity.png',
    description: 'The sister entity to Eternity who personifies the totality of all spatial dimensions and cosmic expansion throughout the universe. Together with Eternity, Infinity represents the continuum of all physical reality against oblivion and non-existence.',
    powers: 'Omnipresent spatial embodiment, control over all infinite dimensions and space, manipulation of universal energy, and cosmic reality preservation.',
    birth: 'Beginning of Creation',
    death: 'Immortal (The Living Embodiment of Infinite Space)',
    bgColor: '#4a148c', // Infinite Spatial Violet
    fontFamily: 'Avengers',
  },
  {
    id: 267,
    name: 'The Beyonder',
    originalName: 'The Beyonder',
    photo: '/beyonder.png',
    description: 'An omnipotent entity from an extra-multiversal realm known as the Beyond Realm who transported Earth\'s greatest superheroes and villains to Battleworld to wage the original Secret Wars. Fascinated by human desire, the Beyonder walks reality exploring mortal emotion.',
    powers: 'Near-infinite omnipotence and reality warping (creating and rearranging planets, galaxies, and dimensions with a thought), dimensional manipulation, and immortality.',
    birth: 'The Beyond Realm',
    death: 'Immortal (Architect of Battleworld & Cosmic Reality Warper)',
    bgColor: '#00e676', // Beyonder Matrix Electric Green
    fontFamily: 'Avengers',
  },
  {
    id: 268,
    name: 'Arishem the Judge',
    originalName: 'Arishem the Judge',
    photo: '/arishem.png',
    description: 'The towering Prime Celestial who engineered the Deviants and Eternals to harvest planetary life-energies and trigger the Emergence of newborn Celestials. Standing millions of miles tall, Arishem returns to evaluate whether human civilizations are worthy of survival.',
    powers: 'Celestial cosmic power manipulation (generating entire galaxies, stars, and black holes), telepathic judgment across galaxies, teleportation through the World Forge, and absolute cosmic invulnerability.',
    birth: 'Dawn of the Universe',
    death: 'Immortal (Prime Celestial & Creator of Eternals)',
    bgColor: '#b71c1c', // Celestial Core Crimson
    fontFamily: 'Avengers',
  },
  {
    id: 269,
    name: 'Eson the Searcher',
    originalName: 'Eson the Searcher',
    photo: '/eson.png',
    description: 'A colossal Celestial who once wielded the Power Stone embedded within his staff to eradicate the planetary civilizations and organic life of entire worlds with a single ground strike, as witnessed in the Collector\'s archives on Knowhere.',
    powers: 'Planetary energy destruction via the Power Stone, celestial armor invulnerability, cosmic energy projection, and scanning across planetary ecosystems.',
    birth: 'Ancient Cosmic Era',
    death: 'Immortal (Celestial Searcher & Planetary Destroyer)',
    bgColor: '#880e4f', // Power Stone Annihilation Burgundy
    fontFamily: 'Guardians',
  },
  {
    id: 270,
    name: 'Death',
    originalName: 'Lady Death / Rio Vidal',
    photo: '/lady-death.png',
    description: 'The ancient cosmic embodiment of mortality and the natural transition of life into the afterlife. Walking Earth in mortal guises such as the Green Witch Rio Vidal, Death enforces the balance of the universe and claims all fallen souls.',
    powers: 'Absolute power over life and death, touch of instant mortality, resurrection, decay manipulation, reality warping, and eternal omnipresence across the multiverse.',
    birth: 'Dawn of Creation',
    death: 'Immortal (Cosmic Embodiment of Death)',
    bgColor: '#1b5e20', // Green Witch Moss & Velvet Black
    fontFamily: 'Avengers',
  },
  {
    id: 271,
    name: 'Knull',
    originalName: 'Knull / God of the Symbiotes',
    photo: '/knull.png',
    description: 'An ancient primordial god of the void who ruled the cosmos before light existed. Forging the first symbiote blade All-Black the Necrosword from the severed head of a Celestial, Knull spawned the entire symbiote hive mind and waged war across galaxies as the King in Black.',
    powers: 'Mastery over the Living Abyss and Symbiote Hive Mind, creator of the Necrosword, god-slaying dark energy projection, immortality, and corruption of Celestials.',
    birth: 'The Void Before Creation',
    death: 'Immortal (Lord of the Abyss & God of the Symbiotes)',
    bgColor: '#000000', // Primordial Abyss Obsidian
    fontFamily: 'Spider-Man',
  },
  {
    id: 272,
    name: 'Annihilus',
    originalName: 'Annihilus',
    photo: '/annihilus.png',
    description: 'The ruthless insectoid tyrant of the anti-matter universe known as the Negative Zone. Wielding the Cosmic Control Rod which grants him immortality and godlike energy manipulation, Annihilus launched the Annihilation Wave to consume the positive-matter universe.',
    powers: 'Wielder of the Cosmic Control Rod (immortality, matter transformation, energy blasts, and cellular regeneration), supreme commander of the trillions-strong Annihilation Wave, and armored chitin invulnerability.',
    birth: 'Planet Arthros (Negative Zone)',
    death: 'Immortal via Cosmic Control Rod (Lord of the Negative Zone)',
    bgColor: '#33691e', // Negative Zone Insectoid Olive
    fontFamily: 'Avengers',
  },
  {
    id: 273,
    name: 'Gladiator',
    originalName: 'Kallark',
    photo: '/gladiator.png',
    description: 'The Praetor of the Shi\'ar Imperial Guard whose physical power is directly tied to his absolute self-confidence. Capable of shattering planets and moving faster than light when his belief in his cause is unwavering, Gladiator is the supreme champion of the Shi\'ar Empire.',
    powers: 'Confidence-fueled Class 100+ physical strength and invulnerability, faster-than-light interstellar flight, heat vision hot as the core of a star, and freezing breath.',
    birth: 'Strontia (Shi\'ar Empire)',
    death: 'Alive (Majestor of the Shi\'ar Empire & Imperial Guard Praetor)',
    bgColor: '#0d47a1', // Shi\'ar Imperial Cobalt Blue
    fontFamily: 'Avengers',
  },
  {
    id: 274,
    name: 'Super-Skrull',
    originalName: 'Kl\'rt',
    photo: '/super-skrull.png',
    description: 'A decorated Skrull warrior who was selected by the Skrull Empire to undergo genetic bionic enhancement, granting him the combined superpowers of the entire Fantastic Four simultaneously: stretching, fire, invisibility, and rock-solid strength.',
    powers: 'Simultaneous mastery of the Fantastic Four\'s powers (Mr. Fantastic\'s elasticity, Human Torch\'s pyrokinesis and flight, Invisible Woman\'s force fields and invisibility, and Thing\'s colossal strength), Skrull shapeshifting, and hypnotic gaze.',
    birth: 'Tarnax IV (Skrull Empire)',
    death: 'Alive (Emperor & Supreme Champion of the Skrull Race)',
    bgColor: '#2e7d32', // Skrull Empire Emerald
    fontFamily: 'Avengers',
  },
  {
    id: 275,
    name: 'Captain Mar-Vell',
    originalName: 'Mar-Vell / Walter Lawson',
    photo: '/mar-vell.png',
    description: 'A celebrated Kree military warrior sent to spy on Earth under the identity of Dr. Walter Lawson. Choosing to protect humanity against Kree tyranny, Mar-Vell donned the golden Nega-Bands, becoming Earth\'s protector as the original Captain Marvel and inspiring Carol Danvers.',
    powers: 'Cosmic Awareness (perceiving illusions, cosmic shifts, and threats across spacetime), Nega-Bands empowerment (superhuman strength, flight, and photon energy projection), and master Kree military tactician.',
    birth: 'Kree-Lar (Kree Empire)',
    death: 'Deceased (Passes peacefully surrounded by heroes / Honored across Cosmos)',
    bgColor: '#b71c1c', // Kree Star Gold & Crimson
    fontFamily: 'Captain Marvel',
  },
  {
    id: 276,
    name: 'Quasar',
    originalName: 'Wendell Elvis Vaughn',
    photo: '/quasar.png',
    description: 'A humble S.H.I.E.L.D. security agent who donned the ancient Quantum Bands to save his colleagues from AIM operatives. Chosen as the Protector of the Universe by the cosmic entity Eon, Quasar commands the Quantum Zone to protect galaxies alongside the Avengers.',
    powers: 'Mastery of the Quantum Bands (tapping the Quantum Zone to manifest solid light constructs, energy shields, and photon blasts), faster-than-light quantum jumping, and total immunity to telepathy.',
    birth: 'Fond du Lac, Wisconsin',
    death: 'Alive (Protector of the Universe & Cosmic Avenger)',
    bgColor: '#f57f17', // Quantum Band Solar Amber
    fontFamily: 'Avengers',
  },
  {
    id: 277,
    name: 'Phyla-Vell',
    originalName: 'Phyla-Vell / Martyr',
    photo: '/phyla-vell.png',
    description: 'The artificially created daughter of Captain Mar-Vell and Elysius of Titan. Wielding the Quantum Bands and later the cosmic sword of Oblivion, Phyla-Vell is a fierce warrior of the Guardians of the Galaxy who defended the cosmos during the Annihilation War.',
    powers: 'Cosmic energy absorption and blast projection, Quantum Band constructs, interstellar flight, superhuman strength, master swordsmanship, and telepathic resistance.',
    birth: 'Titan (Moon of Saturn)',
    death: 'Alive (Guardians of the Galaxy Member & Cosmic Hero)',
    bgColor: '#4a148c', // Martyr Quantum Violet
    fontFamily: 'Guardians',
  },
  {
    id: 278,
    name: 'Moondragon',
    originalName: 'Heather Douglas',
    photo: '/moondragon.png',
    description: 'The daughter of Arthur Douglas (Drax the Destroyer) whose family was attacked by Thanos. Raised on Titan by the monks of Shao-Lom, Heather mastered mental disciplines to become an Omega-level telepath and martial artist, commanding the dragon of the moon.',
    powers: 'Omega-level telepathy (mind control, astral combat, illusion casting), telekinesis, psionic blasts, master of martial arts, and transformation into the colossal cosmic Moondragon.',
    birth: 'Los Angeles, California (Raised on Titan)',
    death: 'Alive (Guardian of the Galaxy & Defender of the Cosmos)',
    bgColor: '#00796b', // Titan Shao-Lom Deep Jade
    fontFamily: 'Guardians',
  },
  {
    id: 279,
    name: 'Bug',
    originalName: 'Bug of the Microverse',
    photo: '/bug.png',
    description: 'A witty, agile insectoid warrior from the Microverse planet Kaliklak and a core founding member of the modern Guardians of the Galaxy. Armed with a lance and an antennae danger sense, Bug fights across the stars alongside Rocket Raccoon and Star-Lord.',
    powers: 'Danger-sensing antennae (precognitive hazard detection), superhuman leaping, wall-crawling, master acrobat, and deadly plasma lance marksman.',
    birth: 'Kaliklak (The Microverse)',
    death: 'Alive (Guardians of the Galaxy Member & Micronaut)',
    bgColor: '#388e3c', // Kaliklak Insectoid Forest Green
    fontFamily: 'Guardians',
  },
  {
    id: 280,
    name: 'Genis-Vell',
    originalName: 'Genis-Vell / Legacy',
    photo: '/genis-vell.png',
    description: 'The genetically engineered son of Captain Mar-Vell who inherited the golden Nega-Bands and the overwhelming power of Cosmic Awareness. Merged in molecular polarity with Rick Jones, Genis battled cosmic madness to become a cosmic savior.',
    powers: 'Cosmic Awareness (perceiving the past, present, and future of all existence), Nega-Bands energy projection, faster-than-light flight, photon transmutation, and reality warping.',
    birth: 'Titan (Moon of Saturn)',
    death: 'Alive (Cosmic Champion & Son of Mar-Vell)',
    bgColor: '#1a237e', // Cosmic Starlight Midnight Blue
    fontFamily: 'Captain Marvel',
  },
  {
    id: 281,
    name: 'Love',
    originalName: 'Love (Daughter of Gorr)',
    photo: '/love.png',
    description: 'The beloved daughter of Gorr the God Butcher whose tragic death triggered his crusade against gods. Resurrected directly from the cosmic genesis of Eternity by Gorr\'s dying wish, Love was adopted by Thor, wielding Stormbreaker in battle alongside her adoptive father.',
    powers: 'Cosmic energy physiology born from Eternity (firing golden eye lasers and cosmic beams), superhuman endurance, and wielding the enchanted uru war-hammer Stormbreaker.',
    birth: 'Resurrected at the Center of the Universe (Eternity\'s Altar)',
    death: 'Alive (Adopted Daughter of Thor & Cosmic Hero)',
    bgColor: '#e65100', // Eternity Genesis Warm Gold
    fontFamily: 'Thor',
  },

  // 4. Young Avengers, Champions & Legacy (10)
  {
    id: 282,
    name: 'Wiccan',
    originalName: 'William "Billy" Kaplan / Maximoff',
    photo: '/wiccan.png',
    description: 'The reincarnated twin son of Wanda Maximoff (Scarlet Witch) and Vision. Blessed with reality-warping chaos magic and destined to ascend as the omnipotent Demiurge—creator of future realities—Billy is a founding Young Avenger and the Sorcerer Supreme of the future.',
    powers: 'Chaos magic and reality warping (chanting intent to alter reality, teleport, heal, and generate force fields), astral projection, telepathy, flight, and future Demiurge cosmic genesis.',
    birth: 'Westview Hex / New York City',
    death: 'Alive (Young Avenger & The Demiurge)',
    bgColor: '#311b92', // Chaos Mystic Royal Violet
    fontFamily: 'Scarlet Witch',
  },
  {
    id: 283,
    name: 'Speed',
    originalName: 'Thomas "Tommy" Shepherd / Maximoff',
    photo: '/speed.png',
    description: 'The reincarnated twin brother of Billy Kaplan (Wiccan) and son of Scarlet Witch and Vision. Inheriting the superhuman speed and molecular acceleration powers of his uncle Quicksilver, Tommy is the fast-talking speedster of the Young Avengers.',
    powers: 'Superhuman supersonic speed and reflexes (exceeding Mach 4), hyper-accelerated metabolism, molecular kinetic destabilization (vibrating atomic structures to detonate solid objects), and wall-running.',
    birth: 'Westview Hex / New Jersey',
    death: 'Alive (Young Avengers Speedster)',
    bgColor: '#00897b', // Supersonic Hyper Teal
    fontFamily: 'Avengers',
  },
  {
    id: 284,
    name: 'Hulkling',
    originalName: 'Dorrek VIII / Theodore "Teddy" Altman',
    photo: '/hulkling.png',
    description: 'The son of Kree champion Captain Mar-Vell and Skrull Princess Anelle. Uniting the warring Kree and Skrull empires as Emperor Dorrek VIII and wielding the mystic sword Excelsior, Teddy is the steadfast powerhouse of the Young Avengers and husband of Wiccan.',
    powers: 'Skrull shapeshifting (growing wings for flight, transforming limbs into weapons, and altering appearance), Class 100+ superhuman strength, regenerative healing factor, and wielder of the Star-Sword Excelsior.',
    birth: 'Tarnax IV (Raised in New York)',
    death: 'Alive (Emperor of the Kree/Skrull Alliance & Young Avenger)',
    bgColor: '#2e7d32', // Kree-Skrull Emerald Green
    fontFamily: 'Hulk',
  },
  {
    id: 285,
    name: 'Iron Lad',
    originalName: 'Nathaniel Richards (Earth-6311)',
    photo: '/iron-lad.png',
    description: 'A 16-year-old high school student from the 30th century visited by his future self, Kang the Conqueror. Horrified by the tyrant he was destined to become, Nathaniel fled to the 21st century and created the Young Avengers using neuro-kinetic armor modeled after Iron Man.',
    powers: 'Neuro-kinetic liquid cybernetic armor (holographic shields, repulsor beams, concussive plasma blasters, time travel manipulation, and flight), and high-tech temporal tactical intellect.',
    birth: '30th Century (Other-Earth / Earth-6311)',
    death: 'Alive (Founding Young Avenger / Kang Timeline Defier)',
    bgColor: '#b71c1c', // 30th Century Neuro Armor Crimson
    fontFamily: 'Iron Man',
  },
  {
    id: 286,
    name: 'Amadeus Cho (Brawn)',
    originalName: 'Amadeus Cho / Totally Awesome Hulk',
    photo: '/amadeus-cho.png',
    description: 'The 8th smartest person on Earth who used special nanites to absorb the excess gamma radiation from Bruce Banner into himself. Transforming into the "Totally Awesome Hulk" (later Brawn) while maintaining his genius-level intellect, Cho is a core leader of the Champions.',
    powers: 'Gamma-powered superhuman physical strength and endurance, hyper-accelerated calculation speed (solving quantum and ballistic equations in real-time), and shockwave stomps.',
    birth: 'Tucson, Arizona',
    death: 'Alive (Super-Genius & Champions Leader)',
    bgColor: '#00838f', // Gamma-Genius Cyan Teal
    fontFamily: 'Hulk',
  },
  {
    id: 287,
    name: 'Skaar',
    originalName: 'Skaar / Son of Hulk',
    photo: '/skaar.png',
    description: 'The son of Bruce Banner (Hulk) and Caiera the Oldstrong, born on the harsh alien world of Sakaar. Inheriting both his father\'s colossal gamma strength and his mother\'s ancient Old Power, Skaar can manipulate tectonic plates and lava while wielding giant broadswords.',
    powers: 'Class 100+ gamma strength and regenerative healing, mastery of the Old Power (manipulating earth, stone, tectonic plates, and magma), and master gladiatorial broadsword combatant.',
    birth: 'Planet Sakaar (The Great Arena)',
    death: 'Alive (Son of Hulk & Earth Protector)',
    bgColor: '#558b2f', // Sakaarian Old Power Olive
    fontFamily: 'Hulk',
  },
  {
    id: 288,
    name: 'Nico Minoru',
    originalName: 'Nico Minoru / Sister Grimm',
    photo: '/nico-minoru.png',
    description: 'A teenage goth witch who discovered her parents were members of the evil occult syndicate known as the Pride. Wielding the mystical Staff of One—which emerges from her chest when she bleeds—Nico commands powerful spells with the condition that she can never cast the same phrase twice.',
    powers: 'Wielder of the Staff of One (blood-magic casting reality-altering spells, portal creation, telekinesis, and elemental transmutations with unique spoken words), and Midnight Suns mystic champion.',
    birth: 'Los Angeles, California',
    death: 'Alive (Leader of the Runaways & Midnight Sun)',
    bgColor: '#4a148c', // Blood Magic Mystic Plum
    fontFamily: 'Doctor Strange',
  },
  {
    id: 289,
    name: 'Karolina Dean',
    originalName: 'Karolina Dean / Lucy in the Sky',
    photo: '/karolina-dean.png',
    description: 'A warm-hearted young woman who discovered her Hollywood actor parents were actually exiled alien invaders of the Majesdane race. Removing her solar-dampening bracelet, Karolina manifests breathtaking bioluminescent rainbow solar energy and flight.',
    powers: 'Majesdanean solar radiation manipulation (translucent rainbow solar aura, photon laser blasts, hard-light force fields, faster-than-sound flight), and total invulnerability in solar form.',
    birth: 'Los Angeles, California',
    death: 'Alive (Runaways Hero & Majesdanean Ambassador)',
    bgColor: '#00acc1', // Bioluminescent Solar Rainbow Cyan
    fontFamily: 'Avengers',
  },
  {
    id: 289,
    name: 'Chase Stein',
    originalName: 'Chase Stein / Talkback',
    photo: '/chase-stein.png',
    description: 'The rebellious high school athlete son of mad-scientist parents in the Pride. Stealing his father\'s high-tech weaponized "Fistigons" gauntlets and X-ray goggles, Chase serves as the heavy artillery and technological pilot of the Runaways.',
    powers: 'High-tech Fistigons gauntlets (emitting flame streams, concussive electrical blasts, and magnetic shockwaves), X-ray goggles, pilot of the Leapfrog transport, and mechanical engineering improvisation.',
    birth: 'Los Angeles, California',
    death: 'Alive (Runaways Tech Specialist & Pilot)',
    bgColor: '#bf360c', // Fistigons Fire Ochre
    fontFamily: 'Iron Man',
  },
  {
    id: 290,
    name: 'Molly Hayes',
    originalName: 'Molly Hayes / Princess Powerful',
    photo: '/molly-hayes.png',
    description: 'The youngest member of the Runaways whose mutant powers grant her jaw-dropping, colossal superhuman strength. Despite falling asleep after extreme exertion, Molly has punched out giants, stopped speeding trains, and stood up to Wolverine with pure innocence and guts.',
    powers: 'Incredible Class 50+ superhuman physical strength, invulnerability during exertion, glowing bioluminescent pink eyes, and indomitable courage.',
    birth: 'Los Angeles, California',
    death: 'Alive (Runaways Muscle & Mutant Hero)',
    bgColor: '#d81b60', // Princess Powerful Magenta Pink
    fontFamily: 'Avengers',
  },

  // 5. Avengers, Defenders & Street Knights (17)
  {
    id: 291,
    name: 'Blue Marvel',
    originalName: 'Dr. Adam Bernard Brashear',
    photo: '/blue-marvel.png',
    description: 'A brilliant Cornell physicist, decorated Korean War veteran, and fullback whose molecular antimatter reactor experiment transformed him into an antimatter generator. With godlike strength matching Thor and Sentry, Blue Marvel is one of Earth\'s greatest scientific minds.',
    powers: 'Antimatter energy generation and manipulation, Class 100+ superhuman strength, invulnerability, lightspeed flight, matter manipulation on a subatomic scale, and Nobel-tier theoretical physics genius.',
    birth: 'Chicago, Illinois',
    death: 'Alive (Ultimates Leader, Quantum Physicist & Senior Avenger)',
    bgColor: '#0d47a1', // Antimatter Quantum Deep Blue
    fontFamily: 'Avengers',
  },
  {
    id: 292,
    name: 'Captain Britain',
    originalName: 'Sir Brian Braddock',
    photo: '/captain-britain.png',
    description: 'Chosen by the legendary wizard Merlyn and his daughter Roma to become the champion of the British Isles after choosing the Amulet of Right over the Sword of Might. Powered by the interdimensional magic of the Otherworld, Brian protects the multiverse with the Captain Britain Corps.',
    powers: 'Mystical Otherworld energy empowerment (Class 90+ strength, supersonic flight, impenetrable force fields, and endurance proportional to his self-belief), and Captain Britain Corps leadership.',
    birth: 'Maldon, Essex, England',
    death: 'Alive (Champion of Otherworld & Excalibur Leader)',
    bgColor: '#b71c1c', // Union Jack Royal Red & Blue
    fontFamily: 'Avengers',
  },
  {
    id: 293,
    name: 'Tigra',
    originalName: 'Greer Grant Nelson',
    photo: '/tigra.png',
    description: 'A laboratory assistant transformed by the mystical Cat People of the Cat Kingdom using an ancient mystic amulet. Bonding with the predatory feline spirit of the Tigra, Greer became an agile, fierce defender of the Avengers and the West Coast Avengers.',
    powers: 'Feline mutant physiology (superhuman speed, agility, razor claws and fangs, acute tracking senses, night vision, and superhuman leaping), cat-like reflexes, and master martial artist.',
    birth: 'Chicago, Illinois',
    death: 'Alive (West Coast Avengers Founding Member)',
    bgColor: '#e65100', // Striped Cat Feline Orange
    fontFamily: 'Avengers',
  },
  {
    id: 294,
    name: 'White Tiger',
    originalName: 'Ava Ayala',
    photo: '/white-tiger.png',
    description: 'The fifth hero to bear the White Tiger mantle, inheriting the mystical Jade Tiger Amulet of K\'un-Lun after her brother Hector was slain. Channeling the fierce avatar of the White Tiger God, Ava combines lethal martial arts with superhuman reflexes in the Avengers Academy and Champions.',
    powers: 'Jade Tiger Amulet empowerment (superhuman agility, reflexes, razor-sharp claws, enhanced sensory tracking, and tiger god speed), master of global martial arts, and acrobatics.',
    birth: 'New York City, New York',
    death: 'Alive (White Tiger God Champion & Avenger)',
    bgColor: '#00695c', // Jade Amulet Emerald Teal
    fontFamily: 'Avengers',
  },
  {
    id: 295,
    name: 'Swordsman',
    originalName: 'Jacques Duquesne',
    photo: '/swordsman.png',
    description: 'A master French blade acrobatic mercenary and carnival performer who mentored young Clint Barton (Hawkeye) in archery and combat. Wielding a makluan-enhanced sword capable of firing energy beams and flame, Swordsman proved his true nobility as an Avenger.',
    powers: 'World-class swordsmanship and blade combat mastery, makluan energy sword (projecting concussive force blasts, disintegrator rays, and flame streams), and Olympic-level acrobatics.',
    birth: 'Sin-Cong (Southeast Asia / France)',
    death: 'Sacrificed heroically to save Mantis / Active across Multiverse',
    bgColor: '#33691e', // Renaissance Duellist Olive Green
    fontFamily: 'Hawkeye',
  },
  {
    id: 296,
    name: 'Mockingbird',
    originalName: 'Dr. Barbara "Bobbi" Morse',
    photo: '/mockingbird.png',
    description: 'A brilliant biochemist and top S.H.I.E.L.D. operative Agent 19 who was injected with an experimental synthesis of the Super-Soldier Serum and the Infinity Formula. Wielding dual telescoping battle staves, Bobbi is a premier martial artist and Avenger.',
    powers: 'Enhanced Super-Soldier physical agility and accelerated healing, mastery of dual telescoping battle staves, master of espionage, gymnastics, and biochemist intellect.',
    birth: 'San Diego, California',
    death: 'Alive (S.H.I.E.L.D. Agent 19 & West Coast Avenger)',
    bgColor: '#0277bd', // Agent 19 Spec-Ops Blue
    fontFamily: 'Hawkeye',
  },
  {
    id: 297,
    name: 'Hellcat',
    originalName: 'Patricia "Patsy" Walker',
    photo: '/hellcat.png',
    description: 'A beloved comic book icon who trained extensively in martial arts and donned the discarded Cat suit to become the superhero Hellcat. Further trained on Titan and married to Daimon Hellstrom, Patsy commands a psychic demon-sensing sixth sense.',
    powers: 'Retractable claw gloves and grappling hook cables, master martial artist, demon-sensing psychic vision, supernatural resistance, and Olympic-level gymnastics.',
    birth: 'Centerville, California',
    death: 'Alive (Defender, Avenger & Hellcat Hero)',
    bgColor: '#fbc02d', // Golden Feline Amber
    fontFamily: 'Daredevil',
  },
  {
    id: 298,
    name: 'Colleen Wing',
    originalName: 'Colleen Wing',
    photo: '/colleen-wing.png',
    description: 'A master samurai swordsman descended from a line of ancient samurai who was trained in Kenjutsu by her grandfather in Japan. Partnering with Misty Knight as the Daughters of the Dragon and channeling the mystical Chi of the Iron Fist into her katana, Colleen protects the streets of New York.',
    powers: 'Master Kenjutsu samurai swordswoman, Chi channeling through blade (superheating steel and cutting through armored titanium), expert martial artist, and private investigator.',
    birth: 'Honshu, Japan',
    death: 'Alive (Daughter of the Dragon & Iron Fist Defender)',
    bgColor: '#ffffff', // Pure White Samurai Gi & Red
    fontFamily: 'Daredevil',
  },
  {
    id: 299,
    name: 'Misty Knight',
    originalName: 'Mercedes "Misty" Knight',
    photo: '/misty-knight.png',
    description: 'A decorated NYPD detective who lost her right arm while heroically disposing of a terrorist bomb. Fitted with a state-of-the-art bionic arm forged from vibranium and diamond by Tony Stark, Misty co-founded the Daughters of the Dragon and Heroes for Hire.',
    powers: 'Vibranium bionic arm (crushing steel, emitting concussive blasts, technopathic machine hacking, and generating localized force fields), master marksman, and expert detective.',
    birth: 'Harlem, New York City',
    death: 'Alive (Daughter of the Dragon & Defender of Harlem)',
    bgColor: '#b71c1c', // Bionic Vibranium Crimson
    fontFamily: 'Daredevil',
  },
  {
    id: 300,
    name: 'Stick',
    originalName: 'Stick',
    photo: '/stick.png',
    description: 'The blind grandmaster martial artist and leader of the Chaste, an ancient warrior order dedicated to destroying the Hand. Mentoring young Matt Murdock (Daredevil) and Elektra in blindness sensory mastery and lethal combat, Stick is the ultimate shadow mentor.',
    powers: 'Superhuman sensory radar perception exceeding sight, mastery of all ancient global martial arts and ninjutsu, Chi manipulation, stealth evasion, and lethal staff combat.',
    birth: 'Ancient era (Unknown)',
    death: 'Sacrificed in battle against the Hand / Immortal in legend',
    bgColor: '#4e342e', // Master Cane Rustic Brown
    fontFamily: 'Daredevil',
  },
  {
    id: 301,
    name: 'Hit-Monkey',
    originalName: 'Hit-Monkey',
    photo: '/hit-monkey.png',
    description: 'A Japanese macaque monkey living in the mountains whose tribe was slaughtered by corrupt assassins. Taking the weapons and suit of a fallen hitman, Hit-Monkey mastered dual-pistol gun-kata to become the world\'s deadliest, most sharply-dressed simian assassin.',
    powers: 'Superhuman simian agility, acrobatic wall-leaping, master dual-wielding pistol marksman (expert in gun-kata), hand-to-hand combat mastery, and ghost-whispering.',
    birth: 'Japanese Alps, Japan',
    death: 'Alive (The World\'s Greatest Simian Hitman)',
    bgColor: '#263238', // Sharp Tuxedo Charcoal & Crimson
    fontFamily: 'Deadpool',
  },
  {
    id: 302,
    name: 'Jack of Hearts',
    originalName: 'Jack Hart',
    photo: '/jack-of-hearts.png',
    description: 'The son of a human scientist and an alien woman from the Contraxian race who was doused in the miraculous energy liquid Zero Fluid. Wearing a customized containment suit modeled after a playing card, Jack can unleash world-shattering zero-point nuclear blasts.',
    powers: 'Zero-Point Energy projection (firing devastating nuclear concussive blasts, matter destruction, and flight via thermal thrust), Class 50+ strength, and tactical Avengers combatant.',
    birth: 'New Haven, Connecticut',
    death: 'Alive (Cosmic Avenger & Zero Fluid Conduit)',
    bgColor: '#b71c1c', // Zero Fluid Playing Card Crimson
    fontFamily: 'Avengers',
  },
  {
    id: 303,
    name: 'Rick Jones (A-Bomb)',
    originalName: 'Richard Milhouse Jones',
    photo: '/rick-jones.png',
    description: 'The brave teenager who drove onto the gamma bomb test site, prompting Bruce Banner to save his life. Serving as the honorary partner of Hulk, Captain America, and Captain Marvel, Rick was later transformed by the Leader and MODOK into the armored blue behemoth A-Bomb.',
    powers: 'Armored blue gamma carapace hide impervious to missiles and extreme heat, Class 100+ superhuman strength, camouflaging cloaking scales, and honorary Avenger tactical courage.',
    birth: 'Scarsdale, New York',
    death: 'Alive (Honorary Avenger & Gamma Powerhouse)',
    bgColor: '#0d47a1', // Armored Blue A-Bomb Indigo
    fontFamily: 'Hulk',
  },
  {
    id: 304,
    name: 'Doc Samson',
    originalName: 'Dr. Leonard Samson',
    photo: '/doc-samson.png',
    description: 'A brilliant psychiatrist who siphoned off a portion of the Hulk\'s gamma radiation into himself, transforming his hair into long green locks and granting him superhuman strength proportional to the length of his hair, like biblical Samson.',
    powers: 'Class 75+ gamma superhuman strength and durability, Olympic-tier leaping, rapid healing, and world-class psychiatric counseling for superhumans and Avengers.',
    birth: 'Tulsa, Oklahoma',
    death: 'Alive (Gamma Psychiatrist & Superhero Therapist)',
    bgColor: '#2e7d32', // Samson Gamma Green
    fontFamily: 'Hulk',
  },
  {
    id: 305,
    name: 'Betty Ross (Red She-Hulk)',
    originalName: 'Elizabeth "Betty" Ross',
    photo: '/betty-ross.png',
    description: 'The daughter of General Thunderbolt Ross and the true love of Bruce Banner. Resurrected by the Intelligencia and transformed into the ferocious Red She-Hulk, Betty wields an enormous broadsword and radioactive red gamma fury.',
    powers: 'Red gamma superhuman physical strength matching Hulk, energy absorption (draining gamma energy from opponents), seismic shockwave generation, and greatsword combat mastery.',
    birth: 'Los Alamos, New Mexico',
    death: 'Alive (Red She-Hulk & Gamma Champion)',
    bgColor: '#b71c1c', // Red Gamma Blaze Crimson
    fontFamily: 'Hulk',
  },
  {
    id: 306,
    name: 'Union Jack',
    originalName: 'Joseph "Joey" Chapman',
    photo: '/union-jack.png',
    description: 'A working-class hero from Manchester who inherited the heroic mantle of Union Jack to defend Great Britain. Equipped with a silver-plated Webley revolver, a combat dagger, and bulletproof armor, Joey fights alongside the Invaders and MI:13.',
    powers: 'Peak human physical conditioning and endurance, master martial artist and knife-fighter, expert marksman with Webley revolver, and tactical British intelligence operative.',
    birth: 'Manchester, England',
    death: 'Alive (Champion of Britain & MI:13 Operative)',
    bgColor: '#0d47a1', // Union Jack British Blue
    fontFamily: 'American Captain',
  },
  {
    id: 307,
    name: 'Spitfire',
    originalName: 'Lady Jacqueline Falsworth',
    photo: '/spitfire.png',
    description: 'The daughter of the original Union Jack (Lord Montgomery Falsworth) who received a lifesaving blood transfusion from the original android Human Torch after being attacked by Baron Blood. Developing superhuman speed and vampiric traits, Spitfire is an elite British hero.',
    powers: 'Superhuman running speed (up to 300+ mph), rapid reflexes, thermal trail generation, enhanced vampire fangs and durability, and MI:13 intelligence veteran.',
    birth: 'Falsworth Manor, Gloucestershire, England',
    death: 'Alive (Invaders Veteran & MI:13 Agent)',
    bgColor: '#c2185b', // Spitfire Speedster Ruby
    fontFamily: 'Avengers',
  },

  // 6. Supernatural, Dark Mystics & Midnight Sons (8)
  {
    id: 308,
    name: 'Ghost Rider (Danny Ketch)',
    originalName: 'Daniel "Danny" Ketch',
    photo: '/danny-ketch.png',
    description: 'The long-lost brother of Johnny Blaze who touched the enchanted gas cap of a customized motorcycle in a Cypress Hills cemetery. Bonded with the Spirit of Corruption and Vengeance, Danny wields glowing hellfire chains and the legendary Penance Stare.',
    powers: 'Hellfire projection and chain manipulation (controlling indestructible mystical chains that strike at will), supernatural hellcycle ride, Penance Stare, and superhuman durability.',
    birth: 'Brooklyn, New York City',
    death: 'Immortal (Spirit of Corruption & Midnight Sons Champion)',
    bgColor: '#00838f', // Mystic Cyan Hellfire
    fontFamily: 'Ghost Rider',
  },
  {
    id: 309,
    name: 'Daimon Hellstrom',
    originalName: 'Daimon Hellstrom / Son of Satan',
    photo: '/daimon-hellstrom.png',
    description: 'The half-human son of the demon lord Marduk Kurios who rejected his father\'s demonic empire. Wielding an ancient Netheranium trident that channels burning soulfire, Daimon operates as an occult investigator and Midnight Son.',
    powers: 'Soulfire manipulation and projection via Netheranium Trident, high occult sorcery, exorcism, flight, superhuman strength, and dark dimensional transport.',
    birth: 'Fire Lake, Massachusetts',
    death: 'Immortal (Hellstorm & Occult Master)',
    bgColor: '#b71c1c', // Netherworld Soulfire Red
    fontFamily: 'Doctor Strange',
  },
  {
    id: 310,
    name: 'Satana Hellstrom',
    originalName: 'Satana Hellstrom / Devil\'s Daughter',
    photo: '/satana.png',
    description: 'The half-human, half-succubus sister of Daimon Hellstrom who was trained in the dark arts within the fiery pits of Hell. Defying her demonic father to protect humanity, Satana uses her soul-draining charms to destroy dark curses alongside the Midnight Sons.',
    powers: 'Succubus soul extraction (draining the life and souls of evil entities), high dark magic, pyrokinesis, levitation, astral travel, and demonic hypnosis.',
    birth: 'Fire Lake, Massachusetts (Raised in Hell)',
    death: 'Immortal (Succubus Sorceress & Midnight Sun)',
    bgColor: '#880e4f', // Succubus Velvet Crimson
    fontFamily: 'Doctor Strange',
  },
  {
    id: 311,
    name: 'Jennifer Kale',
    originalName: 'Jennifer Kale',
    photo: '/jennifer-kale.png',
    description: 'A powerful Floridian sorceress descended from an ancient bloodline of Atlantean mages and the cousin of Johnny Blaze and Danny Ketch. Guardian of the mystical Tome of Zhered-Na and ally of the Man-Thing, Jennifer crafts potent potions and wards.',
    powers: 'Master of Atlantean high sorcery and potion crafting (casting ancient Zhered-Na spells, mystical shielding, elemental banishments, and astral sensing), and Midnight Sons mystic.',
    birth: 'Citrusville, Florida',
    death: 'Alive (High Sorceress of Zhered-Na & Salem Coven)',
    bgColor: '#6a1b9a', // Atlantean Potion Violet
    fontFamily: 'Doctor Strange',
  },
  {
    id: 312,
    name: 'Lilia Calderu',
    originalName: 'Lilia Calderu',
    photo: '/lilia-calderu.png',
    description: 'A 450-year-old Sicilian witch and hereditary keeper of the Book of Cagliostro. Possessing the gift of non-linear precognition and divination through tarot, Lilia walked the Witches\' Road with Agatha Harkness to fulfill her legendary destiny.',
    powers: 'Non-linear precognition (experiencing past, present, and future simultaneously), Tarot divination and fate manipulation, coven warding, and ancient Sicilian witchcraft.',
    birth: 'c. 1570s (Sicily, Italy)',
    death: 'Sacrificed heroically on the Witches\' Road (Immortalized in legend)',
    bgColor: '#ffb300', // Tarot Divination Sun Gold
    fontFamily: 'Doctor Strange',
  },
  {
    id: 313,
    name: 'Alice Wu-Gulliver',
    originalName: 'Alice Wu-Gulliver',
    photo: '/alice-wu.png',
    description: 'A former police officer and the daughter of the legendary protection witch Lorna Wu. Carrying her mother\'s enchanted talisman and rock anthem protection spells, Alice walked the Witches\' Road to banish a generational generational curse.',
    powers: 'Hereditary protection witchcraft (manifesting impenetrable aegis shields, warding off curses, and deflecting dark magical projectiles), tactical law enforcement combat, and firearms.',
    birth: 'San Francisco, California',
    death: 'Alive (Protection Witch of the Witches\' Road)',
    bgColor: '#d84315', // Aegis Shield Ember Orange
    fontFamily: 'Doctor Strange',
  },
  {
    id: 314,
    name: 'Dracula',
    originalName: 'Vlad Dracula / Lord of Vampires',
    photo: '/dracula.png',
    description: 'The ancient 15th-century Transylvanian warlord who was transformed into the supreme Lord of Vampires. Ruling the undead with absolute hypnotic dominion and dark sorcery, Dracula is the eternal nemesis of Blade and the Midnight Sons.',
    powers: 'Supreme vampire physiology (Class 30+ strength, ultrasonic speed, shapeshifting into bats, wolves, and mist, weather manipulation, and hypnotic mind control), and dark blood sorcery.',
    birth: '1430 (Sighișoara, Transylvania, Romania)',
    death: 'Undead Immortal (Supreme Lord of Vampires)',
    bgColor: '#b71c1c', // Transylvanian Blood Red
    fontFamily: 'Blade',
  },
  {
    id: 315,
    name: 'Deacon Frost',
    originalName: 'Dr. Deacon Frost',
    photo: '/deacon-frost.png',
    description: 'A corrupt German scientist seeking eternal life who injected himself with the blood of a vampire, becoming a unique vampire whose bite produces doppelgänger clones. Frost is the vampire who bit Blade\'s mother, unintentionally creating the Daywalker.',
    powers: 'Vampiric clone creation (producing obedient vampire doppelgängers from victims\' blood), blood god La Magra summoning, superhuman speed and agility, and razor fangs.',
    birth: 'Munich, Germany',
    death: '1998 (Disintegrated by Blade\'s EDTA blood-coagulant darts)',
    bgColor: '#37474f', // Blood God Obsidian Slate
    fontFamily: 'Blade',
  },

  // 7. Villains, Masterminds & Thunderbolts (7)
  {
    id: 316,
    name: 'The Leader',
    originalName: 'Dr. Samuel Sterns',
    photo: '/the-leader.png',
    description: 'A chemical plant worker exposed to massive amounts of gamma radiation which enlarged his brain into an enormous cranium, granting him superhuman intellect, telepathy, and mental domination. As Hulk\'s cerebral arch-nemesis, the Leader orchestrates global conspiracies.',
    powers: 'Hyper-genius intellect with photographic memory and quantum intuition, telepathy and mind control, telekinesis, gamma ray synthesis, and master tactician.',
    birth: 'Boise, Idaho',
    death: 'Alive (Mastermind of the Intelligencia & Gamma Tyrant)',
    bgColor: '#2e7d32', // Mega-Brain Gamma Green
    fontFamily: 'Hulk',
  },
  {
    id: 317,
    name: 'Baron Wolfgang von Strucker',
    originalName: 'Baron Wolfgang von Strucker',
    photo: '/baron-strucker.png',
    description: 'A Prussian nobleman and one of the primary supreme leaders of HYDRA. Armed with the life-draining Satan Claw gauntlet and enhanced with the Deathspore Virus, Strucker established the Sokovia research facility, experimenting on the Maximoff twins with the Mind Stone.',
    powers: 'Satan Claw gauntlet (crushing grip, life-drain energy siphoning, and electrical shocks), slowed aging via Deathspore Virus, master swordsman, and supreme global HYDRA commander.',
    birth: 'Bavaria, Germany',
    death: '2015 (Sokovia, killed by Ultron in prison cell)',
    bgColor: '#1b5e20', // HYDRA Supreme Deep Green
    fontFamily: 'American Captain',
  },
  {
    id: 318,
    name: 'Madame Hydra (Viper)',
    originalName: 'Ophelia Sarkissian',
    photo: '/madame-hydra.png',
    description: 'An orphan raised in Eastern Europe who rose through the ranks of international crime to become the supreme ruler of HYDRA and the criminal island of Madripoor. A master of lethal toxins and political assassination, Viper commands fanatical loyalty.',
    powers: 'Complete immunity to all known terrestrial and alien toxins and venoms, master of biochemical toxicology and poisons, master martial artist and marksman, and supreme HYDRA ruler.',
    birth: 'Hungary',
    death: 'Alive (Supreme Leader of HYDRA & Princess of Madripoor)',
    bgColor: '#2e7d32', // Viper Venomous Emerald
    fontFamily: 'American Captain',
  },
  {
    id: 319,
    name: 'Songbird',
    originalName: 'Melissa Joan Gold / Screaming Mimi',
    photo: '/songbird.png',
    description: 'A runaway who gained a sonic vocal harness as Screaming Mimi before joining Baron Zemo\'s undercover Masters of Evil. Posing as heroes in the Thunderbolts, Melissa discovered she genuinely loved helping people, stepping forward as the heroic leader of the Thunderbolts.',
    powers: 'Acoustikinesis via sonic harness (generating hard-sound solid light wings for supersonic flight, concussive sonic blasts, and acoustic force fields), and master Thunderbolts field commander.',
    birth: 'Cleveland, Ohio',
    death: 'Alive (Leader of the Thunderbolts & Hero of NYC)',
    bgColor: '#ec407a', // Hard-Sound Sonic Rose Pink
    fontFamily: 'Avengers',
  },
  {
    id: 320,
    name: 'Moonstone',
    originalName: 'Dr. Karla Sofen',
    photo: '/moonstone.png',
    description: 'A ruthless psychiatrist who manipulated a patient into surrendering an alien Kree gravity gemstone known as the Moonstone. Absorbing it into her body, Karla gained intangible flight and photon blasts, joining the Thunderbolts and Osborn\'s Dark Avengers as Ms. Marvel.',
    powers: 'Kree Moonstone gravity manipulation (superhuman strength, flight, photon energy projection, molecular intangibility phasing, and light generation), and manipulative psychoanalysis.',
    birth: 'Van Nuys, California',
    death: 'Alive (Dark Avengers Ms. Marvel & Thunderbolts)',
    bgColor: '#0288d1', // Kree Moonstone Cyan
    fontFamily: 'Captain Marvel',
  },
  {
    id: 321,
    name: 'Crimson Dynamo',
    originalName: 'Dimitri Bukharin / Anton Vanko',
    photo: '/crimson-dynamo.png',
    description: 'The pride of Soviet armored engineering, the Crimson Dynamo is a colossal suit of powered exoskeleton armor designed to rival Iron Man. Armed with high-voltage carborundum matrix generators and plasma cannons, Dynamo leads the Winter Guard.',
    powers: 'Powered exoskeleton armor (Class 80+ strength, supersonic flight thrusters, high-voltage electrical arc blasts, chest fusion matrix, and titanium shielding), and Winter Guard leadership.',
    birth: 'Moscow, Russia',
    death: 'Alive (Winter Guard Leader & Soviet Armored Titan)',
    bgColor: '#b71c1c', // Soviet Crimson Steel
    fontFamily: 'Iron Man',
  },
  {
    id: 322,
    name: 'Typhoid Mary',
    originalName: 'Mary Alice Walker',
    photo: '/typhoid-mary.png',
    description: 'A lethal mutant assassin who suffers from dissociative identity disorder with distinct personas: timid Mary, lustful Typhoid, and bloodthirsty Bloody Mary. Wielding telekinesis, pyrokinesis, and dual machetes, Mary is Kingpin\'s deadliest operative and wife.',
    powers: 'Pyrokinesis (igniting spontaneous flames), low-level telekinesis, psychological martial arts mastery, dual machete expertise, and enhanced agility.',
    birth: 'Queens, New York City',
    death: 'Alive (Kingpin\'s Enforcer & Mutant Assassin)',
    bgColor: '#c2185b', // Typhoid Fever Crimson
    fontFamily: 'Daredevil',
  },
  {
    id: 323,
    name: 'Gorr\'s Daughter (Love)',
    originalName: 'Love (Eternity\'s Child)',
    photo: '/love.png',
    description: 'The innocent daughter of Gorr the God Butcher reborn through Eternity\'s boundless genesis. Equipped with Stormbreaker and trained by Thor, Love defends peaceful civilizations across the cosmos with radiant golden energy.',
    powers: 'Cosmic beam projection from eyes and hands, enhanced godlike durability, and mastery of the enchanted uru war-hammer Stormbreaker.',
    birth: 'Resurrected at Eternity\'s Altar',
    death: 'Alive (Thor\'s Adoptive Daughter & Cosmic Defender)',
    bgColor: '#e65100', // Cosmic Gold & Amber
    fontFamily: 'Thor',
  }
];

// Helper to update files
export async function applyAll() {
  const charactersFile = path.resolve('src/assets/characters.js');
  const timelineFile = path.resolve('src/assets/timelineData.js');

  // Read characters.js
  let charContent = fs.readFileSync(charactersFile, 'utf8');
  // Check if already contains ID 224
  if (!charContent.includes('id: 224')) {
    // replace ending
    const lastBracketIndex = charContent.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
      const formatted = newCharacters.map(c => JSON.stringify(c, null, 2)).join(',\n');
      const newCharContent = charContent.slice(0, lastBracketIndex) + ',\n' + formatted + '\n];\n\nexport default characters;\n';
      fs.writeFileSync(charactersFile, newCharContent, 'utf8');
      console.log('Successfully updated src/assets/characters.js with 100 new characters!');
    }
  }

  // Update timelineData.js
  let tlContent = fs.readFileSync(timelineFile, 'utf8');

  // Add posters
  const posterEntries = newCharacters.map(c => `  '${c.name}': '${c.photo}',`).join('\n');
  if (!tlContent.includes("'Silk': '/silk.png'")) {
    tlContent = tlContent.replace("  'Mephisto': '/mephisto.png',", "  'Mephisto': '/mephisto.png',\n" + posterEntries);
  }

  // Add characterMovieTimeline
  const timelineEntries = newCharacters.map(c => `  '${c.name}': {
    beforeMCU: [],
    mcu: [
      { title: 'Avengers: Secret Wars', year: 2027, note: '${c.description.split('.')[0].replace(/'/g, "\\'")}' },
    ],
  },`).join('\n');

  if (!tlContent.includes("'Silk': {")) {
    tlContent = tlContent.replace("  'Mephisto': {", timelineEntries + "\n  'Mephisto': {");
  }

  // Add movieEvents
  const eventEntries = newCharacters.map(c => `  '${c.name}': '${c.description.split('.')[0].replace(/'/g, "’")}.',`).join('\n');
  if (!tlContent.includes("'Silk': 'A Korean-American")) {
    tlContent = tlContent.replace("  'Mephisto': 'Mephisto bargains", eventEntries + "\n  'Mephisto': 'Mephisto bargains");
  }

  fs.writeFileSync(timelineFile, tlContent, 'utf8');
  console.log('Successfully updated src/assets/timelineData.js!');
}

applyAll();
