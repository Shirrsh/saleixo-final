import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteVideo {
  id: string;
  video_key: string;
  video_url: string;
  poster_url: string | null;
  alt_text: string | null;
  section: string;
  display_order: number;
  is_active: boolean;
}

export const useSiteVideos = (section?: string) => {
  const [videos, setVideos] = useState<SiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      let query = supabase
        .from('site_videos')
        .select('id, video_key, video_url, poster_url, alt_text, section, display_order, is_active')
        .eq('is_active', true)
        .order('display_order');

      if (section) {
        query = query.eq('section', section);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setVideos(data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.error('Error fetching site videos:', err);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    fetchVideos();

    const channel = supabase
      .channel(`site_videos:${section ?? 'all'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_videos',
          ...(section ? { filter: `section=eq.${section}` } : {}),
        },
        () => { fetchVideos(); },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchVideos, section]);

  const getVideoByKey = (key: string): SiteVideo | undefined =>
    videos.find((v) => v.video_key === key);

  const getVideoUrl = (key: string, fallback?: string): string =>
    getVideoByKey(key)?.video_url ?? fallback ?? '';

  const getPosterUrl = (key: string, fallback?: string): string =>
    getVideoByKey(key)?.poster_url ?? fallback ?? '';

  const getAltText = (key: string, fallback?: string): string =>
    getVideoByKey(key)?.alt_text ?? fallback ?? '';

  return { videos, loading, error, getVideoByKey, getVideoUrl, getPosterUrl, getAltText };
};
