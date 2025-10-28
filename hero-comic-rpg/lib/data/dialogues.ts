// ============================================
// DIALOGUE SYSTEM - Rich Storyline for 5 Stages
// ============================================

export interface DialogueLine {
  speaker: 'hero' | 'boss' | 'narrator';
  text: string;
  portrait?: string; // emoji or character sprite
  emotion?: 'neutral' | 'angry' | 'sad' | 'determined' | 'surprised';
}

export interface StageDialogue {
  stageId: number;

  // Story context
  storyTitle: string;
  storyBackground: string;

  // Pre-battle sequence
  intro: DialogueLine[];

  // Boss phase dialogues (triggered at HP thresholds)
  phase1?: DialogueLine[]; // 100-70% HP
  phase2?: DialogueLine[]; // 70-40% HP
  phase3?: DialogueLine[]; // 40-0% HP

  // Victory sequence
  victory: DialogueLine[];

  // Optional: Mid-battle taunts (random)
  bossTaunts?: string[];
}

// ============================================
// THE EPIC NARRATIVE ARC
// ============================================

/*
OVERALL STORY:
The Dark Emperor has corrupted five ancient guardians who protect the realm.
Each guardian was once noble, now twisted by dark magic.
The hero must free them by defeating them in combat.
Stage 5 reveals the truth - the Flame Lord was the Emperor's brother.
*/

// ============================================
// STAGE 1: DARK FOREST - The Beginning
// ============================================
export const STAGE_1_DIALOGUE: StageDialogue = {
  stageId: 1,
  storyTitle: "The Wolf Lord's Madness",
  storyBackground: "The Wolf Lord once protected travelers through the Dark Forest. But something has twisted his mind, and now he hunts those he once guarded.",

  intro: [
    {
      speaker: 'narrator',
      text: 'The Dark Forest... Once a place of peace, now consumed by madness.',
      emotion: 'neutral'
    },
    {
      speaker: 'hero',
      text: 'The villagers spoke of a guardian who lost his way. I must help him... even if it means fighting.',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'narrator',
      text: 'A howl pierces the darkness. The Wolf Lord emerges from the shadows!',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: 'Grrrr... Fresh meat walks into MY forest! You will be my FEAST!',
      portrait: '🐺',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'Wolf Lord! I know you were once noble! Fight the darkness controlling you!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'NOBLE?! I am FREE! The Emperor showed me TRUE power! Now... DIE!',
      portrait: '🐺',
      emotion: 'angry'
    }
  ],

  phase2: [
    {
      speaker: 'boss',
      text: 'Impossible! You... you fight like the old heroes! But it changes NOTHING!',
      portrait: '🐺',
      emotion: 'angry'
    }
  ],

  phase3: [
    {
      speaker: 'boss',
      text: 'No... NO! The pack... help me... BROTHERS!',
      portrait: '🐺',
      emotion: 'angry'
    },
    {
      speaker: 'narrator',
      text: 'The Wolf Lord summons his corrupted pack!',
      emotion: 'neutral'
    }
  ],

  victory: [
    {
      speaker: 'boss',
      text: 'I... I fall... The darkness... it fades...',
      portrait: '🐺',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Rest now, guardian. Your duty is done.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: 'Thank you... brave one... The Emperor... he has four more... like me... Stop him...',
      portrait: '🐺',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The Wolf Lord closes his eyes for the last time. The forest breathes again.',
      emotion: 'neutral'
    },
    {
      speaker: 'hero',
      text: 'Four more corrupted guardians... I will free them all. I swear it.',
      portrait: '🦸',
      emotion: 'determined'
    }
  ],

  bossTaunts: [
    'Your blood will stain my forest!',
    'The pack hungers!',
    'You cannot save me!',
    'The Emperor\'s power is ABSOLUTE!'
  ]
};

// ============================================
// STAGE 2: ANCIENT CAVE - The Lost Soul
// ============================================
export const STAGE_2_DIALOGUE: StageDialogue = {
  stageId: 2,
  storyTitle: "The Echo Wraith's Sorrow",
  storyBackground: "Once a wise scholar who studied ancient magic, the Echo Wraith was cursed to relive her greatest failure forever - the moment she trusted the Dark Emperor.",

  intro: [
    {
      speaker: 'narrator',
      text: 'The cave walls whisper with a thousand voices... all saying the same thing: "I was fooled..."',
      emotion: 'neutral'
    },
    {
      speaker: 'hero',
      text: 'The Wolf Lord\'s words led me here. Another guardian corrupted by the Emperor.',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'Why... why do you come here? To mock me? To remind me of my FAILURE?',
      portrait: '👻',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'I come to free you from your curse, Echo Wraith!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'Free me?! There is no freedom from MEMORY! I replayed my mistake a THOUSAND times! Now... I will make YOU suffer too!',
      portrait: '👻',
      emotion: 'angry'
    }
  ],

  phase1: [
    {
      speaker: 'boss',
      text: 'You fight well... just like I did... before HE betrayed me...',
      portrait: '👻',
      emotion: 'sad'
    }
  ],

  phase2: [
    {
      speaker: 'boss',
      text: 'The Emperor... he promised me KNOWLEDGE! Instead... he gave me ETERNAL REGRET!',
      portrait: '👻',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Then let me end your suffering! Fight with me, not against me!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'It\'s... too late for me... but NOT for the others! STOP THE EMPEROR!',
      portrait: '👻',
      emotion: 'sad'
    }
  ],

  victory: [
    {
      speaker: 'boss',
      text: 'Finally... silence... The echoes... fade...',
      portrait: '👻',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'You can rest now, scholar. Your wisdom is remembered.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: 'Hero... the Emperor\'s citadel... it lies beyond fire and ice... Three more guardians suffer... Hurry...',
      portrait: '👻',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The wraith dissolves into peaceful mist. The cave grows quiet.',
      emotion: 'neutral'
    }
  ],

  bossTaunts: [
    'You will regret this... like I regret everything!',
    'My pain is ENDLESS!',
    'The echoes will consume you!',
    'I trusted him... FOOL!'
  ]
};

// ============================================
// STAGE 3: DESERT WASTES - The Fallen King
// ============================================
export const STAGE_3_DIALOGUE: StageDialogue = {
  stageId: 3,
  storyTitle: "The Scorpion King's Pride",
  storyBackground: "The Scorpion King ruled the desert with wisdom and strength. The Dark Emperor exploited his pride, turning him into a monstrous tyrant who now preys on his own people.",

  intro: [
    {
      speaker: 'narrator',
      text: 'The desert sun burns mercilessly. Bleached bones litter the sand - victims of a fallen king.',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: 'Another challenger? GOOD! I was getting BORED!',
      portrait: '🦂',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'Scorpion King! You were once beloved by your people! Why do you hunt them now?',
      portrait: '🦸',
      emotion: 'angry'
    },
    {
      speaker: 'boss',
      text: 'BELOVED?! They were WEAK! The Emperor showed me that POWER is the only truth! And I... I am the STRONGEST!',
      portrait: '🦂',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'No... you are a SLAVE to his lies! Let me free you!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'FREE ME?! I AM A KING! And you... you are just another corpse for the desert! ATTACK!',
      portrait: '🦂',
      emotion: 'angry'
    }
  ],

  phase1: [
    {
      speaker: 'boss',
      text: 'What?! You dare strike a KING?! Your insolence will cost you EVERYTHING!',
      portrait: '🦂',
      emotion: 'angry'
    }
  ],

  phase2: [
    {
      speaker: 'boss',
      text: 'Impossible! No one has pushed me this far since... since...',
      portrait: '🦂',
      emotion: 'surprised'
    },
    {
      speaker: 'hero',
      text: 'Since the Emperor corrupted you?',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'SILENCE! He gave me POWER! He... he...',
      portrait: '🦂',
      emotion: 'angry'
    },
    {
      speaker: 'narrator',
      text: 'For a moment, the King\'s eyes clear... then fill with rage again.',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: 'NO! I will NOT doubt! I will CRUSH YOU!',
      portrait: '🦂',
      emotion: 'angry'
    }
  ],

  victory: [
    {
      speaker: 'boss',
      text: 'I... I am defeated... How... how did I fall so far?',
      portrait: '🦂',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'The Emperor used your pride against you. But you fought bravely, King.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: 'My people... will they forgive me? I became the monster I swore to protect them from...',
      portrait: '🦂',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'They will remember the king you were, not the beast he made you.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: 'Thank you... brave warrior... Two guardians remain... The Frost Titan... and the Flame Lord... Both are stronger than me... Be careful...',
      portrait: '🦂',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The Scorpion King crumbles to sand. The desert will remember him.',
      emotion: 'neutral'
    }
  ],

  bossTaunts: [
    'Bow before your KING!',
    'I am INVINCIBLE!',
    'The desert obeys only ME!',
    'Your bones will join the others!'
  ]
};

// ============================================
// STAGE 4: FROZEN PEAKS - The Ancient Guardian
// ============================================
export const STAGE_4_DIALOGUE: StageDialogue = {
  stageId: 4,
  storyTitle: "The Frost Titan's Duty",
  storyBackground: "The Frost Titan was created by ancient magic to guard the path to the Volcanic Core. The Emperor bound him with dark spells, forcing him to kill any who approach - even those who seek to stop the Emperor.",

  intro: [
    {
      speaker: 'narrator',
      text: 'The mountain peak is silent. Snow falls like tears from the sky.',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: '...Stop... Go back... I do not wish... to fight you...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Frost Titan! You speak?! The others... they were consumed by rage!',
      portrait: '🦸',
      emotion: 'surprised'
    },
    {
      speaker: 'boss',
      text: '...I am... older... My will... stronger... But not... strong enough... The Emperor\'s curse... it FORCES me...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Then I will break his curse! Hold on, Titan!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: '...No... The only way... is to destroy... this body... FORGIVE ME!',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The Titan\'s eyes glow red. The curse takes control!',
      emotion: 'neutral'
    }
  ],

  phase1: [
    {
      speaker: 'boss',
      text: '...Fight well... hero... Make it... quick...',
      portrait: '🧊',
      emotion: 'sad'
    }
  ],

  phase2: [
    {
      speaker: 'boss',
      text: '...Yes... you are strong... Strong enough... to reach him...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Reach who? The Emperor?!',
      portrait: '🦸',
      emotion: 'surprised'
    },
    {
      speaker: 'boss',
      text: '...No... The Flame Lord... He is... the key... He was... the Emperor\'s... BROTHER...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'WHAT?! His brother?!',
      portrait: '🦸',
      emotion: 'surprised'
    },
    {
      speaker: 'boss',
      text: '...The Flame Lord... knows the truth... Free him... and you free... us all...',
      portrait: '🧊',
      emotion: 'sad'
    }
  ],

  victory: [
    {
      speaker: 'boss',
      text: '...Thank you... warrior... The curse... breaks...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'Rest, ancient one. Your watch is over.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: '...The Volcanic Core... awaits... The Flame Lord... suffers most of all... He fights the curse... every day... Help him... please...',
      portrait: '🧊',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The Titan collapses into snow and ice. His spirit finally free.',
      emotion: 'neutral'
    },
    {
      speaker: 'hero',
      text: 'The Emperor\'s own brother... This changes everything. I must hurry to the Volcanic Core!',
      portrait: '🦸',
      emotion: 'determined'
    }
  ],

  bossTaunts: [
    '...Forgive me...',
    '...I cannot... stop...',
    '...The curse... too strong...',
    '...End this... please...'
  ]
};

// ============================================
// STAGE 5: VOLCANIC CORE - The Final Truth
// ============================================
export const STAGE_5_DIALOGUE: StageDialogue = {
  stageId: 5,
  storyTitle: "The Flame Lord's Redemption",
  storyBackground: "The Flame Lord was once Prince Ignis, brother to the Dark Emperor. When the Emperor fell to darkness, Ignis tried to stop him - and was imprisoned in the Volcanic Core, corrupted and forced to guard the very evil he fought against.",

  intro: [
    {
      speaker: 'narrator',
      text: 'The heat is unbearable. The volcano rumbles with ancient rage. At its heart... a figure wreathed in flames.',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: 'So... another hero comes to die. How... disappointing.',
      portrait: '🔥',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'I know the truth, Flame Lord! You are Prince Ignis! The Emperor is your brother!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: '...What? How do you... No. That name... I buried that name in ash and flame!',
      portrait: '🔥',
      emotion: 'surprised'
    },
    {
      speaker: 'hero',
      text: 'The Frost Titan told me everything before he fell! You tried to STOP your brother!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'SILENCE! I failed! I was WEAK! And now... now I am his perfect weapon! BURN, HERO!',
      portrait: '🔥',
      emotion: 'angry'
    },
    {
      speaker: 'narrator',
      text: 'The flames roar higher! But in the Flame Lord\'s eyes... is that a tear?',
      emotion: 'neutral'
    }
  ],

  phase1: [
    {
      speaker: 'boss',
      text: 'You fight well... Like I once did... when I still believed in HOPE!',
      portrait: '🔥',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'Then believe again! Fight the curse! I know you\'re still in there!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'You know NOTHING! I watched my brother fall to darkness! I tried to save him! And he... he BROKE me!',
      portrait: '🔥',
      emotion: 'sad'
    }
  ],

  phase2: [
    {
      speaker: 'boss',
      text: 'Urgh! You... you\'re actually hurting me! The curse... it weakens!',
      portrait: '🔥',
      emotion: 'surprised'
    },
    {
      speaker: 'hero',
      text: 'Keep fighting, Ignis! Remember who you were!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'Ignis... I... I remember... My brother... we were so close... Then HE found that cursed artifact... the Shadow Crown...',
      portrait: '🔥',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'What happened?!',
      portrait: '🦸',
      emotion: 'surprised'
    },
    {
      speaker: 'boss',
      text: 'It corrupted him INSTANTLY! He declared himself Emperor! When I tried to stop him... he imprisoned me here! Made me his GUARD DOG!',
      portrait: '🔥',
      emotion: 'angry'
    },
    {
      speaker: 'hero',
      text: 'Then let me FREE you! Together we can stop him!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'It\'s too late for me... But YOU! You can destroy the Shadow Crown! Promise me... PROMISE ME YOU\'LL SAVE MY BROTHER!',
      portrait: '🔥',
      emotion: 'sad'
    }
  ],

  phase3: [
    {
      speaker: 'boss',
      text: 'GRAAAHHH! The curse... it fights back! I can\'t... hold it!',
      portrait: '🔥',
      emotion: 'angry'
    },
    {
      speaker: 'narrator',
      text: 'The Flame Lord\'s power surges! He\'s losing control!',
      emotion: 'neutral'
    },
    {
      speaker: 'boss',
      text: 'Hero... FINISH THIS! Before I hurt you! END MY SUFFERING!',
      portrait: '🔥',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'I will honor your sacrifice, Prince Ignis! Rest now!',
      portrait: '🦸',
      emotion: 'determined'
    }
  ],

  victory: [
    {
      speaker: 'boss',
      text: 'Finally... the flames... grow cold... Thank you... hero...',
      portrait: '🔥',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'You fought valiantly, Prince Ignis. Your brother will remember.',
      portrait: '🦸',
      emotion: 'sad'
    },
    {
      speaker: 'boss',
      text: 'The Shadow Crown... in his throne room... Destroy it... and he returns to normal... My brother... the real him... is still in there...',
      portrait: '🔥',
      emotion: 'sad'
    },
    {
      speaker: 'hero',
      text: 'I swear to you - I will save him!',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'boss',
      text: 'Thank you... Tell him... tell him I forgive him... Tell him... I love him...',
      portrait: '🔥',
      emotion: 'sad'
    },
    {
      speaker: 'narrator',
      text: 'The Flame Lord smiles... then fades into embers. The volcano grows quiet.',
      emotion: 'neutral'
    },
    {
      speaker: 'hero',
      text: 'Five guardians freed. Now... I march to the throne room. Emperor... your brother is coming for you.',
      portrait: '🦸',
      emotion: 'determined'
    },
    {
      speaker: 'narrator',
      text: '🎉 CONGRATULATIONS! You have completed the Hero\'s Journey! The true battle against the Dark Emperor awaits in future updates... Stay tuned! 🎉',
      emotion: 'neutral'
    }
  ],

  bossTaunts: [
    'The flames consume all!',
    'I burn with regret... and RAGE!',
    'My brother made me a monster!',
    'End this... I beg you...'
  ]
};

// ============================================
// DIALOGUE REGISTRY
// ============================================
export const ALL_DIALOGUES: StageDialogue[] = [
  STAGE_1_DIALOGUE,
  STAGE_2_DIALOGUE,
  STAGE_3_DIALOGUE,
  STAGE_4_DIALOGUE,
  STAGE_5_DIALOGUE
];

export const getDialogueByStageId = (stageId: number): StageDialogue | undefined => {
  return ALL_DIALOGUES.find(d => d.stageId === stageId);
};
