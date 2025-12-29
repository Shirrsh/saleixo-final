import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HomepageContent {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: string;
  hero_image_url: string;
  meta_title: string;
  meta_description: string;
}

interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
}

const defaultContent: HomepageContent = {
  hero_title: 'Transform Your Brand Into Market-Winning Brands',
  hero_subtitle: 'Photography, design, and marketing that actually grows revenue. You focus on your craft, we handle the growth.',
  hero_cta_text: 'Book Free Strategy Call',
  hero_cta_link: '#contact',
  hero_image_url: '',
  meta_title: 'Alvaio - Transform Your Brand',
  meta_description: 'Professional photography, design, and marketing services',
};

export const useHomepageContent = () => {
  const [content, setContent] = useState<HomepageContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_content')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setContent({
            hero_title: data.hero_title || defaultContent.hero_title,
            hero_subtitle: data.hero_subtitle || defaultContent.hero_subtitle,
            hero_cta_text: data.hero_cta_text || defaultContent.hero_cta_text,
            hero_cta_link: data.hero_cta_link || defaultContent.hero_cta_link,
            hero_image_url: data.hero_image_url || defaultContent.hero_image_url,
            meta_title: data.meta_title || defaultContent.meta_title,
            meta_description: data.meta_description || defaultContent.meta_description,
          });
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading };
};

export const useValuePropositions = () => {
  const [valueProps, setValueProps] = useState<ValueProposition[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultValueProps: ValueProposition[] = [
    {
      id: '1',
      title: 'Studio-Grade Quality, Exceptional Value',
      description: 'Professional results that drive real business growth. Quality that competes with the best, with solutions customized to your goals.',
      icon: 'CheckCircle',
      display_order: 0,
      is_active: true,
    },
    {
      id: '2',
      title: 'Fast Turnaround, Zero Hassle',
      description: 'From brief to delivery in 24-48 hours. Streamlined processes that respect your timeline and budget.',
      icon: 'Clock',
      display_order: 1,
      is_active: true,
    },
    {
      id: '3',
      title: 'Creativity That Converts',
      description: 'Beautiful visuals designed with sales in mind. Every image, every design element is crafted to drive engagement and conversions.',
      icon: 'Zap',
      display_order: 2,
      is_active: true,
    },
    {
      id: '4',
      title: 'Trusted by Modern Brands',
      description: 'From startups to established brands, we\'ve helped 500+ businesses elevate their visual presence and boost sales.',
      icon: 'Users',
      display_order: 3,
      is_active: true,
    },
  ];

  useEffect(() => {
    const fetchValueProps = async () => {
      try {
        const { data, error } = await supabase
          .from('value_propositions')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) throw error;

        if (data && data.length > 0) {
          setValueProps(data);
        } else {
          setValueProps(defaultValueProps);
        }
      } catch (error) {
        console.error('Error fetching value propositions:', error);
        setValueProps(defaultValueProps);
      } finally {
        setLoading(false);
      }
    };

    fetchValueProps();
  }, []);

  return { valueProps, loading };
};
