// src/components/Timeline.jsx
// Timeline component for character-specific movies
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import characters from '../assets/characters';

// Movie posters mapping (add your images to public/ and map here)
// Prioritize character-specific posters where available, otherwise use a generic.
const moviePosters = {
  'The Avengers': '/movies/the-avengers.jpg',
  'Iron Man': '/movies/iron-man.jpg',
  'Iron Man 2': '/movies/iron-man-2.jpg',
  'Iron Man 3': '/movies/iron-man-3.jpg',
  'Captain America: The First Avenger': '/movies/the-first-avenger.jpg',
  'Captain America: The Winter Soldier': '/movies/the-winter-soldier.jpg',
  'Captain America: Civil War': '/movies/civil-war.jpg',
  'Thor': '/movies/thor.jpg',
  'Thor: The Dark World': '/movies/the-dark-world.jpg',
  'Thor: Ragnarok': '/movies/ragnarok.jpg',
  'The Incredible Hulk': '/movies/the-incredible-hulk.jpg',
  'Hulk': '/movies/hulk.jpg',
  'Black Widow': '/movies/black-widow.jpg',
  'Spider-Man 3': '/movies/spiderman-3.jpg',
  'Spider-Man': '/movies/spiderman.jpg',
  'Spider-Man 2': '/movies/spiderman-2.jpg',
  'The Amazing Spider-Man': '/movies/amazing-spiderman.jpg',
  'The Amazing Spider-Man 2': '/movies/amazing-spiderman-2.jpg',
  'Spider-Man: Homecoming': '/movies/spiderman-homecoming.jpg',
  'Spider-Man: Far From Home': '/movies/far-from-home.jpg',
  'Spider-Man: No Way Home': '/movies/no-way-home.jpg',
  'Avengers: Age of Ultron': '/movies/age-of-ultron.jpg',
  'Avengers: Infinity War': '/movies/infinity-war.jpg',
  'Avengers: Endgame': '/movies/endgame.jpg',
  'Ant-Man': '/movies/ant-man.jpg',
  'Ant-Man and the Wasp': '/movies/ant-man-and-the-wasp.jpg',
  'Guardians of the Galaxy': '/movies/guardians-of-the-galaxy.jpg',
  'Guardians of the Galaxy Vol. 2': '/movies/guardians-of-the-galaxy-2.jpg',
  'Doctor Strange': '/movies/dr-strange.jpg',
  'Captain Marvel': '/movies/captain-marvel.jpg',
  'Black Panther': '/movies/black-panther.jpg',
  // Specific character posters
  'Captain America 1944': '/movies/captain-america-1944.jpg',
  'Captain America 1979': '/movies/captain-america-1979.jpg',
  'Captain America II: Death Too Soon': '/movies/death-too-soon.jpg',
  'Captain America 1990': '/movies/captain-america-1990.jpg',
  'Hawkeye': '/hawkeye.png',
  'Scarlet Witch': '/scarlet-witch.png',
  'Vision': '/vision.png',
  'War Machine': '/war-machine.png',
  'Falcon': '/falcon.png',
  'Winter Soldier': '/winter-soldier.png',
  'Gamora': '/gamora.png',
  'Nebula': '/nebula.png',
  'Star-Lord': '/star-lord.png',
  'Rocket Raccoon': '/rocket.png',
  'I am Groot': '/movies/groot.jpg',
  'Drax the Destroyer': '/drax.png',
  'Mantis': '/mantis.png',
  'Okoye': '/okoye.png',
  'Wong': '/wong.png',
  'Valkyrie': '/valkyrie.png',
  'Ancient One': '/ancient-one.png',
  'Nick Fury': '/nick-fury.png',
  'Pepper Potts': '/pepper-potts.png',
  'Thanos': '/thanos.png',
  'Deadpool': '/movies/deadpool.jpg',
  'Deadpool 2': '/movies/deadpool-2.jpg',
  'X-Men Origins: Wolverine': '/movies/wolverine.jpg',
  'Deadpool & Wolverine': '/movies/deadpool-&-wolverine.jpg',
  'Venom': '/movies/venom.jpg',
  'Venom: Let There Be Carnage': '/movies/let-there-be-carnage.jpg',
  'Loki': '/movies/loki.jpg',
  'What If...?': '/movies/what-if.jpg',
  'Wasp': '/wasp.png',
  'Quicksilver': '/quick-sliver.png',
  'Wolverine': '/wolverine.png',
  'The Wolverine': '/movies/wolverine.jpg',
  'Logan': '/movies/wolverine.jpg',
  'X-Men': '/movies/wolverine.jpg',
  'X2: X-Men United': '/movies/wolverine.jpg',
  'X-Men: The Last Stand': '/movies/wolverine.jpg',
  'X-Men: Days of Future Past': '/movies/wolverine.jpg',
  'Shang-Chi and the Legend of the Ten Rings': '/movies/shang-chi.jpg',
  'Shang-Chi': '/shang-chi.png',
  'Moon Knight': '/movies/moon-knight.jpg',
  'Daredevil': '/movies/daredevil.jpg',
  'Punisher': '/movies/punisher.jpg',
  'The Punisher': '/movies/punisher.jpg',
  'Daredevil: Born Again': '/movies/daredevil.jpg',
  'Magneto': '/movies/magneto.jpg',
  'Blade': '/movies/blade.jpg',
  'Blade II': '/movies/blade.jpg',
  'Blade: Trinity': '/movies/blade.jpg',
  'Doctor Doom': '/movies/doctor-doom.jpg',
  'Fantastic Four': '/movies/doctor-doom.jpg',
  'Ghost Rider': '/movies/ghost-rider.jpg',
  'Ghost Rider: Spirit of Vengeance': '/movies/ghost-rider.jpg',
  'Professor X': '/movies/professor-x.jpg',
  'Captain Carter': '/movies/captain-carter.jpg',
  'She-Hulk': '/movies/she-hulk.jpg',
  'She-Hulk: Attorney at Law': '/movies/she-hulk.jpg',
  'Ms. Marvel': '/movies/ms-marvel.jpg',
  'The Marvels': '/movies/ms-marvel.jpg',
  'Silver Surfer': '/movies/silver-surfer.jpg',
  'Fantastic 4: Rise of the Silver Surfer': '/movies/silver-surfer.jpg',
  'The Fantastic Four: First Steps': '/movies/silver-surfer.jpg',
  'Mister Fantastic': '/movies/mister-fantastic.jpg',
  'Human Torch': '/movies/human-torch.jpg',
  'Gambit': '/movies/gambit.jpg',
  'Namor': '/movies/namor.jpg',
  'Green Goblin': '/movies/green-goblin.jpg',
  'Doctor Octopus': '/movies/doctor-octopus.jpg',
  'Invisible Woman': '/movies/invisible-woman.jpg',
  'The Thing': '/movies/the-thing.jpg',
  'Cable': '/movies/cable.jpg',
  'Colossus': '/movies/colossus.jpg',
  'Storm': '/movies/storm.jpg',
  'Cyclops': '/movies/cyclops.jpg',
  'Jean Grey': '/movies/jean-grey.jpg',
  'X-Men: Dark Phoenix': '/movies/jean-grey.jpg',
  'Rogue': '/movies/rogue.jpg',
  'Kingpin': '/movies/kingpin.jpg',
  'Kate Bishop': '/kate-bishop.png',
  'Yelena Belova': '/yelena-belova.png',
  'Shuri': '/shuri.png',
  'America Chavez': '/america-chavez.png',
  'Adam Warlock': '/adam-warlock.png',
  'Doctor Strange in the Multiverse of Madness': '/movies/dr-strange.jpg',
  'Black Panther: Wakanda Forever': '/movies/black-panther.jpg',
  'Guardians of the Galaxy Vol. 3': '/movies/guardians-of-the-galaxy-2.jpg',
  'Thunderbolts*': '/yelena-belova.png',
  'Young Avengers': '/ms-marvel.png',
  'Avengers: Doomsday': '/movies/endgame.jpg',
  'Avengers: Secret Wars': '/movies/infinity-war.jpg',
  'Korg': '/korg.png',
  'Red Guardian': '/red-guardian.png',
  'Monica Rambeau': '/monica-rambeau.png',
  'Ironheart': '/ironheart.png',
  'Cassie Lang': '/cassie-lang.png',
  'Echo': '/echo.png',
  'Taskmaster': '/taskmaster.png',
  'Agatha Harkness': '/agatha-harkness.png',
  'Kang the Conqueror': '/kang.png',
  'Abomination': '/abomination.png',
  'Thor: Love and Thunder': '/movies/thor.jpg',
  'WandaVision': '/scarlet-witch.png',
  'Agatha All Along': '/agatha-harkness.png',
  'Ant-Man and the Wasp: Quantumania': '/movies/ant-man.jpg',
  'Loki Season 1': '/movies/loki.jpg',
  'Loki Season 2': '/movies/loki.jpg',
  'Yondu Udonta': '/yondu.png',
  'Wenwu': '/wenwu.png',
  'Gorr the God Butcher': '/gorr.png',
  'Hercules': '/hercules.png',
  'High Evolutionary': '/high-evolutionary.png',
  'Ikaris': '/ikaris.png',
  'Thena': '/thena.png',
  'Sentry': '/sentry.png',
  'Mobius': '/mobius.png',
  'Sersi': '/sersi.png',
  'Eternals': '/sersi.png',
  'Mighty Thor': '/mighty-thor.png',
  'U.S. Agent': '/us-agent.png',
  'Ghost': '/ghost.png',
  'Happy Hogan': '/happy-hogan.png',
  'Maria Hill': '/maria-hill.png',
  'Kraglin': '/kraglin.png',
  'Makkari': '/makkari.png',
  'Druig': '/druig.png',
  'Phastos': '/phastos.png',
  'Kingo': '/kingo.png',
  'The Falcon and the Winter Soldier': '/falcon.png',
  'Secret Invasion': '/maria-hill.png',
  'The Guardians of the Galaxy Holiday Special': '/kraglin.png',
};

// Character movie timeline data (character name => { beforeMCU: [], mcu: [] })
const characterMovieTimeline = {
  'Iron Man': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008 },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Spider-Man: Homecoming', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Captain America': {
    beforeMCU: [
      { title: 'Captain America 1944', year: 1944, note: 'Serial film' },
      { title: 'Captain America 1979', year: 1979, note: 'TV film' },
      { title: 'Captain America II: Death Too Soon', year: 1979, note: 'TV film' },
      { title: 'Captain America 1990', year: 1990 },
    ],
    mcu: [
      { title: 'Captain America: The First Avenger', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Thor': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Thor: The Dark World', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Hulk': {
    beforeMCU: [
      { title: 'Hulk', year: 2003, note: 'Ang Lee film' },
    ],
    mcu: [
      { title: 'The Incredible Hulk', year: 2008 },
      { title: 'The Avengers', year: 2012, note: 'Mark Ruffalo takes over' },
      { title: 'Iron Man 3', year: 2013, note: 'Post-credits cameo' },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Black Widow': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
      { title: 'Black Widow', year: 2021, note: 'Set before Endgame' },
    ],
  },
  'Hawkeye': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011, note: 'Cameo' },
      { title: 'The Avengers', year: 2012 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Scarlet Witch': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The Winter Soldier', year: 2014, note: 'Post-credits cameo' },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Vision': {
    beforeMCU: [],
    mcu: [
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
    ],
  },
  'Captain Marvel': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain Marvel', year: 2019, note: 'Set in 1995' },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Doctor Strange': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Thor: Ragnarok', year: 2017, note: 'Mid-credits scene' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Black Panther': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Black Panther', year: 2018 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Spider-Man': {
    beforeMCU: [
      { title: 'Spider-Man', year: 2002, note: 'Tobey Maguire' },
      { title: 'Spider-Man 2', year: 2004, note: 'Tobey Maguire' },
      { title: 'Spider-Man 3', year: 2007, note: 'Tobey Maguire' },
      { title: 'The Amazing Spider-Man', year: 2012, note: 'Andrew Garfield' },
      { title: 'The Amazing Spider-Man 2', year: 2014, note: 'Andrew Garfield' },
    ],
    mcu: [
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Spider-Man: Homecoming', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
      { title: 'Spider-Man: Far From Home', year: 2019, note: 'Set after Endgame' },
      { title: 'Spider-Man: No Way Home', year: 2021 },
    ],
  },
  'Ant-Man': {
    beforeMCU: [],
    mcu: [
      { title: 'Ant-Man', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Ant-Man and the Wasp', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  // Add Wasp character
  'Wasp': {
    beforeMCU: [],
    mcu: [
      { title: 'Ant-Man', year: 2015, note: 'As Hope van Dyne, trains Scott Lang' },
      { title: 'Ant-Man and the Wasp', year: 2018, note: 'Becomes the Wasp' },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'War Machine': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008, note: 'As James Rhodes (Terrence Howard)' },
      { title: 'Iron Man 2', year: 2010, note: 'As War Machine (Don Cheadle)' },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Falcon': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Ant-Man', year: 2015, note: 'Cameo' },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Winter Soldier': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain America: The First Avenger', year: 2011, note: 'As Bucky Barnes' },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Captain America: Civil War', year: 2016 },
      { title: 'Black Panther', year: 2018, note: 'Post-credits scene' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Gamora': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Past version' },
    ],
  },
  'Nebula': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Star-Lord': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Rocket Raccoon': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Groot': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, note: 'As Baby Groot' },
      { title: 'Avengers: Infinity War', year: 2018, note: 'As Teen Groot' },
      { title: 'Avengers: Endgame', year: 2019, note: 'As Teen Groot' },
      { title: 'I am Groot', year: 2022, note: 'Disney+ animated shorts' },
    ],
  },
  'Drax the Destroyer': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Mantis': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Okoye': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Panther', year: 2018 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Wong': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Valkyrie': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Ancient One': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange', year: 2016 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Via time travel' },
    ],
  },
  'Nick Fury': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008, note: 'Post-credits cameo' },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'Thor', year: 2011, note: 'Post-credits cameo' },
      { title: 'Captain America: The First Avenger', year: 2011, note: 'Post-credits cameo' },
      { title: 'The Avengers', year: 2012 },
      { title: 'Captain America: The Winter Soldier', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015 },
      { title: 'Avengers: Infinity War', year: 2018, note: 'Post-credits scene' },
      { title: 'Captain Marvel', year: 2019, note: 'Set in 1995' },
      { title: 'Avengers: Endgame', year: 2019 },
      { title: 'Spider-Man: Far From Home', year: 2019, note: 'Set after Endgame' },
    ],
  },
  'Pepper Potts': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008 },
      { title: 'Iron Man 2', year: 2010 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Iron Man 3', year: 2013 },
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Cameo' },
      { title: 'Captain America: Civil War', year: 2016, note: 'Cameo' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Thanos': {
    beforeMCU: [],
    mcu: [
      { title: 'The Avengers', year: 2012, note: 'Mid-credits cameo' },
      { title: 'Guardians of the Galaxy', year: 2014 },
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Mid-credits cameo' },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019 },
    ],
  },
  'Deadpool': {
    beforeMCU: [
      { title: 'X-Men Origins: Wolverine', year: 2009, note: 'First live-action appearance' },
      { title: 'Deadpool', year: 2016 },
      { title: 'Deadpool 2', year: 2018 },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Upcoming MCU debut' },
    ],
  },
  'Venom': {
    beforeMCU: [
      { title: 'Spider-Man 3', year: 2007, note: 'First live-action appearance (Eddie Brock)' },
      { title: 'Venom', year: 2018, note: 'Sony\'s Spider-Man Universe' },
      { title: 'Venom: Let There Be Carnage', year: 2021, note: 'Sony\'s Spider-Man Universe' },
      { title: 'Venom: The Last Dance', year: 2024, note: 'Sony\'s Spider-Man Universe, upcoming' },
    ],
    mcu: [
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Mid-credits scene cameo, temporarily in MCU' },
    ],
  },
  'Loki': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011 },
      { title: 'The Avengers', year: 2012 },
      { title: 'Thor: The Dark World', year: 2013 },
      { title: 'Thor: Ragnarok', year: 2017 },
      { title: 'Avengers: Infinity War', year: 2018 },
      { title: 'Avengers: Endgame', year: 2019, note: 'Alternate timeline Loki escapes with Tesseract' },
      { title: 'Loki', year: 2021, note: 'Disney+ series, TVA adventures' },
    ],
  },
  'Hela': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Ragnarok', year: 2017, note: 'Main antagonist' },
    ],
  },
  'Ultron': {
    beforeMCU: [],
    mcu: [
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Main antagonist' },
      { title: 'What If...?', year: 2021, note: 'Alternate versions in animated series' },
    ],
  },
  'Quicksilver': {
    beforeMCU: [
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Fox X-Men universe' },
      { title: 'X-Men: Apocalypse', year: 2016, note: 'Fox X-Men universe' },
    ],
    mcu: [
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Aids the Avengers, heroic sacrifice' },
    ],
  },
  'Wolverine': {
    beforeMCU: [
      { title: 'X-Men', year: 2000 },
      { title: 'X2: X-Men United', year: 2003 },
      { title: 'X-Men: The Last Stand', year: 2006 },
      { title: 'X-Men Origins: Wolverine', year: 2009 },
      { title: 'The Wolverine', year: 2013 },
      { title: 'X-Men: Days of Future Past', year: 2014 },
      { title: 'Logan', year: 2017 },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'MCU Multiverse debut alongside Deadpool' },
    ],
  },
  'Shang-Chi': {
    beforeMCU: [],
    mcu: [
      { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, note: 'Origin, mastery of the Ten Rings and battle for Ta Lo' },
      { title: 'What If...?', year: 2023, note: 'Alternate universe appearances' },
    ],
  },
  'Moon Knight': {
    beforeMCU: [],
    mcu: [
      { title: 'Moon Knight', year: 2022, note: 'Disney+ series, battles Arthur Harrow & Ammit' },
      { title: 'What If...?', year: 2023, note: 'Alternate universe appearances' },
    ],
  },
  'Daredevil': {
    beforeMCU: [
      { title: 'Daredevil', year: 2003, note: 'Ben Affleck feature film' },
      { title: 'Daredevil', year: 2015, note: 'Acclaimed 3-season Netflix series (Charlie Cox)' },
      { title: 'The Defenders', year: 2017, note: 'Team-up with Jessica Jones, Luke Cage, Iron Fist' },
    ],
    mcu: [
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Appears as Peter Parker\'s defense attorney' },
      { title: 'She-Hulk: Attorney at Law', year: 2022, note: 'Team-up and romance in Los Angeles' },
      { title: 'Echo', year: 2024, note: 'Battle with Maya Lopez' },
      { title: 'Daredevil: Born Again', year: 2025, note: 'MCU headlining return series' },
    ],
  },
  'Punisher': {
    beforeMCU: [
      { title: 'The Punisher', year: 1989, note: 'Dolph Lundgren film' },
      { title: 'The Punisher', year: 2004, note: 'Thomas Jane film' },
      { title: 'Punisher: War Zone', year: 2008, note: 'Ray Stevenson film' },
      { title: 'Daredevil', year: 2016, note: 'Season 2 introduction (Jon Bernthal)' },
      { title: 'The Punisher', year: 2017, note: '2-season Netflix series' },
    ],
    mcu: [
      { title: 'Daredevil: Born Again', year: 2025, note: 'MCU reunion and return with Matt Murdock' },
    ],
  },
  'Magneto': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'Sir Ian McKellen as Magneto' },
      { title: 'X2: X-Men United', year: 2003, note: 'Allies with the X-Men against Stryker' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Leads the Brotherhood of Mutants' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Past and future timelines unite' },
      { title: 'X-Men: Apocalypse', year: 2016, note: 'Horseman of Apocalypse' },
    ],
    mcu: [
      { title: 'X-Men \'97', year: 2024, note: 'Leads the X-Men in honor of Charles Xavier' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal return' },
    ],
  },
  'Blade': {
    beforeMCU: [
      { title: 'Blade', year: 1998, note: 'Wesley Snipes as the iconic Daywalker' },
      { title: 'Blade II', year: 2002, note: 'Directed by Guillermo del Toro' },
      { title: 'Blade: Trinity', year: 2004, note: 'Battles Dracula with the Nightstalkers' },
    ],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Voice cameo confronting Dane Whitman' },
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Legendary return in the Void resistance team' },
    ],
  },
  'Doctor Doom': {
    beforeMCU: [
      { title: 'Fantastic Four', year: 2005, note: 'Julian McMahon as Doctor Doom' },
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Steals the Silver Surfer\'s board' },
    ],
    mcu: [
      { title: 'Avengers: Doomsday', year: 2026, note: 'Robert Downey Jr. makes his MCU debut as Doctor Doom' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Sovereign God Emperor of Battleworld' },
    ],
  },
  'Ghost Rider': {
    beforeMCU: [
      { title: 'Ghost Rider', year: 2007, note: 'Nicolas Cage as Johnny Blaze' },
      { title: 'Ghost Rider: Spirit of Vengeance', year: 2011, note: 'Battles Roarke in Eastern Europe' },
    ],
    mcu: [
      { title: 'Midnight Sons', year: 2026, note: 'Spiritual protector assembling with Marvel supernatural heroes' },
    ],
  },
  'Professor X': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'Sir Patrick Stewart as Professor Xavier' },
      { title: 'X2: X-Men United', year: 2003, note: 'Attacked by William Stryker' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Confronts Dark Phoenix' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Past and future Xavier connect minds' },
      { title: 'Logan', year: 2017, note: 'Final journey with Logan and Laura' },
    ],
    mcu: [
      { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, note: 'Leader of the Earth-838 Illuminati' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal council return' },
    ],
  },
  'Captain Carter': {
    beforeMCU: [],
    mcu: [
      { title: 'What If...?', year: 2021, note: 'Receives Super-Soldier Serum & leads Guardians of the Multiverse' },
      { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, note: 'Earth-838 Illuminati member' },
      { title: 'What If...? Season 2', year: 2023, note: 'Wields the Infinity Armor & Kahhori power' },
    ],
  },
  'She-Hulk': {
    beforeMCU: [],
    mcu: [
      { title: 'She-Hulk: Attorney at Law', year: 2022, note: 'Superhuman Law Division, Daredevil romance & K.E.V.I.N. finale' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Avengers assembly against Doctor Doom' },
    ],
  },
  'Ms. Marvel': {
    beforeMCU: [],
    mcu: [
      { title: 'Ms. Marvel', year: 2022, note: 'Unlocks Hard Light powers via family bangle & mutant awakening' },
      { title: 'The Marvels', year: 2023, note: 'Cosmic entanglement team-up with Captain Marvel and Monica Rambeau' },
      { title: 'Young Avengers', year: 2026, note: 'Recruits Kate Bishop and Cassie Lang' },
    ],
  },
  'Silver Surfer': {
    beforeMCU: [
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Doug Jones & Laurence Fishburne as the Herald of Galactus' },
    ],
    mcu: [
      { title: 'The Fantastic Four: First Steps', year: 2025, note: 'Shalla-Bal as the Herald of Galactus (Julia Garner)' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic guardian across Battleworld' },
    ],
  },
  'Mister Fantastic': {
    beforeMCU: [
      { title: 'Fantastic Four', year: 2005, note: 'Ioan Gruffudd as Reed Richards' },
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Confronts the Silver Surfer & Galactus' },
    ],
    mcu: [
      { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, note: 'Earth-838 Illuminati member (John Krasinski)' },
      { title: 'The Fantastic Four: First Steps', year: 2025, note: 'Pedro Pascal stars as MCU Reed Richards' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Battles Doctor Doom across realities' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Rebuilds the multiverse' },
    ],
  },
  'Human Torch': {
    beforeMCU: [
      { title: 'Fantastic Four', year: 2005, note: 'Chris Evans as Johnny Storm' },
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Swaps powers with teammates' },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Chris Evans reprises Johnny Storm in the Void' },
      { title: 'The Fantastic Four: First Steps', year: 2025, note: 'Joseph Quinn stars as MCU Johnny Storm' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiverse battle for survival' },
    ],
  },
  'Gambit': {
    beforeMCU: [
      { title: 'X-Men Origins: Wolverine', year: 2009, note: 'Taylor Kitsch as Remy LeBeau' },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Channing Tatum debuts as Gambit in the Void Resistance' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Kinetic showdown across Battleworld' },
    ],
  },
  'Namor': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Panther: Wakanda Forever', year: 2022, note: 'Tenoch Huerta debuts as K\'uk\'ulkan, King of Talokan' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Talokan allies against multiversal threats' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Defends Earth and ocean realms' },
    ],
  },
  'Green Goblin': {
    beforeMCU: [
      { title: 'Spider-Man', year: 2002, note: 'Willem Dafoe\'s legendary debut as Norman Osborn' },
      { title: 'Spider-Man 2', year: 2004, note: 'Haunts Harry Osborn as a mirror hallucination' },
      { title: 'Spider-Man 3', year: 2007, note: 'The legacy of the Goblin formula' },
    ],
    mcu: [
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Pulled into the MCU; destroys Aunt May and battles Peter Parker' },
    ],
  },
  'Doctor Octopus': {
    beforeMCU: [
      { title: 'Spider-Man 2', year: 2004, note: 'Alfred Molina\'s legendary debut as Doc Ock' },
    ],
    mcu: [
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Transported to the MCU, clashes with Peter Parker & helps cure villains' },
    ],
  },
  'Invisible Woman': {
    beforeMCU: [
      { title: 'Fantastic Four', year: 2005, note: 'Jessica Alba as Sue Storm' },
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Empowered with psionic force fields' },
    ],
    mcu: [
      { title: 'The Fantastic Four: First Steps', year: 2025, note: 'Vanessa Kirby stars as MCU Sue Storm' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Protects the Fantastic Four against Doctor Doom' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal force field defense' },
    ],
  },
  'The Thing': {
    beforeMCU: [
      { title: 'Fantastic Four', year: 2005, note: 'Michael Chiklis as Ben Grimm' },
      { title: 'Fantastic 4: Rise of the Silver Surfer', year: 2007, note: 'Rock-solid defense' },
    ],
    mcu: [
      { title: 'The Fantastic Four: First Steps', year: 2025, note: 'Ebon Moss-Bachrach stars as MCU Ben Grimm' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'It\'s Clobberin\' Time on Battleworld' },
    ],
  },
  'Cable': {
    beforeMCU: [
      { title: 'Deadpool 2', year: 2018, note: 'Josh Brolin as the time-traveling soldier Nathan Summers' },
    ],
    mcu: [
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Time-displaced warrior assembling against cosmic destruction' },
    ],
  },
  'Colossus': {
    beforeMCU: [
      { title: 'X2: X-Men United', year: 2003, note: 'Daniel Cudmore defends the Xavier mansion' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Danger room simulation & Alcatraz battle' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Future Sentinel war' },
      { title: 'Deadpool', year: 2016, note: 'Stefan Kapičić as the giant Russian organic steel mentor' },
      { title: 'Deadpool 2', year: 2018, note: 'Colossus battles Juggernaut' },
    ],
    mcu: [
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Celebrates Wade Wilson\'s birthday party' },
    ],
  },
  'Storm': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'Halle Berry as Ororo Munroe' },
      { title: 'X2: X-Men United', year: 2003, note: 'Summons tornadoes against fighter jets' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Headmistress of Xavier\'s School' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Omega-level lightning defense' },
      { title: 'X-Men: Apocalypse', year: 2016, note: 'Alexandra Shipp as young Storm' },
    ],
    mcu: [
      { title: 'X-Men \'97', year: 2024, note: 'Weather Goddess reclaiming her powers' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Summons celestial storms across realities' },
    ],
  },
  'Cyclops': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'James Marsden as Scott Summers' },
      { title: 'X2: X-Men United', year: 2003, note: 'Controlled by Stryker before breaking free' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Tragic confrontation at Alkali Lake' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Timeline restored' },
      { title: 'X-Men: Apocalypse', year: 2016, note: 'Tye Sheridan as young Cyclops' },
    ],
    mcu: [
      { title: 'X-Men \'97', year: 2024, note: 'Master tactician optic-blasting mutant foes' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Leads mutant strike team' },
    ],
  },
  'Jean Grey': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'Famke Janssen as Jean Grey' },
      { title: 'X2: X-Men United', year: 2003, note: 'Sacrifices herself to hold back the floodwaters' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'The Dark Phoenix awakens' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'Restored to life in peaceful timeline' },
      { title: 'X-Men: Dark Phoenix', year: 2019, note: 'Sophie Turner unleashes cosmic Phoenix Force' },
    ],
    mcu: [
      { title: 'The Marvels', year: 2023, note: 'Multiversal presence alongside Beast and Binary' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic Phoenix Force avatar' },
    ],
  },
  'Rogue': {
    beforeMCU: [
      { title: 'X-Men', year: 2000, note: 'Anna Paquin as Rogue' },
      { title: 'X2: X-Men United', year: 2003, note: 'Fosters bond with Wolverine and Iceman' },
      { title: 'X-Men: The Last Stand', year: 2006, note: 'Considers the mutant cure' },
      { title: 'X-Men: Days of Future Past', year: 2014, note: 'The Rogue Cut power rescue' },
    ],
    mcu: [
      { title: 'X-Men \'97', year: 2024, note: 'Southern powerhouse powerhouse fighting for mutant justice' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Absorbs cosmic superpowers' },
    ],
  },
  'Kingpin': {
    beforeMCU: [
      { title: 'Daredevil', year: 2003, note: 'Michael Clarke Duncan as Wilson Fisk' },
      { title: 'Daredevil', year: 2015, note: 'Vincent D\'Onofrio\'s definitive performance across 3 seasons' },
    ],
    mcu: [
      { title: 'Hawkeye', year: 2021, note: 'Secret leader of the Tracksuit Mafia' },
      { title: 'Echo', year: 2024, note: 'Survives confrontation with Maya Lopez and runs for NYC Mayor' },
      { title: 'Daredevil: Born Again', year: 2025, note: 'Mayor of New York City in total urban conflict with vigilantes' },
    ],
  },
  'Kate Bishop': {
    beforeMCU: [],
    mcu: [
      { title: 'Hawkeye', year: 2021, note: 'Teams up with Clint Barton & defeats Kingpin' },
      { title: 'The Marvels', year: 2023, note: 'Recruited by Kamala Khan for the Young Avengers' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Young Avengers assembly against Doctor Doom' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal battle for reality' },
    ],
  },
  'Yelena Belova': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Widow', year: 2021, note: 'Reunites with Natasha to destroy the Red Room & free the Widows' },
      { title: 'Hawkeye', year: 2021, note: 'Hunts Clint Barton, confronts Kate Bishop & uncovers the truth of Natasha\'s sacrifice' },
      { title: 'Thunderbolts*', year: 2025, note: 'Leads the team of anti-heroes and reformed operatives' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Fights alongside the Avengers against multiversal threats' },
    ],
  },
  'Shuri': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Panther', year: 2018, note: 'Designs vibranium tech & suits for T\'Challa' },
      { title: 'Avengers: Infinity War', year: 2018, note: 'Attempts to extract the Mind Stone from Vision' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Returns in the Battle of Earth' },
      { title: 'Black Panther: Wakanda Forever', year: 2022, note: 'Synthesizes Heart-Shaped Herb & becomes the Black Panther' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Wakandan forces unite with the Avengers' },
    ],
  },
  'America Chavez': {
    beforeMCU: [],
    mcu: [
      { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, note: 'Hunted across realities, unlocks control of star portals & joins Kamar-Taj' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Multiversal transit and combat support' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Traverses Battleworld and alternate timelines' },
    ],
  },
  'Adam Warlock': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, note: 'Post-credits cocoon tease created by Ayesha' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, note: 'Hatched to hunt the Guardians, redeems himself & joins the new team' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic powerhouse in the battle for the universe' },
    ],
  },
  'Korg': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Ragnarok', year: 2017, note: 'Sakaar gladiator revolution & friendship with Thor' },
      { title: 'Avengers: Endgame', year: 2019, note: 'New Asgard gamer & Battle of Earth warrior' },
      { title: 'Thor: Love and Thunder', year: 2022, note: 'Narrates Thor\'s cosmic journey & battles Gorr' },
    ],
  },
  'Red Guardian': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Widow', year: 2021, note: 'Reunites with his surrogate daughters to destroy the Red Room' },
      { title: 'Thunderbolts*', year: 2025, note: 'Super-soldier powerhouse on the anti-hero team' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Defends Earth alongside global heroes' },
    ],
  },
  'Monica Rambeau': {
    beforeMCU: [],
    mcu: [
      { title: 'Captain Marvel', year: 2019, note: 'Young Monica helps Carol Danvers choose her suit colors in 1995' },
      { title: 'WandaVision', year: 2021, note: 'Crosses the Westview Hex boundary and gains photon energy powers' },
      { title: 'The Marvels', year: 2023, note: 'Repairs the cosmic tear and crosses into an alternate X-Men universe' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal reunion and photon powerhouse' },
    ],
  },
  'Ironheart': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Panther: Wakanda Forever', year: 2022, note: 'Builds vibranium detector & creates Ironheart Mark II armor' },
      { title: 'Ironheart', year: 2025, note: 'Clash between advanced technology and dark magic in Chicago' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Young Avengers assembly against Doctor Doom' },
    ],
  },
  'Cassie Lang': {
    beforeMCU: [],
    mcu: [
      { title: 'Ant-Man', year: 2015, note: 'Saved by Scott Lang from Yellowjacket' },
      { title: 'Ant-Man and the Wasp', year: 2018, note: 'Encourages Scott to be a hero' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Emotional reunion with Scott after the 5-year Blip' },
      { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, note: 'Builds Quantum satellite & fights Kang as Stature' },
      { title: 'Young Avengers', year: 2026, note: 'Recruited into the next generation of Avengers' },
    ],
  },
  'Echo': {
    beforeMCU: [],
    mcu: [
      { title: 'Hawkeye', year: 2021, note: 'Leads the Tracksuit Mafia, confronts Clint Barton & shoots Kingpin' },
      { title: 'Echo', year: 2024, note: 'Reconnects with Choctaw ancestry, heals trauma & defends Tamaha' },
      { title: 'Daredevil: Born Again', year: 2025, note: 'New York City vigilante alliances' },
    ],
  },
  'Taskmaster': {
    beforeMCU: [],
    mcu: [
      { title: 'Black Widow', year: 2021, note: 'Dreykov\'s mind-controlled mimicry assassin, freed by Natasha' },
      { title: 'Thunderbolts*', year: 2025, note: 'Photographic reflex combat specialist for the Thunderbolts' },
    ],
  },
  'Agatha Harkness': {
    beforeMCU: [],
    mcu: [
      { title: 'WandaVision', year: 2021, note: 'Disguised as Agnes in Westview, unlocks the Scarlet Witch prophecy' },
      { title: 'Agatha All Along', year: 2024, note: 'Walks the legendary Witches\' Road to reclaim her stolen magic' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Ancient sorcery in the battle for the multiverse' },
    ],
  },
  'Kang the Conqueror': {
    beforeMCU: [],
    mcu: [
      { title: 'Loki Season 1', year: 2021, note: 'He Who Remains presides at the Citadel at the End of Time' },
      { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, note: 'Kang the Conqueror wages temporal war in the Quantum Realm' },
      { title: 'Loki Season 2', year: 2023, note: 'Victor Timely and multiversal Loom containment' },
    ],
  },
  'Abomination': {
    beforeMCU: [
      { title: 'The Incredible Hulk', year: 2008, note: 'Emil Blonsky undergoes gamma mutation and rampages in Harlem' },
    ],
    mcu: [
      { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, note: 'Cage fight training partner with Wong in Macau' },
      { title: 'She-Hulk: Attorney at Law', year: 2022, note: 'Paroled client represented by Jen Walters, retreats to Kamar-Taj' },
    ],
  },
  'Yondu Udonta': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014, note: 'Hunts Peter Quill & helps defeat Ronan the Accuser on Xandar' },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, note: 'Whistles his Yaka Arrow, saves Rocket & sacrifices his life for Peter Quill' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, note: 'Spiritual vision memory inspiring Kraglin on Knowhere' },
    ],
  },
  'Wenwu': {
    beforeMCU: [],
    mcu: [
      { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, note: 'Commands the Ten Rings for 1,000 years, opens Dark Gate & saves Shang-Chi' },
    ],
  },
  'Gorr the God Butcher': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Love and Thunder', year: 2022, note: 'Wields the All-Black Necrosword across galaxies & reaches Eternity' },
    ],
  },
  'Hercules': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor: Love and Thunder', year: 2022, note: 'Dispatched by Zeus from Omnipotence City to hunt Thor' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Olympian powerhouse clashes across Battleworld' },
    ],
  },
  'High Evolutionary': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, note: 'Creator of Rocket Raccoon & Sovereign, defeated on Counter-Earth' },
    ],
  },
  'Ikaris': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Tactical leader of the Eternals, laser eye powerhouse & defends Celestial Emergence' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Multiversal Celestial warrior return' },
    ],
  },
  'Thena': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Goddess of war manifesting golden light weapons across millennia' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic war hero assembling with Earth\'s Mightiest Heroes' },
    ],
  },
  'Sentry': {
    beforeMCU: [],
    mcu: [
      { title: 'Thunderbolts*', year: 2025, note: 'Bob Reynolds manifests the overwhelming power of one million exploding suns' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Cosmic powerhouse contending with multiversal incursion forces' },
    ],
  },
  'Mobius': {
    beforeMCU: [],
    mcu: [
      { title: 'Loki Season 1', year: 2021, note: 'Senior TVA analyst who interrogates and befriends Loki' },
      { title: 'Loki Season 2', year: 2023, note: 'Saves the Temporal Loom and retires to the Sacred Timeline in Cleveland' },
    ],
  },
  'Sersi': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Prime Eternal channels the Uni-Mind to transmute Tiamut into marble' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Rescued from Arishem to defend the Multiverse' },
    ],
  },
  'Mighty Thor': {
    beforeMCU: [],
    mcu: [
      { title: 'Thor', year: 2011, note: 'Astrophysicist who discovers Thor in New Mexico' },
      { title: 'Thor: The Dark World', year: 2013, note: 'Host to the Aether (Reality Stone) on Asgard' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Rocket extracts Reality Stone in 2013 Asgard' },
      { title: 'Thor: Love and Thunder', year: 2022, note: 'Wields reconstructed Mjolnir as the Mighty Thor & enters Valhalla' },
    ],
  },
  'U.S. Agent': {
    beforeMCU: [],
    mcu: [
      { title: 'The Falcon and the Winter Soldier', year: 2021, note: 'Appointed new Captain America, takes serum & becomes U.S. Agent' },
      { title: 'Thunderbolts*', year: 2025, note: 'Field operative on the covert Thunderbolts team' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Defends Earth against multiversal threats' },
    ],
  },
  'Ghost': {
    beforeMCU: [],
    mcu: [
      { title: 'Ant-Man and the Wasp', year: 2018, note: 'Quantum-phasing antagonist healed by Janet van Dyne' },
      { title: 'Thunderbolts*', year: 2025, note: 'Master of stealth phasing on the Thunderbolts' },
      { title: 'Avengers: Doomsday', year: 2026, note: 'Infiltration and tactical combat support' },
    ],
  },
  'Happy Hogan': {
    beforeMCU: [],
    mcu: [
      { title: 'Iron Man', year: 2008, note: 'Tony Stark\'s bodyguard, chauffeur, and trusted friend' },
      { title: 'Iron Man 2', year: 2010, note: 'Boxes Hammer security alongside Black Widow' },
      { title: 'Iron Man 3', year: 2013, note: 'Injured in Chinese Theatre bombing by Extremis soldier' },
      { title: 'Spider-Man: Homecoming', year: 2017, note: 'Oversees Peter Parker\'s Avengers mentorship' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Attends Tony Stark\'s funeral & comforts Morgan' },
      { title: 'Spider-Man: Far From Home', year: 2019, note: 'Flies Stark jet to London to aid Peter Parker' },
      { title: 'Spider-Man: No Way Home', year: 2021, note: 'Offers sanctuary to Peter & Aunt May' },
      { title: 'Deadpool & Wolverine', year: 2024, note: 'Interviews Wade Wilson for the Avengers' },
    ],
  },
  'Maria Hill': {
    beforeMCU: [],
    mcu: [
      { title: 'The Avengers', year: 2012, note: 'Deputy Director of S.H.I.E.L.D. on the Helicarrier' },
      { title: 'Captain America: The Winter Soldier', year: 2014, note: 'Rescues Steve, Sam, and Natasha during HYDRA takeover' },
      { title: 'Avengers: Age of Ultron', year: 2015, note: 'Coordinates Avengers headquarters in upstate New York' },
      { title: 'Avengers: Infinity War', year: 2018, note: 'Dusted by the Snap alongside Nick Fury' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Restored to life at Tony Stark\'s funeral' },
      { title: 'Spider-Man: Far From Home', year: 2019, note: 'Investigates Elementals in Europe (as Soren)' },
      { title: 'Secret Invasion', year: 2023, note: 'Investigates rebel Skrulls in Moscow' },
    ],
  },
  'Kraglin': {
    beforeMCU: [],
    mcu: [
      { title: 'Guardians of the Galaxy', year: 2014, note: 'Yondu\'s first mate during Battle of Xandar' },
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, note: 'Inherits Yondu\'s cybernetic fin and Yaka Arrow' },
      { title: 'Avengers: Endgame', year: 2019, note: 'Arrives via Ravager portal for the Battle of Earth' },
      { title: 'Thor: Love and Thunder', year: 2022, note: 'Travels with Thor and the Guardians' },
      { title: 'The Guardians of the Galaxy Holiday Special', year: 2022, note: 'Celebrates Christmas on Knowhere' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, note: 'Masters the Yaka Arrow to save Knowhere & joins new Guardians' },
    ],
  },
  'Makkari': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Super-speed scout explores the Domo & battles Ikaris to save Earth' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic speedster traversing multiversal Battleworld' },
    ],
  },
  'Druig': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Mind controller protects his Amazonian commune & stops the Emergence' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Psychic defense across parallel dimensions' },
    ],
  },
  'Phastos': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Master engineer creates the Uni-Mind bracelets to stop Tiamut' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic technology builder defending reality' },
    ],
  },
  'Kingo': {
    beforeMCU: [],
    mcu: [
      { title: 'Eternals', year: 2021, note: 'Bollywood star wielding golden cosmic finger blasters' },
      { title: 'Avengers: Secret Wars', year: 2027, note: 'Cosmic warrior fighting for the universe' },
    ],
  },
};

// Add short MCU event/role for each movie (optional, can be expanded)
const movieEvents = {
  'The Avengers': 'Avengers assemble for the first time.',
  'Iron Man': 'Tony Stark builds the Iron Man suit.',
  'Iron Man 2': 'Tony battles Vanko and government pressure.',
  'Iron Man 3': 'Tony faces PTSD and a new enemy.',
  'Avengers: Age of Ultron': 'Ultron threatens Earth, Avengers create Vision.',
  'Captain America: Civil War': 'Avengers split over Sokovia Accords.',
  'Spider-Man: Homecoming': 'Peter balances high school and hero life.',
  'Spider-Man: Far From Home': 'Peter deals with the aftermath of Endgame and Mysterio.',
  'Spider-Man: No Way Home': 'Spider-Man deals with multiversal threats and past villains.',
  'Avengers: Infinity War': 'Thanos collects the Infinity Stones.',
  'Avengers: Endgame': 'Final battle against Thanos, heroes restore half of all life.',
  'Captain America: The First Avenger': 'Steve Rogers becomes a super-soldier in WWII.',
  'Captain America: The Winter Soldier': 'Hydra is revealed inside S.H.I.E.L.D.',
  'Thor': 'Thor is banished to Earth and learns humility.',
  'Thor: The Dark World': 'Dark Elves seek the Aether, Thor protects Jane.',
  'Thor: Ragnarok': 'Asgard faces Ragnarok, Thor battles Hela.',
  'The Incredible Hulk': 'Bruce Banner battles his inner monster and General Ross.',
  'Hulk': 'Bruce Banner’s origin story and first transformation.',
  'Black Panther': 'T’Challa becomes King of Wakanda.',
  'Ant-Man': 'Scott Lang becomes Ant-Man for the first time.',
  'Ant-Man and the Wasp': 'Scott and Hope search for Janet van Dyne.',
  'Guardians of the Galaxy': 'A group of cosmic misfits unite to save Xandar.',
  'Guardians of the Galaxy Vol. 2': 'Peter meets his celestial father, Ego.',
  'Doctor Strange': 'Stephen Strange learns the mystic arts to heal his hands.',
  'Captain Marvel': 'Carol Danvers discovers her true Kree identity and powers.',
  'Black Widow': 'Natasha confronts her past in Russia.',
  'Hawkeye': 'Clint trains Kate Bishop after the blip.',
  'Scarlet Witch': 'Wanda’s powers are enhanced by the Mind Stone.',
  'Vision': 'Vision is created, becoming a powerful Avenger.',
  'War Machine': 'Rhodey aids Iron Man in his armored suit.',
  'Falcon': 'Sam Wilson becomes Captain America\'s trusted ally.',
  'Winter Soldier': 'Bucky Barnes is revealed as a HYDRA assassin.',
  'Gamora': 'Gamora attempts to escape Thanos\'s influence.',
  'Nebula': 'Nebula confronts her abusive past with Thanos and Gamora.',
  'Star-Lord': 'Peter Quill leads the Guardians, discovering his heritage.',
  'Rocket Raccoon': 'Rocket showcases his genius with tech and weapons.',
  'Groot': 'Groot sacrifices himself to save his friends, later reborn.',
  'Drax the Destroyer': 'Drax seeks vengeance for his family against Ronan and Thanos.',
  'Mantis': 'Mantis joins the Guardians, using her empathic abilities.',
  'Okoye': 'Okoye serves as General of the Dora Milaje, fiercely loyal to Wakanda.',
  'Wong': 'Wong serves as the librarian of Kamar-Taj and aide to Doctor Strange.',
  'Valkyrie': 'Brunnhilde, a former Asgardian warrior, helps Thor save her people.',
  'Ancient One': 'The wise Sorcerer Supreme mentors Stephen Strange.',
  'Nick Fury': 'Fury initiates the Avengers Initiative.',
  'Pepper Potts': 'Pepper manages Stark Industries, later dons the Rescue armor.',
  'Thanos': 'The Mad Titan aims to balance the universe by wiping out half of all life.',
  'X-Men Origins: Wolverine': 'Wade Wilson is introduced as a mercenary with powers.',
  'Deadpool': 'Wade Wilson undergoes experiments, gaining healing powers and a dark humor.',
  'Deadpool 2': 'Deadpool forms X-Force to protect a young mutant.',
  'Deadpool & Wolverine': 'Deadpool navigates the MCU with Wolverine.',
  'Venom': 'Eddie Brock bonds with an alien symbiote, becoming Venom.',
  'Venom: Let There Be Carnage': 'Eddie and Venom face off against Carnage.',
  'Venom: The Last Dance': 'Eddie and Venom are on the run from both humans and aliens.',
  'Spider-Man 3': 'Peter Parker deals with new villains, including Eddie Brock as Venom.',
  'I am Groot': 'Groot communicates using only his signature phrase.',
  'Wasp': 'Hope van Dyne joins Scott Lang as the Wasp, a size-shifting hero.',
  'X-Men': 'Wolverine joins Professor X and the X-Men to stop Magneto.',
  'X2: X-Men United': 'Mutants unite against William Stryker.',
  'X-Men: The Last Stand': 'The cure for mutants sparks a massive conflict.',
  'The Wolverine': 'Logan travels to Japan and confronts his past mortality.',
  'Logan': 'An aging Logan protects Laura on a final heroic mission.',
  'X-Men: Days of Future Past': 'Wolverine travels back in time to alter mutant history.',
  'X-Men: Apocalypse': 'Mutants face the ancient conqueror Apocalypse.',
  'Shang-Chi and the Legend of the Ten Rings': 'Shang-Chi embraces his mother\'s legacy, wields the Ten Rings, and defeats the Dweller-in-Darkness.',
  'Moon Knight': 'Marc Spector and Steven Grant unlock Khonshu\'s power to defeat Arthur Harrow and Ammit.',
  'Daredevil': 'Matt Murdock battles Wilson Fisk and defends Hell\'s Kitchen with relentless determination.',
  'The Punisher': 'Frank Castle uncovers military conspiracies and dispenses brutal justice to the underworld.',
  'Daredevil: Born Again': 'Matt Murdock and Frank Castle collide in a high-stakes battle for New York City.',
  'Magneto': 'Erik Lehnsherr manipulates global magnetic forces to establish mutant supremacy.',
  'Blade': 'The Daywalker hunts down vampire syndicates to protect humanity from the shadows.',
  'Blade II': 'Blade forms a temporary truce with the Bloodpack to stop the Reaper strain.',
  'Blade: Trinity': 'Blade battles Drake alongside the Nightstalkers.',
  'Doctor Doom': 'Victor Von Doom harnesses science and sorcery to establish Latverian dominance.',
  'Fantastic Four': 'Doom gains metallic skin and electrical powers during a cosmic storm.',
  'Ghost Rider': 'Johnny Blaze unleashes the Penance Stare and purges the wicked with hellfire.',
  'Ghost Rider: Spirit of Vengeance': 'The Spirit of Vengeance defends a boy from demonic corruption.',
  'Professor X': 'Charles Xavier uses Cerebro to locate and protect mutants while seeking peace with humanity.',
  'Captain Carter': 'Peggy Carter takes the Super-Soldier serum and battles multiversal threats.',
  'She-Hulk': 'Jennifer Walters balances high-profile superhuman cases with green-skinned heroics.',
  'She-Hulk: Attorney at Law': 'Jennifer Walters navigates life as a 6-foot-7 gamma-powered attorney.',
  'Ms. Marvel': 'Kamala Khan protects Jersey City with hard-light constructs.',
  'The Marvels': 'Kamala Khan, Carol Danvers, and Monica Rambeau switch places every time they use their powers.',
  'Silver Surfer': 'Norrin Radd traverses galaxies carrying the Power Cosmic.',
  'Fantastic 4: Rise of the Silver Surfer': 'The Silver Surfer prepares Earth for Galactus before defying his master.',
  'The Fantastic Four: First Steps': 'The Fantastic Four confront Galactus and the Silver Surfer in an alternate 1960s world.',
  'Mister Fantastic': 'Reed Richards stretches his genius and body to solve impossible multiversal anomalies.',
  'Human Torch': 'Johnny Storm blazes through skies unleashing supernova fire blasts.',
  'Gambit': 'Remy LeBeau turns playing cards into explosive kinetic weapons with lethal precision.',
  'Namor': 'The Feathered Serpent God commands oceans and floods surface cities to protect Talokan.',
  'Green Goblin': 'Norman Osborn terrorizes Spider-Man with deadly pumpkin bombs and razor-sharp intellect.',
  'Spider-Man': 'Peter Parker discovers with great power comes great responsibility and battles the Green Goblin.',
  'Doctor Octopus': 'Otto Octavius wields four AI mechanical arms to build a fusion reactor and conquer Spider-Man.',
  'Spider-Man 2': 'Peter Parker faces an existential crisis while stopping Doctor Octopus\'s dangerous fusion experiment.',
  'Invisible Woman': 'Sue Storm projects impenetrable force fields and bends light to safeguard her family.',
  'The Thing': 'Ben Grimm delivers earth-shattering clobbering blows as the Fantastic Four\'s indestructible titan.',
  'Cable': 'Nathan Summers manipulates temporal devices and heavy cybernetic firepower to reshape destiny.',
  'Colossus': 'Piotr Rasputin transforms his flesh into organic steel, shielding his allies from harm.',
  'Storm': 'Ororo Munroe commands thunderstorm tempests, blinding blizzards, and lightning strikes.',
  'Cyclops': 'Scott Summers unleashes devastating ruby-quartz optic beams with tactical precision.',
  'Jean Grey': 'Jean Grey channels the infinite cosmic fire of the Phoenix Force to bend reality.',
  'X-Men: Dark Phoenix': 'Jean Grey is consumed by the cosmic Phoenix Force, threatening humanity and mutants.',
  'Rogue': 'Anna Marie absorbs superhuman abilities with a single touch, fighting on the frontlines.',
  'Kingpin': 'Wilson Fisk rules New York City\'s underworld and political sphere with an iron fist.',
  'Kate Bishop': 'Kate Bishop masters archery and trick arrows, stopping the Tracksuit Mafia and Kingpin.',
  'Yelena Belova': 'Yelena destroys the Red Room, frees minds worldwide, and leads the Thunderbolts.',
  'Shuri': 'Shuri embraces the Black Panther legacy, synthesizing the herb and defending Wakanda.',
  'America Chavez': 'America punches star portals across dimensions, mastering her cosmic powers at Kamar-Taj.',
  'Adam Warlock': 'Adam breaks free from his cocoon, discovers compassion, and defends the cosmos.',
  'Thunderbolts*': 'A misfit squad of covert operatives and anti-heroes unite under Yelena Belova.',
  'Guardians of the Galaxy Vol. 3': 'The Guardians risk everything on Counter-Earth to save Rocket and welcome Adam Warlock.',
  'Korg': 'Korg leads the Sakaaran gladiator uprising and loyally chronicles Thor\'s divine triumphs.',
  'Red Guardian': 'Alexei Shostakov smashes through prison walls and fights alongside his daughters in the Thunderbolts.',
  'Monica Rambeau': 'Monica absorbs cosmic energies, ascending as Photon and traversing multiversal tears.',
  'Ironheart': 'Riri Williams engineers high-altitude Ironheart armor and unleashes repulsor firepower.',
  'Cassie Lang': 'Cassie Lang shrinks and expands exponentially as Stature, fighting for the oppressed.',
  'Echo': 'Maya Lopez channels Choctaw ancestral warrior spirits to overcome Wilson Fisk.',
  'Taskmaster': 'Antonia Dreykov mimics any combat style instantaneously with lethal photographic reflexes.',
  'Agatha Harkness': 'Agatha Harkness commands ancient dark sorcery and journeys down the Witches\' Road.',
  'Kang the Conqueror': 'Kang commands chrono-technology to conquer infinite timelines across the Multiverse.',
  'Abomination': 'Emil Blonsky merges gamma-powered physical brutality with Kamar-Taj inner peace.',
  'Thor: Love and Thunder': 'Thor, Mighty Thor, and Valkyrie journey to Omnipotence City and confront Gorr the God Butcher.',
  'WandaVision': 'Wanda Maximoff creates a suburban reality in Westview, awakening her full Scarlet Witch identity.',
  'Agatha All Along': 'Agatha gathers a coven to brave the perilous trials of the Witches\' Road.',
  'Ant-Man and the Wasp: Quantumania': 'The Ant-Family is pulled into the Quantum Realm and confronts Kang the Conqueror.',
  'Yondu Udonta': 'Yondu wipes out enemy platoons with his whistling Yaka Arrow and saves Peter Quill.',
  'Wenwu': 'Wenwu channels the ancient Ten Rings to conquer realms and protect his family.',
  'Gorr the God Butcher': 'Gorr wields the All-Black Necrosword to avenge his fallen daughter and challenge all gods.',
  'Hercules': 'The Olympian Prince of Power prepares to unleash divine fury across the cosmos.',
  'High Evolutionary': 'The High Evolutionary manipulates gravity and genetics in his maniacal pursuit of perfection.',
  'Ikaris': 'Ikaris soars through skies discharging lethal optical cosmic beams for the Celestials.',
  'Thena': 'Thena manifests crystalline golden cosmic weapons, slaughtering Deviant hordes.',
  'Sentry': 'Bob Reynolds harnesses the power of one million exploding suns while battling The Void.',
  'Mobius': 'Mobius navigates TVA temporal records and guides Loki to his glorious purpose.',
  'Sersi': 'Sersi transmutes planetary matter and leads the Eternals to save humanity.',
  'Eternals': 'Immortal cosmic heroes emerge from the shadows to protect humanity from Celestial extinction.',
  'Mighty Thor': 'Jane Foster wields the cracked Mjolnir, commanding thunder and lightning to stop Gorr.',
  'U.S. Agent': 'John Walker wields custom vibranium shields and Super-Soldier strength on the Thunderbolts.',
  'Ghost': 'Ava Starr phases through walls and shifts through quantum frequencies with deadly precision.',
  'Happy Hogan': 'Happy Hogan coordinates Stark Industries logistics, protecting Peter Parker and the Avengers.',
  'Maria Hill': 'Maria Hill commands intelligence networks and S.H.I.E.L.D. tactical strikes from the bridge.',
  'Kraglin': 'Kraglin whistles the legendary Yaka Arrow, defending Knowhere with the Guardians.',
  'Makkari': 'Makkari shatters the sound barrier with cosmic speed, outmaneuvering celestial threats.',
  'Druig': 'Druig channels mass telepathic psionic waves to pacify armies and safeguard humanity.',
  'Phastos': 'Phastos constructs luminous golden cosmic engines and weapons to protect Earth.',
  'Kingo': 'Kingo fires explosive golden cosmic projectiles with cinematic theatricality.',
  'The Falcon and the Winter Soldier': 'Sam Wilson and Bucky Barnes dismantle the Flag Smashers as Sam becomes Captain America.',
  'Secret Invasion': 'Nick Fury uncovers a clandestine rebel Skrull infiltration on Earth.',
  'The Guardians of the Galaxy Holiday Special': 'Mantis and Drax kidnap Kevin Bacon to give Peter Quill the ultimate Christmas.',
};


const Timeline = ({ character }) => {
  // Get timeline data for the character
  const timelineData = characterMovieTimeline[character.name] || { beforeMCU: [], mcu: [] };
  const beforeMCUMovies = timelineData.beforeMCU || [];
  const mcuMovies = timelineData.mcu || [];
  const color = character.bgColor || '#2A1B5E';
  const fontFamily = character.fontFamily || 'Avengers';

  // Helper function to render a movie entry
  const renderMovieEntry = (movie, isLeft, index, sectionType) => (
    <motion.div
      key={`${movie.title}-${movie.year}-${sectionType}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.08, 0.8), duration: 0.4 }}
      className={`w-full relative mb-6 sm:mb-8 md:mb-12`}
    >
      {/* Desktop Layout (md and up): Alternating Left/Right */}
      <div className="hidden md:flex justify-between items-center w-full relative">
        {isLeft ? (
          <div className="flex flex-row-reverse items-center gap-4 md:gap-6 max-w-[44%] text-right pr-4 z-10 w-full">
            <div className="flex flex-col items-end w-full">
              <img
                src={moviePosters[movie.title] || '/avengers.png'}
                alt={movie.title}
                className="w-20 sm:w-24 md:w-28 h-auto max-h-40 object-cover rounded-xl shadow-md border-2 border-white mb-2"
                style={{ background: '#fff' }}
                loading="lazy"
              />
              <span className="text-base md:text-lg lg:text-xl font-semibold leading-snug" style={{ fontFamily }}>{movie.title}</span>
              <span className="text-sm md:text-base text-gray-400 mb-1">{movie.year}</span>
              {movieEvents[movie.title] && (
                <span className="text-xs md:text-sm text-gray-300 italic">{movieEvents[movie.title]}</span>
              )}
              {movie.note && <span className="text-xs text-gray-400 italic mt-1 font-medium">{movie.note}</span>}
            </div>
          </div>
        ) : <div className="max-w-[44%] w-full"></div>}

        {/* Center Node on Desktop */}
        <span
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center transition-transform duration-300 hover:scale-110"
          style={{ background: sectionType === 'mcu' ? color : '#bbb', borderColor: '#fff', boxShadow: `0 0 0 ${sectionType === 'mcu' ? '6px' : '4px'} ${sectionType === 'mcu' ? color + '33' : '#bbb3'}, 0 2px 8px #0002`, transition: 'background 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        >
          <span className="block w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
        </span>

        {!isLeft ? (
          <div className="flex flex-row items-center gap-4 md:gap-6 max-w-[44%] text-left pl-4 z-10 w-full">
            <div className="flex flex-col items-start w-full">
              <img
                src={moviePosters[movie.title] || '/avengers.png'}
                alt={movie.title}
                className="w-20 sm:w-24 md:w-28 h-auto max-h-40 object-cover rounded-xl shadow-md border-2 border-white mb-2"
                style={{ background: '#fff' }}
                loading="lazy"
              />
              <span className="text-base md:text-lg lg:text-xl font-semibold leading-snug" style={{ fontFamily }}>{movie.title}</span>
              <span className="text-sm md:text-base text-gray-400 mb-1">{movie.year}</span>
              {movieEvents[movie.title] && (
                <span className="text-xs md:text-sm text-gray-300 italic">{movieEvents[movie.title]}</span>
              )}
              {movie.note && <span className="text-xs text-gray-400 italic mt-1 font-medium">{movie.note}</span>}
            </div>
          </div>
        ) : <div className="max-w-[44%] w-full"></div>}
      </div>

      {/* Mobile Layout (< md): Single column with line on left */}
      <div className="flex md:hidden items-start relative pl-9 sm:pl-12 w-full">
        {/* Node on left */}
        <span
          className="absolute left-1 sm:left-2 top-3 w-5 h-5 rounded-full border-2 border-white shadow-md z-20 flex items-center justify-center"
          style={{ background: sectionType === 'mcu' ? color : '#bbb', borderColor: '#fff' }}
        >
          <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>

        {/* Content Card on mobile */}
        <div className="flex flex-row items-start gap-3 sm:gap-4 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl w-full backdrop-blur-sm">
          <img
            src={moviePosters[movie.title] || '/avengers.png'}
            alt={movie.title}
            className="w-16 sm:w-20 h-auto max-h-24 object-cover rounded-lg shadow-sm border border-white/20 flex-shrink-0"
            style={{ background: '#fff' }}
            loading="lazy"
          />
          <div className="flex flex-col items-start min-w-0 flex-1">
            <span className="text-sm sm:text-base font-semibold leading-snug break-words" style={{ fontFamily }}>{movie.title}</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-0.5">{movie.year}</span>
            {movieEvents[movie.title] && (
              <span className="text-[11px] sm:text-xs text-gray-300 italic mt-1 leading-relaxed">{movieEvents[movie.title]}</span>
            )}
            {movie.note && <span className="text-[10px] sm:text-xs text-gray-400 italic mt-1">{movie.note}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="w-full flex justify-center py-8 sm:py-12 px-3 sm:px-6 md:px-10">
      <div className="w-full max-w-4xl relative">
        <div className="flex justify-center items-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-wide" style={{ fontFamily }}>
            {character.name} Timeline
          </h1>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-col items-center mt-4 sm:mt-8 w-full" style={{ minHeight: '100px' }}>
          {/* Vertical line centered for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gray-400/40 z-0" style={{ minHeight: '100%' }}></div>
          
          {/* Vertical line on the left for Mobile */}
          <div className="md:hidden absolute left-3.5 sm:left-4.5 top-0 h-full w-0.5 bg-gray-400/40 z-0" style={{ minHeight: '100%' }}></div>

          {/* Before MCU section */}
          {beforeMCUMovies.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 mt-2 text-center" style={{ fontFamily, color: '#aaa' }}>
                Before MCU
              </h2>
              <div className="w-full">
                {beforeMCUMovies.map((movie, idx) => {
                  const isLeft = idx % 2 === 0;
                  return renderMovieEntry(movie, isLeft, idx, 'beforeMCU');
                })}
              </div>
              <hr className="w-1/2 border-t border-gray-600 my-6 sm:my-8" />
            </div>
          )}

          {/* MCU section */}
          {mcuMovies.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 mt-2 text-center" style={{ fontFamily, color, transition: 'color 0.6s cubic-bezier(0.4,0,0.2,1)' }}>
                MCU Appearances
              </h2>
              <div className="w-full">
                {mcuMovies.map((movie, idx) => {
                  const isLeft = idx % 2 === 0;
                  return renderMovieEntry(movie, isLeft, idx, 'mcu');
                })}
              </div>
            </div>
          ) : beforeMCUMovies.length === 0 ? (
            <div className="text-center text-base sm:text-lg font-medium text-gray-400 mt-8">
              No cinematic appearances recorded for this character.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
