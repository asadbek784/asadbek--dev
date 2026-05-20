import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseOptions {
  table: string;
  select?: string;
  order?: { column: string; ascending?: boolean };
  filter?: { column: string; value: unknown; operator?: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' };
  limit?: number;
  enabled?: boolean;
}

interface UseSupabaseReturn<T> {
  data: T[] | null;
  error: PostgrestError | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useSupabase<T>(options: UseSupabaseOptions): UseSupabaseReturn<T> {
  const { table, select = '*', order, filter, limit, enabled = true } = options;
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!enabled) { setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);

    let query = supabase.from(table).select(select);
    if (filter) query = query.filter(filter.column, filter.operator ?? 'eq', filter.value);
    if (order) query = query.order(order.column, { ascending: order.ascending ?? true });
    if (limit) query = query.limit(limit);

    const { data: result, error: supabaseError } = await query;
    if (supabaseError) { setError(supabaseError); setData(null); }
    else setData(result as T[]);
    setIsLoading(false);
  }, [table, select, order?.column, order?.ascending, filter?.column, filter?.value, filter?.operator, limit, enabled]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}
