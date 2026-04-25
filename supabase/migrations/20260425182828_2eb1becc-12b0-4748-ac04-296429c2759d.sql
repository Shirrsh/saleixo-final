UPDATE testimonials SET quote = REPLACE(REPLACE(REPLACE(quote, 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo')
WHERE quote ILIKE '%indistores%' OR quote ILIKE '%salixo%' OR quote ILIKE '%alvaio%';

UPDATE homepage_content SET
  hero_title = REPLACE(REPLACE(REPLACE(COALESCE(hero_title,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo'),
  hero_subtitle = REPLACE(REPLACE(REPLACE(COALESCE(hero_subtitle,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo'),
  meta_title = REPLACE(REPLACE(REPLACE(COALESCE(meta_title,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo'),
  meta_description = REPLACE(REPLACE(REPLACE(COALESCE(meta_description,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo')
WHERE hero_title ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%'])
   OR hero_subtitle ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%'])
   OR meta_title ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%'])
   OR meta_description ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%']);

UPDATE site_settings SET site_title = REPLACE(REPLACE(REPLACE(COALESCE(site_title,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo')
WHERE site_title ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%']);

UPDATE blog_posts SET
  title = REPLACE(REPLACE(REPLACE(COALESCE(title,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo'),
  excerpt = REPLACE(REPLACE(REPLACE(COALESCE(excerpt,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo'),
  content = REPLACE(REPLACE(REPLACE(COALESCE(content,''), 'Indistores', 'Saleixo'), 'Salixo', 'Saleixo'), 'Alvaio', 'Saleixo')
WHERE title ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%'])
   OR excerpt ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%'])
   OR content ILIKE ANY (ARRAY['%indistores%','%salixo%','%alvaio%']);