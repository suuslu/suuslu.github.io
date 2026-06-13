import { useEffect, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const visitSessionKey = 'ayse-su-portfolio-visit-recorded';

function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function getHeaders() {
  return {
    apikey: supabaseAnonKey ?? '',
    Authorization: `Bearer ${supabaseAnonKey ?? ''}`,
    'Content-Type': 'application/json'
  };
}

function getVisitRecorded() {
  try {
    return window.sessionStorage.getItem(visitSessionKey) === 'true';
  } catch {
    return false;
  }
}

function setVisitRecorded() {
  try {
    window.sessionStorage.setItem(visitSessionKey, 'true');
  } catch {
    // If storage is blocked, keep the counter working for the current load.
  }
}

async function recordVisit() {
  if (!supabaseUrl) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/visits`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      page: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent
    })
  });

  if (!response.ok) {
    throw new Error('Visit insert failed');
  }
}

async function fetchVisitCount() {
  if (!supabaseUrl) {
    return null;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_visit_count`, {
    method: 'POST',
    headers: getHeaders(),
    body: '{}'
  });

  if (!response.ok) {
    throw new Error('Visit count failed');
  }

  const total = await response.json();
  return Number(total);
}

export function VisitCounter() {
  const [visits, setVisits] = useState('—');

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      return;
    }

    let cancelled = false;

    async function syncVisits() {
      try {
        const alreadyRecorded = getVisitRecorded();

        if (!alreadyRecorded) {
          await recordVisit();
          setVisitRecorded();
        }

        const total = await fetchVisitCount();

        if (!cancelled && Number.isFinite(total)) {
          setVisits(new Intl.NumberFormat(undefined).format(total));
        }
      } catch {
        if (!cancelled) {
          setVisits('—');
        }
      }
    }

    void syncVisits();

    return () => {
      cancelled = true;
    };
  }, []);

  return <span aria-label={visits === '—' ? 'Visits unavailable' : `${visits} visits`}>{visits}</span>;
}
