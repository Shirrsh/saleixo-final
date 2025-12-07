import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchImages = async () => {
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
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching site images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [section]);

  const getImageByKey = (key: string): SiteImage | undefined => {
    return images.find(img => img.image_key === key);
  };

  const getImageUrl = (key: string, fallback?: string): string => {
    const image = getImageByKey(key);
    return image?.image_url || fallback || '/placeholder.svg';
  };

  const getAltText = (key: string, fallback?: string): string => {
    const image = getImageByKey(key);
    return image?.alt_text || fallback || '';
  };

  return {
    images,
    loading,
    error,
    getImageByKey,
    getImageUrl,
    getAltText,
  };
};
