
-- Add matricule column to workers
ALTER TABLE public.workers ADD COLUMN IF NOT EXISTS matricule text;

-- Add is_department_head flag to workers
ALTER TABLE public.workers ADD COLUMN IF NOT EXISTS is_department_head boolean NOT NULL DEFAULT false;

-- Add validation fields to documents
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS validated_by_responsible boolean NOT NULL DEFAULT false;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS validated_by_rh boolean NOT NULL DEFAULT false;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS responsible_validated_at timestamp with time zone;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS rh_validated_at timestamp with time zone;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS responsible_validator_id uuid;
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS rh_validator_id uuid;
