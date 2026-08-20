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
  'Venom: The Last Dance': '/movies/the-last-dance.jpg',
  'Loki': '/movies/loki.jpg',
  'What If...?': '/movies/what-if.jpg',
  // Wasp character poster
  'Wasp': '/wasp.png', // Assuming you have an image for Wasp in your public folder
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
  // Add Wasp's movie event
  'Wasp': 'Hope van Dyne joins Scott Lang as the Wasp, a size-shifting hero.',
};


const Timeline = ({ character }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'mcu', 'before'

  // Get timeline data for the character
  const timelineData = characterMovieTimeline[character.name] || { beforeMCU: [], mcu: [] };
  const beforeMCUMovies = timelineData.beforeMCU || [];
  const mcuMovies = timelineData.mcu || [];
  const color = character.bgColor || '#e50914';
  const fontFamily = character.fontFamily || 'Avengers';

  const allMovies = [
    ...beforeMCUMovies.map(m => ({ ...m, sectionType: 'beforeMCU' })),
    ...mcuMovies.map(m => ({ ...m, sectionType: 'mcu' }))
  ];

  const displayedMovies = activeTab === 'mcu' 
    ? mcuMovies.map(m => ({ ...m, sectionType: 'mcu' }))
    : activeTab === 'before'
    ? beforeMCUMovies.map(m => ({ ...m, sectionType: 'beforeMCU' }))
    : allMovies;

  return (
    <section id="timeline-section" className="w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3 border border-white/10 backdrop-blur-md">
            <span>Cinematic History</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white"
            style={{
              fontFamily,
              textShadow: `0 4px 20px ${color}66`,
            }}
          >
            {character.name} Timeline
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl mx-auto font-sans">
            Chronological journey across cinematic universes, solo adventures, and team-up sagas.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 font-sans">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                activeTab === 'all'
                  ? 'text-white border-white/40 shadow-lg'
                  : 'text-gray-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === 'all' ? color : undefined,
              }}
            >
              All Appearances ({allMovies.length})
            </button>

            {mcuMovies.length > 0 && (
              <button
                onClick={() => setActiveTab('mcu')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                  activeTab === 'mcu'
                    ? 'text-white border-white/40 shadow-lg'
                    : 'text-gray-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'mcu' ? color : undefined,
                }}
              >
                MCU Canon ({mcuMovies.length})
              </button>
            )}

            {beforeMCUMovies.length > 0 && (
              <button
                onClick={() => setActiveTab('before')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                  activeTab === 'before'
                    ? 'text-white border-white/40 shadow-lg'
                    : 'text-gray-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'before' ? color : undefined,
                }}
              >
                Pre-MCU / Legacy ({beforeMCUMovies.length})
              </button>
            )}
          </div>
        </div>

        {/* Timeline Container */}
        {displayedMovies.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 p-6">
            <p className="text-gray-400 text-sm sm:text-base">
              No appearances recorded in this category for {character.name}.
            </p>
          </div>
        ) : (
          <div className="relative font-sans">
            
            {/* Timeline Spine: Left-aligned on Mobile (< md), Centered on Desktop (>= md) */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-white/20 to-transparent left-5 sm:left-7 md:left-1/2 md:-translate-x-1/2 z-0"
              style={{
                boxShadow: `0 0 12px ${color}44`,
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {displayedMovies.map((movie, idx) => {
                const isLeft = idx % 2 === 0;
                const isMCU = movie.sectionType === 'mcu';
                const poster = moviePosters[movie.title] || '/avengers.png';
                const eventLore = movieEvents[movie.title];

                return (
                  <motion.div
                    key={`${movie.title}-${movie.year}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    className="relative flex items-center md:justify-between w-full group"
                  >
                    
                    {/* Desktop Left Side Card */}
                    <div className="hidden md:block md:w-[44%]">
                      {isLeft && (
                        <div className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl transition-all duration-300 text-right group-hover:scale-[1.02]">
                          <div className="flex flex-row-reverse items-start gap-4">
                            <img
                              src={poster}
                              alt={movie.title}
                              className="w-20 h-28 object-cover rounded-xl border border-white/20 shadow-md flex-shrink-0 bg-black/50"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-1.5"
                                   style={{
                                     backgroundColor: isMCU ? `${color}33` : 'rgba(255,255,255,0.1)',
                                     color: isMCU ? '#ff9999' : '#e0e0e0',
                                     border: `1px solid ${isMCU ? color : 'rgba(255,255,255,0.2)'}`,
                                   }}>
                                {movie.year} {isMCU ? '• MCU' : '• Legacy'}
                              </div>
                              <h3 className="text-lg font-bold text-white leading-tight mb-1" style={{ fontFamily }}>
                                {movie.title}
                              </h3>
                              {eventLore && (
                                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                                  {eventLore}
                                </p>
                              )}
                              {movie.note && (
                                <span className="inline-block text-[11px] text-yellow-300/90 font-medium mt-1">
                                  ★ {movie.note}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timeline Spine Node Indicator */}
                    <div
                      className="absolute left-5 sm:left-7 md:left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-[#0d0e15] shadow-lg z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: isMCU ? color : '#718096',
                        boxShadow: `0 0 16px ${isMCU ? color : '#718096'}aa`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Mobile Card (all items) / Desktop Right Side Card */}
                    <div className="w-full pl-12 sm:pl-16 md:pl-0 md:w-[44%]">
                      {/* For Desktop: show only if !isLeft. For Mobile: always show! */}
                      <div className={`bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 rounded-2xl p-3.5 sm:p-5 backdrop-blur-md shadow-xl transition-all duration-300 text-left group-hover:scale-[1.02] ${isLeft ? 'md:hidden' : 'block'}`}>
                        <div className="flex items-start gap-3.5 sm:gap-4">
                          <img
                            src={poster}
                            alt={movie.title}
                            className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl border border-white/20 shadow-md flex-shrink-0 bg-black/50"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="inline-block px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold mb-1"
                                 style={{
                                   backgroundColor: isMCU ? `${color}33` : 'rgba(255,255,255,0.1)',
                                   color: isMCU ? '#ff9999' : '#e0e0e0',
                                   border: `1px solid ${isMCU ? color : 'rgba(255,255,255,0.2)'}`,
                                 }}>
                              {movie.year} {isMCU ? '• MCU' : '• Legacy'}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white leading-tight mb-1 truncate" style={{ fontFamily }}>
                              {movie.title}
                            </h3>
                            {eventLore && (
                              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                                {eventLore}
                              </p>
                            )}
                            {movie.note && (
                              <span className="inline-block text-[11px] text-yellow-300/90 font-medium mt-1">
                                ★ {movie.note}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
