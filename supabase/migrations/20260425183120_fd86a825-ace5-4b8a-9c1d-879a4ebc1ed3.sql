UPDATE blog_posts SET content = regexp_replace(content, 'alvaio', 'Saleixo', 'gi')
WHERE content ILIKE '%alvaio%' OR content ILIKE '%salixo%' OR content ILIKE '%indistores%';