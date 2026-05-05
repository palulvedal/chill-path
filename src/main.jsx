import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase, hasSupabaseConfig } from './supabaseClient.js';
import {
  GOALS,
  BLOCKERS,
  getFilteredCompletions,
  getMaintenanceItems,
  getPlanSummary,
  getPlanningGuidance,
  getProgramDays,
  getSuggestedJournalPrompts,
  getTrackMeta,
  PROGRAM_LENGTH_DAYS
} from './lessonData.js';
import './styles.css';

const todayIso = () => new Date().toISOString().slice(0, 10);

function yesterdayIso() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}


function parseIsoDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function addDaysIso(value, days) {
  const d = parseIsoDate(value) || new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetweenIso(from, to) {
  const a = parseIsoDate(from);
  const b = parseIsoDate(to);
  if (!a || !b) return null;
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

function weekStartIso(value = todayIso()) {
  const d = parseIsoDate(value) || new Date();
  const day = d.getDay(); // 0 = Sunday, 1 = Monday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function formatDateShort(value) {
  if (!value) return '';
  return new Date(value + 'T00:00:00').toLocaleDateString('no-NO', { day: '2-digit', month: 'short' });
}

function average(values) {
  const nums = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
  if (!nums.length) return null;
  return nums.reduce((sum, value) => sum + value, 0) / nums.length;
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
        <h1>Et 28-dagers program for roligere start, bedre fokus og mindre utsettelse.</h1>
        <p>
          Ta en kort startkartlegging, få et programspor som passer situasjonen din, og bruk 5-12 minutter om dagen på små øvelser, refleksjon, vaner og innsjekk.
        </p>
        <div className="hero-stack">
          <span>Fire ulike programspor</span>
          <span>Korte daglige økter</span>
          <span>Journal, vaner og fremgang</span>
        </div>
        <p className="medical-note">
          Dette er selvhjelp og vanebygging. Det er ikke medisinsk rådgivning, diagnostikk eller behandling.
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
        <button onClick={() => navigate('overview')}>Oversikt</button>
        <button onClick={() => navigate('parking')}>Parkeringsliste</button>
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

  const previewSummary = getPlanSummary({ goals, blockers, energy, focus_minutes: focusMinutes, daily_time: dailyTime, tone });
  const canPreview = goals.length > 0 || blockers.length > 0 || energy === 'lav';

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
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        day_index: 0,
        last_completed_date: null,
        streak_count: 0,
        completed_lessons: 0,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      await onSaved();
      navigate('dashboard');
    }
    setSaving(false);
  }

  return (
    <main className="app-shell narrow">
      <section className="card big-card">
        <Badge>Tar ca. 3 minutter</Badge>
        <h1>Finn programsporet som passer best nå</h1>
        <p>
          Svarene brukes til å velge ett av fire programspor: rolig start, fokus og struktur, ferdig nok eller slutt å utsette.
          Du kan endre kartleggingen senere, men da starter programmet på nytt.
        </p>

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
            Når passer det best å bruke appen?
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

        {canPreview && (
          <div className="preview-card">
            <span className="track-label">Foreløpig anbefaling</span>
            <h2>{previewSummary.label}</h2>
            <p>{previewSummary.description}</p>
            <ul className="soft-list">
              {previewSummary.recommendations.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        )}

        {error && <p className="form-message error">{error}</p>}
        <Button onClick={save} disabled={saving || goals.length === 0 || blockers.length === 0}>
          {saving ? 'Lagrer ...' : 'Start 28-dagersprogrammet'}
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
  const programDays = getProgramDays(data.onboarding);
  const currentProgramCompletions = getFilteredCompletions(data.onboarding, data.completions || []);
  const rawDayIndex = data.progress?.day_index || 0;
  const isMaintenance = rawDayIndex >= programDays.length;
  const currentDayIndex = Math.min(rawDayIndex, programDays.length - 1);
  const currentDay = programDays[currentDayIndex];
  const completedToday = isMaintenance ? [] : currentDay.lessons.filter((l) => currentProgramCompletions.some((c) => c.lesson_key === l.id));
  const planSummary = getPlanSummary(data.onboarding);
  const totalLessons = programDays.reduce((sum, day) => sum + day.lessons.length, 0);
  const percent = isMaintenance ? 100 : (currentProgramCompletions.length / totalLessons) * 100;
  const todayCheckin = data.checkins?.find((c) => c.checkin_date === todayIso());
  const lastCompletedDate = data.progress?.last_completed_date;
  const gapDays = lastCompletedDate ? daysBetweenIso(lastCompletedDate, todayIso()) : null;
  const showStartAgain = !isMaintenance && rawDayIndex > 0 && gapDays !== null && gapDays >= 2;

  if (isMaintenance) {
    return <MaintenanceDashboard data={data} refresh={refresh} percent={percent} planSummary={planSummary} todayCheckin={todayCheckin} />;
  }

  const nextLesson = currentDay.lessons.find((l) => !currentProgramCompletions.some((c) => c.lesson_key === l.id)) || currentDay.lessons[0];

  return (
    <main className="app-shell">
      <section className="dashboard-grid">
        <div className="card hero-card">
          <Badge>Dag {currentDayIndex + 1} av {programDays.length} · {planSummary.shortName}</Badge>
          <h1>{currentDay.theme}</h1>
          <p>{currentDay.tagline}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate(`lesson/${nextLesson.id}`)}>Fortsett dagens økt</Button>
            <Button variant="ghost" onClick={() => navigate('plan')}>Se hele planen</Button>
          </div>
        </div>

        <div className="card metric-card">
          <ProgressRing percent={percent} />
          <h3>Samlet fremgang</h3>
          <p>{currentProgramCompletions.length} av {totalLessons} økter fullført</p>
        </div>

        <div className="card metric-card">
          <div className="streak-number">{data.progress?.streak_count || 0}</div>
          <h3>Rekke</h3>
          <p>dager der hele dagsopplegget er fullført</p>
        </div>
      </section>

      {showStartAgain && <StartAgainCard data={data} nextLesson={nextLesson} gapDays={gapDays} />}

      <section className="content-grid main-dashboard-grid">
        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Dagens korte økter</h2>
              <p>{completedToday.length}/{currentDay.lessons.length} fullført</p>
            </div>
          </div>
          <div className="lesson-list">
            {currentDay.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} completed={currentProgramCompletions.some((c) => c.lesson_key === lesson.id)} />
            ))}
          </div>
        </div>

        <PlanSummaryCard data={data} planSummary={planSummary} />
        <CheckinCard todayCheckin={todayCheckin} userId={data.user.id} refresh={refresh} />
      </section>

      <section className="tool-grid">
        <DailyPlanCard data={data} refresh={refresh} />
        <ParkingListCard data={data} refresh={refresh} compact />
        <WeeklySnapshotCard data={data} />
      </section>
    </main>
  );
}

function MaintenanceDashboard({ data, refresh, percent, planSummary, todayCheckin }) {
  const maintenanceItems = getMaintenanceItems(data.onboarding);
  return (
    <main className="app-shell">
      <section className="dashboard-grid">
        <div className="card hero-card">
          <Badge>Vedlikeholdsmodus · {planSummary.shortName}</Badge>
          <h1>Programmet er fullført</h1>
          <p>
            Nå er målet å bruke de få grepene som faktisk hjalp. Fortsett med ukentlig gjennomgang,
            små vaner og journal når du trenger det.
          </p>
          <div className="hero-actions">
            <Button onClick={() => navigate('habits')}>Logg vaner</Button>
            <Button variant="ghost" onClick={() => navigate('journal')}>Skriv journal</Button>
          </div>
        </div>
        <div className="card metric-card">
          <ProgressRing percent={percent} />
          <h3>28 dager fullført</h3>
          <p>Du kan fortsette med vedlikehold eller ta startkartleggingen på nytt.</p>
        </div>
        <div className="card metric-card">
          <div className="streak-number">{data.progress?.streak_count || 0}</div>
          <h3>Rekke</h3>
          <p>dager med fullført dagsopplegg under programmet</p>
        </div>
      </section>

      <section className="content-grid main-dashboard-grid">
        <div className="card">
          <h2>Vedlikehold fremover</h2>
          <ul className="soft-list">
            {maintenanceItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Button variant="ghost" onClick={() => navigate('plan')}>Se programmet igjen</Button>
        </div>
        <PlanSummaryCard data={data} planSummary={planSummary} />
        <CheckinCard todayCheckin={todayCheckin} userId={data.user.id} refresh={refresh} />
      </section>

      <section className="tool-grid">
        <DailyPlanCard data={data} refresh={refresh} />
        <ParkingListCard data={data} refresh={refresh} compact />
        <WeeklySnapshotCard data={data} />
      </section>
    </main>
  );
}

function PlanSummaryCard({ data, planSummary }) {
  return (
    <div className="card">
      <div className="section-heading">
        <div>
          <span className="track-label">Ditt spor</span>
          <h2>{planSummary.label}</h2>
          <p>{planSummary.whyThisFits}</p>
        </div>
      </div>
      <ul className="soft-list">
        {planSummary.recommendations.map((r) => <li key={r}>{r}</li>)}
      </ul>
      <div className="small-note">
        Fokusøkt: {data.onboarding?.focus_minutes || 15} min · Beste tidspunkt: {data.onboarding?.daily_time || 'morgen'}
      </div>
      <button className="text-button" onClick={() => navigate('onboarding')}>Endre startkartlegging</button>
    </div>
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
      {mood <= 1 && (
        <div className="safety-note">
          <strong>Hvis dette handler om akutt fare eller tanker om å skade deg selv:</strong>
          <p>Bruk ikke appen alene. Kontakt noen du stoler på, fastlege eller legevakt. I Norge: ring 113 ved akutt fare eller 116 117 for legevakt.</p>
        </div>
      )}
      <Button onClick={save} disabled={saving}>{saving ? 'Lagrer ...' : todayCheckin ? 'Oppdater innsjekk' : 'Lagre innsjekk'}</Button>
    </div>
  );
}


function StartAgainCard({ data, nextLesson, gapDays }) {
  const daysText = gapDays === 2 ? 'to dager' : `${gapDays} dager`;
  return (
    <section className="card restart-card">
      <div>
        <Badge>Start rolig igjen</Badge>
        <h2>Det har gått {daysText} siden sist fullførte dag</h2>
        <p>
          Det betyr ikke at du har mislyktes. Velg en mild restart: gjør en kort økt, lag en ny plan for i dag,
          eller parker det som fyller hodet før du fortsetter.
        </p>
      </div>
      <div className="hero-actions">
        <Button onClick={() => navigate(`lesson/${nextLesson.id}`)}>Gjør neste korte økt</Button>
        <Button variant="ghost" onClick={() => document.getElementById('daily-plan-card')?.scrollIntoView({ behavior: 'smooth' })}>Lag dagens plan</Button>
        <Button variant="ghost" onClick={() => navigate('parking')}>Tøm hodet først</Button>
      </div>
    </section>
  );
}

function DailyPlanCard({ data, refresh }) {
  const guidance = getPlanningGuidance(data.onboarding);
  const existing = (data.dailyPlans || []).find((plan) => plan.plan_date === todayIso());
  const [mainTask, setMainTask] = useState(existing?.main_task || '');
  const [firstStep, setFirstStep] = useState(existing?.first_step || '');
  const [startTime, setStartTime] = useState(existing?.start_time ? existing.start_time.slice(0, 5) : '');
  const [durationMinutes, setDurationMinutes] = useState(existing?.duration_minutes || data.onboarding?.focus_minutes || 15);
  const [obstacle, setObstacle] = useState(existing?.obstacle || '');
  const [ifThen, setIfThen] = useState(existing?.if_then || '');
  const [doneEnough, setDoneEnough] = useState(existing?.done_enough || '');
  const [lowEnergyVersion, setLowEnergyVersion] = useState(existing?.low_energy_version || '');
  const [completed, setCompleted] = useState(existing?.completed || false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMainTask(existing?.main_task || '');
    setFirstStep(existing?.first_step || '');
    setStartTime(existing?.start_time ? existing.start_time.slice(0, 5) : '');
    setDurationMinutes(existing?.duration_minutes || data.onboarding?.focus_minutes || 15);
    setObstacle(existing?.obstacle || '');
    setIfThen(existing?.if_then || '');
    setDoneEnough(existing?.done_enough || '');
    setLowEnergyVersion(existing?.low_energy_version || '');
    setCompleted(existing?.completed || false);
  }, [existing?.id, data.onboarding?.focus_minutes]);

  async function savePlan(nextCompleted = completed) {
    setSaving(true);
    setMessage('');
    const { error } = await supabase.from('daily_plans').upsert({
      user_id: data.user.id,
      plan_date: todayIso(),
      main_task: mainTask.trim(),
      first_step: firstStep.trim(),
      start_time: startTime || null,
      duration_minutes: Number(durationMinutes) || null,
      obstacle: obstacle.trim(),
      if_then: ifThen.trim(),
      done_enough: doneEnough.trim(),
      low_energy_version: lowEnergyVersion.trim(),
      completed: nextCompleted,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,plan_date' });

    if (error) {
      setMessage(`Kunne ikke lagre. Har du kjørt den nye SQL-migreringen? (${error.message})`);
    } else {
      setMessage(nextCompleted ? 'Planen er markert som gjort.' : 'Dagens plan er lagret.');
      await refresh();
    }
    setSaving(false);
  }

  async function toggleCompleted() {
    const next = !completed;
    setCompleted(next);
    await savePlan(next);
  }

  return (
    <div className="card daily-plan-card" id="daily-plan-card">
      <div className="section-heading">
        <div>
          <span className="track-label">Dagens plan</span>
          <h2>{guidance.title}</h2>
          <p>{guidance.intro}</p>
        </div>
        {existing && <span className={completed ? 'status done' : 'status'}>{completed ? 'Gjort' : 'Planlagt'}</span>}
      </div>

      <div className="plan-form-grid">
        <label>
          {guidance.mainLabel}
          <input value={mainTask} onChange={(e) => setMainTask(e.target.value)} placeholder={guidance.mainPlaceholder} />
        </label>
        <label>
          {guidance.stepLabel}
          <input value={firstStep} onChange={(e) => setFirstStep(e.target.value)} placeholder={guidance.stepPlaceholder} />
        </label>
        <label>
          {guidance.timeLabel}
          <input type="time" value={startTime || ''} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          {guidance.durationLabel}
          <select value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))}>
            {[5, 10, 15, 25, 45, 60].map((m) => <option key={m} value={m}>{m} minutter</option>)}
          </select>
        </label>
        <label>
          {guidance.obstacleLabel}
          <input value={obstacle} onChange={(e) => setObstacle(e.target.value)} placeholder="F.eks. telefon, usikkerhet, lav energi eller for mange valg" />
        </label>
        <label>
          {guidance.ifThenLabel}
          <input value={ifThen} onChange={(e) => setIfThen(e.target.value)} placeholder="F.eks. tar jeg to minutter, parkerer distraksjonen eller ber om hjelp" />
        </label>
        <label>
          {guidance.doneLabel}
          <input value={doneEnough} onChange={(e) => setDoneEnough(e.target.value)} placeholder={guidance.donePlaceholder} />
        </label>
        <label>
          {guidance.lowEnergyLabel}
          <input value={lowEnergyVersion} onChange={(e) => setLowEnergyVersion(e.target.value)} placeholder="Hva er minste versjon som fortsatt teller litt?" />
        </label>
      </div>

      {message && <p className={message.startsWith('Kunne') ? 'form-message error' : 'form-message'}>{message}</p>}
      <div className="hero-actions">
        <Button onClick={() => savePlan(completed)} disabled={saving || !mainTask.trim() || !firstStep.trim()}>{saving ? 'Lagrer ...' : existing ? 'Oppdater dagens plan' : 'Lagre dagens plan'}</Button>
        <Button variant="ghost" onClick={toggleCompleted} disabled={saving || !mainTask.trim()}>{completed ? 'Marker som ikke gjort' : 'Marker som gjort'}</Button>
      </div>
    </div>
  );
}

function ParkingListCard({ data, refresh, compact = false }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const openItems = (data.parkingItems || []).filter((item) => item.status === 'open');
  const visibleItems = compact ? openItems.slice(0, 5) : openItems;

  async function addItem(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setMessage('');
    const { error } = await supabase.from('parking_items').insert({
      user_id: data.user.id,
      title: title.trim(),
      note: note.trim(),
      status: 'open'
    });
    if (error) setMessage(`Kunne ikke lagre. Har du kjørt den nye SQL-migreringen? (${error.message})`);
    else {
      setTitle('');
      setNote('');
      await refresh();
    }
    setSaving(false);
  }

  async function setStatus(item, status) {
    await supabase.from('parking_items').update({ status, updated_at: new Date().toISOString() }).eq('id', item.id);
    await refresh();
  }

  async function useInDailyPlan(item) {
    const { error } = await supabase.from('daily_plans').upsert({
      user_id: data.user.id,
      plan_date: todayIso(),
      main_task: item.title,
      first_step: item.note || 'Skriv første lille steg her',
      duration_minutes: data.onboarding?.focus_minutes || 15,
      completed: false,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,plan_date' });
    if (!error) {
      await setStatus(item, 'planned');
      navigate('dashboard');
      setTimeout(() => document.getElementById('daily-plan-card')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      setMessage(error.message);
    }
  }

  return (
    <div className="card parking-card">
      <div className="section-heading">
        <div>
          <span className="track-label">Parkeringsliste</span>
          <h2>Tøm hodet uten å gjøre alt nå</h2>
          <p>Skriv ned ting som dukker opp. Senere kan du velge om noe skal inn i dagens plan.</p>
        </div>
        {compact && <button className="text-button" onClick={() => navigate('parking')}>Åpne liste</button>}
      </div>

      <form className="parking-form" onSubmit={addItem}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="F.eks. sjekke faktura, svare på e-post, kjøpe gave" />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Valgfritt: første steg eller kontekst" />
        <Button disabled={saving || !title.trim()}>{saving ? 'Lagrer ...' : 'Parker'}</Button>
      </form>
      {message && <p className="form-message error">{message}</p>}

      {!visibleItems.length && <EmptyState title="Ingenting parkert">Når noe forstyrrer fokus, legg det her i stedet for å bære det i hodet.</EmptyState>}
      <div className="parking-list">
        {visibleItems.map((item) => (
          <article className="parking-item" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              {item.note && <p>{item.note}</p>}
              <span>{new Date(item.created_at).toLocaleDateString('no-NO')}</span>
            </div>
            <div className="parking-actions">
              <button className="text-button" onClick={() => useInDailyPlan(item)}>Bruk i dagens plan</button>
              <button className="text-button" onClick={() => setStatus(item, 'done')}>Ferdig</button>
              <button className="text-button" onClick={() => setStatus(item, 'archived')}>Arkiver</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function WeeklySnapshotCard({ data }) {
  const start = weekStartIso();
  const end = addDaysIso(start, 6);
  const checkins = (data.checkins || []).filter((c) => c.checkin_date >= start && c.checkin_date <= end);
  const plans = (data.dailyPlans || []).filter((p) => p.plan_date >= start && p.plan_date <= end);
  const habitLogs = (data.habitLogs || []).filter((h) => h.log_date >= start && h.log_date <= end);
  const avgEnergy = average(checkins.map((c) => c.energy));
  const avgFocus = average(checkins.map((c) => c.focus));
  const avgMood = average(checkins.map((c) => c.mood));
  const completedPlans = plans.filter((p) => p.completed).length;

  return (
    <div className="card weekly-card">
      <div className="section-heading">
        <div>
          <span className="track-label">Ukentlig oversikt</span>
          <h2>Denne uken</h2>
          <p>{formatDateShort(start)}–{formatDateShort(end)}. Bruk tallene som observasjoner, ikke karakterer.</p>
        </div>
      </div>
      <div className="mini-metrics">
        <div><strong>{checkins.length}</strong><span>innsjekker</span></div>
        <div><strong>{avgEnergy ? avgEnergy.toFixed(1) : '–'}</strong><span>energi</span></div>
        <div><strong>{avgFocus ? avgFocus.toFixed(1) : '–'}</strong><span>fokus</span></div>
        <div><strong>{avgMood ? avgMood.toFixed(1) : '–'}</strong><span>humør</span></div>
        <div><strong>{completedPlans}/{plans.length || 0}</strong><span>planer gjort</span></div>
        <div><strong>{habitLogs.length}</strong><span>vaner logget</span></div>
      </div>
      <Button variant="ghost" onClick={() => navigate('overview')}>Gå til oversikt</Button>
    </div>
  );
}

function WeeklyReviewCard({ data, refresh }) {
  const start = weekStartIso();
  const existing = (data.weeklyReviews || []).find((r) => r.week_start === start);
  const [worked, setWorked] = useState(existing?.worked || '');
  const [stopped, setStopped] = useState(existing?.stopped || '');
  const [bestWindow, setBestWindow] = useState(existing?.best_window || '');
  const [nextAdjustment, setNextAdjustment] = useState(existing?.next_adjustment || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setWorked(existing?.worked || '');
    setStopped(existing?.stopped || '');
    setBestWindow(existing?.best_window || '');
    setNextAdjustment(existing?.next_adjustment || '');
  }, [existing?.id]);

  async function save() {
    setSaving(true);
    setMessage('');
    const { error } = await supabase.from('weekly_reviews').upsert({
      user_id: data.user.id,
      week_start: start,
      worked: worked.trim(),
      stopped: stopped.trim(),
      best_window: bestWindow.trim(),
      next_adjustment: nextAdjustment.trim(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,week_start' });
    if (error) setMessage(`Kunne ikke lagre. Har du kjørt den nye SQL-migreringen? (${error.message})`);
    else {
      setMessage('Ukentlig gjennomgang er lagret.');
      await refresh();
    }
    setSaving(false);
  }

  return (
    <div className="card">
      <span className="track-label">Ukentlig gjennomgang</span>
      <h2>Hva bør du ta med deg videre?</h2>
      <p>Bruk fem minutter på å justere systemet, ikke på å evaluere deg selv som person.</p>
      <div className="review-grid">
        <label>Hva fungerte denne uken?<textarea value={worked} onChange={(e) => setWorked(e.target.value)} placeholder="F.eks. korte fokusøkter etter lunsj" /></label>
        <label>Hva stoppet meg oftest?<textarea value={stopped} onChange={(e) => setStopped(e.target.value)} placeholder="F.eks. uklare oppgaver, telefon, for høye krav" /></label>
        <label>Når hadde jeg best energi/fokus?<textarea value={bestWindow} onChange={(e) => setBestWindow(e.target.value)} placeholder="F.eks. mellom 09 og 11, eller etter en kort tur" /></label>
        <label>Én justering for neste uke<textarea value={nextAdjustment} onChange={(e) => setNextAdjustment(e.target.value)} placeholder="F.eks. lage dagens plan før e-post" /></label>
      </div>
      {message && <p className={message.startsWith('Kunne') ? 'form-message error' : 'form-message'}>{message}</p>}
      <Button onClick={save} disabled={saving}>{saving ? 'Lagrer ...' : existing ? 'Oppdater gjennomgang' : 'Lagre gjennomgang'}</Button>
    </div>
  );
}

function PatternSummaryCard({ data }) {
  const checkins = data.checkins || [];
  const avgEnergy = average(checkins.map((c) => c.energy));
  const avgFocus = average(checkins.map((c) => c.focus));
  const avgMood = average(checkins.map((c) => c.mood));
  const bestFocus = [...checkins].sort((a, b) => (b.focus || 0) - (a.focus || 0))[0];
  const bestEnergy = [...checkins].sort((a, b) => (b.energy || 0) - (a.energy || 0))[0];
  const activeHabits = (data.habits || []).filter((h) => !h.archived);
  const openParking = (data.parkingItems || []).filter((item) => item.status === 'open').length;
  const completedPlans = (data.dailyPlans || []).filter((plan) => plan.completed).length;

  return (
    <div className="card">
      <span className="track-label">Mine mønstre</span>
      <h2>Enkle observasjoner</h2>
      <p>Dette er bare mønstre i det du har logget. Bruk dem som hint, ikke som fasit.</p>
      <div className="pattern-list">
        <div><strong>Gjennomsnittlig energi</strong><span>{avgEnergy ? avgEnergy.toFixed(1) : 'Ikke nok data ennå'}</span></div>
        <div><strong>Gjennomsnittlig fokus</strong><span>{avgFocus ? avgFocus.toFixed(1) : 'Ikke nok data ennå'}</span></div>
        <div><strong>Gjennomsnittlig humør</strong><span>{avgMood ? avgMood.toFixed(1) : 'Ikke nok data ennå'}</span></div>
        <div><strong>Beste fokusdag i loggen</strong><span>{bestFocus ? `${formatDateShort(bestFocus.checkin_date)} · ${bestFocus.focus}/5` : 'Ikke nok data ennå'}</span></div>
        <div><strong>Beste energidag i loggen</strong><span>{bestEnergy ? `${formatDateShort(bestEnergy.checkin_date)} · ${bestEnergy.energy}/5` : 'Ikke nok data ennå'}</span></div>
        <div><strong>Aktive vaner</strong><span>{activeHabits.length}</span></div>
        <div><strong>Dagens planer fullført</strong><span>{completedPlans}</span></div>
        <div><strong>Åpne ting i parkeringslisten</strong><span>{openParking}</span></div>
      </div>
    </div>
  );
}

function RecentPlansCard({ data }) {
  const plans = (data.dailyPlans || []).slice(0, 7);
  return (
    <div className="card">
      <span className="track-label">Planhistorikk</span>
      <h2>Siste dagsplaner</h2>
      {!plans.length && <EmptyState title="Ingen dagsplaner ennå">Når du lager Dagens plan, dukker de siste planene opp her.</EmptyState>}
      <div className="entry-list">
        {plans.map((plan) => (
          <article className="entry" key={plan.id || plan.plan_date}>
            <span>{formatDateShort(plan.plan_date)} · {plan.completed ? 'gjort' : 'ikke markert som gjort'}</span>
            <strong>{plan.main_task}</strong>
            <p>{plan.first_step}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function OverviewPage({ data, refresh }) {
  return (
    <main className="app-shell">
      <section className="card big-card">
        <Badge>Oversikt</Badge>
        <h1>Se mønstre uten å gjøre appen komplisert</h1>
        <p>
          Her samles ukentlig gjennomgang, enkle mønstre, nylige dagsplaner og noen få nøkkeltall.
          Målet er oversikt, ikke mer administrasjon.
        </p>
      </section>
      <section className="tool-grid overview-grid">
        <WeeklySnapshotCard data={data} />
        <PatternSummaryCard data={data} />
        <WeeklyReviewCard data={data} refresh={refresh} />
        <RecentPlansCard data={data} />
      </section>
    </main>
  );
}

function ParkingPage({ data, refresh }) {
  const closedItems = (data.parkingItems || []).filter((item) => item.status !== 'open').slice(0, 20);
  return (
    <main className="app-shell">
      <section className="card big-card">
        <Badge>Parkeringsliste</Badge>
        <h1>Legg ting her før de tar over dagen</h1>
        <p>
          Dette er ikke en stor oppgaveliste. Det er et sted å parkere tanker, oppgaver og distraksjoner til du velger hva som faktisk skal inn i dagens plan.
        </p>
      </section>
      <section className="content-grid">
        <ParkingListCard data={data} refresh={refresh} />
        <div className="card">
          <h2>Arkiv og ferdige ting</h2>
          {!closedItems.length && <EmptyState title="Ingen arkiverte ting ennå">Når du markerer noe som ferdig, planlagt eller arkivert, vises det her.</EmptyState>}
          <div className="entry-list">
            {closedItems.map((item) => (
              <article className="entry" key={item.id}>
                <span>{item.status === 'planned' ? 'Brukt i plan' : item.status === 'done' ? 'Ferdig' : 'Arkivert'} · {new Date(item.updated_at || item.created_at).toLocaleDateString('no-NO')}</span>
                <strong>{item.title}</strong>
                {item.note && <p>{item.note}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


function PlanPage({ data }) {
  const programDays = getProgramDays(data.onboarding);
  const completions = getFilteredCompletions(data.onboarding, data.completions || []);
  const planSummary = getPlanSummary(data.onboarding);
  const activeDayIndex = Math.min(data.progress?.day_index || 0, programDays.length - 1);

  return (
    <main className="app-shell">
      <section className="card big-card">
        <Badge>{PROGRAM_LENGTH_DAYS}-dagers program · {planSummary.shortName}</Badge>
        <h1>Din plan</h1>
        <p>
          Programmet er valgt ut fra startkartleggingen din. Hver dag har korte økter som skal være små nok til å gjennomføre,
          men konkrete nok til å gi trening over tid.
        </p>

        <div className="program-intro">
          <div>
            <span className="track-label">Hvorfor dette sporet?</span>
            <h2>{planSummary.label}</h2>
            <p>{planSummary.description}</p>
            <p>{planSummary.whyThisFits}</p>
          </div>
          <div>
            <span className="track-label">Bygger særlig på</span>
            <ul className="basis-list">
              {planSummary.basis.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="day-grid">
          {programDays.map((day, dayIndex) => {
            const done = day.lessons.filter((l) => completions.some((c) => c.lesson_key === l.id)).length;
            const active = dayIndex === activeDayIndex && (data.progress?.day_index || 0) < programDays.length;
            return (
              <div className={active ? 'day-card active' : 'day-card'} key={day.theme}>
                <span>Dag {dayIndex + 1}</span>
                <h3>{day.theme}</h3>
                <p>{day.tagline}</p>
                <div className="mini-progress"><i style={{ width: `${(done / day.lessons.length) * 100}%` }} /></div>
                <button onClick={() => navigate(`lesson/${day.lessons[0].id}`)}>{done}/{day.lessons.length} · åpne</button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function LessonPage({ lessonId, data, refresh }) {
  const programDays = getProgramDays(data.onboarding);
  const dayIndex = programDays.findIndex((day) => day.lessons.some((l) => l.id === lessonId));
  const day = programDays[dayIndex] || programDays[0];
  const lesson = day.lessons.find((l) => l.id === lessonId) || day.lessons[0];
  const existing = data.completions?.find((c) => c.lesson_key === lesson.id);
  const [answer, setAnswer] = useState(existing?.quiz_answer || '');
  const [reflection, setReflection] = useState(existing?.reflection || '');
  const [saving, setSaving] = useState(false);
  const lessonIndexInDay = day.lessons.findIndex((l) => l.id === lesson.id);
  const nextLessonSameDay = lessonIndexInDay >= 0 ? day.lessons[lessonIndexInDay + 1] : null;

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

    const currentProgramCompletions = getFilteredCompletions(data.onboarding, data.completions || []);
    const updatedCompletions = [...currentProgramCompletions.filter((c) => c.lesson_key !== lesson.id), { lesson_key: lesson.id, day_index: dayIndex }];
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
      day_index: shouldAdvance ? Math.min(dayIndex + 1, programDays.length) : currentProgress.day_index,
      last_completed_date: shouldAdvance ? todayIso() : currentProgress.last_completed_date,
      streak_count: streak,
      completed_lessons: updatedCompletions.length,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    await refresh();
    setSaving(false);
    if (nextLessonSameDay) navigate(`lesson/${nextLessonSameDay.id}`);
    else navigate('dashboard');
  }

  return (
    <main className="app-shell narrow">
      <section className="card lesson-page-card">
        <div className="lesson-kicker">
          <Badge>Dag {dayIndex + 1} av {programDays.length}</Badge>
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
            {saving ? 'Lagrer ...' : existing ? 'Lagre endringer' : nextLessonSameDay ? 'Fullfør og fortsett' : 'Fullfør dagen'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('dashboard')}>Tilbake til i dag</Button>
        </div>
      </section>
    </main>
  );
}

function JournalPage({ data, refresh }) {
  const prompts = getSuggestedJournalPrompts(data.onboarding);
  const [body, setBody] = useState('');
  const [journalPrompt, setJournalPrompt] = useState(prompts[0] || 'Hva la jeg merke til i dag?');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setJournalPrompt(prompts[0] || 'Hva la jeg merke til i dag?');
  }, [data.onboarding?.id]);

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
          <p>Bruk journalen til korte notater. Et par setninger er nok.</p>
          <label>
            Skrivespørsmål
            <select value={journalPrompt} onChange={(e) => setJournalPrompt(e.target.value)}>
              {prompts.map((prompt) => <option key={prompt}>{prompt}</option>)}
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

    const [profile, onboarding, progress, completions, checkins, journal, habits, habitLogs, dailyPlans, parkingItems, weeklyReviews] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('onboarding_answers').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('lesson_completions').select('*').eq('user_id', userId).order('completed_at', { ascending: false }),
      supabase.from('daily_checkins').select('*').eq('user_id', userId).order('checkin_date', { ascending: false }).limit(60),
      supabase.from('journal_entries').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50),
      supabase.from('habits').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('habit_logs').select('*').eq('user_id', userId).gte('log_date', new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString().slice(0, 10)),
      supabase.from('daily_plans').select('*').eq('user_id', userId).order('plan_date', { ascending: false }).limit(60),
      supabase.from('parking_items').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(100),
      supabase.from('weekly_reviews').select('*').eq('user_id', userId).order('week_start', { ascending: false }).limit(20)
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
      habitLogs: habitLogs.data || [],
      dailyPlans: dailyPlans.data || [],
      parkingItems: parkingItems.data || [],
      weeklyReviews: weeklyReviews.data || []
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
      case 'overview':
        return <OverviewPage data={data} refresh={loadData} />;
      case 'parking':
        return <ParkingPage data={data} refresh={loadData} />;
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
