import { useState } from 'react';
import { STORE_URL, WHATSAPP_URL } from '../../data/site';
import { ArrowRight, ArrowUpRight, WhatsAppIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import styles from './Quiz.module.css';

type QuestionId = 'local' | 'luz' | 'objetivo';
type Answers = Partial<Record<QuestionId, string>>;

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: QuestionId;
  title: string;
  options: Option[];
};

type QuizResult = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

const QUESTIONS: Question[] = [
  {
    id: 'local',
    title: 'Onde ela vai ficar?',
    options: [
      { label: 'No chão, direto no jardim', value: 'solo' },
      { label: 'Em um vaso ou jardineira', value: 'vaso' },
      { label: 'Em uma cerca viva', value: 'cerca' },
    ],
  },
  {
    id: 'luz',
    title: 'Quanta luz bate nesse lugar?',
    options: [
      { label: 'Sol pleno, quase o dia todo', value: 'sol' },
      { label: 'Meia-sombra, algumas horas de sol', value: 'meia' },
      { label: 'Sombra, pouca luz direta', value: 'sombra' },
    ],
  },
  {
    id: 'objetivo',
    title: 'O que você quer criar?',
    options: [
      { label: 'Um pomar para colher em casa', value: 'comer' },
      { label: 'Privacidade e aconchego', value: 'privacidade' },
      { label: 'Verde para decorar o ambiente', value: 'decorar' },
      { label: 'Reflorestar ou recuperar uma área', value: 'reflorestar' },
    ],
  },
];

const RESULTS = {
  frutiferas: {
    title: 'Seu espaço pede um pomar.',
    text: 'Comece pelas frutíferas enxertadas, que dão fruto mais cedo e se adaptam bem a quintais, varandas e vasos grandes.',
    href: `${STORE_URL}/mudas-frutiferas/`,
    cta: 'Ver mudas frutíferas',
  },
  cercas: {
    title: 'Você precisa de privacidade que cresce.',
    text: 'As cercas vivas criam uma barreira natural, reduzem ruído e ainda abrigam pássaros. Escolha pela altura e pelo ritmo de crescimento.',
    href: `${STORE_URL}/cercas-vivas-e-fechamentos/`,
    cta: 'Ver cercas vivas',
  },
  nativas: {
    title: 'Seu projeto pede árvores brasileiras.',
    text: 'Nativas se adaptam ao clima local, atraem fauna e devolvem estrutura à paisagem. Ideais para reflorestamento e áreas verdes.',
    href: `${STORE_URL}/arvores-nativas-e-reflorestamento/`,
    cta: 'Ver árvores nativas',
  },
  casa: {
    title: 'Seu espaço pede verde por perto.',
    text: 'Plantas de meia-sombra e sombra que vivem bem em vaso, apartamento e escritório — com pouca manutenção e muita presença.',
    href: `${STORE_URL}/urban-jungle-e-interiores/`,
    cta: 'Ver plantas para casa',
  },
  paisagismo: {
    title: 'Seu projeto pede presença.',
    text: 'Palmeiras, tropicais e folhagens para criar escala, contraste e sombra em jardins e áreas comuns.',
    href: `${STORE_URL}/plantas-para-paisagismo-e-jardim/`,
    cta: 'Ver plantas para paisagismo',
  },
  todas: {
    title: 'Você vai encontrar o que procura.',
    text: 'São mais de 300 variedades entre frutíferas, ornamentais, nativas e palmeiras. Explore o catálogo completo do viveiro.',
    href: `${STORE_URL}/produtos/`,
    cta: 'Ver todas as plantas',
  },
} satisfies Record<string, QuizResult>;

function getResult(answers: Answers): QuizResult {
  const { local, luz, objetivo } = answers;

  if (objetivo === 'comer') return RESULTS.frutiferas;
  if (objetivo === 'reflorestar') return RESULTS.nativas;
  if (local === 'cerca' || objetivo === 'privacidade') return RESULTS.cercas;
  if (local === 'vaso' || objetivo === 'decorar') return RESULTS.casa;
  if (luz === 'sol') return RESULTS.paisagismo;
  return RESULTS.todas;
}

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step] ?? QUESTIONS[0]!;
  const result = getResult(answers);
  const progress = done ? 100 : ((step + 1) / QUESTIONS.length) * 100;
  const stepLabel = done
    ? 'Resultado'
    : `${String(step + 1).padStart(2, '0')} / ${String(QUESTIONS.length).padStart(2, '0')}`;

  const select = (value: string) => {
    setAnswers((current) => ({ ...current, [question.id]: value }));
    if (step === QUESTIONS.length - 1) {
      setDone(true);
    } else {
      setStep((current) => current + 1);
    }
  };

  const back = () => {
    if (done) {
      setDone(false);
      setStep(QUESTIONS.length - 1);
      setAnswers((current) => {
        const next = { ...current };
        delete next.objetivo;
        return next;
      });
      return;
    }

    if (step === 0) return;

    const previous = QUESTIONS[step - 1];
    setStep(step - 1);
    if (previous) {
      setAnswers((current) => {
        const next = { ...current };
        delete next[previous.id];
        return next;
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <div className={styles.intro}>
              <span className={styles.tag}>
                <span className={styles.dot} aria-hidden="true" />
                Escolha certa
              </span>
              <h2 className={styles.title}>
                Qual muda combina com o seu <em>espaço?</em>
              </h2>
              <p className={styles.lead}>
                Três perguntas rápidas para chegar na categoria certa — sem
                adivinhar.
              </p>
              <p className={styles.note}>
                Depois é só escolher a muda e comprar na loja. Se preferir, um
                especialista ajuda pelo WhatsApp.
              </p>
              <a
                className={styles.help}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                Falar com um especialista
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.progressRow}>
                <span>{stepLabel}</span>
                <div
                  className={styles.progress}
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={3}
                  aria-valuenow={done ? 3 : step + 1}
                  aria-label="Progresso do quiz"
                >
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              {done ? (
                <div className={styles.stage} role="status" aria-live="polite">
                  <span className={styles.resultTag}>Recomendação</span>
                  <h3 className={styles.question}>{result.title}</h3>
                  <p className={styles.resultText}>{result.text}</p>
                  <div className={styles.resultActions}>
                    <a className="btn btn-lime" href={result.href}>
                      {result.cta}
                      <ArrowUpRight size={17} />
                    </a>
                    <button type="button" className={styles.reset} onClick={reset}>
                      Refazer o quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.stage} key={`question-${step}`}>
                  <h3 id="quiz-question" className={styles.question}>
                    {question.title}
                  </h3>
                  <div
                    className={styles.options}
                    role="group"
                    aria-labelledby="quiz-question"
                  >
                    {question.options.map((option, index) => (
                      <button
                        key={option.value}
                        type="button"
                        className={styles.option}
                        onClick={() => select(option.value)}
                      >
                        <span className={styles.optionIndex} aria-hidden="true">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option.label}</span>
                        <ArrowRight size={16} className={styles.optionArrow} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.back}
                  onClick={back}
                  disabled={step === 0 && !done}
                >
                  Voltar
                </button>
                <span className={styles.footerHint}>
                  {done ? 'Sua recomendação está pronta.' : 'Leva menos de 1 minuto.'}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
