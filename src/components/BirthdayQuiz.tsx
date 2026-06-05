'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface Option {
  label: string;
  feedback: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Hamari sabse funny chat kaunsi thi?',
    options: [
      { 
        label: "Jab tumne ghanto baad reply kiya aur kaha 'sorry main so gayi thi' 😴", 
        feedback: "Arey, yeh toh daily routine hai, funny thodi hai! 😂 Aur answer dhoondo.",
        isCorrect: false 
      },
      { 
        label: "Hum dono ke dynamic memes aur teasing fights 😂", 
        feedback: "Correct! Hum dono ki memes aur cute arguments hi sabse funny hote hain. ❤️", 
        isCorrect: true 
      },
      { 
        label: "Jab main tumhari routine ki strictly reporting le raha tha 📊", 
        feedback: "Monitoring chalu thi bilkul! Lekin teasing fight zyada funny thi. 😆", 
        isCorrect: false 
      }
    ]
  },
  {
    id: 2,
    question: 'Good Morning Messages ka Champion kaun hai? 😆',
    options: [
      { 
        label: "Obviously Antima (Always early, hamesha subah active!) ⏰", 
        feedback: "Exactly! Tum hamesha subah ready rehti ho message ke saath. Champion title goes to you! 👑", 
        isCorrect: true 
      },
      { 
        label: "Rohit (Jo kabhi kabhi alarm miss kar deta hai 😜)", 
        feedback: "Effort toh poora hai, par main thoda lazy ho jata hu subah! Champion tum hi ho. 😂", 
        isCorrect: false 
      },
      { 
        label: "Dono hi late rise karne wale delayers hain 😴", 
        feedback: "Main delayer hu, tum nahi! Tum toh early bird ho subah ki. 😉", 
        isCorrect: false 
      }
    ]
  },
  {
    id: 3,
    question: 'Sabse zyada arguments kaun jeetta hai?',
    options: [
      { 
        label: "Antima (Always Right, Supreme Court!) 👑", 
        feedback: "Universal fact! Mere paas arguments jeetne ka koi chance nahi hota. Supreme Court decision is final. 😂🏆", 
        isCorrect: true 
      },
      { 
        label: "Rohit (Only in his wild dreams 😴)", 
        feedback: "Dreaming levels expert! Reality mein toh tum hi jeetti ho. 😂", 
        isCorrect: false 
      },
      { 
        label: "Arguments hote hi nahi, bas sweet talk hoti hai 🥰", 
        feedback: "Hahaha cute talks, par sweet-sweet tareeqe se jeetti tum hi ho! 😉", 
        isCorrect: false 
      }
    ]
  },
  {
    id: 4,
    question: 'Agar hum kal milte toh pehle 5 minute mein kya baat karte?',
    options: [
      { 
        label: "Hello, hi... awkward silence! 🤫", 
        feedback: "Awkward silence? Hum dono shanti se toh kabhi nahi baith sakte! 😉 Try again.", 
        isCorrect: false 
      },
      { 
        label: "Arey tum toh video call/photos jaisi hi ho! 😄", 
        feedback: "Haha, standard dialog! Par visual interactions se zyada, pure smiles hotin. 💫", 
        isCorrect: false 
      },
      { 
        label: "Ek dusre ko dekh kar bas haste rehte bina bole 😂❤️", 
        feedback: "Yes! 100% true. Bina mile itni baatein ki hain ki samne aate hi smile control hi nahi hogi. ❤️", 
        isCorrect: true 
      }
    ]
  },
  {
    id: 5,
    question: 'Hamari friendship ki sabse achhi baat kya hai?',
    options: [
      { 
        label: "Bina mile bhi connection bohot strong hai 🤝", 
        feedback: "Absolutely! Distance doesn't matter when hearts align. 💖", 
        isCorrect: false 
      },
      { 
        label: "Roz bina kisi filter ke saari baatein share karna 💬", 
        feedback: "Exactly, pure honesty and transparent conversations. 🌟", 
        isCorrect: false 
      },
      { 
        label: "Both A & B (Aur ye ki hum ek dusre ki best habit ban chuke hain ❤️)", 
        feedback: "Bilkul sahi! Conversations, trust, dynamic and teasing—everything matches perfectly. You won! 🥰❤️", 
        isCorrect: true 
      }
    ]
  }
];

export default function BirthdayQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (optIdx: number) => {
    if (showFeedback) return; // disable double clicks
    setSelectedOptIdx(optIdx);
    setShowFeedback(true);
    
    if (quizQuestions[currentIdx].options[optIdx].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOptIdx(null);
    
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  const activeQuestion = quizQuestions[currentIdx];

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-[#080312] overflow-hidden select-none flex flex-col justify-center">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2 block font-outfit"
          >
            Playful Test
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            Birthday Special Quiz 😌
          </motion.h2>
        </div>

        {/* Quiz Body */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={activeQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between h-full flex-grow"
              >
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs font-semibold text-purple-300/40 uppercase mb-6 font-outfit">
                    <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
                    <span>Current Score: {score}</span>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg md:text-xl font-bold font-comfortaa text-white mb-6 leading-relaxed">
                    {activeQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuestion.options.map((opt, oIdx) => {
                      const isSelected = selectedOptIdx === oIdx;
                      let optionBg = 'bg-white/3 border-white/5 hover:bg-white/6';
                      
                      if (showFeedback) {
                        if (isSelected) {
                          optionBg = opt.isCorrect 
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                            : 'bg-rose-500/15 border-rose-500/40 text-rose-300';
                        } else if (opt.isCorrect) {
                          optionBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300/80';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionSelect(oIdx)}
                          disabled={showFeedback}
                          className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-outfit transition-all duration-300 flex items-start justify-between gap-3 cursor-pointer ${optionBg}`}
                        >
                          <span>{opt.label}</span>
                          {showFeedback && (
                            <span className="flex-shrink-0 mt-0.5">
                              {opt.isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : isSelected ? (
                                <AlertCircle className="w-5 h-5 text-rose-400" />
                              ) : null}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Dialog */}
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-500/10 text-center text-sm md:text-base font-outfit text-purple-200"
                  >
                    <p className="leading-relaxed italic">
                      {selectedOptIdx !== null && activeQuestion.options[selectedOptIdx].feedback}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleNext}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs md:text-sm cursor-pointer hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-1"
                      >
                        <span>Aage Chalo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              // Completion Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center justify-center flex-grow"
              >
                <div className="text-6xl mb-6 filter drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">🏆</div>
                <h3 className="text-xl md:text-2xl font-bold font-comfortaa text-white mb-4">
                  Quiz Completed!
                </h3>
                <p className="text-sm md:text-base text-purple-200/80 font-outfit max-w-md mx-auto mb-8 leading-relaxed">
                  Congrats Antima! You scored <span className="font-bold text-amber-300">100%</span> in being Rohit's Favourite Chat Partner and Favourite Person in the entire world! 🎉❤️
                </p>

                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/10 transition-all font-bold font-outfit text-sm cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Dobara Khelo</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
