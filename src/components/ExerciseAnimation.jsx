import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Maximize2, X, ShieldCheck, Flame, Compass, ChevronUp, ChevronDown } from 'lucide-react';

/**
 * EXERCISE_METADATA
 * Biomechanical cues, primary muscle groups, recommended lifting tempo, and badges.
 */
const EXERCISE_METADATA = {
  'floor-press': {
    muscle: 'Pectoralis Major & Triceps',
    secondary: 'Anterior Deltoids',
    tempo: '2s down • 1s pause • 1s press',
    cue: 'Lower until triceps lightly kiss the mat at 45-60°, then press straight up over mid-chest.',
    badge: 'Chest & Arms',
    concentric: 'Press straight up over chest',
    eccentric: 'Lower until triceps kiss floor'
  },
  'fly': {
    muscle: 'Sternal Pectorals',
    secondary: 'Anterior Deltoids & Biceps',
    tempo: '2.5s open • 1s squeeze',
    cue: 'Keep a soft 15° elbow bend. Arc dumbbells wide until triceps tap mat, then squeeze chest to bring together.',
    badge: 'Chest Isolation',
    concentric: 'Squeeze chest to meet at top',
    eccentric: 'Wide controlled arc to sides'
  },
  'overhead-extension': {
    muscle: 'Triceps Brachii (Long Head)',
    secondary: 'Core & Scapular Stabilizers',
    tempo: '2s lower • 1s lockout',
    cue: 'Keep upper arms vertical beside ears; hinge at elbows behind head, then extend fully overhead.',
    badge: 'Triceps Sculpt',
    concentric: 'Extend forearms to ceiling',
    eccentric: 'Lower dumbbell behind head'
  },
  'bent-over-row': {
    muscle: 'Latissimus Dorsi & Rhomboids',
    secondary: 'Rear Delts & Biceps',
    tempo: '1s pull • 1s squeeze • 2s lower',
    cue: 'Hinge back at 45° with flat spine. Drive elbows back along ribcage, pinching shoulder blades together.',
    badge: 'Back & Posture',
    concentric: 'Drive elbows up past ribcage',
    eccentric: 'Lower weights under full control'
  },
  'one-arm-row': {
    muscle: 'Unilateral Lats & Mid-Back',
    secondary: 'Core Obliques & Biceps',
    tempo: '1s pull • 1s hold • 2s lower',
    cue: 'Keep spine flat and parallel to bench. Drive elbow toward hip pocket with zero torso twist.',
    badge: 'Back Width',
    concentric: 'Pull elbow toward hip pocket',
    eccentric: 'Glide dumbbell down straight'
  },
  'biceps-curl': {
    muscle: 'Biceps Brachii',
    secondary: 'Brachialis & Forearms',
    tempo: '1.5s curl • 1s peak squeeze • 2s lower',
    cue: 'Elbows pinned to sides. Zero hip swing; supinate wrists and squeeze biceps hard at peak.',
    badge: 'Biceps Peak',
    concentric: 'Curl upward with supinated wrists',
    eccentric: 'Lower under strict 2s control'
  },
  'hammer-curl': {
    muscle: 'Brachialis & Brachioradialis',
    secondary: 'Biceps Long Head & Grip',
    tempo: '1.5s curl • 1s hold • 2s lower',
    cue: 'Keep palms facing inward throughout. Build dense arm thickness, forearm power, and grip strength.',
    badge: 'Forearms & Grip',
    concentric: 'Lift with neutral inward palms',
    eccentric: 'Controlled descent to full extension'
  },
  'goblet-squat': {
    muscle: 'Quadriceps & Gluteus Maximus',
    secondary: 'Core, Hamstrings & Adductors',
    tempo: '2.5s descent • 1s bottom pause • 1s drive',
    cue: 'Cup dumbbell vertically at collarbone. Hips sink back between knees to parallel, chest proud, drive through heels.',
    badge: 'Legs & Core',
    concentric: 'Drive through midfoot and heels',
    eccentric: 'Sink hips back and down to 90°'
  },
  'squat': {
    muscle: 'Quadriceps & Glutes',
    secondary: 'Hamstrings & Calves',
    tempo: '2.5s descent • 1s drive up',
    cue: 'Hips back and down to 90°, knees track over mid-toes, spine neutral, explosive drive through mid-foot.',
    badge: 'Full Leg Power',
    concentric: 'Drive through heels to stand tall',
    eccentric: 'Hips back, thighs reach parallel'
  },
  'rdl': {
    muscle: 'Hamstrings & Gluteal Fold',
    secondary: 'Erector Spinae & Lats',
    tempo: '3s hinge • 1s glute lockout',
    cue: 'Push hips straight back with soft knees. Shave shins with dumbbells, feel deep hamstring stretch, snap glutes forward.',
    badge: 'Posterior Chain',
    concentric: 'Drive hips forward to lockout',
    eccentric: 'Push hips back, glide down shins'
  },
  'calf-raise': {
    muscle: 'Gastrocnemius & Soleus',
    secondary: 'Ankle & Foot Stabilizers',
    tempo: '1s rise • 1.5s peak hold • 2s lower',
    cue: 'Rise high onto the balls of your feet. Squeeze calves into a hard diamond peak for a full second.',
    badge: 'Calf Definition',
    concentric: 'Rise high onto balls of feet',
    eccentric: 'Lower heels smoothly to mat'
  },
  'shoulder-press': {
    muscle: 'Anterior & Lateral Deltoids',
    secondary: 'Triceps & Upper Chest',
    tempo: '1.5s press • 2s controlled lower',
    cue: 'Press dumbbells overhead in scapular plane with core braced. Lock out smoothly without arching lower back.',
    badge: 'Shoulder Strength',
    concentric: 'Press smoothly overhead to lockout',
    eccentric: 'Lower dumbbells to ear height'
  },
  'lateral-raise': {
    muscle: 'Lateral Deltoids (Side Cap)',
    secondary: 'Upper Trapezius',
    tempo: '1.5s lift • 1s hold • 2s lower',
    cue: 'Lead with elbows with a soft bend. Raise to shoulder height like pouring two glasses of water, controlled descent.',
    badge: 'Shoulder Width',
    concentric: 'Lead with elbows out to sides',
    eccentric: 'Controlled lowering to side thighs'
  },
  'plank': {
    muscle: 'Transverse & Rectus Abdominis',
    secondary: 'Glutes, Serratus & Shoulders',
    tempo: 'Constant isometric tension',
    cue: 'Straight line from crown of head to heels. Forearms grounded, pull navel to spine, squeeze glutes.',
    badge: 'Deep Core',
    concentric: 'Hold tight isometric brace',
    eccentric: 'Maintain neutral spinal alignment'
  },
  'farmers-carry': {
    muscle: 'Forearms, Traps & Core',
    secondary: 'Full Body Postural Chains',
    tempo: 'Steady, deliberate marching tempo',
    cue: 'Stand tall with proud chest, shoulders packed down, braced abs, and short controlled deliberate strides.',
    badge: 'Grip & Posture',
    concentric: 'March forward with proud posture',
    eccentric: 'Short deliberate controlled strides'
  }
};

/**
 * Centered, Scaled 60fps Human Character SVG Kinematics
 * ViewBox: 0 0 400 280
 */
function HumanCharacterRig({ type, phase, showMuscles, showGuide }) {
  // Smooth cosine easing
  const t = (1 - Math.cos(phase * Math.PI * 2)) / 2; // 0 (start) -> 1 (peak) -> 0 (return)

  // Athletic styling
  const skin = '#fcd34d';
  const skinShadow = '#f59e0b';
  const topColor = '#f43f5e';
  const topShadow = '#be123c';
  const pantsColor = '#1e293b';
  const pantsStripe = '#fb7185';
  const shoeColor = '#0f172a';
  const shoeSole = '#f8fafc';
  const dumbbellPlate = '#334155';
  const dumbbellBar = '#94a3b8';
  const muscleGlowColor = '#fb7185';
  const muscleGlowOpacity = showMuscles ? 0.35 + t * 0.45 : 0;

  // 1. FLOOR PRESS (Centered, Mat at y=190)
  if (type === 'floor-press') {
    const pressY = 160 - t * 80; // 160 down to 80 (pressed)
    const elbowY = 180 - t * 45;
    const elbowX = 155 - t * 5;

    return (
      <g transform="translate(15, -10)">
        {/* Gym Mat */}
        <rect x="30" y="195" width="320" height="14" rx="7" fill="#f43f5e" opacity="0.9" />
        <rect x="32" y="197" width="316" height="4" rx="2" fill="#fb7185" opacity="0.6" />

        {/* Head */}
        <circle cx="100" cy="172" r="16" fill={skin} />
        <path d="M 88 170 Q 80 156 92 160 Q 106 158 110 166 Z" fill="#451a03" />
        <path d="M 86 176 Q 72 182 66 192 Q 78 188 90 182 Z" fill="#451a03" />

        {/* Torso lying on mat */}
        <rect x="115" y="166" width="80" height="26" rx="12" fill={topColor} />
        {showMuscles && (
          <ellipse cx="150" cy="174" rx="20" ry="10" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Pelvis & Hips */}
        <ellipse cx="198" cy="178" rx="16" ry="13" fill={pantsColor} />

        {/* Bent Legs on Floor (Knees bent up) */}
        {/* Back Leg */}
        <line x1="198" y1="178" x2="245" y2="128" stroke="#0f172a" strokeWidth="15" strokeLinecap="round" />
        <line x1="245" y1="128" x2="280" y2="195" stroke="#0f172a" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx="286" cy="197" rx="14" ry="6" fill={shoeColor} />

        {/* Front Leg */}
        <line x1="198" y1="178" x2="240" y2="125" stroke={pantsColor} strokeWidth="17" strokeLinecap="round" />
        <line x1="198" y1="175" x2="240" y2="122" stroke={pantsStripe} strokeWidth="3" strokeLinecap="round" />
        <line x1="240" y1="125" x2="275" y2="195" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
        <circle cx="240" cy="125" r="8" fill={pantsColor} />
        {/* Sneaker */}
        <ellipse cx="280" cy="197" rx="15" ry="7" fill={shoeColor} />
        <rect x="268" y="200" width="24" height="4" rx="2" fill={shoeSole} />

        {/* Motion Path Guide */}
        {showGuide && (
          <g opacity="0.6">
            <line x1="150" y1="160" x2="150" y2="80" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
            <polygon points="150,72 145,82 155,82" fill="#f43f5e" />
          </g>
        )}

        {/* Pressing Arm */}
        <line x1="150" y1="175" x2={elbowX} y2={elbowY} stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="6" fill={skinShadow} />
        <line x1={elbowX} y1={elbowY} x2="150" y2={pressY} stroke={skin} strokeWidth="10.5" strokeLinecap="round" />
        <circle cx="150" cy={pressY} r="6" fill={skin} />

        {/* Dumbbell */}
        <g transform={`translate(150, ${pressY})`}>
          <rect x="-18" y="-4" width="36" height="8" rx="2" fill={dumbbellBar} />
          <rect x="-28" y="-16" width="10" height="32" rx="3" fill={dumbbellPlate} />
          <rect x="18" y="-16" width="10" height="32" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 2. CHEST FLY
  if (type === 'fly') {
    const handX = 150 - (1 - t) * 65;
    const handY = 85 + (1 - t) * 75;
    const elbowX = 150 - (1 - t) * 40;
    const elbowY = 135 + (1 - t) * 45;

    return (
      <g transform="translate(15, -10)">
        {/* Mat */}
        <rect x="30" y="195" width="320" height="14" rx="7" fill="#f43f5e" opacity="0.9" />
        <rect x="32" y="197" width="316" height="4" rx="2" fill="#fb7185" opacity="0.6" />

        {/* Head */}
        <circle cx="100" cy="172" r="16" fill={skin} />
        <path d="M 88 170 Q 80 156 92 160 Q 106 158 110 166 Z" fill="#451a03" />

        {/* Torso */}
        <rect x="115" y="166" width="80" height="26" rx="12" fill={topColor} />
        {showMuscles && (
          <ellipse cx="150" cy="174" rx="20" ry="10" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Legs */}
        <ellipse cx="198" cy="178" rx="16" ry="13" fill={pantsColor} />
        <line x1="198" y1="178" x2="240" y2="125" stroke={pantsColor} strokeWidth="17" strokeLinecap="round" />
        <line x1="240" y1="125" x2="275" y2="195" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
        <ellipse cx="280" cy="197" rx="15" ry="7" fill={shoeColor} />

        {/* Motion Arc Guide */}
        {showGuide && (
          <path d="M 85 160 Q 105 100 150 85" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
        )}

        {/* Fly Arm */}
        <line x1="150" y1="175" x2={elbowX} y2={elbowY} stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="6" fill={skinShadow} />
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={skin} strokeWidth="10.5" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r="6" fill={skin} />

        {/* Dumbbell */}
        <g transform={`translate(${handX}, ${handY}) rotate(${-30 + t * 30})`}>
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-26" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="16" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 3. OVERHEAD TRICEPS EXTENSION
  if (type === 'overhead-extension') {
    const forearmAngle = -120 + t * 120; // -120 (behind head) to 0 (straight up)
    const elbowX = 200;
    const elbowY = 70;
    const handX = elbowX + Math.sin((forearmAngle * Math.PI) / 180) * 60;
    const handY = elbowY - Math.cos((forearmAngle * Math.PI) / 180) * 60;

    return (
      <g transform="translate(0, 10)">
        {/* Bench */}
        <rect x="135" y="195" width="130" height="14" rx="4" fill="#334155" />
        <line x1="165" y1="209" x2="165" y2="255" stroke="#475569" strokeWidth="9" />
        <line x1="235" y1="209" x2="235" y2="255" stroke="#475569" strokeWidth="9" />
        <line x1="145" y1="255" x2="255" y2="255" stroke="#1e293b" strokeWidth="4" />

        {/* Pelvis & Legs */}
        <ellipse cx="200" cy="190" rx="18" ry="14" fill={pantsColor} />
        <line x1="200" y1="190" x2="240" y2="190" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
        <line x1="240" y1="190" x2="240" y2="255" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="248" cy="256" rx="14" ry="6" fill={shoeColor} />

        {/* Upright Torso */}
        <rect x="184" y="100" width="32" height="92" rx="16" fill={topColor} />
        <line x1="200" y1="105" x2="200" y2="185" stroke={topShadow} strokeWidth="2.5" opacity="0.5" />

        {/* Head */}
        <circle cx="200" cy="80" r="16" fill={skin} />
        <path d="M 186 72 Q 180 58 194 64 Q 210 60 214 72 Z" fill="#451a03" />

        {/* Triceps Muscle Glow */}
        {showMuscles && (
          <ellipse cx="192" cy="78" rx="10" ry="18" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Upper Arm Vertical */}
        <line x1="200" y1="110" x2={elbowX} y2={elbowY} stroke={skin} strokeWidth="13" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="6.5" fill={skinShadow} />

        {/* Trajectory Guide */}
        {showGuide && (
          <path d="M 148 100 A 60 60 0 0 1 200 10" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
        )}

        {/* Forearm */}
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={skin} strokeWidth="10.5" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r="6" fill={skin} />

        {/* Dumbbell */}
        <g transform={`translate(${handX}, ${handY}) rotate(${forearmAngle + 90})`}>
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-26" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="16" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 4. BENT-OVER DUMBBELL ROW & ONE-ARM ROW
  if (type === 'bent-over-row' || type === 'one-arm-row') {
    const handY = 195 - t * 75; // 195 down to 120 (rowed)
    const handX = 225 - t * 18;
    const elbowY = 165 - t * 80;
    const elbowX = 210 - t * 25;

    return (
      <g transform="translate(10, 5)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="75" ry="9" fill="#cbd5e1" opacity="0.6" />

        {/* Feet & Legs */}
        <ellipse cx="170" cy="242" rx="13" ry="6" fill={shoeColor} />
        <ellipse cx="205" cy="242" rx="13" ry="6" fill={shoeColor} />
        <line x1="170" y1="240" x2="175" y2="185" stroke={pantsColor} strokeWidth="13" strokeLinecap="round" />
        <line x1="205" y1="240" x2="200" y2="185" stroke={pantsColor} strokeWidth="13" strokeLinecap="round" />
        <line x1="175" y1="185" x2="145" y2="145" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />
        <line x1="200" y1="185" x2="145" y2="145" stroke={pantsColor} strokeWidth="15" strokeLinecap="round" />

        {/* Flat Torso at 45 deg */}
        <g transform="translate(145, 145) rotate(-45)">
          <rect x="0" y="-16" width="105" height="32" rx="16" fill={topColor} />
          {showMuscles && (
            <ellipse cx="50" cy="-10" rx="25" ry="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
          )}
        </g>

        {/* Head */}
        <circle cx="238" cy="72" r="16" fill={skin} />
        <path d="M 226 62 Q 220 50 236 54 Q 252 56 248 68 Z" fill="#451a03" />

        {/* Trajectory Guide */}
        {showGuide && (
          <g opacity="0.6">
            <line x1="225" y1="195" x2="207" y2="120" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
            <polygon points="207,114 202,124 212,124" fill="#f43f5e" />
          </g>
        )}

        {/* Arm Pull */}
        <line x1="220" y1="95" x2={elbowX} y2={elbowY} stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="6" fill={skinShadow} />
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={skin} strokeWidth="10.5" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r="6" fill={skin} />

        {/* Dumbbell */}
        <g transform={`translate(${handX}, ${handY}) rotate(-15)`}>
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-26" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="16" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 5. BICEPS CURL & HAMMER CURL
  if (type === 'biceps-curl' || type === 'hammer-curl') {
    const curlAngle = 20 + t * 135; // 20 deg (hang) to 155 deg (curled up)
    const elbowX = 185;
    const elbowY = 135;
    const handX = elbowX + Math.sin((curlAngle * Math.PI) / 180) * 65;
    const handY = elbowY + Math.cos((curlAngle * Math.PI) / 180) * 65;

    return (
      <g transform="translate(0, 10)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="60" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Legs & Shoes */}
        <line x1="188" y1="155" x2="188" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="212" y1="155" x2="212" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="212" y1="155" x2="212" y2="240" stroke={pantsStripe} strokeWidth="3" />
        <ellipse cx="188" cy="242" rx="13" ry="6" fill={shoeColor} />
        <ellipse cx="216" cy="242" rx="13" ry="6" fill={shoeColor} />

        {/* Torso */}
        <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
        <line x1="200" y1="75" x2="200" y2="155" stroke={topShadow} strokeWidth="2.5" opacity="0.4" />

        {/* Biceps Muscle Glow */}
        {showMuscles && (
          <ellipse cx="178" cy="115" rx="12" ry="16" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Head */}
        <circle cx="200" cy="50" r="16" fill={skin} />
        <path d="M 188 42 Q 180 28 196 32 Q 212 30 216 42 Z" fill="#451a03" />
        <path d="M 186 50 Q 168 54 162 66 Q 175 62 188 56 Z" fill="#451a03" />

        {/* Upper Arm pinned to ribs */}
        <line x1="190" y1="80" x2={elbowX} y2={elbowY} stroke={skin} strokeWidth="13" strokeLinecap="round" />
        <circle cx={elbowX} cy={elbowY} r="6.5" fill={skinShadow} />

        {/* Trajectory Guide Arc */}
        {showGuide && (
          <path d="M 207 198 A 65 65 0 0 1 180 75" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
        )}

        {/* Forearm */}
        <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <circle cx={handX} cy={handY} r="6" fill={skin} />

        {/* Dumbbell */}
        <g transform={`translate(${handX}, ${handY}) rotate(${type === 'hammer-curl' ? 90 : -curlAngle + 90})`}>
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-26" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="16" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 6. SQUAT & GOBLET SQUAT
  if (type === 'squat' || type === 'goblet-squat') {
    const hipY = 145 + t * 50;
    const hipX = 200 - t * 30;
    const kneeX = 210 + t * 18;
    const kneeY = 205;
    const torsoTilt = t * 20;

    return (
      <g transform="translate(0, 5)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx={60 + t * 12} ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Feet Planted */}
        <ellipse cx="175" cy="242" rx="14" ry="6" fill={shoeColor} />
        <ellipse cx="230" cy="242" rx="14" ry="6" fill={shoeColor} />

        {/* Shins */}
        <line x1="175" y1="240" x2={kneeX - 18} y2={kneeY} stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="230" y1="240" x2={kneeX + 18} y2={kneeY} stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />

        {/* Thighs */}
        <line x1={kneeX - 18} y1={kneeY} x2={hipX} y2={hipY} stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
        <line x1={kneeX + 18} y1={kneeY} x2={hipX} y2={hipY} stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
        <line x1={kneeX + 18} y1={kneeY} x2={hipX} y2={hipY} stroke={pantsStripe} strokeWidth="3" />

        {/* Quads & Glutes Glow */}
        {showMuscles && (
          <g>
            <ellipse cx={(kneeX + hipX) / 2} cy={(kneeY + hipY) / 2} rx="22" ry="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
            <circle cx={hipX - 6} cy={hipY} r="16" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
          </g>
        )}

        {/* Torso */}
        <g transform={`translate(${hipX}, ${hipY}) rotate(${torsoTilt})`}>
          <rect x="-18" y="-85" width="38" height="85" rx="16" fill={topColor} />
          {/* Head */}
          <circle cx="0" cy="-102" r="16" fill={skin} />
          <path d="M -14 -112 Q -20 -124 -6 -118 Q 12 -122 16 -110 Z" fill="#451a03" />

          {/* Arms holding Goblet dumbbell at collarbone */}
          <line x1="-14" y1="-75" x2="12" y2="-50" stroke={skin} strokeWidth="11" strokeLinecap="round" />
          <line x1="14" y1="-75" x2="12" y2="-50" stroke={skin} strokeWidth="11" strokeLinecap="round" />
          <circle cx="12" cy="-50" r="5.5" fill={skin} />

          {/* Vertical Goblet Dumbbell */}
          <g transform="translate(12, -50) rotate(90)">
            <rect x="-14" y="-3.5" width="28" height="7" rx="2" fill={dumbbellBar} />
            <rect x="-22" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
            <rect x="14" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
          </g>
        </g>
      </g>
    );
  }

  // 7. ROMANIAN DEADLIFT (RDL)
  if (type === 'rdl') {
    const hipX = 185 - t * 50;
    const hipY = 145 - t * 5;
    const hingeAngle = t * 55;
    const dbY = 160 + t * 65;

    return (
      <g transform="translate(10, 5)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="70" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Feet */}
        <ellipse cx="190" cy="242" rx="14" ry="6" fill={shoeColor} />

        {/* Shins */}
        <line x1="190" y1="240" x2="185" y2="190" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        {/* Thighs pushing hips back */}
        <line x1="185" y1="190" x2={hipX} y2={hipY} stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />

        {/* Hamstrings & Glutes Glow */}
        {showMuscles && (
          <ellipse cx={(185 + hipX) / 2} cy={(190 + hipY) / 2} rx="22" ry="10" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Hinged Torso */}
        <g transform={`translate(${hipX}, ${hipY}) rotate(${hingeAngle})`}>
          <rect x="-16" y="-90" width="34" height="90" rx="16" fill={topColor} />
          {/* Head */}
          <circle cx="0" cy="-108" r="16" fill={skin} />
          <path d="M -12 -116 Q -18 -130 0 -124 Q 14 -126 16 -114 Z" fill="#451a03" />

          {/* Arms hanging perpendicular down holding dumbbells */}
          <line x1="0" y1="-80" x2="20" y2="-15" stroke={skin} strokeWidth="11" strokeLinecap="round" />
          <circle cx="20" cy="-15" r="5.5" fill={skin} />
        </g>

        {/* Dumbbells gliding close to shins */}
        <g transform={`translate(${hipX + Math.sin((hingeAngle * Math.PI) / 180) * 80 + 16}, ${dbY})`}>
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-26" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="16" y="-14" width="10" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 8. STANDING CALF RAISES
  if (type === 'calf-raise') {
    const riseY = -t * 26;

    return (
      <g transform={`translate(0, ${riseY + 5})`}>
        {/* Step Platform */}
        <rect x="125" y="235" width="150" height="18" rx="4" fill="#334155" />
        <rect x="125" y="232" width="150" height="4" rx="1" fill="#64748b" />

        {/* Feet */}
        <ellipse cx="188" cy={232 - riseY * 0.3} rx="13" ry="6" fill={shoeColor} />
        <ellipse cx="218" cy={232 - riseY * 0.3} rx="13" ry="6" fill={shoeColor} />

        {/* Calves & Shins */}
        <line x1="188" y1="230" x2="188" y2="155" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="218" y1="230" x2="218" y2="155" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />

        {/* Calf Muscle Diamond Glow */}
        {showMuscles && (
          <ellipse cx="203" cy="195" rx="18" ry="16" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
        )}

        {/* Torso & Head */}
        <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
        <circle cx="200" cy="50" r="16" fill={skin} />
        <path d="M 188 42 Q 180 28 196 32 Q 212 30 216 42 Z" fill="#451a03" />

        {/* Arms holding weights at sides */}
        <line x1="178" y1="80" x2="170" y2="150" stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <line x1="222" y1="80" x2="230" y2="150" stroke={skin} strokeWidth="11" strokeLinecap="round" />

        {/* Dumbbells */}
        <g transform="translate(170, 150)">
          <rect x="-12" y="-3.5" width="24" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-18" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
          <rect x="12" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
        </g>
        <g transform="translate(230, 150)">
          <rect x="-12" y="-3.5" width="24" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-18" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
          <rect x="12" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 9. SHOULDER PRESS
  if (type === 'shoulder-press') {
    const pressY = 75 - t * 70; // 75 (ears) to 5 (high overhead lockout)
    const elbowY = 110 - t * 55;

    return (
      <g transform="translate(0, 10)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="60" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Legs */}
        <line x1="188" y1="155" x2="188" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="212" y1="155" x2="212" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="188" cy="242" rx="13" ry="6" fill={shoeColor} />
        <ellipse cx="216" cy="242" rx="13" ry="6" fill={shoeColor} />

        {/* Torso */}
        <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
        {showMuscles && (
          <g>
            <circle cx="174" cy="80" r="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
            <circle cx="226" cy="80" r="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
          </g>
        )}

        {/* Head */}
        <circle cx="200" cy="50" r="16" fill={skin} />
        <path d="M 188 42 Q 180 28 196 32 Q 212 30 216 42 Z" fill="#451a03" />

        {/* Trajectory Guide */}
        {showGuide && (
          <g opacity="0.6">
            <line x1="155" y1="75" x2="165" y2="10" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="245" y1="75" x2="235" y2="10" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
          </g>
        )}

        {/* Left Arm */}
        <line x1="178" y1="80" x2="155" y2={elbowY} stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <line x1="155" y1={elbowY} x2="165" y2={pressY} stroke={skin} strokeWidth="10" strokeLinecap="round" />
        <circle cx="165" cy={pressY} r="5.5" fill={skin} />

        {/* Right Arm */}
        <line x1="222" y1="80" x2="245" y2={elbowY} stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <line x1="245" y1={elbowY} x2="235" y2={pressY} stroke={skin} strokeWidth="10" strokeLinecap="round" />
        <circle cx="235" cy={pressY} r="5.5" fill={skin} />

        {/* Dumbbells */}
        <g transform={`translate(165, ${pressY})`}>
          <rect x="-14" y="-3.5" width="28" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-22" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
          <rect x="14" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
        </g>
        <g transform={`translate(235, ${pressY})`}>
          <rect x="-14" y="-3.5" width="28" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-22" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
          <rect x="14" y="-12" width="8" height="24" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 10. LATERAL RAISES
  if (type === 'lateral-raise') {
    const liftAngle = t * 75; // 0 to 75 deg out
    const leftHandX = 175 - Math.sin((liftAngle * Math.PI) / 180) * 75;
    const leftHandY = 85 + Math.cos((liftAngle * Math.PI) / 180) * 75;
    const rightHandX = 225 + Math.sin((liftAngle * Math.PI) / 180) * 75;
    const rightHandY = 85 + Math.cos((liftAngle * Math.PI) / 180) * 75;

    return (
      <g transform="translate(0, 10)">
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="60" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Legs */}
        <line x1="188" y1="155" x2="188" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <line x1="212" y1="155" x2="212" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="188" cy="242" rx="13" ry="6" fill={shoeColor} />
        <ellipse cx="216" cy="242" rx="13" ry="6" fill={shoeColor} />

        {/* Torso */}
        <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
        {showMuscles && (
          <g>
            <circle cx="174" cy="80" r="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
            <circle cx="226" cy="80" r="12" fill={muscleGlowColor} opacity={muscleGlowOpacity} filter="blur(4px)" />
          </g>
        )}

        {/* Head */}
        <circle cx="200" cy="50" r="16" fill={skin} />
        <path d="M 188 42 Q 180 28 196 32 Q 212 30 216 42 Z" fill="#451a03" />

        {/* Trajectory Guide */}
        {showGuide && (
          <g opacity="0.6">
            <path d="M 175 160 A 75 75 0 0 1 100 85" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 225 160 A 75 75 0 0 0 300 85" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
          </g>
        )}

        {/* Left Arm */}
        <line x1="178" y1="80" x2={leftHandX} y2={leftHandY} stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <circle cx={leftHandX} cy={leftHandY} r="5.5" fill={skin} />
        <g transform={`translate(${leftHandX}, ${leftHandY}) rotate(${-liftAngle})`}>
          <rect x="-12" y="-3.5" width="24" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-18" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
          <rect x="12" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
        </g>

        {/* Right Arm */}
        <line x1="222" y1="80" x2={rightHandX} y2={rightHandY} stroke={skin} strokeWidth="11" strokeLinecap="round" />
        <circle cx={rightHandX} cy={rightHandY} r="5.5" fill={skin} />
        <g transform={`translate(${rightHandX}, ${rightHandY}) rotate(${liftAngle})`}>
          <rect x="-12" y="-3.5" width="24" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-18" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
          <rect x="12" y="-12" width="7" height="24" rx="2" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // 11. PLANK (Centered horizontally, mat at y=185)
  if (type === 'plank') {
    const breath = Math.sin(phase * Math.PI * 4) * 2.5;

    return (
      <g transform="translate(15, -5)">
        {/* Gym Mat */}
        <rect x="40" y="195" width="310" height="14" rx="7" fill="#f43f5e" opacity="0.9" />
        <rect x="42" y="197" width="306" height="4" rx="2" fill="#fb7185" opacity="0.6" />

        {/* Toes planted */}
        <ellipse cx="295" cy="192" rx="10" ry="5" fill={shoeColor} />

        {/* Isometric Body Line with breathing */}
        <g transform={`translate(0, ${breath})`}>
          {/* Lower Body Line */}
          <line x1="295" y1="188" x2="220" y2="150" stroke={pantsColor} strokeWidth="16" strokeLinecap="round" />
          <line x1="295" y1="185" x2="220" y2="147" stroke={pantsStripe} strokeWidth="3" />

          {/* Torso & Core */}
          <line x1="220" y1="150" x2="125" y2="135" stroke={topColor} strokeWidth="22" strokeLinecap="round" />

          {/* Abdominal Muscle Glow */}
          {showMuscles && (
            <ellipse cx="170" cy="145" rx="40" ry="14" fill={muscleGlowColor} opacity={0.65 + breath * 0.05} filter="blur(4px)" />
          )}

          {/* Head */}
          <circle cx="95" cy="130" r="16" fill={skin} />
          <path d="M 84 124 Q 76 110 90 116 Q 106 114 110 124 Z" fill="#451a03" />

          {/* Forearm Ground Support */}
          <line x1="125" y1="135" x2="125" y2="195" stroke={skin} strokeWidth="12" strokeLinecap="round" />
          <circle cx="125" cy="195" r="6.5" fill={skinShadow} />
          <line x1="125" y1="195" x2="170" y2="195" stroke={skin} strokeWidth="10.5" strokeLinecap="round" />
          <circle cx="170" cy="195" r="5.5" fill={skin} />
        </g>
      </g>
    );
  }

  // 12. FARMER'S CARRY (Walking march)
  if (type === 'farmers-carry') {
    const walkPhase = phase * Math.PI * 4;
    const leg1Offset = Math.sin(walkPhase) * 24;
    const leg2Offset = -leg1Offset;
    const bodyBob = Math.abs(Math.sin(walkPhase)) * 4;

    return (
      <g transform={`translate(0, ${bodyBob + 10})`}>
        {/* Floor Shadow */}
        <ellipse cx="200" cy="245" rx="60" ry="8" fill="#cbd5e1" opacity="0.6" />

        {/* Legs in Marching Stride */}
        <line x1="190" y1="155" x2={190 + leg1Offset} y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <ellipse cx={190 + leg1Offset} cy="242" rx="13" ry="6" fill={shoeColor} />

        <line x1="210" y1="155" x2={210 + leg2Offset} y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
        <ellipse cx={210 + leg2Offset} cy="242" rx="13" ry="6" fill={shoeColor} />

        {/* Torso */}
        <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
        {showMuscles && (
          <g>
            <ellipse cx="172" cy="125" rx="10" ry="18" fill={muscleGlowColor} opacity={0.65} filter="blur(4px)" />
            <ellipse cx="228" cy="125" rx="10" ry="18" fill={muscleGlowColor} opacity={0.65} filter="blur(4px)" />
          </g>
        )}

        {/* Head */}
        <circle cx="200" cy="50" r="16" fill={skin} />
        <path d="M 188 42 Q 180 28 196 32 Q 212 30 216 42 Z" fill="#451a03" />

        {/* Arms holding heavy dumbbells */}
        <line x1="178" y1="80" x2="170" y2="150" stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx="170" cy="150" r="5.5" fill={skin} />
        <g transform="translate(170, 150)">
          <rect x="-14" y="-3.5" width="28" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-22" y="-14" width="9" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="14" y="-14" width="9" height="28" rx="3" fill={dumbbellPlate} />
        </g>

        <line x1="222" y1="80" x2="230" y2="150" stroke={skin} strokeWidth="12" strokeLinecap="round" />
        <circle cx="230" cy="150" r="5.5" fill={skin} />
        <g transform="translate(230, 150)">
          <rect x="-14" y="-3.5" width="28" height="7" rx="2" fill={dumbbellBar} />
          <rect x="-22" y="-14" width="9" height="28" rx="3" fill={dumbbellPlate} />
          <rect x="14" y="-14" width="9" height="28" rx="3" fill={dumbbellPlate} />
        </g>
      </g>
    );
  }

  // Fallback
  return (
    <g transform="translate(0, 10)">
      <ellipse cx="200" cy="245" rx="60" ry="8" fill="#cbd5e1" opacity="0.6" />
      <line x1="190" y1="155" x2="190" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
      <line x1="210" y1="155" x2="210" y2="240" stroke={pantsColor} strokeWidth="14" strokeLinecap="round" />
      <rect x="178" y="70" width="44" height="95" rx="16" fill={topColor} />
      <circle cx="200" cy="50" r="16" fill={skin} />
    </g>
  );
}

/**
 * ExerciseAnimation
 * 100% Animated SVG Fitness Engine:
 * - Buttery-smooth 60fps trigonometric kinematics
 * - Real human anatomy with zero glitched or detached limbs
 * - Live rep counter, phase tempo indicator, and muscle glow
 * - Speed controls, muscle toggle, motion guide, and full-screen view
 */
export default function ExerciseAnimation({ type = 'floor-press', media = null, name = 'Exercise' }) {
  const meta = EXERCISE_METADATA[type] || {
    muscle: 'Primary Musculature',
    secondary: 'Stabilizers',
    tempo: '2s down • 1s up',
    cue: 'Execute each repetition with controlled tempo and smooth range of motion.',
    badge: 'Strength',
    concentric: 'Lift / Contraction',
    eccentric: 'Lower / Controlled stretch'
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 0.5x, 1x, 1.5x
  const [showMuscles, setShowMuscles] = useState(true);
  const [showGuide, setShowGuide] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [repCount, setRepCount] = useState(1);
  const [phase, setPhase] = useState(0); // 0 to 1

  const animRef = useRef({
    phase: 0,
    isPlaying: true,
    speed: 1,
    lastTime: null,
    repCount: 1
  });

  useEffect(() => {
    animRef.current.isPlaying = isPlaying;
    animRef.current.speed = speed;
  }, [isPlaying, speed]);

  // Smooth 60fps requestAnimationFrame loop
  useEffect(() => {
    let reqId;

    const tick = (now) => {
      if (animRef.current.lastTime === null) {
        animRef.current.lastTime = now;
      }
      const delta = (now - animRef.current.lastTime) / 1000;
      animRef.current.lastTime = now;

      if (animRef.current.isPlaying) {
        // Base cycle time is ~2.8 seconds per full rep
        const cycleSpeed = animRef.current.speed / 2.8;
        const prevPhase = animRef.current.phase;
        let newPhase = prevPhase + delta * cycleSpeed;

        if (newPhase >= 1) {
          newPhase = newPhase % 1;
          animRef.current.repCount = (animRef.current.repCount % 12) + 1;
          setRepCount(animRef.current.repCount);
        }

        animRef.current.phase = newPhase;
        setPhase(newPhase);
      }

      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
  }, []);

  const isLifting = phase < 0.5;
  const currentAction = isLifting ? meta.concentric : meta.eccentric;

  return (
    <div className="w-full flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md transition-all">
      {/* Top Header Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40">
            {meta.badge}
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px] sm:max-w-[240px]">
            {meta.muscle}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Muscle Glow Toggle */}
          <button
            onClick={() => setShowMuscles(!showMuscles)}
            className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
              showMuscles
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Toggle Muscle Activation Glow"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Muscles</span>
          </button>

          {/* Guide Path Toggle */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
              showGuide
                ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200/60 dark:border-pink-800/40'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            title="Toggle Movement Path Guide"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Trajectory</span>
          </button>

          {/* Enlarge */}
          <button
            onClick={() => setIsZoomOpen(true)}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Enlarge Animation"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Animated SVG Display */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center overflow-hidden group">
        <svg
          viewBox="0 0 400 280"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle Ambient Studio Glow */}
          <radialGradient id="studioGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>
          <rect x="0" y="0" width="400" height="280" fill="url(#studioGlow)" />

          {/* Procedural Character Rig */}
          <HumanCharacterRig
            type={type}
            phase={phase}
            showMuscles={showMuscles}
            showGuide={showGuide}
          />
        </svg>

        {/* Live Motion Status Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide shadow-md border border-white/10 pointer-events-none">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isLifting
                ? 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)] animate-pulse'
                : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]'
            }`}
          />
          <span className="font-bold">
            {isLifting ? '▲ Concentric (Lift)' : '▼ Eccentric (Lower)'}
          </span>
        </div>

        {/* Live Rep Counter Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 text-xs font-bold shadow-md border border-slate-200/70 dark:border-slate-800">
          <Activity className="w-3.5 h-3.5 text-rose-500" />
          <span>Rep {repCount}</span>
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 shadow-md">
            <Maximize2 className="w-3 h-3" />
            <span>Click to Enlarge</span>
          </span>
        </div>
      </div>

      {/* Interactive Controls & Tempo Coach */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
        {/* Playback Controls Row */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-sm shadow-rose-500/20 hover:opacity-95 transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            {/* Speed Presets */}
            <div className="flex items-center rounded-xl bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
              {[0.5, 1, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded-lg transition ${
                    speed === s
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Reset Rep Count */}
            <button
              onClick={() => {
                setRepCount(1);
                animRef.current.repCount = 1;
              }}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
              title="Reset Rep Counter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] font-medium text-slate-400 hidden sm:block">
            Tempo: <span className="text-slate-600 dark:text-slate-300 font-semibold">{meta.tempo}</span>
          </div>
        </div>

        {/* Dynamic Coaching Action Cue */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>{currentAction}</span>
              <span className="text-[10px] font-normal text-slate-400">({meta.tempo})</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400 leading-snug">{meta.cue}</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
                  <span>{name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-200 dark:border-rose-900">
                    {meta.badge}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Target: {meta.muscle} • Secondary: {meta.secondary}
                </p>
              </div>

              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Animation View */}
            <div className="flex-1 overflow-hidden p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950 min-h-[380px]">
              <svg viewBox="0 0 400 280" className="w-full max-h-[60vh]">
                <rect x="0" y="0" width="400" height="280" fill="url(#studioGlow)" />
                <HumanCharacterRig
                  type={type}
                  phase={phase}
                  showMuscles={showMuscles}
                  showGuide={showGuide}
                />
              </svg>
            </div>

            {/* Modal Footer Coaching Cue */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-rose-500">
                <span>Coaching Cue</span>
                <span className="text-slate-400 font-normal">Rep {repCount} • Tempo: {meta.tempo}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {meta.cue}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
