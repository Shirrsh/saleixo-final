import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteImage {
  id: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
  section: string;
  display_order: number;
}

export const useSiteImages = (section?: string) => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      let query = supabase
        .from('site_images')
        .select('id, image_key, image_url, alt_text, section, display_order')
        .eq('is_active', true)
        .order('display_order');

      if (section) {
        query = query.eq('section', section);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setImages(data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.error('Error fetching site images:', err);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    fetchImages();

    // Only subscribe to realtime on admin routes — public pages don't need
    // live updates and the WebSocket attempts cause measurable main-thread delay.
    if (!window.location.pathname.startsWith('/admin')) return;

    const channel = supabase
      .channel(`site_images:${section ?? 'all'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_images',
          ...(section ? { filter: `section=eq.${section}` } : {}),
        },
        () => { fetchImages(); },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchImages, section]);

  const getImageByKey = (key: string): SiteImage | undefined =>
    images.find((img) => img.image_key === key);

  const getImageUrl = (key: string, fallback?: string): string =>
    getImageByKey(key)?.image_url ?? fallback ?? '/placeholder.svg';

  const getAltText = (key: string, fallback?: string): string =>
    getImageByKey(key)?.alt_text ?? fallback ?? '';

  return { images, loading, error, getImageByKey, getImageUrl, getAltText };
};
