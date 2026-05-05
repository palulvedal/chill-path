import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase, hasSupabaseConfig } from './supabaseClient.js';
import { PROGRAM_DAYS, GOALS, BLOCKERS, getPlanSummary } from './lessonData.js';
import './styles.css';

const todayIso = () => new Date().toISOString().slice(0, 10);

function yesterdayIso() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getHashRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { name: 'dashboard', params: {} };
  const [name, id] = hash.split('/');
  return { name, params: { id } };
}

function navigate(path) {
  window.location.hash = path.startsWith('#') ? path : `#/${path}`;
}

function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

function SetupMissing() {
  return (
    <main className="setup-page">
      <section className="setup-card">
        <div className="logo-mark">☁️</div>
        <h1>Appen mangler Supabase-oppsett</h1>
        <p>
          Legg inn disse miljøvariablene i Cloudflare Pages. Bruker du appen lokalt, kan du legge dem i en <code>.env</code>-fil.
        </p>
        <pre>{`VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-SUPABASE-ANON-KEY`}</pre>
        <p>Kjør deretter <code>supabase/schema.sql</code> i Supabase SQL Editor for å opprette tabellene.</p>
      </section>
    </main>
  );
}

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = mode === 'signup'
      ? await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName || email.split('@')[0] } }
        })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else if (mode === 'signup' && !result.data.session) {
      setMessage('Kontoen er opprettet. Sjekk e-posten din hvis Supabase krever bekreftelse før innlogging.');
    }
    setLoading(false);
  }

  return (
    <main className="auth-layout">
      <section className="hero-panel">
        <div className="logo-row">
          <div className="logo-mark">CP</div>
          <span>Chill Path</span>
        </div>
        <h1>Små daglige steg for mer ro, bedre fokus og lettere gjennomføring.</h1>
        <p>
          En enkel selvhjelpsapp med startkartlegging, personlig plan, korte daglige økter,
          refleksjon, vaner og oversikt over fremgangen din.
        </p>
        <div className="hero-stack">
          <span>Tre korte økter per dag</span>
          <span>Daglig refleksjon og innsjekk</span>
          <span>Rekke og vanelogging</span>
        </div>
        <p className="medical-note">
          Dette er ikke medisinsk rådgivning, diagnostikk eller behandling.
        </p>
      </section>

      <section className="auth-card">
        <h2>{mode === 'login' ? 'Logg inn' : 'Opprett bruker'}</h2>
        <form onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Navn
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Pål" />
            </label>
          )}
          <label>
            E-post
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Passord
            <input type="password" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <Button disabled={loading}>{loading ? 'Vennligst vent ...' : mode === 'login' ? 'Logg inn' : 'Opprett konto'}</Button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <button className="text-button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Ny her? Opprett konto' : 'Har du allerede konto? Logg inn'}
        </button>
      </section>
    </main>
  );
}

function TopNav({ user, profile }) {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <header className="top-nav">
      <button className="brand" onClick={() => navigate('dashboard')}>
        <span className="logo-mark small">CP</span>
        <span>Chill Path</span>
      </button>
      <nav>
        <button onClick={() => navigate('dashboard')}>I dag</button>
        <button onClick={() => navigate('plan')}>Hele planen</button>
        <button onClick={() => navigate('habits')}>Vaner</button>
        <button onClick={() => navigate('journal')}>Journal</button>
      </nav>
      <div className="user-menu">
        <span>{profile?.display_name || user.email}</span>
        <button onClick={signOut}>Logg ut</button>
      </div>
    </header>
  );
}

function OnboardingPage({ user, onSaved }) {
  const [goals, setGoals] = useState([]);
  const [blockers, setBlockers] = useState([]);
  const [energy, setEnergy] = useState('varierer');
  const [focusMinutes, setFocusMinutes] = useState(15);
  const [dailyTime, setDailyTime] = useState('morgen');
  const [tone, setTone] = useState('rolig');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function toggle(list, setList, id) {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  async function save() {
    setSaving(true);
    setError('');
    const { error: upsertError } = await supabase.from('onboarding_answers').upsert({
      user_id: user.id,
      goals,
      blockers,
      energy,
      focus_minutes: Number(focusMinutes),
      daily_time: dailyTime,
      tone
    }, { onConflict: 'user_id' });

    if (upsertError) {
      setError(upsertError.message);
    } else {
      await onSaved();
      navigate('dashboard');
    }
    setSaving(false);
  }

  return (
    <main className="app-shell narrow">
      <section className="card big-card">
        <Badge>Tar ca. 3 minutter</Badge>
        <h1>Lag en startplan som passer deg</h1>
        <p>Svarene brukes til å velge en nyttig startretning og gjøre anbefalingene litt mer relevante for deg.</p>

        <div className="question-block">
          <h3>Hva ønsker du mest hjelp med akkurat nå?</h3>
          <div className="choice-grid">
            {GOALS.map((g) => (
              <button key={g.id} className={goals.includes(g.id) ? 'choice selected' : 'choice'} onClick={() => toggle(goals, setGoals, g.id)}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="question-block">
          <h3>Hva pleier oftest å gjøre det vanskelig?</h3>
          <div className="choice-grid">
            {BLOCKERS.map((b) => (
              <button key={b.id} className={blockers.includes(b.id) ? 'choice selected' : 'choice'} onClick={() => toggle(blockers, setBlockers, b.id)}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <label>
            Energi gjennom en vanlig dag
            <select value={energy} onChange={(e) => setEnergy(e.target.value)}>
              <option value="lav">Ofte lav</option>
              <option value="varierer">Varierer mye</option>
              <option value="høy">Ganske god</option>
            </select>
          </label>
          <label>
            Anbefalt lengde på fokusøkt
            <select value={focusMinutes} onChange={(e) => setFocusMinutes(e.target.value)}>
              <option value="10">10 minutter</option>
              <option value="15">15 minutter</option>
              <option value="25">25 minutter</option>
            </select>
          </label>
          <label>
            Når passer det best?
            <select value={dailyTime} onChange={(e) => setDailyTime(e.target.value)}>
              <option value="morgen">Morgen</option>
              <option value="formiddag">Formiddag</option>
              <option value="ettermiddag">Ettermiddag</option>
              <option value="kveld">Kveld</option>
            </select>
          </label>
          <label>
            Støttestil
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="rolig">Rolig og støttende</option>
              <option value="direkte">Kort og direkte</option>
              <option value="lekent">Litt lekent</option>
            </select>
          </label>
        </div>

        {error && <p className="form-message error">{error}</p>}
        <Button onClick={save} disabled={saving || goals.length === 0 || blockers.length === 0}>
          {saving ? 'Lagrer ...' : 'Gå til dagens plan'}
        </Button>
      </section>
    </main>
  );
}

function ProgressRing({ percent }) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="progress-ring" style={{ '--pct': `${pct}%` }}>
      <span>{Math.round(pct)}%</span>
    </div>
  );
}

function Dashboard({ data, refresh }) {
  const currentDayIndex = Math.min(data.progress?.day_index || 0, PROGRAM_DAYS.length - 1);
  const currentDay = PROGRAM_DAYS[currentDayIndex];
  const completions = data.completions || [];
  const completedToday = currentDay.lessons.filter((l) => completions.some((c) => c.lesson_key === l.id));
  const planSummary = getPlanSummary(data.onboarding);
  const totalLessons = PROGRAM_DAYS.reduce((sum, day) => sum + day.lessons.length, 0);
  const percent = (completions.length / totalLessons) * 100;
  const todayCheckin = data.checkins?.find((c) => c.checkin_date === todayIso());

  return (
    <main className="app-shell">
      <section className="dashboard-grid">
        <div className="card hero-card">
          <Badge>Dag {currentDayIndex + 1} av {PROGRAM_DAYS.length}</Badge>
          <h1>{currentDay.theme}</h1>
          <p>{currentDay.tagline}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate(`lesson/${currentDay.lessons.find((l) => !completions.some((c) => c.lesson_key === l.id))?.id || currentDay.lessons[0].id}`)}>
              Fortsett dagens økt
            </Button>
            <Button variant="ghost" onClick={() => navigate('plan')}>Se hele planen</Button>
          </div>
        </div>

        <div className="card metric-card">
          <ProgressRing percent={percent} />
          <h3>Samlet fremgang</h3>
          <p>{completions.length} av {totalLessons} leksjoner fullført</p>
        </div>

        <div className="card metric-card">
          <div className="streak-number">{data.progress?.streak_count || 0}</div>
          <h3>Rekke</h3>
          <p>dager der hele dagsopplegget er fullført</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Dagens tre korte økter</h2>
              <p>{completedToday.length}/3 fullført</p>
            </div>
          </div>
          <div className="lesson-list">
            {currentDay.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} completed={completions.some((c) => c.lesson_key === lesson.id)} />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-heading">
            <div>
              <h2>{planSummary.label}</h2>
              <p>{planSummary.description}</p>
            </div>
          </div>
          <ul className="soft-list">
            {planSummary.recommendations.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <div className="small-note">
            Fokusøkt: {data.onboarding?.focus_minutes || 15} min · Beste tidspunkt: {data.onboarding?.daily_time || 'morgen'}
          </div>
        </div>

        <CheckinCard todayCheckin={todayCheckin} userId={data.user.id} refresh={refresh} />
      </section>
    </main>
  );
}

function LessonRow({ lesson, completed }) {
  return (
    <button className="lesson-row" onClick={() => navigate(`lesson/${lesson.id}`)}>
      <div>
        <strong>{lesson.title}</strong>
        <span>{lesson.minutes} min · {lesson.task}</span>
      </div>
      <span className={completed ? 'status done' : 'status'}>{completed ? 'Fullført' : 'Åpne'}</span>
    </button>
  );
}

function CheckinCard({ todayCheckin, userId, refresh }) {
  const [mood, setMood] = useState(todayCheckin?.mood || 3);
  const [energy, setEnergy] = useState(todayCheckin?.energy || 3);
  const [focus, setFocus] = useState(todayCheckin?.focus || 3);
  const [note, setNote] = useState(todayCheckin?.note || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMood(todayCheckin?.mood || 3);
    setEnergy(todayCheckin?.energy || 3);
    setFocus(todayCheckin?.focus || 3);
    setNote(todayCheckin?.note || '');
  }, [todayCheckin]);

  async function save() {
    setSaving(true);
    await supabase.from('daily_checkins').upsert({
      user_id: userId,
      checkin_date: todayIso(),
      mood,
      energy,
      focus,
      note
    }, { onConflict: 'user_id,checkin_date' });
    await refresh();
    setSaving(false);
  }

  return (
    <div className="card">
      <h2>Dagens innsjekk</h2>
      <div className="slider-grid">
        <label>Humør <input type="range" min="1" max="5" value={mood} onChange={(e) => setMood(Number(e.target.value))} /> <b>{mood}</b></label>
        <label>Energi <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} /> <b>{energy}</b></label>
        <label>Fokus <input type="range" min="1" max="5" value={focus} onChange={(e) => setFocus(Number(e.target.value))} /> <b>{focus}</b></label>
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Skriv kort hva som kan gjøre dagen litt lettere." />
      <Button onClick={save} disabled={saving}>{saving ? 'Lagrer ...' : todayCheckin ? 'Oppdater innsjekk' : 'Lagre innsjekk'}</Button>
    </div>
  );
}

function PlanPage({ data }) {
  const completions = data.completions || [];
  return (
    <main className="app-shell">
      <section className="card big-card">
        <Badge>14-dagers program</Badge>
        <h1>Din plan</h1>
        <p>Du kan se hele programmet her. Dagen du er på nå er markert.</p>
        <div className="day-grid">
          {PROGRAM_DAYS.map((day, dayIndex) => {
            const done = day.lessons.filter((l) => completions.some((c) => c.lesson_key === l.id)).length;
            const active = dayIndex === (data.progress?.day_index || 0);
            return (
              <div className={active ? 'day-card active' : 'day-card'} key={day.theme}>
                <span>Dag {dayIndex + 1}</span>
                <h3>{day.theme}</h3>
                <p>{day.tagline}</p>
                <div className="mini-progress"><i style={{ width: `${(done / day.lessons.length) * 100}%` }} /></div>
                <button onClick={() => navigate(`lesson/${day.lessons[0].id}`)}>{done}/3 · åpne</button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function LessonPage({ lessonId, data, refresh }) {
  const dayIndex = PROGRAM_DAYS.findIndex((day) => day.lessons.some((l) => l.id === lessonId));
  const day = PROGRAM_DAYS[dayIndex] || PROGRAM_DAYS[0];
  const lesson = day.lessons.find((l) => l.id === lessonId) || day.lessons[0];
  const existing = data.completions?.find((c) => c.lesson_key === lesson.id);
  const [answer, setAnswer] = useState(existing?.quiz_answer || '');
  const [reflection, setReflection] = useState(existing?.reflection || '');
  const [saving, setSaving] = useState(false);
  const nextLesson = getNextLesson(lesson.id);

  useEffect(() => {
    setAnswer(existing?.quiz_answer || '');
    setReflection(existing?.reflection || '');
  }, [lesson.id, existing?.quiz_answer, existing?.reflection]);

  async function complete() {
    setSaving(true);
    await supabase.from('lesson_completions').upsert({
      user_id: data.user.id,
      day_index: dayIndex,
      lesson_key: lesson.id,
      quiz_answer: answer,
      reflection
    }, { onConflict: 'user_id,lesson_key' });

    const updatedCompletions = [...(data.completions || []).filter((c) => c.lesson_key !== lesson.id), { lesson_key: lesson.id, day_index: dayIndex }];
    const doneInDay = day.lessons.filter((l) => updatedCompletions.some((c) => c.lesson_key === l.id)).length;
    const currentProgress = data.progress || { day_index: 0, streak_count: 0, completed_lessons: 0 };
    const shouldAdvance = doneInDay === day.lessons.length && dayIndex >= currentProgress.day_index;
    const lastDate = currentProgress.last_completed_date;
    let streak = currentProgress.streak_count || 0;
    if (shouldAdvance) {
      if (lastDate === todayIso()) streak = currentProgress.streak_count || 1;
      else if (lastDate === yesterdayIso()) streak += 1;
      else streak = 1;
    }

    await supabase.from('user_progress').upsert({
      user_id: data.user.id,
      day_index: shouldAdvance ? Math.min(dayIndex + 1, PROGRAM_DAYS.length - 1) : currentProgress.day_index,
      last_completed_date: shouldAdvance ? todayIso() : currentProgress.last_completed_date,
      streak_count: streak,
      completed_lessons: updatedCompletions.length,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    await refresh();
    setSaving(false);
    if (nextLesson) navigate(`lesson/${nextLesson.id}`);
    else navigate('dashboard');
  }

  return (
    <main className="app-shell narrow">
      <section className="card lesson-page-card">
        <div className="lesson-kicker">
          <Badge>Dag {dayIndex + 1}</Badge>
          <span>{lesson.minutes} minutter</span>
        </div>
        <h1>{lesson.title}</h1>
        <p className="lesson-body">{lesson.body}</p>

        <div className="task-box">
          <strong>Liten øvelse</strong>
          <p>{lesson.task}</p>
        </div>

        <div className="question-block">
          <h3>{lesson.question}</h3>
          <div className="choice-grid one-col">
            {lesson.options.map((option) => (
              <button key={option} className={answer === option ? 'choice selected' : 'choice'} onClick={() => setAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>

        <label>
          Kort refleksjon
          <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="Skriv én eller to setninger om hva du vil prøve eller legge merke til." />
        </label>

        <div className="hero-actions">
          <Button onClick={complete} disabled={saving || !answer || reflection.trim().length < 3}>
            {saving ? 'Lagrer ...' : existing ? 'Lagre endringer og gå videre' : 'Fullfør økten'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('dashboard')}>Tilbake til i dag</Button>
        </div>
      </section>
    </main>
  );
}

function getNextLesson(currentId) {
  const all = PROGRAM_DAYS.flatMap((day) => day.lessons);
  const i = all.findIndex((l) => l.id === currentId);
  return i >= 0 ? all[i + 1] : null;
}

function JournalPage({ data, refresh }) {
  const [body, setBody] = useState('');
  const [journalPrompt, setJournalPrompt] = useState('Hva la jeg merke til i dag?');
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!body.trim()) return;
    setSaving(true);
    await supabase.from('journal_entries').insert({
      user_id: data.user.id,
      prompt: journalPrompt,
      body
    });
    setBody('');
    await refresh();
    setSaving(false);
  }

  return (
    <main className="app-shell">
      <section className="content-grid journal-grid">
        <div className="card">
          <h1>Journal</h1>
          <label>
            Skrivespørsmål
            <select value={journalPrompt} onChange={(e) => setJournalPrompt(e.target.value)}>
              <option>Hva la jeg merke til i dag?</option>
              <option>Hva gjorde starten lettere?</option>
              <option>Hva stoppet meg, og hva kan justeres?</option>
              <option>Hva er én liten seier fra i dag?</option>
            </select>
          </label>
          <textarea className="journal-input" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Skriv fritt. Et par setninger er nok." />
          <Button onClick={save} disabled={saving || !body.trim()}>{saving ? 'Lagrer ...' : 'Lagre notat'}</Button>
        </div>
        <div className="card">
          <h2>Tidligere notater</h2>
          {!data.journal?.length && <EmptyState title="Ingen notater ennå">Skriv et lite notat for å gjøre erfaringer og fremgang synlig.</EmptyState>}
          <div className="entry-list">
            {(data.journal || []).map((entry) => (
              <article className="entry" key={entry.id}>
                <span>{new Date(entry.created_at).toLocaleString('no-NO')}</span>
                <strong>{entry.prompt}</strong>
                <p>{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function HabitsPage({ data, refresh }) {
  const [title, setTitle] = useState('');
  const today = todayIso();

  async function addHabit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await supabase.from('habits').insert({ user_id: data.user.id, title: title.trim() });
    setTitle('');
    await refresh();
  }

  async function toggleHabit(habit) {
    const existing = (data.habitLogs || []).find((log) => log.habit_id === habit.id && log.log_date === today);
    if (existing) {
      await supabase.from('habit_logs').delete().eq('habit_id', habit.id).eq('log_date', today);
    } else {
      await supabase.from('habit_logs').insert({ habit_id: habit.id, user_id: data.user.id, log_date: today, done: true });
    }
    await refresh();
  }

  async function archiveHabit(habit) {
    await supabase.from('habits').update({ archived: true }).eq('id', habit.id);
    await refresh();
  }

  const activeHabits = (data.habits || []).filter((h) => !h.archived);

  return (
    <main className="app-shell narrow">
      <section className="card big-card">
        <h1>Vaner</h1>
        <p>Legg inn små vaner du vil gjøre ofte. Start så lett at vanen også passer på travle dager.</p>
        <form className="inline-form" onSubmit={addHabit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="F.eks. 10 min rydding, kort gåtur eller skrive én setning" />
          <Button>Legg til</Button>
        </form>

        {!activeHabits.length && <EmptyState title="Ingen vaner ennå">Legg inn én liten vane du vil gjøre enkel å gjenta.</EmptyState>}
        <div className="habit-list">
          {activeHabits.map((habit) => {
            const done = (data.habitLogs || []).some((log) => log.habit_id === habit.id && log.log_date === today);
            return (
              <div className="habit-row" key={habit.id}>
                <button className={done ? 'check done' : 'check'} onClick={() => toggleHabit(habit)}>{done ? '✓' : ''}</button>
                <div>
                  <strong>{habit.title}</strong>
                  <span>{done ? 'Logget i dag' : 'Ikke logget i dag'}</span>
                </div>
                <button className="text-button" onClick={() => archiveHabit(habit)}>Arkiver</button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function LoadingScreen() {
  return (
    <main className="setup-page">
      <section className="setup-card loading-card">
        <div className="spinner" />
        <p>Laster appen ...</p>
      </section>
    </main>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [route, setRoute] = useState(getHashRoute());
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!hasSupabaseConfig) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  async function ensureUserRows(user) {
    await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      display_name: user.user_metadata?.display_name || user.email?.split('@')[0]
    }, { onConflict: 'id' });
    await supabase.from('user_progress').upsert({ user_id: user.id }, { onConflict: 'user_id' });
  }

  async function loadData() {
    if (!session?.user) return;
    setLoading(true);
    await ensureUserRows(session.user);
    const userId = session.user.id;

    const [profile, onboarding, progress, completions, checkins, journal, habits, habitLogs] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('onboarding_answers').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('lesson_completions').select('*').eq('user_id', userId).order('completed_at', { ascending: false }),
      supabase.from('daily_checkins').select('*').eq('user_id', userId).order('checkin_date', { ascending: false }).limit(30),
      supabase.from('journal_entries').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50),
      supabase.from('habits').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('habit_logs').select('*').eq('user_id', userId).gte('log_date', new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10))
    ]);

    setData({
      user: session.user,
      profile: profile.data,
      onboarding: onboarding.data,
      progress: progress.data,
      completions: completions.data || [],
      checkins: checkins.data || [],
      journal: journal.data || [],
      habits: habits.data || [],
      habitLogs: habitLogs.data || []
    });
    setLoading(false);
  }

  useEffect(() => {
    if (session?.user) loadData();
    else setData({});
  }, [session?.user?.id]);

  const page = useMemo(() => {
    if (!hasSupabaseConfig) return <SetupMissing />;
    if (loading || (session && !data.user)) return <LoadingScreen />;
    if (!session) return <AuthPage />;
    if (!data.onboarding && route.name !== 'onboarding') return <OnboardingPage user={session.user} onSaved={loadData} />;

    switch (route.name) {
      case 'onboarding':
        return <OnboardingPage user={session.user} onSaved={loadData} />;
      case 'plan':
        return <PlanPage data={data} />;
      case 'lesson':
        return <LessonPage lessonId={route.params.id} data={data} refresh={loadData} />;
      case 'journal':
        return <JournalPage data={data} refresh={loadData} />;
      case 'habits':
        return <HabitsPage data={data} refresh={loadData} />;
      default:
        return <Dashboard data={data} refresh={loadData} />;
    }
  }, [loading, session, route, data]);

  return (
    <>
      {session && data.onboarding && <TopNav user={session.user} profile={data.profile} />}
      {page}
      {session && data.onboarding && (
        <footer className="app-footer">
          Chill Path er et selvhjelps- og vanebyggingsverktøy. Det er ikke helsehjelp, diagnostikk eller behandling.
        </footer>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
