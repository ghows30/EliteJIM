// A simplified, localized database of common gym exercises
// Categorized by muscle group for easy filtering and autocomplete

export const EXERCISE_CATEGORIES = {
  CHEST: 'Petto',
  BACK: 'Dorso',
  LEGS: 'Gambe',
  SHOULDERS: 'Spalle',
  ARMS: 'Braccia',
  CORE: 'Addome',
  CARDIO: 'Cardio',
  NECK: 'Collo',
  FOREARMS: 'Avambracci'
};

export const EXERCISES_DB = [
  // Petto
  { id: 'c1', name: 'Panca Piana Bilanciere', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c2', name: 'Spinte Manubri Panca Inclinata', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c3', name: 'Croci ai Cavi', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c4', name: 'Chest Press', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c5', name: 'Piegamenti sulle braccia (Push-up)', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c6', name: 'Dip alle Parallele', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c7', name: 'Croci Manubri Panca Piana', category: EXERCISE_CATEGORIES.CHEST },
  { id: 'c8', name: 'Panca Inclinata Bilanciere', category: EXERCISE_CATEGORIES.CHEST },

  // Dorso
  { id: 'b1', name: 'Trazioni alla Sbarra (Pull-up)', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b2', name: 'Lat Machine Avanti', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b3', name: 'Rematore con Bilanciere', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b4', name: 'Pulley Basso', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b5', name: 'Rematore Manubrio', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b6', name: 'Pullover ai Cavi', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b7', name: 'T Bar Row', category: EXERCISE_CATEGORIES.BACK },
  { id: 'b8', name: 'Pull-down a Braccia Tese', category: EXERCISE_CATEGORIES.BACK },

  // Gambe
  { id: 'l1', name: 'Squat con Bilanciere', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l2', name: 'Leg Press 45°', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l3', name: 'Affondi con Manubri', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l4', name: 'Leg Extension', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l5', name: 'Leg Curl', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l6', name: 'Stacchi da Terra (Deadlift)', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l7', name: 'Stacchi Rumeni (RDL)', category: EXERCISE_CATEGORIES.LEGS },
  { id: 'l8', name: 'Calf Raise Seduto', category: EXERCISE_CATEGORIES.LEGS },

  // Spalle
  { id: 's1', name: 'Military Press', category: EXERCISE_CATEGORIES.SHOULDERS },
  { id: 's2', name: 'Spinte Manubri Seduto', category: EXERCISE_CATEGORIES.SHOULDERS },
  { id: 's3', name: 'Alzate Laterali Manubri', category: EXERCISE_CATEGORIES.SHOULDERS },
  { id: 's4', name: 'Alzate Laterali ai Cavi', category: EXERCISE_CATEGORIES.SHOULDERS },
  { id: 's5', name: 'Alzate a 90° (Posteriori)', category: EXERCISE_CATEGORIES.SHOULDERS },

  // Braccia
  { id: 'a1', name: 'Curl Bilanciere', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a2', name: 'Curl Manubri Panca Inclinata', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a3', name: 'Hammer Curl', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a4', name: 'Pushdown Tricipiti ai Cavi', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a5', name: 'French Press', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a6', name: 'Estensioni Dietro Nuca Manubrio', category: EXERCISE_CATEGORIES.ARMS },
  { id: 'a7', name: 'Kickback Tricipiti Manubrio', category: EXERCISE_CATEGORIES.ARMS },

  // Avambracci
  { id: 'f1', name: 'Wrist Curl Bilanciere (Supinazione)', category: EXERCISE_CATEGORIES.FOREARMS },
  { id: 'f2', name: 'Wrist Curl Bilanciere (Pronazione)', category: EXERCISE_CATEGORIES.FOREARMS },
  { id: 'f3', name: 'Farmer\'s Walk', category: EXERCISE_CATEGORIES.FOREARMS },
  { id: 'f4', name: 'Reverse Curl Bilanciere EZ', category: EXERCISE_CATEGORIES.FOREARMS },

  // Addome
  { id: 'co1', name: 'Crunch a Terra', category: EXERCISE_CATEGORIES.CORE },
  { id: 'co2', name: 'Plank', category: EXERCISE_CATEGORIES.CORE },
  { id: 'co3', name: 'Leg Raise in Sospensione', category: EXERCISE_CATEGORIES.CORE },
  { id: 'co4', name: 'Russian Twist', category: EXERCISE_CATEGORIES.CORE },
  { id: 'co5', name: 'Crunch ai Cavi (Rope)', category: EXERCISE_CATEGORIES.CORE },
  { id: 'co6', name: 'Ab Roller', category: EXERCISE_CATEGORIES.CORE },

  // Collo
  { id: 'n1', name: 'Flessioni del Collo (Neck Flexion)', category: EXERCISE_CATEGORIES.NECK },
  { id: 'n2', name: 'Estensioni del Collo (Neck Extension)', category: EXERCISE_CATEGORIES.NECK },
  { id: 'n3', name: 'Neck Curl Panca Piana', category: EXERCISE_CATEGORIES.NECK },

  // Cardio Extra
  { id: 'ca1', name: 'Tapis Roulant', category: EXERCISE_CATEGORIES.CARDIO },
  { id: 'ca2', name: 'Cyclette', category: EXERCISE_CATEGORIES.CARDIO },
  { id: 'ca3', name: 'Ellittica', category: EXERCISE_CATEGORIES.CARDIO },
  { id: 'ca4', name: 'Vogatore', category: EXERCISE_CATEGORIES.CARDIO }
];
