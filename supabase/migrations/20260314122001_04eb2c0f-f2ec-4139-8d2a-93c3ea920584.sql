ALTER TABLE public.workers
ADD COLUMN date_naissance date,
ADD COLUMN lieu_naissance text,
ADD COLUMN situation_familiale text,
ADD COLUMN sexe text,
ADD COLUMN numero_social text,
ADD COLUMN numero_compte text,
ADD COLUMN acte_naissance text;