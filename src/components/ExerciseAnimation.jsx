import React from 'react';

/**
 * ExerciseAnimation
 * Renders an animated SVG stick figure demonstration or a custom media file (video/gif).
 * Minimal, clean, aesthetic stick-figure styling with pink/coral dumbbells and smooth looping movements.
 */
export default function ExerciseAnimation({ type, media, name }) {
  if (media) {
    const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.mov');
    return (
      <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center border border-slate-200/60 dark:border-slate-800">
        {isVideo ? (
          <video
            src={media}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            title={name}
          />
        ) : (
          <img
            src={media}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  // Choose the visual template based on the animation type
  const renderSvgFigure = () => {
    switch (type) {
      // 1. FLOOR PRESS
      case 'floor-press':
        return (
          <svg viewBox="0 0 200 130" className="w-full h-36">
            <style>
              {`
                @keyframes floorPress {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-26px); }
                }
                .fp-arms { animation: floorPress 2s ease-in-out infinite; transform-origin: 100px 85px; }
              `}
            </style>
            {/* Floor line */}
            <line x1="20" y1="105" x2="180" y2="105" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Mat */}
            <rect x="35" y="103" width="130" height="4" rx="2" fill="#ec4899" opacity="0.3" />
            {/* Torso & Head lying on floor */}
            <circle cx="65" cy="92" r="10" fill="#ec4899" />
            <line x1="75" y1="95" x2="135" y2="95" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Bent knees */}
            <polyline points="135,95 155,75 165,103" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            {/* Pressing Arms & Dumbbells */}
            <g className="fp-arms">
              <line x1="98" y1="95" x2="98" y2="68" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Dumbbell */}
              <g transform="translate(98, 65)">
                <rect x="-14" y="-3" width="28" height="6" rx="3" fill="#ec4899" />
                <rect x="-15" y="-9" width="5" height="18" rx="2" fill="#f43f5e" />
                <rect x="10" y="-9" width="5" height="18" rx="2" fill="#f43f5e" />
              </g>
            </g>
          </svg>
        );

      // 2. DUMBBELL FLY ON FLOOR
      case 'fly':
        return (
          <svg viewBox="0 0 200 130" className="w-full h-36">
            <style>
              {`
                @keyframes flyLeft {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-40deg); }
                }
                @keyframes flyRight {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(40deg); }
                }
                .fly-left { animation: flyLeft 2.2s ease-in-out infinite; transform-origin: 90px 92px; }
                .fly-right { animation: flyRight 2.2s ease-in-out infinite; transform-origin: 110px 92px; }
              `}
            </style>
            <line x1="20" y1="105" x2="180" y2="105" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Head & Torso */}
            <circle cx="55" cy="94" r="9" fill="#ec4899" />
            <line x1="64" y1="96" x2="140" y2="96" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Legs */}
            <polyline points="140,96 158,80 168,103" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            {/* Left Arm Fly */}
            <g className="fly-left">
              <line x1="90" y1="92" x2="80" y2="60" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="78" cy="58" r="5" fill="#f43f5e" />
            </g>
            {/* Right Arm Fly */}
            <g className="fly-right">
              <line x1="110" y1="92" x2="120" y2="60" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="122" cy="58" r="5" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 3. OVERHEAD TRICEPS EXTENSION
      case 'overhead-extension':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes tricepExt {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(85deg); }
                }
                .tricep-forearm { animation: tricepExt 2s ease-in-out infinite; transform-origin: 106px 42px; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Body */}
            <circle cx="100" cy="52" r="10" fill="#ec4899" />
            <line x1="100" y1="62" x2="100" y2="105" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="105" x2="88" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="105" x2="112" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Upper Arm raised high */}
            <line x1="100" y1="70" x2="106" y2="42" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Forearm bending behind head */}
            <g className="tricep-forearm">
              <line x1="106" y1="42" x2="106" y2="20" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Dumbbell */}
              <circle cx="106" cy="18" r="6" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 4. BENT-OVER DUMBBELL ROW & ONE-ARM ROW
      case 'bent-over-row':
      case 'one-arm-row':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes rowArm {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translate(6px, -24px); }
                }
                .rowing-arm { animation: rowArm 1.8s ease-in-out infinite; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Legs with slight knee bend */}
            <polyline points="135,140 130,110 120,85" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            {/* Hinged Back */}
            <line x1="120" y1="85" x2="70" y2="70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Head */}
            <circle cx="58" cy="65" r="9" fill="#ec4899" />
            {/* Rowing arm & dumbbell */}
            <g className="rowing-arm">
              <line x1="82" y1="74" x2="88" y2="114" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Dumbbell */}
              <g transform="translate(88, 116)">
                <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#ec4899" />
                <rect x="-12" y="-7" width="4" height="14" rx="2" fill="#f43f5e" />
                <rect x="8" y="-7" width="4" height="14" rx="2" fill="#f43f5e" />
              </g>
            </g>
          </svg>
        );

      // 5. BICEPS CURL & HAMMER CURL
      case 'biceps-curl':
      case 'hammer-curl':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes curlForearm {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-100deg); }
                }
                .curling-arm { animation: curlForearm 2s ease-in-out infinite; transform-origin: 104px 94px; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Body */}
            <circle cx="100" cy="40" r="10" fill="#ec4899" />
            <line x1="100" y1="50" x2="100" y2="95" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Legs */}
            <line x1="100" y1="95" x2="90" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="95" x2="110" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Upper Arm */}
            <line x1="100" y1="62" x2="104" y2="94" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Forearm & Dumbbell */}
            <g className="curling-arm">
              <line x1="104" y1="94" x2="122" y2="116" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Dumbbell */}
              <circle cx="124" cy="118" r="6" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 6. GOBLET SQUAT & SQUAT
      case 'goblet-squat':
      case 'squat':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes squatAction {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(22px); }
                }
                .squat-body { animation: squatAction 2.2s ease-in-out infinite; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Lower feet anchored */}
            <line x1="75" y1="138" x2="88" y2="138" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="112" y1="138" x2="125" y2="138" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Animated upper body */}
            <g className="squat-body">
              <circle cx="100" cy="38" r="10" fill="#ec4899" />
              <line x1="100" y1="48" x2="100" y2="90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Arms holding goblet weight near chest */}
              <polyline points="100,60 114,68 108,60" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="114" cy="66" r="6" fill="#f43f5e" />
              {/* Thighs to knees */}
              <polyline points="100,90 82,108 84,138" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
              <polyline points="100,90 118,108 116,138" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            </g>
          </svg>
        );

      // 7. ROMANIAN DEADLIFT (RDL)
      case 'rdl':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes rdlHinge {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-55deg); }
                }
                .rdl-torso { animation: rdlHinge 2.4s ease-in-out infinite; transform-origin: 100px 92px; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Legs with slight bend */}
            <line x1="100" y1="92" x2="92" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="92" x2="108" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Torso hinging */}
            <g className="rdl-torso">
              <line x1="100" y1="92" x2="100" y2="48" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="100" cy="38" r="10" fill="#ec4899" />
              {/* Arms holding dumbbell hanging straight down */}
              <line x1="100" y1="60" x2="114" y2="92" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Dumbbell */}
              <circle cx="114" cy="94" r="6" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 8. STANDING CALF RAISES
      case 'calf-raise':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes calfRise {
                  0%, 100% { transform: translateY(0); }
                  45%, 55% { transform: translateY(-16px); }
                }
                .calf-body { animation: calfRise 1.8s ease-in-out infinite; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            <g className="calf-body">
              <circle cx="100" cy="38" r="10" fill="#ec4899" />
              <line x1="100" y1="48" x2="100" y2="92" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Arms holding weights at side */}
              <line x1="100" y1="60" x2="88" y2="88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="88" cy="90" r="5" fill="#f43f5e" />
              <line x1="100" y1="60" x2="112" y2="88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="112" cy="90" r="5" fill="#f43f5e" />
              {/* Legs rising onto toes */}
              <line x1="100" y1="92" x2="92" y2="135" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <line x1="100" y1="92" x2="108" y2="135" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            </g>
          </svg>
        );

      // 9. DUMBBELL SHOULDER PRESS
      case 'shoulder-press':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes shoulderPressMotion {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-26px); }
                }
                .overhead-arms { animation: shoulderPressMotion 2s ease-in-out infinite; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            <circle cx="100" cy="46" r="10" fill="#ec4899" />
            <line x1="100" y1="56" x2="100" y2="98" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="98" x2="88" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="98" x2="112" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Pressing weights overhead */}
            <g className="overhead-arms">
              <line x1="100" y1="62" x2="78" y2="52" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="76" cy="49" r="6" fill="#f43f5e" />
              <line x1="100" y1="62" x2="122" y2="52" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="124" cy="49" r="6" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 10. LATERAL RAISES
      case 'lateral-raise':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes latRaiseL {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(68deg); }
                }
                @keyframes latRaiseR {
                  0%, 100% { transform: rotate(0deg); }
                  50% { transform: rotate(-68deg); }
                }
                .lat-arm-l { animation: latRaiseL 2.1s ease-in-out infinite; transform-origin: 94px 62px; }
                .lat-arm-r { animation: latRaiseR 2.1s ease-in-out infinite; transform-origin: 106px 62px; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            <circle cx="100" cy="42" r="10" fill="#ec4899" />
            <line x1="100" y1="52" x2="100" y2="95" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="95" x2="90" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            <line x1="100" y1="95" x2="110" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Left Arm Raising */}
            <g className="lat-arm-l">
              <line x1="94" y1="62" x2="82" y2="92" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="80" cy="94" r="5" fill="#f43f5e" />
            </g>
            {/* Right Arm Raising */}
            <g className="lat-arm-r">
              <line x1="106" y1="62" x2="118" y2="92" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <circle cx="120" cy="94" r="5" fill="#f43f5e" />
            </g>
          </svg>
        );

      // 11. PLANK
      case 'plank':
        return (
          <svg viewBox="0 0 200 130" className="w-full h-36">
            <style>
              {`
                @keyframes plankGlow {
                  0%, 100% { opacity: 0.3; transform: scale(1); }
                  50% { opacity: 0.8; transform: scale(1.1); }
                }
                .plank-core { animation: plankGlow 2s ease-in-out infinite; transform-origin: 100px 80px; }
              `}
            </style>
            <line x1="20" y1="105" x2="180" y2="105" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            <rect x="35" y="103" width="130" height="4" rx="2" fill="#ec4899" opacity="0.2" />
            {/* Head */}
            <circle cx="56" cy="74" r="9" fill="#ec4899" />
            {/* Straight Spine */}
            <line x1="65" y1="78" x2="145" y2="84" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            {/* Forearms on ground */}
            <polyline points="75,80 75,103 86,103" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            {/* Toes on ground */}
            <polyline points="145,84 158,103" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-200" />
            {/* Core activation glow ring */}
            <circle cx="105" cy="81" r="7" fill="#f43f5e" className="plank-core" />
          </svg>
        );

      // 12. FARMER'S CARRY
      case 'farmers-carry':
        return (
          <svg viewBox="0 0 200 150" className="w-full h-36">
            <style>
              {`
                @keyframes walkLeftLeg {
                  0%, 100% { transform: rotate(14deg); }
                  50% { transform: rotate(-14deg); }
                }
                @keyframes walkRightLeg {
                  0%, 100% { transform: rotate(-14deg); }
                  50% { transform: rotate(14deg); }
                }
                @keyframes bobTorso {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-4px); }
                }
                .fc-left-leg { animation: walkLeftLeg 1.2s ease-in-out infinite; transform-origin: 100px 92px; }
                .fc-right-leg { animation: walkRightLeg 1.2s ease-in-out infinite; transform-origin: 100px 92px; }
                .fc-upper { animation: bobTorso 0.6s ease-in-out infinite; }
              `}
            </style>
            <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="text-slate-300 dark:text-slate-700" />
            {/* Legs walking */}
            <g className="fc-left-leg">
              <line x1="100" y1="92" x2="88" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            </g>
            <g className="fc-right-leg">
              <line x1="100" y1="92" x2="112" y2="138" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
            </g>
            {/* Upper body holding heavy dumbbells at sides */}
            <g className="fc-upper">
              <circle cx="100" cy="38" r="10" fill="#ec4899" />
              <line x1="100" y1="48" x2="100" y2="92" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              {/* Arms holding weights */}
              <line x1="98" y1="58" x2="86" y2="88" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <g transform="translate(86, 91)">
                <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#ec4899" />
                <rect x="-10" y="-6" width="3" height="12" rx="1.5" fill="#f43f5e" />
                <rect x="7" y="-6" width="3" height="12" rx="1.5" fill="#f43f5e" />
              </g>
              <line x1="102" y1="58" x2="114" y2="88" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="text-slate-700 dark:text-slate-200" />
              <g transform="translate(114, 91)">
                <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#ec4899" />
                <rect x="-10" y="-6" width="3" height="12" rx="1.5" fill="#f43f5e" />
                <rect x="7" y="-6" width="3" height="12" rx="1.5" fill="#f43f5e" />
              </g>
            </g>
          </svg>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-32 text-slate-400">
            <span className="text-2xl mb-1">🏋️‍♀️</span>
            <span className="text-xs font-medium">Ready to lift!</span>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-rose-50/60 to-pink-50/30 dark:from-slate-800/60 dark:to-slate-800/30 border border-rose-100/60 dark:border-slate-800 flex items-center justify-center py-2 px-4 overflow-hidden transition-all duration-300">
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-pink-400/10 dark:bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      {renderSvgFigure()}
    </div>
  );
}
