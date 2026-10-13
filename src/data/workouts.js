/**
 * Workout Data for "My 6-Day Workout Plan"
 * 
 * Edit this file to customize days, exercises, reps, form cues, or add custom media.
 * Supported animation types for stick-figure SVG:
 * - 'floor-press', 'fly', 'overhead-extension'
 * - 'bent-over-row', 'one-arm-row', 'biceps-curl', 'hammer-curl'
 * - 'goblet-squat', 'rdl', 'calf-raise', 'squat'
 * - 'shoulder-press', 'lateral-raise', 'plank', 'farmers-carry'
 * 
 * If you have a video/GIF in the /public folder (e.g. '/videos/press.mp4'),
 * just set `media: '/videos/press.mp4'` on that exercise!
 */

export const WORKOUT_DAYS = [
  {
    dayNumber: 1,
    id: 'mon',
    weekday: 'Mon',
    fullWeekday: 'Monday',
    title: 'Chest & Triceps',
    tagline: 'Build upper body pushing strength & endurance',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min cycling at a moderate pace. Keep a steady rhythm and stay hydrated!',
    },
    exercises: [
      {
        id: 'd1-ex1',
        name: 'Dumbbell Floor Press',
        sets: 3,
        reps: '10',
        repsCount: 10,
        animationType: 'floor-press',
        formTips: [
          'Lie flat on your back with knees bent and feet planted.',
          'Press dumbbells up smoothly until arms are extended, elbows touching floor gently on return.'
        ],
        media: null // Example: '/videos/floor-press.mp4'
      },
      {
        id: 'd1-ex2',
        name: 'Dumbbell Fly on Floor',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'fly',
        formTips: [
          'Keep a slight bend in your elbows throughout the arc.',
          'Open arms out until upper arms tap the floor softly, then squeeze chest to bring together.'
        ],
        media: null
      },
      {
        id: 'd1-ex3',
        name: 'Overhead Triceps Extension',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'overhead-extension',
        formTips: [
          'Keep your elbows pointed forward and close to your ears.',
          'Lower the dumbbell behind your head and extend fully without arching your lower back.'
        ],
        media: null
      }
    ]
  },
  {
    dayNumber: 2,
    id: 'tue',
    weekday: 'Tue',
    fullWeekday: 'Tuesday',
    title: 'Back & Biceps',
    tagline: 'Pulling power, posture & sculpted arms',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min cycling at a moderate pace. Find a good music playlist and pedal consistently.',
    },
    exercises: [
      {
        id: 'd2-ex1',
        name: 'Bent-Over Dumbbell Row',
        sets: 3,
        reps: '10',
        repsCount: 10,
        animationType: 'bent-over-row',
        formTips: [
          'Hinge forward at the hips with a flat back and engaged core.',
          'Pull elbows toward your hips, pinching shoulder blades together at the top.'
        ],
        media: null
      },
      {
        id: 'd2-ex2',
        name: 'Dumbbell Biceps Curls',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'biceps-curl',
        formTips: [
          'Keep elbows pinned by your ribs without swinging your hips.',
          'Squeeze biceps at the top and lower under control for 2 seconds.'
        ],
        media: null
      },
      {
        id: 'd2-ex3',
        name: 'Hammer Curls',
        sets: 2,
        reps: '10',
        repsCount: 10,
        animationType: 'hammer-curl',
        formTips: [
          'Hold dumbbells with palms facing each other throughout the curl.',
          'Focus on full extension at the bottom and strong contraction at the top.'
        ],
        media: null
      }
    ]
  },
  {
    dayNumber: 3,
    id: 'wed',
    weekday: 'Wed',
    fullWeekday: 'Wednesday',
    title: 'Legs',
    tagline: 'Tone glutes, hamstrings, quads & calves',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min easy-to-moderate cycling. Loosen up your leg muscles after the dumbbell sets.',
    },
    exercises: [
      {
        id: 'd3-ex1',
        name: 'Goblet Squats',
        sets: 3,
        reps: '12',
        repsCount: 12,
        animationType: 'goblet-squat',
        formTips: [
          'Hold one dumbbell vertically close to your chest with both hands.',
          'Squat down until thighs are parallel to ground, keeping chest proud and knees tracking toes.'
        ],
        media: null
      },
      {
        id: 'd3-ex2',
        name: 'Dumbbell Romanian Deadlifts',
        sets: 3,
        reps: '10',
        repsCount: 10,
        animationType: 'rdl',
        formTips: [
          'Push your hips straight back while keeping dumbbells gliding down close to your shins.',
          'Feel the stretch in your hamstrings, then drive hips forward to stand tall.'
        ],
        media: null
      },
      {
        id: 'd3-ex3',
        name: 'Standing Calf Raises',
        sets: 2,
        reps: '15',
        repsCount: 15,
        animationType: 'calf-raise',
        formTips: [
          'Hold weights at your sides and rise high onto the balls of your feet.',
          'Pause for 1 second at the top of every single rep for maximum calf burn.'
        ],
        media: null
      }
    ]
  },
  {
    dayNumber: 4,
    id: 'thu',
    weekday: 'Thu',
    fullWeekday: 'Thursday',
    title: 'Shoulders & Abs',
    tagline: 'Shoulder definition & solid core stability',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min cycling. Enjoy a solid steady-state cruise.',
    },
    exercises: [
      {
        id: 'd4-ex1',
        name: 'Dumbbell Shoulder Press',
        sets: 3,
        reps: '10',
        repsCount: 10,
        animationType: 'shoulder-press',
        formTips: [
          'Start with dumbbells at shoulder height, elbows slightly angled in front.',
          'Press overhead smoothly without leaning backward.'
        ],
        media: null
      },
      {
        id: 'd4-ex2',
        name: 'Dumbbell Lateral Raises',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'lateral-raise',
        formTips: [
          'Lead with your elbows and raise arms out to shoulder height like pouring a glass of water.',
          'Use light controlled weight to avoid swinging or shrugging your neck.'
        ],
        media: null
      },
      {
        id: 'd4-ex3',
        name: 'Plank',
        sets: 2,
        reps: '30-45 sec',
        repsCount: 1,
        isTimed: true,
        durationSeconds: 45,
        animationType: 'plank',
        formTips: [
          'Keep your body in a straight line from crown of head to heels.',
          'Tuck pelvis slightly, squeeze glutes and breathe steadily.'
        ],
        media: null
      }
    ]
  },
  {
    dayNumber: 5,
    id: 'fri',
    weekday: 'Fri',
    fullWeekday: 'Friday',
    title: 'Upper Body',
    tagline: 'All-around upper strength & tone',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min cycling. Finish the work week strong and energize your evening!',
    },
    exercises: [
      {
        id: 'd5-ex1',
        name: 'Dumbbell Floor Press',
        sets: 3,
        reps: '10',
        repsCount: 10,
        animationType: 'floor-press',
        formTips: [
          'Plant feet firm on the floor, brace abdominal muscles.',
          'Lower weights under control until triceps tap the ground gently.'
        ],
        media: null
      },
      {
        id: 'd5-ex2',
        name: 'One-Arm Dumbbell Row',
        sets: 3,
        reps: '10 each side',
        repsCount: 10,
        animationType: 'one-arm-row',
        formTips: [
          'Place one hand and knee on a bench or couch, or brace on front thigh.',
          'Pull dumbbell up toward your hip, keeping your torso parallel to the ground.'
        ],
        media: null
      },
      {
        id: 'd5-ex3',
        name: 'Dumbbell Curls',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'biceps-curl',
        formTips: [
          'Stand tall with shoulders rolled back.',
          'Curl weights upward, squeezing biceps firmly at peak contraction.'
        ],
        media: null
      }
    ]
  },
  {
    dayNumber: 6,
    id: 'sat',
    weekday: 'Sat',
    fullWeekday: 'Saturday',
    title: 'Full Body',
    tagline: 'Full body synergy to conquer the week',
    dumbbellTime: '15 min',
    cardioTime: '30 min',
    cardio: {
      title: 'Cycling',
      durationMinutes: 30,
      note: '30 min easy cycling. Celebrate completing the 6-day cycle with a relaxed ride!',
    },
    exercises: [
      {
        id: 'd6-ex1',
        name: 'Dumbbell Squats',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'squat',
        formTips: [
          'Hold dumbbells comfortably at your sides or resting on shoulders.',
          'Sit back into your hips with good posture, driving through heels to stand.'
        ],
        media: null
      },
      {
        id: 'd6-ex2',
        name: 'Dumbbell Romanian Deadlifts',
        sets: 2,
        reps: '12',
        repsCount: 12,
        animationType: 'rdl',
        formTips: [
          'Keep your shoulders pinned back and hinge with soft knees.',
          'Lower dumbbells just below knee level while keeping your spine straight.'
        ],
        media: null
      },
      {
        id: 'd6-ex3',
        name: 'Dumbbell Shoulder Press',
        sets: 2,
        reps: '10',
        repsCount: 10,
        animationType: 'shoulder-press',
        formTips: [
          'Exhale as you press the weights overhead.',
          'Lock in your core so your back stays neutral and stable.'
        ],
        media: null
      },
      {
        id: 'd6-ex4',
        name: 'Farmer\'s Carry',
        sets: 2,
        reps: '30 sec',
        repsCount: 1,
        isTimed: true,
        durationSeconds: 30,
        animationType: 'farmers-carry',
        formTips: [
          'Hold a heavy dumbbell in each hand by your sides.',
          'Walk with short, deliberate steps, tall posture, and braced abs.'
        ],
        media: null
      }
    ]
  }
];

export const REST_DAY_DATA = {
  weekday: 'Sun',
  fullWeekday: 'Sunday',
  title: 'Rest & Recovery Day',
  quote: '“Rest is not a break from the workout; it is where your muscles rebuild and grow stronger.” 🌸',
  message: 'You crushed your week! Today is your dedicated day to recharge, relax, and let your body restore its energy.',
  waterGoalLitres: '2.5 - 3.0 Liters',
  stretchingList: [
    {
      title: 'Gentle Cat-Cow Stretch',
      duration: '2 minutes',
      description: 'On all fours, inhale as you arch your spine looking gently up, then exhale as you round your back toward the ceiling.'
    },
    {
      title: 'Child’s Pose (Balasana)',
      duration: '3 minutes',
      description: 'Sit back on your heels, extend arms forward on a soft mat, and breathe deeply into your belly and lower back.'
    },
    {
      title: 'Hamstring & Glute Figure-4 Stretch',
      duration: '2 min each side',
      description: 'Lie on your back, cross one ankle over the opposite knee, and hug your thigh toward your chest to release glute tension.'
    },
    {
      title: 'Standing Chest Opener',
      duration: '2 minutes',
      description: 'Interlace your fingers behind your back, roll shoulders open, and gently lift hands away from hips to open the chest.'
    }
  ],
  wellnessTips: [
    {
      icon: '💧',
      title: 'Hydrate Consistently',
      detail: 'Keep your favorite water bottle nearby with lemon or electrolyte slices.'
    },
    {
      icon: '🥗',
      title: 'Nourishing Meals',
      detail: 'Fuel your recovery with good protein, colorful veggies, and wholesome carbs.'
    },
    {
      icon: '🚶‍♀️',
      title: 'Casual Stroll',
      detail: 'An easy 15-20 min fresh air walk or leisurely park stroll helps muscle recovery.'
    },
    {
      icon: '😴',
      title: 'Sweet Sleep',
      detail: 'Aim for 8 restful hours tonight to feel vibrant and ready for Monday.'
    }
  ]
};
